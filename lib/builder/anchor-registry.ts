// lib/builder/anchor-registry.ts

export type AnchorPoint = [number, number, number];

export interface HardwareAnchors {
	motherboard_dock?: AnchorPoint; // Where MB sits in Case
	cpu_socket?: AnchorPoint; // Where CPU sits on MB
	gpu_slot?: AnchorPoint; // Where GPU sits on MB
	ram_slots?: AnchorPoint; // Where RAM sticks sit
	mb_dock?: AnchorPoint; // Where RAM sticks sit
	m2_slot_1?: AnchorPoint; // Where RAM sticks sit

	psu_dock?: AnchorPoint; // Where RAM sticks sit
	storage2?: AnchorPoint;
}

// These coordinates are relative to the parent model's center (0,0,0)
export const FOUNDRY_ANCHORS: Record<string, HardwareAnchors> = {
	// Where the Motherboard sits inside the Chassis
	CHASSIS: {
		mb_dock: [0.08, 0.46, -0.18] as [number, number, number],
		psu_dock: [-0.25, 2.2, -0.8] as [number, number, number],
	},
	// Where parts sit on the Motherboard
	MOTHERBOARD: {
		cpu_socket: [0.06, 1.12, 0.7] as [number, number, number],
		gpu_slot: [-0.01, -0.2, 0.08] as [number, number, number],
		ram_slots: [0.1, 0.1, 0.05] as [number, number, number],
		m2_slot_1: [-0.05, 0.05, 0.05] as [number, number, number],
		storage2: [-0.05, 0.05, 0.05] as [number, number, number],
	},
};
