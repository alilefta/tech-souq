"use client";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sectorSchema, SectorData } from "@/lib/schemas/category";
import { InputWithLabel } from "@/components/ui/inputs/InputWithLabel";
import { TextareaWithLabel } from "@/components/ui/inputs/TextareaWithLabel";
import { Activity, AlertTriangle, Loader2, RefreshCw, Save } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SingleImageIngest } from "../ui/single-image-ingest";
import { useAction } from "next-safe-action/hooks";
import { createSector, updateSector } from "@/app/actions/category";
import { InferSafeActionFnResult } from "next-safe-action";

type AddSectorActionResults = InferSafeActionFnResult<typeof createSector>;
type EditSectorActionResults = InferSafeActionFnResult<typeof updateSector>;

export function SectorInitializationForm({ isEdit, initialData, sectorId }: { isEdit: boolean; initialData?: SectorData; sectorId?: number }) {
	const router = useRouter();
	const methods = useForm<SectorData>({
		resolver: zodResolver(sectorSchema),
		defaultValues: isEdit
			? initialData
			: {
					name: "",
					arabicName: "",
					slug: "",
					description: "",
					gridDisplay: "small",
					imageUrl: "",
			  },
		mode: "onChange",
	});

	const {
		control,
		handleSubmit,
		formState: { isValid, errors },
	} = methods;

	// --- ACTION: INITIALIZE (Create) ---
	const { executeAsync: executeCreate, isExecuting: isCreating } = useAction(createSector, {
		onSuccess: () => {
			toast.success("SECTOR_INITIALIZED", { description: "NEW_COORDINATES_AUTHORIZED" });
			handleNavigation();
		},
		onError: ({ error }) => handleFailure(error),
	});

	// --- ACTION: RECONFIGURE (Update) ---
	const { executeAsync: executeUpdate, isExecuting: isUpdating } = useAction(updateSector, {
		onSuccess: () => {
			toast.success("RECONFIGURATION_COMPLETE", { description: "SECTOR_LOGS_SYNCHRONIZED" });
			handleNavigation();
		},
		onError: ({ error }) => handleFailure(error),
	});

	const handleNavigation = () => {
		setTimeout(() => {
			router.push("/admin/categories");
			router.refresh();
		}, 1500);
	};

	const onSubmit = async (data: SectorData) => {
		if (isEdit && sectorId) {
			await executeUpdate({ ...data, id: sectorId });
		} else {
			await executeCreate(data);
		}
	};

	const handleFailure = (error: {
		serverError?: AddSectorActionResults["serverError"] | EditSectorActionResults["serverError"];
		validationErrors?: AddSectorActionResults["validationErrors"] | EditSectorActionResults["validationErrors"];
	}) => {
		toast.error("PROTOCOL_ERROR", {
			description: error.serverError?.toUpperCase() || "DATABASE_SYNC_FAILURE",
			icon: <AlertTriangle className="text-red-500" size={16} />,
		});
	};

	const isProcessing = isCreating || isUpdating;
	const hasErrors = Object.keys(errors).length > 0;

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 space-y-16">
					{/* 01. COORDINATES & CULTURE */}
					<section className="space-y-8">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<span className="text-[#FFB400] font-mono text-xs">01</span>
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">Coordinate_Logic</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Controller
								name="name"
								control={control}
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} nameInSchema="name" fieldTitle="Sector_Identity" placeholder="e.g. GRAPHICS_PROCESSING" />
								)}
							/>
							<Controller
								name="arabicName"
								control={control}
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} nameInSchema="arabicName" fieldTitle="Cultural_Watermark (Arabic)" placeholder="البطاقات_الرسومية" />
								)}
							/>
							<Controller
								name="slug"
								control={control}
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} nameInSchema="slug" fieldTitle="Registry_Slug" placeholder="graphics-processing" />
								)}
							/>
							<div className="space-y-2">
								<label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Bento_Grid_Allocation</label>
								<Controller
									name="gridDisplay"
									control={control}
									render={({ field }) => (
										<select
											{...field}
											className="w-full h-12 bg-white/2 border border-white/10 rounded-none px-4 text-xs font-mono uppercase text-[#F5F5F0] outline-none focus:border-[#FFB400]/40 transition-all cursor-pointer appearance-none"
										>
											<option value="small">Small_Module [1x1]</option>
											<option value="medium">Medium_Module [2x1]</option>
											<option value="large">Large_Module [2x2]</option>
											<option value="tall">Tall_Module [1x2]</option>
										</select>
									)}
								/>
							</div>
						</div>
					</section>

					{/* 02. NARRATIVE & VISUALS */}
					<section className="space-y-8">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<span className="text-[#FFB400] font-mono text-xs">02</span>
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">Topographical_Data</h3>
						</div>

						{/* NEW COMPONENT */}
						<SingleImageIngest control={control} nameInSchema="imageUrl" label="Sector_Topography_Asset" />

						<Controller
							name="description"
							control={control}
							render={({ field, fieldState }) => (
								<TextareaWithLabel field={field} fieldState={fieldState} nameInSchema="description" fieldTitle="Sector_Narrative_Log" placeholder="DESCRIBE_SECTOR_UTILITY..." />
							)}
						/>
					</section>
				</div>

				{/* RIGHT: STATUS MONITOR */}
				<aside className="lg:col-span-4">
					<div className="sticky top-32 space-y-8">
						<div className="bg-[#1E293B]/20 border border-white/10 p-6 space-y-6 relative overflow-hidden">
							<div className="flex items-center justify-between border-b border-white/5 pb-4">
								<h3 className="text-[10px] font-black uppercase text-[#F5F5F0] tracking-widest flex items-center gap-2">
									<Activity size={14} className={isProcessing ? "animate-spin text-[#FFB400]" : "text-[#FFB400]"} />
									{isEdit ? "Reconfig_Status" : "Init_Status"}
								</h3>
								<div
									className={cn("w-2 h-2 rounded-full", isProcessing ? "bg-blue-500 animate-pulse" : isValid ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-red-500 animate-pulse")}
								/>
							</div>

							<div className="space-y-3 font-mono text-[9px] uppercase">
								<div className="flex justify-between">
									<span className="text-[#94A3B8]">Integrity_Check:</span>
									<span className={cn(isValid ? "text-green-500" : "text-red-500")}>{isProcessing ? "SYNCING..." : isValid ? "STABLE" : "UNSTABLE"}</span>
								</div>
								<div className="flex justify-between text-[#94A3B8]">
									<span>Foundry_Node:</span>
									<span>BBL_HUB_02</span>
								</div>
							</div>

							<button
								type="submit"
								disabled={!isValid || isProcessing}
								className="group relative w-full py-5 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] overflow-hidden shadow-2xl hover:bg-white transition-all disabled:opacity-20 disabled:grayscale"
							>
								<span className="relative z-10 flex items-center justify-center gap-3">
									{isProcessing ? "SYNCHRONIZING..." : isEdit ? "Authorize_Reconfig" : "Initialize_Sector"}
									{isProcessing ? <Loader2 className="animate-spin" size={16} /> : isEdit ? <RefreshCw size={16} /> : <Save size={16} />}
								</span>

								{/* Kinetic Beam */}
								{!isProcessing && (
									<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
										<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
									</div>
								)}
							</button>

							{/* ERROR FEEDBACK HUD */}
							{hasErrors && (
								<div className="mt-4 p-3 border border-red-500/20 bg-red-500/5 flex items-start gap-3">
									<AlertTriangle size={12} className="text-red-500 shrink-0 mt-0.5" />
									<p className="text-[7px] font-mono text-red-400 uppercase leading-relaxed">Protocol_Alert: Registry coordinates invalid. Check all mandatory data strings.</p>
								</div>
							)}
						</div>
					</div>
				</aside>
			</form>
		</FormProvider>
	);
}
