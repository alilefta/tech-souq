"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Cpu, Layout, Box, Zap, MemoryStick, Terminal, Info, Activity, LucideIcon, Database, Fan, Trash2 } from "lucide-react";
import { InputWithLabel } from "@/components/ui/inputs/input-with-label";
import { FoundrySelect as FoundarySelectField } from "@/components/ui/inputs/foundary-form-select";
import { FoundrySelect } from "@/components/ui/inputs/foundry-select";
import { Checkbox } from "@/components/ui/checkbox";
import { AddProductSchemaType, ChassisSchema, CompatibilitySchemaType, CoolerSchema, CpuSchema, GpuSchema, MotherboardSchema, RamSchema, StorageSchema } from "@/lib/schemas/product";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import z from "zod";
import { Label } from "@/components/ui/label";

interface CompatibilityTypesUISchema {
	label: string;
	value: string;
	icon: LucideIcon;
}

const COMPATIBILITY_TYPES: CompatibilityTypesUISchema[] = [
	{ label: "Central_Processor (CPU)", value: "CPU", icon: Cpu },
	{ label: "Logic_Board (Motherboard)", value: "MOTHERBOARD", icon: Layout },
	{ label: "Graphics_Node (GPU)", value: "GPU", icon: Activity },
	{ label: "Foundry_Chassis (Chassis)", value: "CHASSIS", icon: Box },
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
			setValue("compatibility", { type: "CPU", socket: "", tdp: 0, integratedGraphics: false, maxMemorySpeed: 0, supportedMemoryType: "DDR5" });
		} else {
			setValue("compatibility", undefined);
		}
	};

	const coolerType = watch("compatibility.coolerType");

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

			<AnimatePresence mode="wait">
				{isEnabled && (
					<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 overflow-hidden">
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

									<Controller
										name="compatibility.chipsetSupport"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.chipsetSupport"
												fieldTitle="Chipset_Whitelist"
												placeholder="e.g. Z790, B760 (Comma Separated)"
												onChange={(e) => field.onChange(e.target.value.split(",").map((s) => s.trim()))}
											/>
										)}
									/>
									<Controller
										name="compatibility.maxMemorySpeed"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.maxMemorySpeed"
												fieldTitle="Max_Memory_Clock (MHz)"
												placeholder="e.g. 5600"
											/>
										)}
									/>
									<FoundarySelectField
										control={control}
										fieldTitle="IMC_Standard"
										nameInSchema="compatibility.supportedMemoryType"
										placeholder="Select_Supported_RAM"
										options={
											[
												{ label: "DDR4", value: "DDR4" },
												{ label: "DDR5", value: "DDR5" },
											] satisfies { label: string; value: z.infer<typeof CpuSchema>["supportedMemoryType"] }[]
										}
									/>

									<div className="space-y-3">
										<Label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Integrated_Graphics</Label>

										<div
											onClick={() => setValue("compatibility.integratedGraphics", !watch("compatibility.integratedGraphics") as boolean)}
											className={cn(
												"flex items-center justify-between p-4 border cursor-pointer transition-all h-12 bg-white/2",
												watch("compatibility.integratedGraphics") ? "border-[#FFB400] text-[#FFB400]" : "border-white/10 text-[#94A3B8]"
											)}
										>
											<span className="text-[10px] font-black uppercase">Integrated_Graphics</span>
											<Zap size={14} className={watch("compatibility.integratedGraphics") ? "fill-[#FFB400]" : "opacity-20"} />
										</div>
									</div>
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
									<FoundarySelectField
										control={control}
										fieldTitle="Physical_Form"
										nameInSchema="compatibility.formFactor"
										placeholder="SELECT_FORM"
										options={
											[
												{ label: "E-ATX", value: "E-ATX" },
												{ label: "ATX", value: "ATX" },
												{ label: "mATX", value: "mATX" },
												{ label: "ITX", value: "ITX" },
											] satisfies {
												label: string;
												value: z.infer<typeof MotherboardSchema>["formFactor"];
											}[]
										}
									/>
									<Controller
										name="compatibility.memorySlots"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel field={field} fieldState={fieldState} nameInSchema="compatibility.memorySlots" fieldTitle="Total_RAM_Slots" placeholder="e.g. 4" />
										)}
									/>

									<FoundarySelectField
										control={control}
										fieldTitle="Memory_Bus"
										nameInSchema="compatibility.memoryType"
										placeholder="Memory_Type"
										options={
											[
												{ label: "DDR4", value: "DDR4" },
												{ label: "DDR5", value: "DDR5" },
											] satisfies { label: string; value: z.infer<typeof MotherboardSchema>["memoryType"] }[]
										}
									/>

									<Controller
										name="compatibility.chipset"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel field={field} fieldState={fieldState} nameInSchema="compatibility.chipset" fieldTitle="Logic_Chipset" placeholder="Z790" />
										)}
									/>
									<Controller
										name="compatibility.maxMemoryCapacity"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.maxMemoryCapacity"
												fieldTitle="Max_RAM_Capacity (GB)"
												placeholder="e.g. 128"
											/>
										)}
									/>
									<FoundarySelectField
										control={control}
										fieldTitle="Primary_PCIe_Bus"
										nameInSchema="compatibility.pcieVersion"
										placeholder="PCI_Bus_Gen"
										options={
											[
												{ label: "Gen_3", value: "PCIE_3" },
												{ label: "Gen_4", value: "PCIE_4" },
												{ label: "Gen_5", value: "PCIE_5" },
											] satisfies { label: string; value: z.infer<typeof MotherboardSchema>["pcieVersion"] }[]
										}
									/>
									<Controller
										name="compatibility.pcieX16Slots"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.pcieX16Slots"
												fieldTitle="PCIe_x16_Count"
												placeholder="e.g. 1"
											/>
										)}
									/>
									<Controller
										name="compatibility.sataPorts"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel type="number" field={field} fieldState={fieldState} nameInSchema="compatibility.sataPorts" fieldTitle="SATA_Ports" placeholder="e.g. 1" />
										)}
									/>

									<div className="md:col-span-3 space-y-3">
										<Label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">CPU_Power_Connectors</Label>
										<Controller
											name="compatibility.cpuPowerConnectors"
											control={control}
											render={({ field }) => {
												type T = z.infer<typeof MotherboardSchema>["cpuPowerConnectors"];
												const options = ["4-pin", "8-pin"] satisfies T;
												const currentValues = field.value || [];

												const toggleOption = (val: T[0]) => {
													const next = currentValues.includes(val) ? currentValues.filter((v: string) => v !== val) : [...currentValues, val];
													field.onChange(next);
												};

												return (
													<div className="grid grid-cols-4 gap-2">
														{options.map((size) => (
															<button
																key={size}
																type="button"
																onClick={() => toggleOption(size)}
																className={cn(
																	"py-3 border text-[10px] font-mono transition-all text-center",
																	currentValues.includes(size)
																		? "border-[#FFB400] bg-[#FFB400]/10 text-[#FFB400] shadow-[0_0_10px_rgba(255,180,0,0.1)]"
																		: "border-white/5 bg-white/1 text-[#94A3B8] hover:border-white/20"
																)}
															>
																{size}
															</button>
														))}
													</div>
												);
											}}
										/>
									</div>

									{/* M.2 Slots */}
									<div className="md:col-span-3 space-y-6 border-t border-white/5 pt-6 mt-6">
										<div className="flex items-center justify-between">
											<h4 className="text-[10px] font-black uppercase tracking-widest text-[#FFB400]">M.2_Storage_Expansion</h4>
											<button
												type="button"
												onClick={() => {
													const current = watch("compatibility.m2Slots") || [];
													setValue("compatibility.m2Slots", [...current, { interface: "PCIE_4", size: "2280" }]);
												}}
												className="text-[9px] font-black uppercase text-[#94A3B8] hover:text-[#FFB400]"
											>
												[ + Add_Slot ]
											</button>
										</div>

										<div className="grid grid-cols-1 gap-4">
											{(watch("compatibility.m2Slots") || []).map((_, index) => (
												<div key={index} className="flex items-end gap-4 bg-white/1 p-3 border border-white/5">
													<FoundarySelectField
														containerClassName="flex-1"
														control={control}
														fieldTitle={`Slot_0${index + 1}_Bus`}
														nameInSchema={`compatibility.m2Slots.${index}.interface`}
														options={[
															{ label: "Gen_3", value: "PCIE_3" },
															{ label: "Gen_4", value: "PCIE_4" },
															{ label: "Gen_5", value: "PCIE_5" },
														]}
													/>
													<FoundarySelectField
														containerClassName="flex-1"
														control={control}
														fieldTitle="Physical_Size"
														nameInSchema={`compatibility.m2Slots.${index}.size`}
														options={[
															{ label: "2280", value: "2280" },
															{ label: "22110", value: "22110" },
														]}
													/>
													<button
														type="button"
														title="remove_slot"
														onClick={() => {
															const current = watch("compatibility.m2Slots");

															if (current)
																setValue(
																	"compatibility.m2Slots",
																	current.filter((_, i) => i !== index)
																);
														}}
														className="mb-2 text-[#94A3B8] hover:text-red-500"
													>
														<Trash2 size={14} />
													</button>
												</div>
											))}
										</div>
									</div>
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
									<Controller
										name="compatibility.slots"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel type="number" field={field} fieldState={fieldState} nameInSchema="compatibility.slots" fieldTitle="Slot_Thickness" placeholder="e.g. 3" />
										)}
									/>
									<FoundarySelectField
										control={control}
										fieldTitle="Interface_Bus"
										nameInSchema="compatibility.pcieVersion"
										placeholder="PCI_Bus_Gen"
										options={
											[
												{ label: "Gen_3", value: "PCIE_3" },
												{ label: "Gen_4", value: "PCIE_4" },
												{ label: "Gen_5", value: "PCIE_5" },
											] satisfies { label: string; value: z.infer<typeof GpuSchema>["pcieVersion"] }[]
										}
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

									<div className="md:col-span-3 space-y-3">
										<Label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">PSU_Chassis_Compatibility</Label>
										<Controller
											name="compatibility.psuFormFactor"
											control={control}
											render={({ field }) => {
												type T = z.infer<typeof ChassisSchema>["psuFormFactor"];
												const options = ["ATX", "SFX", "SFX-L"] satisfies T;
												const currentValues = field.value || [];

												const toggleOption = (val: T[0]) => {
													const next = currentValues.includes(val) ? currentValues.filter((v: string) => v !== val) : [...currentValues, val];
													field.onChange(next);
												};

												return (
													<div className="grid grid-cols-3 gap-2">
														{options.map((form) => (
															<button
																key={form}
																type="button"
																onClick={() => toggleOption(form)}
																className={cn(
																	"py-3 border text-[10px] font-mono transition-all text-center",
																	currentValues.includes(form)
																		? "border-[#FFB400] bg-[#FFB400]/10 text-[#FFB400]"
																		: "border-white/5 bg-white/1 text-[#94A3B8] hover:border-white/20"
																)}
															>
																{form}
															</button>
														))}
													</div>
												);
											}}
										/>
									</div>
								</>
							)}

							{/* CHASSIS FIELDS */}
							{compatibility.type === "CHASSIS" && (
								<>
									<FoundarySelectField
										control={control}
										fieldTitle="Max_Chassis_Form"
										nameInSchema="compatibility.formFactor"
										placeholder="SELECT_MAX"
										options={
											[
												{ label: "E-ATX", value: "E-ATX" },
												{ label: "ATX", value: "ATX" },
												{ label: "mATX", value: "mATX" },
												{ label: "ITX", value: "ITX" },
											] satisfies {
												label: string;
												value: z.infer<typeof ChassisSchema>["formFactor"];
											}[]
										}
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

									<Controller
										name="compatibility.maxCpuCoolerHeight"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.maxCpuCoolerHeight"
												fieldTitle="Max_CPU_Cooler_Height (mm)"
												placeholder="e.g. 800"
											/>
										)}
									/>

									<div className="md:col-span-3 space-y-3">
										<Label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Radiator_Mount_Points</Label>
										<Controller
											name="compatibility.radiatorSupport"
											control={control}
											render={({ field }) => {
												type T = z.infer<typeof ChassisSchema>["radiatorSupport"];
												const options = ["120", "240", "280", "360"] satisfies T;
												const currentValues = field.value || [];

												const toggleOption = (val: T[0]) => {
													const next = currentValues.includes(val) ? currentValues.filter((v: string) => v !== val) : [...currentValues, val];
													field.onChange(next);
												};

												return (
													<div className="grid grid-cols-4 gap-2">
														{options.map((size) => (
															<button
																key={size}
																type="button"
																onClick={() => toggleOption(size)}
																className={cn(
																	"py-3 border text-[10px] font-mono transition-all text-center",
																	currentValues.includes(size)
																		? "border-[#FFB400] bg-[#FFB400]/10 text-[#FFB400] shadow-[0_0_10px_rgba(255,180,0,0.1)]"
																		: "border-white/5 bg-white/1 text-[#94A3B8] hover:border-white/20"
																)}
															>
																{size}mm
															</button>
														))}
													</div>
												);
											}}
										/>
									</div>

									<Controller
										name="compatibility.maxRadiatorSupport"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.maxRadiatorSupport"
												fieldTitle="Max_Radiator_Support (mm)"
												placeholder="e.g. 360"
											/>
										)}
									/>

									<Controller
										name="compatibility.maxGpuSlots"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.maxGpuSlots"
												fieldTitle="Max_Slot_Thickness"
												placeholder="4"
											/>
										)}
									/>
								</>
							)}

							{/* RAM FIELDS */}
							{compatibility.type === "RAM" && (
								<>
									<FoundarySelectField
										control={control}
										fieldTitle="IMC_Standard"
										nameInSchema="compatibility.memoryType"
										placeholder="Select_Memory_Type"
										options={
											[
												{ label: "DDR4", value: "DDR4" },
												{ label: "DDR5", value: "DDR5" },
											] satisfies { label: string; value: z.infer<typeof RamSchema>["memoryType"] }[]
										}
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
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												nameInSchema="compatibility.modules"
												fieldTitle="Memory_Modules (1 or 2)"
												placeholder="2"
											/>
										)}
									/>

									<Controller
										name="compatibility.speed"
										control={control}
										render={({ field, fieldState }) => (
											<InputWithLabel type="number" field={field} fieldState={fieldState} nameInSchema="compatibility.speed" fieldTitle="Module_Clock (MHz)" placeholder="6000" />
										)}
									/>

									<div className="space-y-3">
										<Label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">XMP_Support</Label>

										<div
											onClick={() => setValue("compatibility.xmpExpo", !watch("compatibility.xmpExpo") as boolean)}
											className={cn(
												"flex items-center justify-between p-4 border cursor-pointer transition-all h-12 bg-white/2",
												watch("compatibility.xmpExpo") ? "border-[#FFB400] text-[#FFB400]" : "border-white/10 text-[#94A3B8]"
											)}
										>
											<span className="text-[10px] font-black uppercase">XMP_EXPO_PROFILE</span>
											<Zap size={14} className={watch("compatibility.xmpExpo") ? "fill-[#FFB400]" : "opacity-20"} />
										</div>
									</div>
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
										options={
											[
												{ label: "NVMe_SSD", value: "NVME" },
												{ label: "SATA_SSD", value: "SSD" },
												{ label: "Mechanical_HDD", value: "HDD" },
											] satisfies {
												label: string;
												value: z.infer<typeof StorageSchema>["storageType"];
											}[]
										}
									/>
									<FoundarySelectField
										control={control}
										fieldTitle="Physical_Interface"
										placeholder="Select_Form"
										nameInSchema="compatibility.formFactor"
										options={
											[
												{ label: "M.2_Slot", value: "M.2" },
												{ label: "2.5_Inch", value: "2.5" },
												{ label: "3.5_Inch", value: "3.5" },
											] satisfies {
												label: string;
												value: z.infer<typeof StorageSchema>["formFactor"];
											}[]
										}
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
										options={
											[
												{ label: "Air_Cooled", value: "AIR" },
												{ label: "Liquid_AIO", value: "LIQUID" },
											] satisfies {
												label: string;
												value: z.infer<typeof CoolerSchema>["coolerType"];
											}[]
										}
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
									{coolerType === "LIQUID" && (
										<FoundarySelectField
											control={control}
											fieldTitle="Cooler_Size"
											nameInSchema="compatibility.radiatorSize"
											placeholder="Select_Cooler_Size"
											options={
												[
													{ label: "120", value: "120" },
													{ label: "240", value: "240" },
													{ label: "280", value: "280" },
													{ label: "360", value: "360" },
												] satisfies {
													label: string;
													value: z.infer<typeof CoolerSchema>["radiatorSize"];
												}[]
											}
										/>
									)}
								</>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
