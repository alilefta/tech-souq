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
	motherboard: { scale: [1.05, 1.05, 1.05], rotation: [0, 5.5, 0], centered: false },

	// SPECIFIC OVERRIDES (Applied by specific model filename if needed)
	gpu: {
		scale: [1, 1, 1], // FIX: Shrink by 100x (cm to m) or 1000x (mm to m)
		rotation: [0, 5.5, 0], // rotation by radians
		centered: false,
	},
	cpu: {
		scale: [0.0012, 0.0012, 0.0012], // CPUs are tiny, likely mm export
		rotation: [1.56, 4.7, 0],
		centered: true,
	},
	cooler: {
		scale: [0.1, 0.1, 0.1],
		rotation: [0, 0, 0],
		centered: true,
	},
};
