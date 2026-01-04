"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Cpu, Layout, Box, Zap, MemoryStick, Terminal, Info, Activity, LucideIcon, Database, Fan } from "lucide-react";
import { InputWithLabel } from "@/components/ui/inputs/input-with-label";
import { FoundrySelect as FoundarySelectField } from "@/components/ui/inputs/foundary-form-select";
import { FoundrySelect } from "@/components/ui/inputs/foundry-select";
import { Checkbox } from "@/components/ui/checkbox";
import { AddProductSchemaType, CompatibilitySchemaType } from "@/lib/schemas/product";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface CompatibilityTypesUISchema {
	label: string;
	value: string;
	icon: LucideIcon;
}

const COMPATIBILITY_TYPES: CompatibilityTypesUISchema[] = [
	{ label: "Central_Processor (CPU)", value: "CPU", icon: Cpu },
	{ label: "Logic_Board (Motherboard)", value: "MOTHERBOARD", icon: Layout },
	{ label: "Graphics_Node (GPU)", value: "GPU", icon: Activity },
	{ label: "Foundry_Chassis (Case)", value: "CASE", icon: Box },
	{ label: "Energy_Cell (PSU)", value: "PSU", icon: Zap },
	{ label: "Memory_Module (RAM)", value: "RAM", icon: MemoryStick },
	{ label: "Storage_Node (Drive)", value: "STORAGE", icon: Database },
	{ label: "Thermal_Regulator (Cooler)", value: "COOLER", icon: Fan },
];

