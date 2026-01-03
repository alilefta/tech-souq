"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Move, Trash2, Globe } from "lucide-react";
import { CategoryDetailsDTO } from "@/app/data/category";
import { SafeImage } from "@/components/ui/safe-image"; // Importing the elite fallback system
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { deactivateSector, deleteSector } from "@/app/actions/category";
import { useState } from "react";
import { KillModuleModal } from "../ui/kill-module-modal";

export function SectorRegistryClient({ initialCategories }: { initialCategories: CategoryDetailsDTO[] }) {
	const [targetSector, setTargetSector] = useState<CategoryDetailsDTO | null>(null);

	// --- ACTION: DE-SYNC ---
	const { executeAsync: executeDeactivate, isExecuting: isDeactivating } = useAction(deactivateSector, {
		onSuccess: () => {
			toast.success("SECTOR_DE-SYNCED", { description: "COORDINATES_REMOVED_FROM_MAPPING" });
			setTargetSector(null);
		},
		onError: ({ error }) => {
			toast.error("DE-SYNC_HALTED", { description: error.serverError });
		},
	});

	// --- ACTION: WIPE ---
	const { executeAsync: executeWipe, isExecuting: isWiping } = useAction(deleteSector, {
		onSuccess: () => {
			toast.success("REGISTRY_WIPE_COMPLETE", { description: "SECTOR_DATA_PURGED" });
			setTargetSector(null);
		},
		onError: ({ error }) => {
			toast.error("WIPE_PROTOCOL_BLOCKED", { description: error.serverError });
		},
	});

	const isProcessing = isDeactivating || isWiping;

	return (
		<div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
			{/* LEFT: THE MANAGEMENT LIST */}
			<div className="xl:col-span-8 space-y-4">
				{initialCategories.map((sector) => (
					<div
						key={sector.id}
						className="group bg-white/2 border border-white/5 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#FFB400]/40 transition-all duration-500"
					>
						<div className="flex items-center gap-6 flex-1">
							{/* 1. SECTOR VISUAL SCAN (The Preview) */}
							<div className="w-20 h-20 bg-[#1E293B] border border-white/10 shrink-0 relative overflow-hidden group/thumb">
								<SafeImage
									src={sector.imageUrl}
									alt={sector.name}
									fallbackName={sector.name}
									fill
									sizes="80px"
									className="object-cover grayscale group-hover/thumb:grayscale-0 transition-all duration-700 opacity-40 group-hover/thumb:opacity-60"
								/>
								{/* Technical Watermark Overlay */}
								<span className="text-[12px] font-black text-white/10 absolute inset-0 flex items-center justify-center uppercase italic pointer-events-none z-10 group-hover/thumb:text-[#FFB400]/20 transition-colors">
									{sector.arabicName || "BBL"}
								</span>
								{/* Scanning Corner Detail */}
								<div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFB400]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>

							<div>
								<div className="flex items-center gap-3 mb-1">
									<div className="flex flex-col">
										<h3 className="text-[#F5F5F0] text-lg font-bold uppercase tracking-tight group-hover:text-[#FFB400] transition-colors">{sector.name}</h3>
										<Link
											href={`/admin/products?category=${sector.slug}`} // THE HANDSHAKE
											className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest opacity-60 hover:text-[#FFB400] hover:opacity-100 transition-all flex items-center gap-2 mt-1"
										>
											Sector_Path: /categories/{sector.slug}
											{" // "}
											Allocated_Modules: <span className="text-[#F5F5F0] font-bold border-b border-[#FFB400]/40">[{sector._count.products.toString().padStart(2, "0")}]</span>
										</Link>
									</div>
									<span className="px-2 py-0.5 border border-[#FFB400]/20 text-[#FFB400] text-[8px] font-black uppercase tracking-widest">{sector.gridDisplay}_Protocol</span>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<Link href={`/admin/categories/${sector.id}/edit`}>
								<button className="px-5 py-2.5 border border-white/10 text-[#94A3B8] text-[9px] font-black uppercase tracking-widest hover:border-[#FFB400] hover:text-[#FFB400] hover:bg-[#FFB400]/5 transition-all">
									Configure_Logic
								</button>
							</Link>
							<button title="De_sync sector" onClick={() => setTargetSector(sector)} className="p-2 text-red-500/40 hover:text-red-500 transition-colors">
								<Trash2 size={16} />
							</button>
						</div>
					</div>
				))}
			</div>
			{/* THE KILL TERMINAL */}
			<KillModuleModal
				isOpen={!!targetSector}
				onClose={() => !isProcessing && setTargetSector(null)}
				title={targetSector?.name || "Sector"}
				isProcessing={isProcessing}
				onDeactivate={() => targetSector && executeDeactivate({ id: targetSector.id })}
				onWipe={() => targetSector && executeWipe({ id: targetSector.id })}
				isWiping={isWiping}
			/>

			{/* RIGHT: LIVE MINI-MAP (Preview) */}
			<aside className="xl:col-span-4 space-y-6">
				<div className="sticky top-32">
					<div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
						<div className="flex items-center gap-2 text-[#94A3B8]">
							<Move size={14} className="text-[#FFB400]" />
							<span className="text-[9px] font-black uppercase tracking-[0.3em]">Topographical_Preview</span>
						</div>
						<Globe size={12} className="text-[#94A3B8] opacity-20" />
					</div>

					{/* The Dynamic Mapping Area */}
					<div className="grid grid-cols-2 auto-rows-[120px] gap-px bg-white/10 border border-white/10 shadow-2xl">
						{initialCategories.slice(0, 6).map((sector) => (
							<div
								key={sector.id}
								className={cn(
									"bg-[#0A0E14] flex flex-col items-center justify-center p-4 text-center group/mini relative overflow-hidden",
									sector.gridDisplay === "large" ? "col-span-2 row-span-1" : "col-span-1"
								)}
							>
								{/* Background Image Ghosting in Mini-Map */}
								<div className="absolute inset-0 opacity-[0.03] group-hover/mini:opacity-10 transition-opacity">
									<SafeImage src={sector.imageUrl} alt="" fill className="object-cover grayscale" />
								</div>

								<span className="relative z-10 text-[8px] font-black uppercase text-[#94A3B8] group-hover/mini:text-[#FFB400] tracking-widest transition-colors">{sector.name}</span>
								<span className="relative z-10 text-[6px] font-mono text-[#94A3B8] opacity-20 uppercase mt-1">{sector.gridDisplay}</span>
							</div>
						))}
					</div>

					<div className="mt-6 p-4 bg-white/1 border border-white/5">
						<p className="text-[7px] font-mono text-[#94A3B8] opacity-40 uppercase leading-relaxed tracking-widest">
							* LOG: Topographical data synchronized with Foundry Core Node. Changes to Bento_Allocation will reflect immediately on public marketplace nodes.
						</p>
					</div>
				</div>
			</aside>
		</div>
	);
}
