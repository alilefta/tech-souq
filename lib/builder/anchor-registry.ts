// lib/builder/anchor-registry.ts

export type AnchorPoint = [number, number, number];

export interface HardwareAnchors {
	motherboard_dock?: AnchorPoint; // Where MB sits in Case
	cpu_socket?: AnchorPoint; // Where CPU sits on MB
	gpu_slot?: AnchorPoint; // Where GPU sits on MB
	ram_slots?: AnchorPoint[]; // Where RAM sticks sit
	mb_dock?: AnchorPoint; // Where RAM sticks sit
	m2_slot_1?: AnchorPoint; // Where RAM sticks sit

	psu_dock?: AnchorPoint; // Where RAM sticks sit
	storage2?: AnchorPoint;
}

// These coordinates are relative to the parent model's center (0,0,0)
export const FOUNDRY_ANCHORS: Record<string, HardwareAnchors> = {
	// Where the Motherboard sits inside the Chassis
	CHASSIS: {
		mb_dock: [0, 0, 0] as [number, number, number],
		psu_dock: [-0.04, 0.42, -0.14] as [number, number, number],
	},
	// Where parts sit on the Motherboard
	MOTHERBOARD: {
		cpu_socket: [0.072, 0.345, -0.03] as [number, number, number],
		gpu_slot: [0, 0, 0] as [number, number, number],
		// RAM Slots (Right of CPU) - We define positions for 2 sticks
		// Stick 1: Closer to CPU
		// Stick 2: Further Right
		ram_slots: [
			[0.08, 0.08, 0.01],
			[0.1, 0.08, 0.01],
		] as [[number, number, number], [number, number, number]], // Cast as any or define proper type for array of points

		// Storage M.2 Slots
		m2_slot_1: [0, -0.02, 0.005] as [number, number, number], // Between CPU and GPU
		storage2: [0, -0.15, 0.005] as [number, number, number], // Bottom of board
	},
};
