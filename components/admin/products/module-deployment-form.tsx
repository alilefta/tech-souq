"use client";

import { useForm, useFieldArray, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Activity, Terminal, ShieldCheck } from "lucide-react";
import { InputWithLabel } from "@/components/ui/inputs/InputWithLabel";
import { ComboboxWithLabel } from "@/components/ui/inputs/ComboboxWithLabel";
import { TextareaWithLabel } from "@/components/ui/inputs/TextareaWithLabel"; // Custom styled textarea
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CategoryFilterDTO } from "@/app/data/category";
import { ImageIngestTerminal } from "./image-ingest-terminal";
import { addProduct } from "@/app/actions/product";
import { useAction } from "next-safe-action/hooks";
import { addProductSchema } from "@/lib/schemas/product";

type DeploymentData = z.infer<typeof addProductSchema>;

export function ModuleDeploymentForm({ rawCategories }: { rawCategories: CategoryFilterDTO[] }) {
	const methods = useForm<DeploymentData>({
		resolver: zodResolver(addProductSchema),
		defaultValues: {
			name: "",
			brand: "BASE_60",
			sku: "BBL-",
			categoryId: "",
			price: 0,
			stock: 0,
			description: "",
			images: [{ url: "" }],
			specs: [{ label: "Processor", value: "" }],
			originalPrice: 0,
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

	const { executeAsync: executeAddProduct, isExecuting } = useAction(addProduct, {
		onSuccess: ({ data }) => {
			if (data?.success) {
				toast.success("DEPLOYMENT_SUCCESSFUL", {
					description: `MODULE_SYNC_COMPLETE // ID: ${data.id}`,
					icon: <ShieldCheck className="text-[#FFB400]" size={16} />,
				});
				// Optional: redirect to the new product page or clear form
			}
		},
		onError: ({ error }) => {
			// 1. VALIDATION ERRORS (Zod)
			if (error.validationErrors) {
				toast.error("PROTOCOL_REJECTED", {
					description: "INPUT_INTEGRITY_FAILURE // CHECK_REQUIRED_FIELDS",
					icon: <Activity className="text-red-500" size={16} />,
				});
			}

			// 2. SERVER ERRORS (Prisma/Logic)
			if (error.serverError) {
				toast.error("SYSTEM_HALT: SERVER_ERROR", {
					description: error.serverError.toUpperCase(),
					icon: <Terminal className="text-red-500" size={16} />,
				});
			}
		},
	});

	const onSubmit = async (data: DeploymentData) => {
		// Check if images are still uploading (blobs present)
		const hasUnsyncedAssets = data.images.some((img) => img.url.startsWith("blob:"));

		if (hasUnsyncedAssets) {
			toast.error("ASYNC_CONFLICT", {
				description: "VISUAL_ASSETS_STILL_SYNCING // WAIT_FOR_CLOUD_HANDSHAKE",
			});
			return;
		}

		await executeAddProduct(data);
	};

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
				</div>

				{/* RIGHT: THE STATUS MONITOR */}
				<aside className="lg:col-span-4">
					<div className="sticky top-32 space-y-8">
						{/* VALIDATION HUD */}
						<div className="bg-[#1E293B]/20 border border-white/10 p-6 space-y-6">
							<div className="flex items-center justify-between border-b border-white/5 pb-4">
								<h3 className="text-[10px] font-black uppercase text-[#F5F5F0] tracking-widest flex items-center gap-2">
									<Activity size={14} className="text-[#FFB400]" /> System_Check
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
									<span>BBL_v60.0</span>
								</div>
							</div>

							<button
								type="submit"
								disabled={!isValid || isExecuting}
								className="w-full py-5 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all disabled:opacity-20 disabled:grayscale"
							>
								{isExecuting ? "Initializing..." : "Initialize_Deployment"}
							</button>
						</div>
					</div>
				</aside>
			</form>
		</FormProvider>
	);
}
