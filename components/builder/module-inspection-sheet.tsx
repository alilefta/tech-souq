"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ProductBuilderDTO } from "@/app/data/products";
import { SafeImage } from "../ui/safe-image";
import { Terminal, ShieldCheck, Cpu, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogicValue } from "./logic-formatter";

interface ModuleInspectionProps {
	product: ProductBuilderDTO | null;
	isOpen: boolean;
	onClose: () => void;
	onSelect: (product: ProductBuilderDTO) => void;
}

export function ModuleInspectionSheet({ product, isOpen, onClose, onSelect }: ModuleInspectionProps) {
	if (!product) return null;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="w-full sm:max-w-md bg-[#0A0E14]/95 border-l border-white/10 p-0 flex flex-col font-sans backdrop-blur-2xl  overflow-y-auto custom-scrollbar">
				{/* 1. HEADER: IDENTITY */}
				<SheetHeader className="p-8 border-b border-white/5 pb-0">
					<div className="flex items-center gap-3 mb-4">
						<Terminal size={14} className="text-[#FFB400]" />
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Module_Analysis</span>
					</div>
					<SheetTitle className="text-[#F5F5F0] text-2xl font-black uppercase tracking-tighter leading-snug">{product.name}</SheetTitle>
					<p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mt-2">
						ID: {product.sku}
						{" // Brand: "}
						{product.brand}
					</p>
				</SheetHeader>

				<div className="flex-1">
					{/* 2. VISUAL SCAN */}
					<div className="aspect-square relative bg-white/[0.02] border-b border-white/5  flex items-center justify-center">
						<SafeImage src={product.coverImage} fill className="object-contain p-8" alt={product.name} />
						{/* Price Tag Overlay */}
						<div className="absolute bottom-4 right-4 bg-[#FFB400] px-3 py-1 text-[#0A0E14]">
							<span className="text-lg font-black tracking-tighter">${product.price}</span>
						</div>
					</div>

					{/* 3. TECHNICAL SPECS TABLE */}
					<div className="p-8 space-y-6">
						<h3 className="text-xs font-black uppercase text-[#94A3B8] tracking-[0.3em] flex items-center gap-2">
							<Cpu size={14} /> Hardware_Specs
						</h3>
						<div className="space-y-1">
							{product.specs?.map((spec, i) => (
								<div key={i} className="flex justify-between py-3 border-b border-white/5 last:border-0">
									<span className="text-[10px] font-bold text-[#94A3B8] uppercase">{spec.label}</span>
									<span className="text-[10px] font-mono text-[#F5F5F0] text-right">{spec.value}</span>
								</div>
							))}
						</div>
					</div>

					{/* 4. COMPATIBILITY LOGIC (Raw View) */}
					{product.compatibility && (
						<div className="px-8 pb-8">
							<div className="p-4 bg-white/[0.02] border border-white/5 font-mono text-[9px] text-[#94A3B8] uppercase leading-relaxed">
								<div className="flex items-center gap-2 text-[#FFB400] mb-4 pb-2 border-b border-white/5">
									<Zap size={12} />
									<span className="tracking-[0.2em] font-black">Foundry_Logic_Map</span>
								</div>

								<div className="space-y-3">
									{Object.entries(product.compatibility).map(([k, v]) => (
										<div key={k} className="flex flex-col gap-1">
											<span className="opacity-40 text-[8px] tracking-widest bg-white/5 w-fit px-1">{k}</span>
											{/* THE SMART RENDERER */}
											<div className="pl-2">
												<LogicValue value={v} />
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* 5. ACTION FOOTER */}
				<SheetFooter className="p-6 bg-[#0A0E14] border-t border-white/10">
					<button
						onClick={() => {
							onSelect(product);
							onClose();
						}}
						className="w-full py-5 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,180,0,0.2)] hover:bg-white transition-all flex items-center justify-center gap-3"
					>
						Equip_Module <ArrowRight size={16} />
					</button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
