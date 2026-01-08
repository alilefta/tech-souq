"use client";

import { useForm, useFieldArray, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Activity, Terminal, ShieldCheck, RefreshCw, Save, Zap } from "lucide-react";
import { InputWithLabel } from "@/components/ui/inputs/input-with-label";
import { ComboboxWithLabel } from "@/components/ui/inputs/combobox-with-label";
import { TextareaWithLabel } from "@/components/ui/inputs/textarea-with-label"; // Custom styled textarea
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CategoryFlatDTO } from "@/app/data/category";
import { ImageIngestTerminal } from "./image-ingest-terminal";
import { addProduct, updateProduct } from "@/app/actions/product";
import { useAction } from "next-safe-action/hooks";
import { InferSafeActionFnResult } from "next-safe-action";
import { addProductSchema, editProductSchema } from "@/lib/schemas/product";
import { useRouter } from "next/navigation";
import { CompatibilityLogicModule } from "./compatibility-logic-module";

type DeploymentData = z.infer<typeof addProductSchema>;
type EditDeploymentData = z.infer<typeof editProductSchema>;
type AddProductActionResults = InferSafeActionFnResult<typeof addProduct>;
type EditProductActionResults = InferSafeActionFnResult<typeof addProduct>;

export function ModuleDeploymentForm({ rawCategories, initialData, isEdit }: { rawCategories: CategoryFlatDTO[]; initialData?: EditDeploymentData; isEdit: boolean }) {
	const methods = useForm<DeploymentData | EditDeploymentData>({
		resolver: zodResolver(addProductSchema),
		defaultValues: isEdit
			? initialData
			: {
					name: "",
					brand: "BASE_60",
					sku: "BBL-",
					categoryId: "",
					price: 0,
					stock: 0,
					description: "",
					images: [],
					specs: [{ label: "Processor", value: "" }],
					originalPrice: 0,
					isActive: true,
					isNew: true,
					isFeatured: false,
					compatibility: null,
			  },
		mode: "onChange",
	});

	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = methods;

	const {
		fields: specFields,
		append: appendSpec,
		remove: removeSpec,
	} = useFieldArray({
		control,
		name: "specs",
	});

	const router = useRouter();

	const { executeAsync: executeAdd, isExecuting: isCreating } = useAction(addProduct, {
		onSuccess: ({ data }) => {
			if (data?.success) {
				toast.success("DEPLOYMENT_SUCCESSFUL", {
					description: `NEW_MODULE_SYNCED // ID: ${data.id}`,
					icon: <ShieldCheck className="text-[#FFB400]" size={16} />,
				});
				handleRedirect();
			}
		},
		onError: ({ error }) => handleActionError(error),
	});

	const { executeAsync: executeUpdate, isExecuting: isUpdating } = useAction(updateProduct, {
		onSuccess: ({ data }) => {
			if (data?.success) {
				toast.success("RECONFIGURATION_COMPLETE", {
					description: `MODULE_LOGS_UPDATED // ID: ${data.id}`,
					icon: <RefreshCw className="text-[#FFB400]" size={16} />,
				});
				handleRedirect();
			}
		},
		onError: ({ error }) => handleActionError(error),
	});

	const handleActionError = (error: {
		serverError?: AddProductActionResults["serverError"] | EditProductActionResults["serverError"];
		validationErrors?: AddProductActionResults["validationErrors"] | EditProductActionResults["validationErrors"];
	}) => {
		if (error.validationErrors) {
			toast.error("PROTOCOL_REJECTED", {
				description: "INPUT_INTEGRITY_FAILURE // CHECK_REQUIRED_FIELDS",
				icon: <Activity className="text-red-500" size={16} />,
			});

			console.log(error.validationErrors);
		}
		if (error.serverError) {
			toast.error("SYSTEM_HALT", {
				description: error.serverError.toUpperCase(),
				icon: <Terminal className="text-red-500" size={16} />,
			});
		}
	};

	const handleRedirect = () => {
		setTimeout(() => {
			router.push("/admin/products");
			router.refresh();
		}, 1500);
	};

	const onSubmit = async (data: DeploymentData | EditDeploymentData) => {
		// Check if images are still uploading (blobs present)
		const hasUnsyncedAssets = data.images.some((img) => img.url.startsWith("blob:"));

		if (hasUnsyncedAssets) {
			toast.error("ASYNC_CONFLICT", {
				description: "VISUAL_ASSETS_STILL_SYNCING // WAIT_FOR_CLOUD_HANDSHAKE",
			});
			return;
		}
		if (isEdit) {
			const d: EditDeploymentData = { ...data, id: initialData!.id };
			await executeUpdate(d);
		} else {
			await executeAdd(data as DeploymentData);
		}
	};

	const isProcessing = isCreating || isUpdating;

	return (
		<FormProvider {...methods}>
			<form id="deployment-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				{/* LEFT: THE DATA STACK */}
				<div className="lg:col-span-8 space-y-16">
					{/* 01. CORE IDENTITY */}
					<section className="space-y-8">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<span className="text-[#FFB400] font-mono text-xs">01</span>
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">Core_Identity</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Controller
								name="name"
								control={control}
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} nameInSchema="name" fieldTitle="Module_Name" placeholder="e.g. RTX 5090 FOUNDERS" />
								)}
							/>
							<Controller
								name="sku"
								control={control}
								render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} nameInSchema="sku" fieldTitle="Hardware_SKU" placeholder="BBL-XXX-000" />}
							/>
							<Controller
								name="categoryId"
								control={control}
								render={({ field, fieldState }) => (
									<ComboboxWithLabel
										field={field}
										fieldState={fieldState}
										nameInSchema="categoryId"
										fieldTitle="Sector_Allocation"
										data={rawCategories.map((c) => ({ label: c.name, value: String(c.id) }))}
									/>
								)}
							/>
							<Controller
								name="brand"
								control={control}
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} nameInSchema="brand" fieldTitle="Manufacturer" placeholder="NVIDIA / AMD / INTEL" />
								)}
							/>
						</div>
					</section>

					{/* 02. NARRATIVE & VALUE */}
					<section className="space-y-8">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<span className="text-[#FFB400] font-mono text-xs">02</span>
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">Narrative_Logic</h3>
						</div>
						<Controller
							name="description"
							control={control}
							render={({ field, fieldState }) => (
								<TextareaWithLabel field={field} fieldState={fieldState} nameInSchema="description" fieldTitle="Module_Description" placeholder="TECHNICAL_LOG_ENTRY..." />
							)}
						/>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Controller
								name="price"
								control={control}
								render={({ field, fieldState }) => (
									<InputWithLabel
										type="number"
										field={field}
										fieldState={fieldState}
										onChange={(e) => {
											const v = e.currentTarget.value;
											field.onChange(Number(v));
										}}
										nameInSchema="price"
										fieldTitle="Final_Price (USD)"
									/>
								)}
							/>
							<Controller
								name="originalPrice"
								control={control}
								render={({ field, fieldState }) => (
									<InputWithLabel
										type="number"
										field={field}
										fieldState={fieldState}
										nameInSchema="originalPrice"
										fieldTitle="Original_Price (USD)"
										onChange={(e) => {
											const v = e.currentTarget.value;
											field.onChange(Number(v));
										}}
									/>
								)}
							/>
							<Controller
								name="stock"
								control={control}
								render={({ field, fieldState }) => (
									<InputWithLabel
										type="number"
										field={field}
										fieldState={fieldState}
										nameInSchema="stock"
										onChange={(e) => {
											const v = e.currentTarget.value;
											field.onChange(Number(v));
										}}
										fieldTitle="Initial_Allocation_Stock"
									/>
								)}
							/>
						</div>
					</section>

					{/* 03. TECHNICAL PARAMETERS */}
					<section className="space-y-8 pb-10">
						<div className="flex items-center justify-between border-l-2 border-[#FFB400] pl-4">
							<div className="flex items-center gap-4">
								<span className="text-[#FFB400] font-mono text-xs">03</span>
								<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">Technical_Parameters</h3>
							</div>
							<button
								type="button"
								onClick={() => appendSpec({ label: "", value: "" })}
								className="flex items-center gap-2 text-[9px] font-black text-[#FFB400] uppercase tracking-widest border border-[#FFB400]/20 px-4 py-2 hover:bg-[#FFB400]/10 transition-all"
							>
								<Plus size={12} /> Add_Param
							</button>
						</div>

						<div className="grid grid-cols-1 gap-px bg-white/5 border border-white/5">
							<AnimatePresence initial={false}>
								{specFields.map((item, index) => (
									<motion.div
										key={item.id}
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-[#0A0E14] p-4 group"
									>
										<div className="md:col-span-5">
											<Controller
												name={`specs.${index}.label`}
												control={control}
												render={({ field, fieldState }) => (
													<InputWithLabel field={field} fieldState={fieldState} nameInSchema={`specs.${index}.label`} fieldTitle="Label" placeholder="e.g. Clock Speed" />
												)}
											/>
										</div>
										<div className="md:col-span-6">
											<Controller
												name={`specs.${index}.value`}
												control={control}
												render={({ field, fieldState }) => (
													<InputWithLabel field={field} fieldState={fieldState} nameInSchema={`specs.${index}.value`} fieldTitle="Value" placeholder="e.g. 5.2GHz" />
												)}
											/>
										</div>
										<button
											type="button"
											title="Remove spec element"
											onClick={() => removeSpec(index)}
											className="md:col-span-1 h-12 flex items-center justify-center text-[#94A3B8]/20 hover:text-red-500 transition-colors"
										>
											<Trash2 size={18} />
										</button>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					</section>

					{/* 04. VISUAL INGEST PORT (Image Placeholder) */}
					<section className="space-y-8">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<span className="text-[#FFB400] font-mono text-xs">04</span>
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">Visual_Deployment</h3>
						</div>

						<ImageIngestTerminal control={control} />
					</section>

					{/* 05. OPERATIONAL LOGIC (Flags) */}
					<section className="space-y-8">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<span className="text-[#FFB400] font-mono text-xs">05</span>
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">Operational_Logic</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{/* ACTIVE STATUS */}
							<Controller
								name="isActive"
								control={control}
								render={({ field }) => (
									<div
										onClick={() => field.onChange(!field.value)}
										className={cn(
											"flex items-center justify-between p-4 border cursor-pointer transition-all",
											field.value ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/5 bg-white/1 opacity-40"
										)}
									>
										<div className="flex flex-col gap-1">
											<span className="text-[10px] font-black uppercase text-[#F5F5F0]">Registry_Visibility</span>
											<span className="text-[8px] font-mono text-[#94A3B8] uppercase">Status: {field.value ? "Active" : "De-Synced"}</span>
										</div>
										<div className={cn("w-2 h-2 rounded-full", field.value ? "bg-[#FFB400] animate-pulse" : "bg-[#94A3B8]")} />
									</div>
								)}
							/>

							{/* FEATURED STATUS */}
							<Controller
								name="isFeatured"
								control={control}
								render={({ field }) => (
									<div
										onClick={() => field.onChange(!field.value)}
										className={cn(
											"flex items-center justify-between p-4 border cursor-pointer transition-all",
											field.value ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/5 bg-white/1 opacity-40"
										)}
									>
										<div className="flex flex-col gap-1">
											<span className="text-[10px] font-black uppercase text-[#F5F5F0]">Promote_To_Vanguard</span>
											<span className="text-[8px] font-mono text-[#94A3B8] uppercase">Show_on_Homepage</span>
										</div>
										<Zap size={14} className={field.value ? "text-[#FFB400]" : "text-[#94A3B8]"} />
									</div>
								)}
							/>

							{/* NEW GENERATION STATUS */}
							<Controller
								name="isNew"
								control={control}
								render={({ field }) => (
									<div
										onClick={() => field.onChange(!field.value)}
										className={cn(
											"flex items-center justify-between p-4 border cursor-pointer transition-all",
											field.value ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/5 bg-white/1 opacity-40"
										)}
									>
										<div className="flex flex-col gap-1">
											<span className="text-[10px] font-black uppercase text-[#F5F5F0]">New_Generation_Tag</span>
											<span className="text-[8px] font-mono text-[#94A3B8] uppercase">Legacy_Status: New</span>
										</div>
										<div className={cn("px-1.5 py-0.5 border text-[7px] font-bold", field.value ? "border-[#FFB400] text-[#FFB400]" : "border-[#94A3B8] text-[#94A3B8]")}>NEW</div>
									</div>
								)}
							/>
						</div>
					</section>

					{/* NEW: PC BUILDER LOGIC */}
					<CompatibilityLogicModule />
				</div>

				{/* RIGHT: THE STATUS MONITOR */}
				<aside className="lg:col-span-4">
					<div className="sticky top-32 space-y-8">
						<div className="bg-[#1E293B]/20 border border-white/10 p-6 space-y-6">
							<div className="flex items-center justify-between border-b border-white/5 pb-4">
								<h3 className="text-[10px] font-black uppercase text-[#F5F5F0] tracking-widest flex items-center gap-2">
									<Activity size={14} className="text-[#FFB400]" />
									{isEdit ? "Reconfig_Status" : "System_Check"}
								</h3>
								<div className={cn("w-2 h-2 rounded-full", isValid ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-red-500 animate-pulse")} />
							</div>

							<div className="space-y-3 font-mono text-[9px] uppercase">
								<div className="flex justify-between">
									<span className="text-[#94A3B8]">Integrity:</span>
									<span className={isValid ? "text-green-500" : "text-red-500"}>{isValid ? "READY" : "INVALID"}</span>
								</div>
								<div className="flex justify-between text-[#94A3B8]">
									<span>Protocol:</span>
									<span>{isEdit ? "BBL_UPDATE_v2" : "BBL_INIT_v60.0"}</span>
								</div>
							</div>

							<button
								type="submit"
								disabled={!isValid || isProcessing}
								className="group relative w-full py-5 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all disabled:opacity-20 disabled:grayscale overflow-hidden"
							>
								<span className="relative z-10 flex items-center justify-center gap-3">
									{isProcessing ? "SYNCHRONIZING..." : isEdit ? "Authorize_Reconfig" : "Initialize_Deployment"}
									{isProcessing ? <Activity size={16} className="animate-spin" /> : <Save size={16} />}
								</span>

								{/* Kinetic Beam */}
								{!isProcessing && (
									<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
										<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
									</div>
								)}
							</button>
						</div>
					</div>
				</aside>
			</form>
		</FormProvider>
	);
}
