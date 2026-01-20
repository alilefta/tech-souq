"use client";

import { useState } from "react";
import { Scene3D } from "./scene-3d";
import { CrucibleHUD } from "./crucible-hud";
import { SchematicView } from "./schematic-view";
import { ProductBuilderDTO } from "@/app/data/products";
import { Box, List, Terminal, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/store/useBuilderStore";

export function BuilderShell({ allProducts }: { allProducts: ProductBuilderDTO[] }) {
	const [viewMode, setViewMode] = useState<"HOLOGRAPHIC" | "SCHEMATIC">("HOLOGRAPHIC");
	const { resetFoundry } = useBuilderStore();

	return (
		<main className="relative h-screen w-full bg-[#0A0E14] flex flex-col overflow-hidden">
			{/* 1. UNIFIED COMMAND HEADER */}
			<header className="flex-none h-16 border-b border-white/5 bg-[#0A0E14] z-50 flex items-center justify-between px-4 lg:px-6">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<Terminal size={16} className="text-[#FFB400]" />
						<span className="text-sm lg:text-lg font-black uppercase tracking-tighter text-[#F5F5F0]">
							Crucible_<span className="text-[#FFB400]">Core</span>
						</span>
					</div>

					{/* MODE TOGGLE (Visible on all screens) */}
					<div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5 ml-4">
						<button
							onClick={() => setViewMode("HOLOGRAPHIC")}
							className={cn(
								"px-3 lg:px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
								viewMode === "HOLOGRAPHIC" ? "bg-[#FFB400] text-[#0A0E14]" : "text-[#94A3B8] hover:text-[#F5F5F0]",
							)}
						>
							<Box size={12} /> <span className="hidden sm:inline">Holographic</span>
						</button>
						<button
							onClick={() => setViewMode("SCHEMATIC")}
							className={cn(
								"px-3 lg:px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
								viewMode === "SCHEMATIC" ? "bg-[#FFB400] text-[#0A0E14]" : "text-[#94A3B8] hover:text-[#F5F5F0]",
							)}
						>
							<List size={12} /> <span className="hidden sm:inline">Schematic</span>
						</button>
					</div>
				</div>

				<button
					onClick={resetFoundry}
					className="p-2 border border-white/10 bg-black/40 backdrop-blur-md text-[#94A3B8] hover:text-red-500 hover:border-red-500/40 transition-all rounded-full lg:rounded-none"
					title="Reset Build"
				>
					<RotateCcw size={16} />
				</button>
			</header>

			{/* 2. VIEWPORT SWITCHER */}
			<div className="flex-1 relative overflow-hidden">
				{/* 
                    PERFORMANCE CRITICAL: 
                    We conditionally render Scene3D. When 'SCHEMATIC' is active, 
                    React completely unmounts the WebGL Context, freeing up GPU.
                */}
				{viewMode === "HOLOGRAPHIC" ? (
					<>
						<div className="absolute inset-0 z-0">
							<Scene3D />
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
		</main>
	);
}
