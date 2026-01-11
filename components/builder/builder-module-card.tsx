"use client";

import { cn } from "@/lib/utils";
import { ProductBuilderDTO } from "@/app/data/products";
import { SafeImage } from "../ui/safe-image";
import { Info } from "lucide-react";

interface BuilderModuleCardProps {
	product: ProductBuilderDTO;
	isSelected: boolean;
	onSelect: () => void;
	onInspect: () => void; // New trigger
}

export function BuilderModuleCard({ product, isSelected, onSelect, onInspect }: BuilderModuleCardProps) {
	return (
		<div
			className={cn(
				"shrink-0 w-40 p-2 border transition-all text-left group bg-[#0A0E14] relative flex flex-col gap-2",
				isSelected ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/10 hover:border-white/30"
			)}
		>
			{/* Active Indicator */}
			{isSelected && <div className="absolute top-0 right-0 w-0 h-0 border-t-12 border-r-12 border-t-transparent border-r-[#FFB400]" />}

			{/* 1. IMAGE AREA (Click to Select) */}
			<button onClick={onSelect} className="w-full aspect-video relative bg-white/2 overflow-hidden group/img" title="Select_Component">
				<SafeImage src={product.coverImage} fill className="object-contain p-2 opacity-80 group-hover/img:opacity-100 transition-all duration-500" alt="" />
			</button>

			{/* 2. DATA AREA */}
			<div className="flex flex-col gap-1 px-1">
				<div className="flex justify-between items-start">
					<h4 className="text-[9px] font-bold text-[#F5F5F0] uppercase truncate flex-1 pr-2" title={product.name}>
						{product.name}
					</h4>

					{/* INSPECT BUTTON */}
					<button
						title="Inspect_Component"
						onClick={(e) => {
							e.stopPropagation();
							onInspect();
						}}
						className="text-[#94A3B8] hover:text-[#FFB400] transition-colors"
					>
						<Info size={12} />
					</button>
				</div>

				<p className="text-[10px] font-mono text-[#FFB400] opacity-80">${product.price}</p>
			</div>
		</div>
	);
}
