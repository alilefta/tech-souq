// lib/builder/model-map.ts
import { BuildComponentType } from "@/store/useBuilderStore";

export const CATEGORY_MODEL_MAP: Record<BuildComponentType, string> = {
	CPU: "cpu",
	GPU: "gpu", // Ensure you have gpu.glb or update this name
	MOTHERBOARD: "motherboard",
	CHASSIS: "chassis",
	PSU: "psu",
	RAM: "ram",
	STORAGE1: "storage1",
	STORAGE2: "storage2",
	COOLER: "cooler",
};
