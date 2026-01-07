import { ProductDetailsDTO } from "@/app/data/products";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BuildComponentType = "CPU" | "GPU" | "PSU" | "MOTHERBOARD" | "RAM" | "CHASSIS" | "STORAGE1" | "STORAGE2" | "COOLER";

type BuildManifest = Record<BuildComponentType, ProductDetailsDTO | null>;

export interface BuilderState {
	currentStep: number;
	MaxStep: number;
	manifest: BuildManifest;

	// Actions
	setStep: (step: number) => void;
	setComponent: (type: BuildComponentType, product: ProductDetailsDTO) => void;
	clearComponent: (type: BuildComponentType) => void;
	resetFoundry: () => void;
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

export const useBuilderStore = create<BuilderState>((set) => ({
	currentStep: 0,
	manifest: initialManifest,
	MaxStep: 8,

	setStep: (step) => set({ currentStep: step }),

	// UNIFIED ACTION: setComponent handles both add and update
	setComponent: (type, product) =>
		set((state) => ({
			manifest: {
				...state.manifest,
				[type]: product,
			},
			// Auto-advance if we're adding a new part (optional UX choice)
		})),

	clearComponent: (type) =>
		set((state) => ({
			manifest: {
				...state.manifest,
				[type]: null,
			},
		})),

	resetFoundry: () => set({ manifest: initialManifest, currentStep: 0 }),
}));
