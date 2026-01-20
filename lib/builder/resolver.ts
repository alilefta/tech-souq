// lib/builder/resolver.ts
import { BuilderState } from "@/store/useBuilderStore";
import { CpuSchema, MotherboardSchema, GpuSchema, ChassisSchema, PsuSchema, RamSchema, StorageSchema, CoolerSchema } from "@/lib/schemas/product";
import z from "zod";

export type ProtocolAlert = {
	code: string;
	message: string;
	severity: "CRITICAL" | "WARNING" | "STABLE";
};

// Types extracted from schema
type CPU = z.infer<typeof CpuSchema>;
type MB = z.infer<typeof MotherboardSchema>;
type GPU = z.infer<typeof GpuSchema>;
type CHASSIS = z.infer<typeof ChassisSchema>;
type PSU = z.infer<typeof PsuSchema>;
type RAM = z.infer<typeof RamSchema>;
type STORAGE = z.infer<typeof StorageSchema>;
type COOLER = z.infer<typeof CoolerSchema>;

// Helper to count occurrences in an array (For accurate cable checking)
const countItems = (arr: string[]) => {
	return arr.reduce(
		(acc, curr) => {
			acc[curr] = (acc[curr] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);
};

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
	const s1 = STORAGE1?.compatibility as STORAGE;
	const s2 = STORAGE2?.compatibility as STORAGE;

	// 1. CPU <-> MOTHERBOARD
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
				message: `Warning: Chipset ${m.chipset} may require a BIOS update.`,
				severity: "WARNING",
			});
		}
	}

	// 2. MEMORY PROTOCOLS (FIXED STRING COMPARISON)
	if (r && m) {
		if (r.memoryType !== m.memoryType) {
			alerts.push({
				code: "DDR_MISMATCH",
				message: `Critical: Motherboard requires ${m.memoryType}, but ${r.memoryType} modules were selected.`,
				severity: "CRITICAL",
			});
		}
		if (Number(r.modules) > Number(m.memorySlots)) {
			alerts.push({
				code: "DIMM_OVERFLOW",
				message: `Critical: Selected ${r.modules} sticks, but Motherboard only has ${m.memorySlots} slots.`,
				severity: "CRITICAL",
			});
		}

		// --- THE FIX IS HERE: Number() wrapper ---
		if (Number(r.capacity) > Number(m.maxMemoryCapacity)) {
			alerts.push({
				code: "CAPACITY_OVERFLOW",
				message: `Critical: ${r.capacity}GB exceeds Motherboard's max capacity of ${m.maxMemoryCapacity}GB.`,
				severity: "CRITICAL",
			});
		}
	}

	// 3. ENERGY GRID (Total TDP vs PSU)
	if (p) {
		const cpuTdp = Number(c?.tdp || 0);
		const gpuTdp = Number(g?.tdp || 0);
		const totalTdp = cpuTdp + gpuTdp + 100; // Overhead

		if (totalTdp > Number(p.wattage)) {
			alerts.push({
				code: "ENERGY_FAILURE",
				message: `System Failure: Draw (${totalTdp}W) exceeds PSU capacity (${p.wattage}W).`,
				severity: "CRITICAL",
			});
		} else if (totalTdp > Number(p.wattage) * 0.8) {
			alerts.push({
				code: "ENERGY_STRAIN",
				message: `Telemetry Alert: Power draw is >80% of PSU limit.`,
				severity: "WARNING",
			});
		}
	}

	// 4. POWER CONNECTORS (FIXED QUANTITY LOGIC)
	if (p && m) {
		const psuPins = countItems(p.cpuPowerConnectors);
		const mbPins = countItems(m.cpuPowerConnectors);

		let powerMissing = false;
		// Check if PSU has enough of every specific pin type required by MB
		for (const [pin, count] of Object.entries(mbPins)) {
			if ((psuPins[pin] || 0) < count) {
				powerMissing = true;
				break;
			}
		}

		if (powerMissing) {
			alerts.push({
				code: "CPU_POWER_CONFLICT",
				message: `Critical: PSU lacks required CPU cables [${m.cpuPowerConnectors.join(" + ")}].`,
				severity: "CRITICAL",
			});
		}
	}

	// 4.5 GPU POWER (New Check)
	if (p && g) {
		const psuPins = countItems(p.gpuPowerConnectors);
		const gpuPins = countItems(g.powerConnectors);
		let gpuPowerMissing = false;

		for (const [pin, count] of Object.entries(gpuPins)) {
			if ((psuPins[pin] || 0) < count) {
				gpuPowerMissing = true;
				break;
			}
		}
		if (gpuPowerMissing) {
			alerts.push({
				code: "GPU_POWER_CONFLICT",
				message: `Critical: PSU lacks required GPU cables [${g.powerConnectors.join(" + ")}].`,
				severity: "CRITICAL",
			});
		}
	}

	// 5. GEOMETRIC CLEARANCE
	if (cs) {
		if (g && Number(g.length) > Number(cs.maxGpuLength)) {
			alerts.push({
				code: "GPU_PHYSICAL_OVERFLOW",
				message: `Structural Alert: GPU (${g.length}mm) exceeds Chassis clearance (${cs.maxGpuLength}mm).`,
				severity: "CRITICAL",
			});
		}
		if (cl && cl.coolerType === "AIR" && Number(cl.height) > Number(cs.maxCpuCoolerHeight)) {
			alerts.push({
				code: "THERMAL_HEIGHT_VIOLATION",
				message: `Structural Alert: Cooler (${cl.height}mm) exceeds Chassis depth (${cs.maxCpuCoolerHeight}mm).`,
				severity: "CRITICAL",
			});
		}
		if (cl && cl.coolerType === "LIQUID" && cl.radiatorSize) {
			// Ensure radiatorSupport is treated as an array of strings
			if (!cs.radiatorSupport.includes(String(cl.radiatorSize) as CHASSIS["radiatorSupport"][0])) {
				alerts.push({
					code: "RADIATOR_SYNC_FAILURE",
					message: `Structural Alert: Chassis does not support ${cl.radiatorSize}mm radiators.`,
					severity: "CRITICAL",
				});
			}
		}
	}

	// 6. STORAGE LOGISTICS
	if (m) {
		const m2Drives = [STORAGE1, STORAGE2].filter((s) => (s?.compatibility as STORAGE)?.formFactor === "M.2").length;
		// Ensure m2Slots is treated as an array
		if (m2Drives > (m.m2Slots?.length || 0)) {
			alerts.push({
				code: "M2_SLOT_EXHAUSTION",
				message: `Resource Alert: Insufficient M.2 slots.`,
				severity: "CRITICAL",
			});
		}
	}

	// 7. THERMAL SYNC
	if (cl && c) {
		if (!cl.socket.includes(c.socket)) {
			alerts.push({
				code: "COOLER_SOCKET_MISMATCH",
				message: `Critical: Cooler bracket does not support ${c.socket}.`,
				severity: "CRITICAL",
			});
		}
		// Force Number comparison for TDP
		if (Number(cl.maxTdp) < Number(c.tdp)) {
			alerts.push({
				code: "THERMAL_DEFICIT",
				message: `Critical: Cooler (${cl.maxTdp}W) cannot handle CPU heat (${c.tdp}W).`,
				severity: "CRITICAL",
			});
		}
	}

	return alerts;
}
