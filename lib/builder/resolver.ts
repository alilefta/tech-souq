// lib/builder/resolver.ts
import { BuilderState } from "@/store/useBuilderStore";
import { CpuSchema, MotherboardSchema, GpuSchema, ChassisSchema, PsuSchema, RamSchema, StorageSchema, CoolerSchema } from "@/lib/schemas/product";
import z from "zod";

export type ProtocolAlert = {
	code: string;
	message: string;
	severity: "CRITICAL" | "WARNING" | "STABLE";
};

// Types extracted from schema for strict logic
type CPU = z.infer<typeof CpuSchema>;
type MB = z.infer<typeof MotherboardSchema>;
type GPU = z.infer<typeof GpuSchema>;
type CHASSIS = z.infer<typeof ChassisSchema>;
type PSU = z.infer<typeof PsuSchema>;
type RAM = z.infer<typeof RamSchema>;
type STORAGE = z.infer<typeof StorageSchema>;
type COOLER = z.infer<typeof CoolerSchema>;

export function resolveCompatibility(manifest: BuilderState["manifest"]): ProtocolAlert[] {
	const alerts: ProtocolAlert[] = [];
	const { CPU, MOTHERBOARD, RAM, PSU, GPU, CHASSIS, COOLER, STORAGE1, STORAGE2 } = manifest;

	const c = CPU?.compatibility as CPU;
	const m = MOTHERBOARD?.compatibility as MB;
	const g = GPU?.compatibility as GPU;
	const cs = CHASSIS?.compatibility as CHASSIS;
	const p = PSU?.compatibility as PSU;
	const r = RAM?.compatibility as RAM;
	const cl = COOLER?.compatibility as COOLER;

	// 1. CPU <-> MOTHERBOARD (The Brain Handshake)
	if (c && m) {
		if (c.socket !== m.socket) {
			alerts.push({
				code: "SOCKET_MISMATCH",
				message: `Critical: CPU Socket [${c.socket}] is incompatible with Motherboard [${m.socket}]`,
				severity: "CRITICAL",
			});
		}
		if (c.chipsetSupport && !c.chipsetSupport.includes(m.chipset)) {
			alerts.push({
				code: "CHIPSET_CONFLICT",
				message: `Warning: Chipset ${m.chipset} may require a BIOS update to support this CPU.`,
				severity: "WARNING",
			});
		}
	}

	// 2. MEMORY PROTOCOLS (Motherboard + CPU + RAM)
	if (r && m) {
		if (r.memoryType !== m.memoryType) {
			alerts.push({
				code: "DDR_MISMATCH",
				message: `Critical: Motherboard requires ${m.memoryType}, but ${r.memoryType} modules were selected.`,
				severity: "CRITICAL",
			});
		}
		if (r.modules > m.memorySlots) {
			alerts.push({
				code: "DIMM_OVERFLOW",
				message: `Critical: Selected ${r.modules} sticks, but Motherboard only has ${m.memorySlots} slots.`,
				severity: "CRITICAL",
			});
		}
		if (r.capacity > m.maxMemoryCapacity) {
			alerts.push({
				code: "CAPACITY_OVERFLOW",
				message: `Critical: ${r.capacity}GB exceeds Motherboard's max capacity of ${m.maxMemoryCapacity}GB.`,
				severity: "CRITICAL",
			});
		}
	}

	// 3. ENERGY GRID (Total TDP vs PSU)
	if (p) {
		const cpuTdp = c?.tdp || 0;
		const gpuTdp = g?.tdp || 0;
		const totalTdp = cpuTdp + gpuTdp + 100; // 100W overhead for peripherals/fans

		if (totalTdp > p.wattage) {
			alerts.push({
				code: "ENERGY_FAILURE",
				message: `System Failure: Estimated draw (${totalTdp}W) exceeds PSU capacity (${p.wattage}W).`,
				severity: "CRITICAL",
			});
		} else if (totalTdp > p.wattage * 0.8) {
			alerts.push({
				code: "ENERGY_STRAIN",
				message: `Telemetry Alert: Power draw is near PSU limit. 80% threshold exceeded.`,
				severity: "WARNING",
			});
		}
	}

	// 4. POWER CONNECTORS (PSU vs MB/GPU Pins)
	if (p && m) {
		const hasRequiredCpuPins = m.cpuPowerConnectors.every((pin) => p.cpuPowerConnectors.includes(pin));
		if (!hasRequiredCpuPins) {
			alerts.push({
				code: "CPU_POWER_CONFLICT",
				message: `Critical: PSU lacks required CPU power connectors [${m.cpuPowerConnectors.join(", ")}].`,
				severity: "CRITICAL",
			});
		}
	}

	// 5. GEOMETRIC CLEARANCE (Case Constraints)
	if (cs) {
		// GPU Length
		if (g && g.length > cs.maxGpuLength) {
			alerts.push({
				code: "GPU_PHYSICAL_OVERFLOW",
				message: `Structural Alert: GPU length (${g.length}mm) exceeds Chassis clearance (${cs.maxGpuLength}mm).`,
				severity: "CRITICAL",
			});
		}
		// Cooler Height
		if (cl && cl.coolerType === "AIR" && cl.height > cs.maxCpuCoolerHeight) {
			alerts.push({
				code: "THERMAL_HEIGHT_VIOLATION",
				message: `Structural Alert: Cooler height (${cl.height}mm) exceeds Chassis depth (${cs.maxCpuCoolerHeight}mm).`,
				severity: "CRITICAL",
			});
		}
		// Radiator Size
		if (cl && cl.coolerType === "LIQUID" && cl.radiatorSize) {
			if (!cs.radiatorSupport.includes(cl.radiatorSize as CHASSIS["radiatorSupport"][0])) {
				alerts.push({
					code: "RADIATOR_SYNC_FAILURE",
					message: `Structural Alert: Chassis does not support ${cl.radiatorSize}mm radiators.`,
					severity: "CRITICAL",
				});
			}
		}
	}

	// 6. STORAGE LOGISTICS (Motherboard slots)
	if (m) {
		const m2Drives = [STORAGE1, STORAGE2].filter((s) => (s?.compatibility as STORAGE)?.formFactor === "M.2").length;
		if (m2Drives > m.m2Slots.length) {
			alerts.push({
				code: "M2_SLOT_EXHAUSTION",
				message: `Resource Alert: Insufficient M.2 slots. Required: ${m2Drives}, Available: ${m.m2Slots.length}.`,
				severity: "CRITICAL",
			});
		}
	}

	// 7. THERMAL SYNC (Cooler vs CPU)
	if (cl && c) {
		if (!cl.socket.includes(c.socket)) {
			alerts.push({
				code: "COOLER_SOCKET_MISMATCH",
				message: `Critical: Cooler bracket does not support ${c.socket} architecture.`,
				severity: "CRITICAL",
			});
		}
		if (cl.maxTdp < c.tdp) {
			alerts.push({
				code: "THERMAL_DEFICIT",
				message: `Critical: Cooler capacity (${cl.maxTdp}W) is insufficient for CPU TDP (${c.tdp}W).`,
				severity: "CRITICAL",
			});
		}
	}

	return alerts;
}