export function CompatibilityLogicModule() {
	const { control, watch, setValue } = useFormContext<AddProductSchemaType>();

	// Watch the compatibility object to see if it's initialized and what type it is
	const compatibility = watch("compatibility");
	const isEnabled = !!compatibility;

	const handleToggle = (checked: boolean) => {
		if (checked) {
			// Initialize with a default type
			setValue("compatibility", { type: "CPU", socket: "", tdp: 0, integratedGraphics: false });
		} else {
			setValue("compatibility", undefined);
		}
	};

	return (
		<section className="space-y-8">
			{/* 1. INITIALIZATION TOGGLE */}
			<div className="flex items-center justify-between p-6 bg-white/2 border border-white/5 group hover:border-[#FFB400]/20 transition-all">
				<div className="flex items-center gap-4">
					<div
						className={cn(
							"w-10 h-10 border flex items-center justify-center transition-all",
							isEnabled ? "border-[#FFB400] text-[#FFB400] shadow-[0_0_15px_rgba(255,180,0,0.2)]" : "border-white/10 text-[#94A3B8]"
						)}
					>
						<Terminal size={18} />
					</div>
					<div>
						<h3 className="text-[#F5F5F0] text-sm font-black uppercase tracking-widest">Crucible_Logic_Mapping</h3>
						<p className="text-[8px] font-mono text-[#94A3B8] uppercase opacity-40">Enable this module for 3D Builder compatibility</p>
					</div>
				</div>
				<Checkbox checked={isEnabled} onCheckedChange={handleToggle} className="border-white/20 data-[state=checked]:bg-[#FFB400] data-[state=checked]:text-[#0A0E14] rounded-none h-6 w-6" />
			</div>

			<AnimatePresence>
				{isEnabled && (
					<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-8 overflow-hidden">
						{/* 2. TYPE SELECTION */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 border border-dashed border-white/10 bg-[#FFB400]/1">
							<FoundrySelect
								label="Component_Logic_Definition"
								value={compatibility.type}
								onValueChange={(val) => setValue("compatibility", { type: val } as CompatibilitySchemaType)}
								options={COMPATIBILITY_TYPES}
								placeholder="SELECT_TYPE"
							/>

							<div className="flex items-center gap-4 p-4 bg-white/2 border border-white/5 italic">
								<Info size={16} className="text-[#FFB400] shrink-0" />
								<p className="text-[10px] text-[#94A3B8] leading-relaxed uppercase">
									The parameters below will govern the 3D snapping logic and hardware stability checks in the Crucible Builder.
								</p>
							</div>
						</div>

						{/* 3. DYNAMIC PARAMETER TERMINAL */}
						<div className="p-8 border border-white/5 bg-white/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{/* CPU FIELDS */}
							{compatibility.type === "CPU" && (
								<>
									<Controller
										name="compatibility.socket"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.socket"
												fieldTitle="Socket_Architecture"
												placeholder="e.g. LGA1700 / AM5"
											/>
										)}
									/>
									<Controller
										name="compatibility.tdp"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel type="number" field={field} fieldState={fieldState} nameInSchema="compatibility.tdp" placeholder="e.g. 125" fieldTitle="TDP (W)" />
										)}
									/>
								</>
							)}

							{/* MOTHERBOARD FIELDS */}
							{compatibility.type === "MOTHERBOARD" && (
								<>
									<Controller
										name="compatibility.socket"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel field={field} fieldState={fieldState} nameInSchema="compatibility.socket" fieldTitle="Socket_Support" placeholder="e.g. AM5" />
										)}
									/>
									<div className="space-y-2">
										<FoundarySelectField
											control={control}
											fieldTitle="Physical_Form"
											nameInSchema="compatibility.formFactor"
											placeholder="SELECT_FORM"
											options={[
												{ label: "ATX", value: "ATX" },
												{ label: "mATX", value: "mATX" },
												{ label: "ITX", value: "ITX" },
											]}
										/>
									</div>
									<Controller
										name="compatibility.memoryType"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel field={field} fieldState={fieldState} nameInSchema="compatibility.memoryType" fieldTitle="Memory_Bus" placeholder="DDR5" />
										)}
									/>
								</>
							)}

							{/* GPU FIELDS */}
							{compatibility.type === "GPU" && (
								<>
									<Controller
										name="compatibility.length"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.length"
												fieldTitle="Module_Length (mm)"
												placeholder="e.g. 336"
											/>
										)}
									/>
									<Controller
										name="compatibility.tdp"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel type="number" field={field} fieldState={fieldState} nameInSchema="compatibility.tdp" fieldTitle="Thermal_Load (W)" placeholder="e.g. 350" />
										)}
									/>
								</>
							)}

							{/* PSU FIELDS */}
							{compatibility.type === "PSU" && (
								<>
									<Controller
										name="compatibility.wattage"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.wattage"
												fieldTitle="Core_Wattage_Capacity"
												placeholder="e.g. 1000"
											/>
										)}
									/>
									<Controller
										name="compatibility.rating"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.rating"
												fieldTitle="Efficiency_Rating"
												placeholder="e.g. 80+ GOLD"
											/>
										)}
									/>
								</>
							)}

							{/* CASE FIELDS */}
							{compatibility.type === "CASE" && (
								<>
									<FoundarySelectField
										control={control}
										fieldTitle="Max_Chassis_Form"
										nameInSchema="compatibility.formFactor"
										placeholder="SELECT_MAX"
										options={[
											{ label: "E-ATX", value: "E-ATX" },
											{ label: "ATX", value: "ATX" },
											{ label: "mATX", value: "mATX" },
										]}
									/>
									<Controller
										name="compatibility.maxGpuLength"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.maxGpuLength"
												fieldTitle="Max_GPU_Clearance (mm)"
												placeholder="e.g. 400"
											/>
										)}
									/>
								</>
							)}

							{/* RAM FIELDS */}
							{compatibility.type === "RAM" && (
								<>
									<Controller
										name="compatibility.memoryType"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.memoryType"
												fieldTitle="Memory_Standard"
												placeholder="DDR5"
											/>
										)}
									/>
									<Controller
										name="compatibility.capacity"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.capacity"
												fieldTitle="Total_Density (GB)"
												placeholder="e.g. 32"
											/>
										)}
									/>
									<Controller
										name="compatibility.modules"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel type="number" field={field} fieldState={fieldState} nameInSchema="compatibility.modules" fieldTitle="Memory_Modules (1 or 2)" />
										)}
									/>
								</>
							)}

							{/* STORAGE FIELDS */}
							{compatibility.type === "STORAGE" && (
								<>
									<FoundarySelectField
										control={control}
										fieldTitle="Storage_Class"
										placeholder="Select_Storage_Type"
										nameInSchema="compatibility.storageType"
										options={[
											{ label: "NVMe_SSD", value: "NVME" },
											{ label: "SATA_SSD", value: "SSD" },
											{ label: "Mechanical_HDD", value: "HDD" },
										]}
									/>
									<FoundarySelectField
										control={control}
										fieldTitle="Physical_Interface"
										placeholder="Select_Form"
										nameInSchema="compatibility.formFactor"
										options={[
											{ label: "M.2_Slot", value: "M.2" },
											{ label: "2.5_Inch", value: "2.5" },
											{ label: "3.5_Inch", value: "3.5" },
										]}
									/>
									<Controller
										name="compatibility.capacity"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.capacity"
												fieldTitle="Total_Capacity (GB)"
												placeholder="e.g. 1000"
											/>
										)}
									/>
								</>
							)}

							{/* COOLER FIELDS */}
							{compatibility.type === "COOLER" && (
								<>
									<FoundarySelectField
										control={control}
										fieldTitle="Cooling_Method"
										nameInSchema="compatibility.coolerType"
										placeholder="Select_Cooler"
										options={[
											{ label: "Air_Cooled", value: "AIR" },
											{ label: "Liquid_AIO", value: "LIQUID" },
										]}
									/>
									<Controller
										name="compatibility.socket"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel field={field} fieldState={fieldState} nameInSchema="compatibility.socket" fieldTitle="Socket_Architecture" placeholder="LGA1700, AM5..." />
										)}
									/>
									<Controller
										name="compatibility.height"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.height"
												fieldTitle="Module_Height (mm)"
												placeholder="e.g. 155"
											/>
										)}
									/>
								</>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
