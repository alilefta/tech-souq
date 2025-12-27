"use client";

import { motion } from "motion/react";
import { ShoppingBag, Loader2, RefreshCw } from "lucide-react";

export function AddToCartButton({ onAddToCart, isLoading, label }: { onAddToCart: () => void; isLoading: boolean; label: string }) {
	return (
		<motion.button
			whileHover={!isLoading ? { scale: 1.02 } : {}}
			whileTap={!isLoading ? { scale: 0.98 } : {}}
			onClick={onAddToCart}
			disabled={isLoading}
			className="relative flex-1 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] py-5 flex items-center justify-center gap-3 disabled:opacity-50 overflow-hidden rounded-none"
		>
			<span className="relative z-10 flex items-center gap-3">
				{isLoading ? "Synchronizing_Logs..." : label}
				{isLoading ? <Loader2 size={18} className="animate-spin" /> : label.includes("Update") ? <RefreshCw size={16} strokeWidth={3} /> : <ShoppingBag size={18} strokeWidth={2.5} />}
			</span>

			{!isLoading && (
				<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
					<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
				</div>
			)}
		</motion.button>
	);
}
