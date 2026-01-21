"use client";

import { useState } from "react";
import { Scene3D } from "./scene-3d";
import { CrucibleHUD } from "./crucible-hud";
import { SchematicView } from "./schematic-view";
import { ProductBuilderDTO } from "@/app/data/products";
import { Box, List, Terminal, RotateCcw, ArrowRight, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/store/useBuilderStore";
import { useCart } from "@/store/useCart";
import { toast } from "sonner";
import { FoundryLoader } from "./foundry-loader";

export function BuilderShell({ allProducts }: { allProducts: ProductBuilderDTO[] }) {
	const [viewMode, setViewMode] = useState<"HOLOGRAPHIC" | "SCHEMATIC">("HOLOGRAPHIC");
	const [isViewportLocked, setIsViewportLocked] = useState(true);

	// GLOBAL LOGIC HOISTING
	const { resetFoundry, manifest } = useBuilderStore();
	const { addItem } = useCart();

	const totalPrice = Object.values(manifest).reduce((acc, item) => acc + (Number(item?.price) || 0), 0);

	const handleAuthorize = () => {
		const parts = Object.values(manifest).filter((p) => p !== null);
		if (parts.length === 0) {
			toast.error("PROTOCOL_ERROR", { description: "MANIFEST_EMPTY // CANNOT_AUTHORIZE" });
			return;
		}
		parts.forEach((part) => addItem(part, 1));
		toast.success("BUILD_AUTHORIZED", { description: "SYSTEM_CONFIG_TRANSFERRED_TO_LOGISTICS" });
	};

	return (
		<div className="relative h-dvh w-full bg-[#0A0E14] flex flex-col overflow-hidden font-sans mt-8">
			{/* 1. GLOBAL HEADER */}
			<header className="flex-none h-16 border-b border-white/5 bg-[#0A0E14] z-50 flex items-center justify-between px-4 lg:px-6">
				<div className="flex items-center gap-2 md:gap-4">
					<div className="flex items-center gap-2">
						<Terminal size={16} className="text-[#FFB400]" />
						<span className="text-sm lg:text-lg font-black uppercase tracking-tighter text-[#F5F5F0] hidden sm:inline">
							Crucible_<span className="text-[#FFB400]">Core</span>
						</span>
					</div>

					{/* MODE TOGGLE */}
					<div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5 ml-2">
						<button
							onClick={() => setViewMode("HOLOGRAPHIC")}
							className={cn(
								"px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
								viewMode === "HOLOGRAPHIC" ? "bg-[#FFB400] text-[#0A0E14]" : "text-[#94A3B8] hover:text-[#F5F5F0]",
							)}
						>
							<Box size={12} /> <span className="hidden sm:inline">Holographic</span>
						</button>
						<button
							onClick={() => setViewMode("SCHEMATIC")}
							className={cn(
								"px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
								viewMode === "SCHEMATIC" ? "bg-[#FFB400] text-[#0A0E14]" : "text-[#94A3B8] hover:text-[#F5F5F0]",
							)}
						>
							<List size={12} /> <span className="hidden sm:inline">Schematic</span>
						</button>
					</div>
				</div>

				<div className="flex items-center gap-2 md:gap-4">
					{/* Desktop Price Readout */}
					<div className="hidden lg:block text-right">
						<p className="text-[8px] font-mono text-[#94A3B8] uppercase tracking-widest">Allocation</p>
						<p className="text-lg font-black text-[#F5F5F0] leading-none">${totalPrice.toLocaleString()}</p>
					</div>

					{/* NEW: VIEWPORT LOCK (Visible only in Holographic) */}
					{viewMode === "HOLOGRAPHIC" && (
						<button
							onClick={() => setIsViewportLocked(!isViewportLocked)}
							className={cn(
								"p-2 border transition-all rounded-full lg:rounded-none",
								!isViewportLocked ? "border-[#FFB400] text-[#FFB400] bg-[#FFB400]/10" : "border-white/10 bg-black/40 text-[#94A3B8]",
							)}
							title={isViewportLocked ? "Unlock Camera" : "Lock Camera"}
						>
							{isViewportLocked ? <Lock size={16} /> : <Unlock size={16} />}
						</button>
					)}

					<button
						onClick={resetFoundry}
						className="p-2 border border-white/10 bg-black/40 backdrop-blur-md text-[#94A3B8] hover:text-red-500 hover:border-red-500/40 transition-all rounded-full lg:rounded-none"
						title="Reset Build"
					>
						<RotateCcw size={16} />
					</button>
				</div>
			</header>

			{/* 2. VIEWPORT CONTENT */}
			<div className="flex-1 relative overflow-hidden bg-[#0A0E14]">
				{viewMode === "HOLOGRAPHIC" ? (
					<>
						{/* LOADER: Needs higher Z-Index to sit on top of Canvas */}
						<FoundryLoader />

						<div className="absolute inset-0 z-0">
							<Scene3D interactive={!isViewportLocked} />
						</div>

						<div className="relative z-10 h-full pointer-events-none">
							<CrucibleHUD allProducts={allProducts} />
						</div>
					</>
				) : (
					<div className="h-full overflow-y-auto custom-scrollbar bg-[#0A0E14]">
						<SchematicView allProducts={allProducts} />
					</div>
				)}
			</div>

			{/* 3. GLOBAL MOBILE FOOTER (Fixed & Persistent) */}
			<div className="lg:hidden flex-none bg-[#0A0E14] border-t border-white/10 p-4 z-50 flex flex-col gap-3 pb-safe">
				<div className="flex justify-between items-center">
					<span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest">Total_Allocation</span>
					<span className="text-xl font-black text-[#F5F5F0]">${totalPrice.toLocaleString()}</span>
				</div>
				<button
					onClick={handleAuthorize}
					className="w-full h-12 bg-[#FFB400] text-[#0A0E14] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,180,0,0.2)]"
				>
					Authorize <ArrowRight size={16} />
				</button>
			</div>
		</div>
	);
}
