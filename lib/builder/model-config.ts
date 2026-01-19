// lib/builder/model-config.ts

interface ModelConfig {
	scale: [number, number, number];
	rotation: [number, number, number]; // Initial rotation fix (some models come in lying flat)
	centered: boolean; // Should we force-center the geometry?
}

// "Default" scale is 1. If a model is huge, try 0.01 or 0.001 (mm to m conversion)
export const MODEL_CALIBRATION: Record<string, ModelConfig> = {
	// CATEGORY DEFAULTS (Applied by type)
	chassis: { scale: [1, 1, 1], rotation: [0, 0, 0], centered: false },
	motherboard: { scale: [1, 1, 1], rotation: [0, 0, 0], centered: false },

	// SPECIFIC OVERRIDES (Applied by specific model filename if needed)
	gpu: {
		scale: [1, 1, 1], // FIX: Shrink by 100x (cm to m) or 1000x (mm to m)
		rotation: [0, 0, 0], // rotation by radians
		centered: false,
	},
	cpu: {
		scale: [1, 1, 1], // CPUs are tiny, likely mm export
		rotation: [0, 0, 0],
		centered: true,
	},
	// RAM: Standard Stick
	ram: {
		scale: [1, 1, 1],
		rotation: [0, 0, 5.5], // Should be upright if exported correctly
		centered: false,
	},

	// STORAGE (M.2 NVMe)
	storage1: {
		scale: [1, 1, 1],
		rotation: [0, 0, 0], // M.2 drives usually lie flat against the board
		centered: false,
	},
	storage2: {
		scale: [1, 1, 1],
		rotation: [Math.PI / 2, 0, 0],
		centered: false,
	},

	// COOLER (AIO Pump Block)
	cooler: {
		scale: [1, 1, 1],
		rotation: [0, 0, 0],
		centered: false,
	},

	// PSU (Power Supply)
	psu: {
		scale: [1, 1, 1],
		rotation: [0, Math.PI, 0], // Often needs 180 spin to face fan down/out
		centered: false,
	},
};
