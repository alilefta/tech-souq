// lib/builder/resolver.ts
import { BuilderState } from "@/store/useBuilderStore";

export type ProtocolAlert = {
	code: string;
	message: string;
	severity: "CRITICAL" | "WARNING" | "STABLE";
};

export function resolveCompatibility(manifest: BuilderState["manifest"]): ProtocolAlert[] {
	const alerts: ProtocolAlert[] = [];
	const { CPU, MOTHERBOARD, RAM, PSU, GPU, CHASSIS, COOLER, STORAGE1, STORAGE2 } = manifest;

	// 1. SOCKET HANDSHAKE (CPU vs MOTHERBOARD)
	if (CPU?.compatibility?.type === "CPU" && MOTHERBOARD?.compatibility?.type === "MOTHERBOARD") {
		if (CPU.compatibility.socket !== MOTHERBOARD.compatibility.socket) {
			alerts.push({
				code: "SOCKET_MISMATCH",
				message: `CPU Socket [${CPU.compatibility.socket}] is incompatible with Motherboard [${MOTHERBOARD.compatibility.socket}]`,
				severity: "CRITICAL",
			});
		}
	}

	// 2. MEMORY PROTOCOL (RAM vs MOTHERBOARD)
	if (RAM?.compatibility?.type === "RAM" && MOTHERBOARD?.compatibility?.type === "MOTHERBOARD") {
		if (RAM.compatibility.memoryType !== MOTHERBOARD.compatibility.memoryType) {
			alerts.push({
				code: "MEMORY_CONFLICT",
				message: `DDR Standard Mismatch: MB requires ${MOTHERBOARD.compatibility.memoryType}`,
				severity: "CRITICAL",
			});
		}
	}

	// 3. ENERGY DEFICIT (PSU vs TDP)
	const totalTdp = (CPU?.compatibility?.type === "CPU" ? CPU.compatibility.tdp : 0) + (GPU?.compatibility?.type === "GPU" ? GPU.compatibility.tdp : 0);

	if (PSU?.compatibility?.type === "PSU" && totalTdp > 0) {
		if (totalTdp > PSU.compatibility.wattage * 0.8) {
			alerts.push({
				code: "ENERGY_DEFICIT",
				message: `Combined Load (${totalTdp}W) exceeds 80% of PSU capacity. Risk of system instability.`,
				severity: "WARNING",
			});
		}
	}

	if (MOTHERBOARD?.compatibility?.type === "MOTHERBOARD" && CHASSIS?.compatibility?.type === "CASE") {
		const formFactorOrder = ["ITX", "mATX", "ATX", "E-ATX"];
		const mbIndex = formFactorOrder.indexOf(MOTHERBOARD.compatibility.formFactor);
		const caseIndex = formFactorOrder.indexOf(CHASSIS.compatibility.formFactor);

		if (mbIndex > caseIndex) {
			alerts.push({
				code: "CHASSIS_INCOMPATIBILITY",
				message: `Chassis only supports up to ${CHASSIS.compatibility.formFactor}. ${MOTHERBOARD.compatibility.formFactor} board detected.`,
				severity: "CRITICAL",
			});
		}
	}

	// 5. GPU CLEARANCE
	if (GPU?.compatibility?.type === "GPU" && CHASSIS?.compatibility?.type === "CASE") {
		if (GPU.compatibility.length > CHASSIS.compatibility.maxGpuLength) {
			alerts.push({
				code: "PHYSICAL_OVERFLOW",
				message: `GPU Length (${GPU.compatibility.length}mm) exceeds Chassis clearance (${CHASSIS.compatibility.maxGpuLength}mm).`,
				severity: "CRITICAL",
			});
		}
	}

	if (COOLER?.compatibility?.type === "COOLER" && CHASSIS?.compatibility?.type === "CASE") {
		if (COOLER?.compatibility?.height !== CHASSIS.compatibility.maxCpuCoolerHeight) {
			alerts.push({
				code: "THERMAL_WIDTH_VIOLATION",
				message: `Structural_Alert: Regulator height [165mm] exceeds Chassis depth.`,
				severity: "WARNING",
			});
		}
	}

	if (COOLER?.compatibility?.type === "COOLER" && CHASSIS?.compatibility?.type === "CASE") {
		if (COOLER?.compatibility?.coolerType === "LIQUID" && COOLER?.compatibility?.radiatorSize !== CHASSIS.compatibility.maxRadiatorSupport) {
			alerts.push({
				code: "RADIATOR_SYNC_FAILURE",
				message: `Cooler Radiator Size (${COOLER.compatibility?.radiatorSize}mm) exceeds max Chassis clearance (${CHASSIS?.compatibility?.maxRadiatorSupport}).`,
				severity: "WARNING",
			});
		}
	}

	if (MOTHERBOARD?.compatibility?.type === "MOTHERBOARD") {
		const m2Drives = [STORAGE1, STORAGE2].filter((s) => s?.compatibility?.type === "STORAGE" && s.compatibility.formFactor === "M.2").length;
		if (m2Drives > (MOTHERBOARD.compatibility.m2Slots || 0)) {
			alerts.push({
				code: "SLOT_EXHAUSTION",
				message: `Insufficient M.2 slots. Selected: ${m2Drives}, Available: ${MOTHERBOARD.compatibility.m2Slots}`,
				severity: "CRITICAL",
			});
		}
	}

	if (MOTHERBOARD?.compatibility?.type === "MOTHERBOARD" && RAM?.compatibility?.type === "RAM") {
		const slots = MOTHERBOARD?.compatibility?.memorySlots;
		const memModules = RAM?.compatibility?.modules;
		if (memModules > slots) {
			alerts.push({
				code: "SLOT_EXHAUSTION",
				message: `Insufficient Memory slots. Selected: ${memModules}, Available: ${slots}`,
				severity: "CRITICAL",
			});
		}
	}

	return alerts;
}
