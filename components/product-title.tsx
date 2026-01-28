"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductTitle({ brand, name }: { brand: string; name: string }) {
	const [isExpanded, setIsExpanded] = useState(false);

	// Heuristic: If name is shorter than 100 chars, don't bother collapsing
	const isLongName = name.length > 100;

	return (
		<div className="mb-4">
			{/* BRAND KICKER */}
			<span className="block text-xl md:text-2xl text-[#94A3B8] font-medium tracking-normal mb-2 uppercase">{brand}</span>

			{/* MAIN TITLE */}
			<h1
				className={cn(
					"text-[#F5F5F0] text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] uppercase transition-all duration-300",
					// If not expanded, clamp to 3 lines. If expanded, show all.
					!isExpanded && "line-clamp-3",
				)}
				title={name} // Native browser tooltip for accessibility
			>
				{name}
			</h1>

			{/* EXPANSION TRIGGER (Only if long) */}
			{isLongName && (
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#FFB400] hover:text-white transition-colors group"
				>
					{isExpanded ? (
						<>
							<ChevronUp size={12} /> Collapse_Designation
						</>
					) : (
						<>
							<ChevronDown size={12} /> Expand_Full_Designation
						</>
					)}
					<div className="h-px w-12 bg-[#FFB400]/20 group-hover:bg-[#FFB400] transition-colors" />
				</button>
			)}

			{/* OPTIONAL: RAW STRING VIEW (For extreme technical precision) */}
			{isExpanded && (
				<div className="mt-4 p-4 bg-white/2 border border-white/5 font-mono text-[10px] text-[#94A3B8] leading-relaxed break-words">
					<div className="flex items-center gap-2 mb-2 opacity-50">
						<Terminal size={10} />
						<span>RAW_MANUFACTURER_STRING</span>
					</div>
					{name}
				</div>
			)}
		</div>
	);
}
