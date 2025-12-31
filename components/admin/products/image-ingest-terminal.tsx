"use client";

import { useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Control, useFieldArray, Controller, useFormContext, FieldValues, FieldPath } from "react-hook-form";
import { Plus, Trash2, Image as ImageIcon, Link as LinkIcon, Activity, Loader2 } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthing";

interface ImageIngestProps {
	control: Control<any>;
}

export function ImageIngestTerminal({ control }: ImageIngestProps) {
	const { setValue, getValues } = useFormContext<S>(); // To update the final URLs
	const { fields, append, remove, update } = useFieldArray({ control, name: "images" });

	// 1. UPLOADTHING LOGIC
	const { isUploading, startUpload } = useUploadThing("productAsset", {
		onClientUploadComplete: (res) => {
			toast.success("FOUNDRY_SYNC_COMPLETE", {
				description: `SYNCHRONIZED ${res.length} ASSETS TO BABYLON_CLOUD`,
				icon: <Activity className="text-green-500" size={16} />,
			});

			// REPLACE BLOBs WITH REAL URLs
			// We find the blob URLs in the current form state and swap them
			const currentImages = getValues("images") as string[];
			const updatedImages = [...currentImages];

			res.forEach((file) => {
				// Find the first occurrence of a blob or empty slot to replace
				// Or more simply: replace the ones that were just added
				const index = updatedImages.findIndex((img) => img.startsWith("blob:") || img === "");
				if (index !== -1) updatedImages[index] = file.url;
			});

			setValue("images", updatedImages);
		},
		onUploadError: (error) => {
			toast.error("UPLOADER_TERMINATED", {
				description: `SYNC_ERROR: ${error.message.toUpperCase()}`,
			});
		},
	});

	// 2. INGEST LOGIC
	const onDrop = useCallback(
		async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (acceptedFiles?.length) {
				// A. Create local previews (Optimistic UI)
				const previews = acceptedFiles.map((file) => URL.createObjectURL(file));

				// B. Add to Form State immediately
				previews.forEach((url) => append(url));

				toast.info("INGESTION_STARTED", {
					description: `INITIALIZING_TRANSFER_FOR_${acceptedFiles.length}_UNITS`,
				});

				// C. Trigger Real Upload (The Handshake)
				await startUpload(acceptedFiles);
			}

			if (fileRejections?.length) {
				toast.error("PROTOCOL_CONFLICT", {
					description: "INVALID_FILE_TYPE_OR_SIZE // REJECTED",
				});
			}
		},
		[append, startUpload]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/*": [] },
		maxSize: 4 * 1024 * 1000, // 4MB
	});

	return (
		<div className="space-y-8">
			{/* TERMINAL HEADER */}
			<div className="flex items-center justify-between border-b border-white/5 pb-4">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-[#FFB400]/10 flex items-center justify-center text-[#FFB400]">
						{isUploading ? <Loader2 size={16} className="animate-spin" /> : <Activity size={16} />}
					</div>
					<div>
						<h3 className="text-[#F5F5F0] text-sm font-black uppercase tracking-widest">Visual_Ingest_Terminal</h3>
						<p className="text-[8px] font-mono text-[#94A3B8] uppercase opacity-40">{isUploading ? "SYNCING_WITH_BABYLON_CLOUD..." : "Registry_Awaiting_Data"}</p>
					</div>
				</div>
			</div>

			{/* 2. THE DOCKING GRID */}
			<div
				{...getRootProps()}
				className={cn(
					"grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border-2 border-dashed transition-all duration-500",
					isDragActive ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/5 bg-transparent"
				)}
			>
				<input {...getInputProps()} />

				<AnimatePresence initial={false}>
					{fields.map((field, index) => {
						const isBlob = (field as any).value?.startsWith("blob:");

						return (
							<motion.div
								key={field.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								className="relative group bg-[#0A0E14] border border-white/10 p-4 flex flex-col gap-4"
								onClick={(e) => e.stopPropagation()}
							>
								{/* PREVIEW PORT */}
								<div className="relative aspect-video bg-white/2 border border-white/5 overflow-hidden">
									<div className="absolute top-2 left-2 z-20 flex gap-2">
										<span className="px-2 py-0.5 bg-black/60 text-[7px] font-mono text-[#94A3B8] border border-white/10 uppercase">Port_0{index + 1}</span>
										{isBlob && <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[7px] font-black uppercase flex items-center gap-1 animate-pulse">Syncing...</span>}
									</div>

									<Controller
										control={control}
										name={`images.${index}`}
										render={({ field: imgField }) => (
											<SafeImage
												src={imgField.value}
												alt="Asset"
												fill
												className={cn("object-contain transition-all duration-700 p-4", isBlob ? "grayscale blur-[2px]" : "grayscale-0")}
											/>
										)}
									/>
								</div>

								{/* DATA INPUT */}
								<div className="flex items-center gap-2">
									<div className="flex-1 relative">
										<LinkIcon size={10} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] opacity-30" />
										<Controller
											control={control}
											name={`images.${index}`}
											render={({ field: inputField }) => (
												<Input
													{...inputField}
													readOnly={isBlob} // Prevent editing during upload
													className="h-9 bg-transparent border-white/5 rounded-none pl-8 text-[9px] font-mono text-[#94A3B8] focus-visible:border-[#FFB400]/40"
												/>
											)}
										/>
									</div>
									<button
										title="Remove Asset"
										onClick={() => remove(index)}
										className="w-9 h-9 flex items-center justify-center border border-white/5 text-red-500/40 hover:text-red-500"
									>
										<Trash2 size={14} />
									</button>
								</div>
							</motion.div>
						);
					})}
				</AnimatePresence>

				{/* INITIALIZE BUTTON */}
				<div className="aspect-video border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-[#FFB400]/40 transition-all cursor-pointer group">
					<div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-[#94A3B8] group-hover:text-[#FFB400]">
						<Plus size={24} />
					</div>
					<p className="text-[10px] font-black uppercase text-[#F5F5F0] tracking-[0.3em]">Drop_To_Ingest</p>
				</div>
			</div>
		</div>
	);
}
