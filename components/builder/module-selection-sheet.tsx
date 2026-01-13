"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ProductBuilderDTO } from "@/app/data/products";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { SafeImage } from "../ui/safe-image";

interface ModuleSelectionProps {
	isOpen: boolean;
	onClose: () => void;
	category: string;
	products: ProductBuilderDTO[];
	onSelect: (product: ProductBuilderDTO) => void;
	currentSelectionId?: number;
}

export function ModuleSelectionSheet({ isOpen, onClose, category, products, onSelect, currentSelectionId }: ModuleSelectionProps) {
	const [query, setQuery] = useState("");

	// Simple client-side search for the modal
	const filteredProducts = useMemo(() => {
		if (!query) return products;
		return products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()));
	}, [query, products]);

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetHeader>
				<SheetTitle className="sr-only">Select Module</SheetTitle>
				<SheetDescription className="sr-only">Select a {category} module</SheetDescription>
			</SheetHeader>
			<SheetContent className="w-full sm:max-w-2xl bg-[#0A0E14] border-l border-white/5 p-0 flex flex-col font-sans z-60">
				{/* 1. HEADER & SEARCH COMMAND */}
				<SheetHeader className="p-6 border-b border-white/5 bg-white/1">
					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<span className="px-2 py-1 bg-[#FFB400] text-[#0A0E14] text-[9px] font-black uppercase tracking-widest">Sector: {category}</span>
								<span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest">Available_Units: [{products.length}]</span>
							</div>
						</div>

						{/* Search Input */}
						<div className="relative group">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] w-4 h-4 group-focus-within:text-[#FFB400] transition-colors" />
							<input
								type="text"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="QUERY_DATABASE..."
								className="w-full h-12 bg-white/3 border border-white/10 pl-10 pr-4 text-xs font-mono text-[#F5F5F0] placeholder:text-white/20 outline-none focus:border-[#FFB400]/50 transition-all uppercase"
							/>
						</div>
					</div>
				</SheetHeader>

				{/* 2. THE GRID (Handles 100+ items easily) */}
				<div className="flex-1 overflow-y-auto custom-scrollbar p-6">
					{filteredProducts.length === 0 ? (
						<div className="h-full flex flex-col items-center justify-center opacity-40">
							<p className="text-xs font-bold uppercase text-[#94A3B8]">No_Matching_Hardware_Found</p>
						</div>
					) : (
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							{filteredProducts.map((product) => (
								<button
									key={product.id}
									onClick={() => {
										onSelect(product);
										onClose();
									}}
									className={cn(
										"relative group flex flex-col text-left border transition-all p-3 bg-[#0A0E14]",
										currentSelectionId === product.id ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/10 hover:border-white/30 hover:bg-white/2"
									)}
								>
									{/* Selection Indicator */}
									{currentSelectionId === product.id && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#FFB400] rounded-full animate-pulse" />}

									<div className="aspect-square w-full relative mb-3 bg-white/2 flex items-center justify-center p-4">
										<SafeImage src={product.coverImage || ""} alt="" className="object-contain max-h-full grayscale group-hover:grayscale-0 transition-all" />
									</div>

									<span className="text-[8px] font-black text-[#FFB400] uppercase tracking-widest mb-1">{product.brand}</span>
									{/* Full Name visible here */}
									<h4 className="text-[10px] font-bold text-[#F5F5F0] uppercase leading-tight line-clamp-2 min-h-[2.5em] mb-2">{product.name}</h4>
									<p className="text-sm font-mono font-black text-[#F5F5F0] mt-auto">${product.price}</p>
								</button>
							))}
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
