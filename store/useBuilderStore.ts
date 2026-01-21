import { ProductBuilderDTO } from "@/app/data/products";
import { create } from "zustand";

export type BuildComponentType = "CPU" | "GPU" | "PSU" | "MOTHERBOARD" | "RAM" | "CHASSIS" | "STORAGE1" | "STORAGE2" | "COOLER";

export type BuildManifest = Record<BuildComponentType, ProductBuilderDTO | null>;

export interface BuilderState {
	currentStep: number;
	MaxStep: number;
	manifest: BuildManifest;

	isExploded: boolean;

	// Actions
	setStep: (step: number) => void;
	setComponent: (type: BuildComponentType, product: ProductBuilderDTO) => void;
	clearComponent: (type: BuildComponentType) => void;
	resetFoundry: () => void;

	toggleExploded: () => void;
}

const initialManifest: BuildManifest = {
	CPU: null,
	GPU: null,
	PSU: null,
	MOTHERBOARD: null,
	RAM: null,
	CHASSIS: null,
	STORAGE1: null,
	STORAGE2: null,
	COOLER: null,
};

export const BUILD_STEPS: BuildComponentType[] = ["CHASSIS", "MOTHERBOARD", "CPU", "RAM", "GPU", "STORAGE1", "STORAGE2", "COOLER", "PSU"];

export const isStepAuthorized = (stepIndex: number, manifest: BuildManifest): boolean => {
	const stepType = BUILD_STEPS[stepIndex];

	if (stepType === "CHASSIS") return true;
	if (stepType === "MOTHERBOARD" || stepType === "PSU") return !!manifest.CHASSIS;

	// All other parts require a Motherboard
	return !!manifest.MOTHERBOARD;
};

export const useBuilderStore = create<BuilderState>((set) => ({
	currentStep: 0,
	manifest: initialManifest,
	MaxStep: 8,

	isExploded: false,
	setStep: (step) => set({ currentStep: step }),

	// UNIFIED ACTION: setComponent handles both add and update
	setComponent: (type, product) =>
		set((state) => {
			return {
				manifest: {
					...state.manifest,
					[type]: product,
				},
				// Auto-advance if we're adding a new part (optional UX choice)
			};
		}),

	clearComponent: (type) =>
		set((state) => ({
			manifest: {
				...state.manifest,
				[type]: null,
			},
		})),

	resetFoundry: () => set({ manifest: initialManifest, currentStep: 0 }),

	toggleExploded: () =>
		set((state) => {
			return {
				isExploded: !state.isExploded,
			};
		}),
}));
