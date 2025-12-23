// components/checkout/manifest-summary.tsx
"use client";

import { useCart } from "@/store/useCart";
import { SafeImage } from "@/components/ui/safe-image";

export function ManifestSummary() {
	const items = useCart((state) => state.items);
	const subtotal = items.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0);
	const shipping = subtotal > 1000 ? 0 : 45; // Logic for "Global Express"

	return (
		<div className="bg-[#1E293B]/20 border border-white/5 p-6 md:p-8 rounded-none">
			<div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
				<h2 className="text-[#F5F5F0] text-xs font-black uppercase tracking-[0.3em]">Payload_Verification</h2>
				<span className="text-[#94A3B8] font-mono text-[10px]">[{items.length.toString().padStart(2, "0")}_UNITS]</span>
			</div>

			{/* Item List */}
			<div className="space-y-6 mb-10 max-h-100 overflow-y-auto custom-scrollbar pr-2">
				{items.map((item) => (
					<div key={item.id} className="flex gap-4 group">
						<div className="relative w-16 h-16 bg-white/2 border border-white/5 shrink-0 overflow-hidden">
							<SafeImage src={item.product.images[0]} alt={item.product.name} fill className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all" />
						</div>
						<div className="flex-1 flex flex-col justify-center">
							<h4 className="text-[#F5F5F0] text-[11px] font-bold uppercase tracking-tight line-clamp-1">{item.product.name}</h4>
							<div className="flex justify-between items-center mt-1">
								<span className="text-[10px] font-mono text-[#94A3B8]">x{item.quantity.toString().padStart(2, "0")}</span>
								<span className="text-[#FFB400] text-xs font-black tracking-tighter">${(Number(item.product.price) * item.quantity).toLocaleString()}</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Value Breakdown */}
			<div className="space-y-3 pt-6 border-t border-white/5">
				<div className="flex justify-between text-[10px] font-bold uppercase text-[#94A3B8] tracking-widest">
					<span>Subtotal_Value</span>
					<span className="text-[#F5F5F0]">${subtotal.toLocaleString()}</span>
				</div>
				<div className="flex justify-between text-[10px] font-bold uppercase text-[#94A3B8] tracking-widest">
					<span>Transfer_Fee</span>
					<span className={shipping === 0 ? "text-green-500" : "text-[#F5F5F0]"}>{shipping === 0 ? "BBL_FREE_AUTH" : `$${shipping}`}</span>
				</div>
				<div className="pt-6 mt-4 border-t-2 border-[#FFB400]/20 flex justify-between items-end">
					<div className="flex flex-col">
						<span className="text-[8px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-1">Final Authorization Value</span>
						<span className="text-4xl font-black text-[#FFB400] tracking-tighter leading-none">${(subtotal + shipping).toLocaleString()}</span>
					</div>
					<span className="text-[10px] font-mono text-[#94A3B8] opacity-30 pb-1">USD//IRQ</span>
				</div>
			</div>
		</div>
	);
}
