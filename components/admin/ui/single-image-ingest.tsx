"use client";

import { useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Control, Controller, useFormContext, FieldPath, FieldValues, PathValue } from "react-hook-form";
import { Plus, Trash2, Link as LinkIcon, Activity, Loader2, Image as ImageIcon } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthing";

// Define the generic props to be reusable across any schema (Sector, Product, etc.)
interface SingleImageIngestProps<S extends FieldValues> {
	control: Control<S>;
	nameInSchema: FieldPath<S>;
	label?: string;
}

export function SingleImageIngest<S extends FieldValues>({ control, nameInSchema, label = "Sector_Visual_Ingest" }: SingleImageIngestProps<S>) {
	// 1. Properly typed form context
	const { setValue, watch } = useFormContext<S>();

	// Ensure we treat the value as a string for preview logic
	const currentValue = watch(nameInSchema) as string | undefined;
	const isBlob = currentValue?.startsWith("blob:");

	// 2. UPLOADTHING LOGIC
	const { isUploading, startUpload } = useUploadThing("categoryAsset", {
		onClientUploadComplete: (res) => {
			toast.success("FOUNDRY_SYNC_COMPLETE", {
				description: `SYNCHRONIZED VISUAL_MODULE TO BABYLON_CLOUD`,
				icon: <Activity className="text-green-500" size={16} />,
			});

			if (res?.[0]) {
				// Use PathValue to map the URL string to the schema path safely
				setValue(nameInSchema, res[0].ufsUrl as PathValue<S, FieldPath<S>>, { shouldValidate: true });
			}
		},
		onUploadError: (error) => {
			toast.error("UPLOADER_TERMINATED", {
				description: `SYNC_ERROR: ${error.message.toUpperCase()}`,
			});
			setValue(nameInSchema, "" as PathValue<S, FieldPath<S>>);
		},
	});

	// 3. INGEST LOGIC
	const onDrop = useCallback(
		async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (acceptedFiles?.length) {
				const file = acceptedFiles[0];
				const previewUrl = URL.createObjectURL(file);

				// Optimistic Update: Set the local blob URL
				setValue(nameInSchema, previewUrl as PathValue<S, FieldPath<S>>);

				toast.info("INGESTION_STARTED", {
					description: `INITIALIZING_TRANSFER_FOR_SECTOR_ASSET`,
				});

				await startUpload([file]);
			}

			if (fileRejections?.length) {
				toast.error("PROTOCOL_CONFLICT", {
					description: "INVALID_FILE_TYPE_OR_SIZE // REJECTED",
				});
			}
		},
		[setValue, nameInSchema, startUpload]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/*": [] },
		maxSize: 4 * 1024 * 1000,
		multiple: false,
	});

	const removeAsset = (e: React.MouseEvent) => {
		e.stopPropagation();
		setValue(nameInSchema, "" as PathValue<S, FieldPath<S>>, { shouldValidate: true });
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between border-b border-white/5 pb-4">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-[#FFB400]/10 flex items-center justify-center text-[#FFB400]">
						{isUploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
					</div>
					<div>
						<h3 className="text-[#F5F5F0] text-xs font-black uppercase tracking-widest">{label}</h3>
						<p className="text-[7px] font-mono text-[#94A3B8] uppercase opacity-40">{isUploading ? "SYNCING_WITH_BABYLON_CLOUD..." : "Registry_Awaiting_Data"}</p>
					</div>
				</div>
			</div>

			<div
				{...getRootProps()}
				className={cn(
					"relative aspect-video border-2 border-dashed transition-all duration-500 overflow-hidden cursor-pointer flex items-center justify-center bg-white/[0.01]",
					isDragActive ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/5",
					currentValue && "border-solid border-white/10"
				)}
			>
				<input {...getInputProps()} />

				<AnimatePresence mode="wait">
					{currentValue ? (
						<motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 group/preview">
							<div className="absolute top-4 left-4 z-20 flex gap-2">
								<span className="px-2 py-0.5 bg-black/60 text-[7px] font-mono text-[#94A3B8] border border-white/10 uppercase">Sector_Preview_Node</span>
								{isBlob && <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[7px] font-black uppercase animate-pulse">Syncing_Protocol...</span>}
							</div>

							<SafeImage
								src={currentValue}
								alt="Sector Visual"
								fill
								className={cn("object-cover transition-all duration-1000 p-0", isBlob ? "grayscale blur-[4px] opacity-40" : "grayscale-0")}
							/>

							<div className="absolute inset-0 bg-[#0A0E14]/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm z-30">
								<button
									type="button"
									onClick={removeAsset}
									className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
								>
									<Trash2 size={12} /> Eject_Module
								</button>
							</div>
						</motion.div>
					) : (
						<motion.div key="placeholder" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 text-center p-8">
							<div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-[#94A3B8] group-hover:text-[#FFB400]">
								<Plus size={24} />
							</div>
							<div>
								<p className="text-[10px] font-black uppercase text-[#F5F5F0] tracking-[0.3em]">Drop_Sector_Map</p>
								<p className="text-[7px] font-mono text-[#94A3B8] opacity-40 mt-1 uppercase">Max_Payload: 4MB</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* MANUAL OVERRIDE (For diagnostic visibility) */}
			<div className="relative group">
				<div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] opacity-20 group-focus-within:opacity-100 transition-opacity">
					<LinkIcon size={12} />
				</div>
				<Controller
					control={control}
					name={nameInSchema}
					render={({ field }) => (
						<Input
							{...field}
							value={field.value || ""} // Ensure controlled input
							readOnly
							className="h-10 bg-white/[0.01] border-white/10 rounded-none pl-9 text-[8px] font-mono text-[#94A3B8] focus-visible:border-[#FFB400]/40"
							placeholder="SOURCE_DATA_HASH..."
						/>
					)}
				/>
			</div>
		</div>
	);
}
