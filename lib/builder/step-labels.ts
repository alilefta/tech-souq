import { BuildComponentType } from "@/store/useBuilderStore";

export const STEP_LABELS: Record<BuildComponentType, string> = {
	CHASSIS: "Foundry_Chassis",
	MOTHERBOARD: "Logic_Board",
	CPU: "Central_Processor",
	RAM: "Memory_Module",
	GPU: "Graphics_Node",
	STORAGE1: "System_Drive_01",
	STORAGE2: "Mass_Storage_02",
	COOLER: "Thermal_Regulator",
	PSU: "Energy_Cell",
};
