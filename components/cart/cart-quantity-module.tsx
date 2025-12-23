"use client";

import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartQuantityModuleProps {
	qty: number;
	onIncrement: () => void;
	onDecrement: () => void;
	isLoading?: boolean;
}

export function CartQuantityModule({ qty, onIncrement, onDecrement, isLoading }: CartQuantityModuleProps) {
	return (
		<div className="flex items-center h-8 bg-white/3 border border-white/10 rounded-none overflow-hidden transition-colors hover:border-white/20">
			{/* DECREMENT */}
			<button
				onClick={onDecrement}
				title="decrement quantity"
				disabled={isLoading || qty <= 1}
				className="w-8 h-full flex items-center justify-center text-[#94A3B8] hover:text-[#FFB400] hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all border-r border-white/5"
			>
				<Minus size={12} strokeWidth={3} />
			</button>

			{/* DATA READOUT */}
			<div className="flex items-center justify-center px-3 min-w-10 bg-[#0A0E14]/40 h-full">
				<AnimatePresence mode="wait">
					<motion.span
						key={qty}
						initial={{ y: 2, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -2, opacity: 0 }}
						transition={{ duration: 0.15 }}
						className="text-[10px] font-mono font-black text-[#F5F5F0] tracking-tighter"
					>
						{qty.toString().padStart(2, "0")}
					</motion.span>
				</AnimatePresence>
			</div>

			{/* INCREMENT */}
			<button
				title="increment quantity"
				onClick={onIncrement}
				disabled={isLoading}
				className="w-8 h-full flex items-center justify-center text-[#94A3B8] hover:text-[#FFB400] hover:bg-white/5 disabled:opacity-20 transition-all border-l border-white/5"
			>
				<Plus size={12} strokeWidth={3} />
			</button>
		</div>
	);
}
