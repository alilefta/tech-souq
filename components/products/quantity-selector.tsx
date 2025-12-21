"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn base
import { useState } from "react";

export function QuantitySelector() {
	const [count, setCount] = useState(1);

	const increment = () => setCount((prev) => prev + 1);
	const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

	return (
		<div className="flex items-center h-14 bg-[#1E293B]/40 border border-white/10 rounded-sm overflow-hidden group hover:border-white/20 transition-colors">
			{/* DECREMENT BUTTON */}
			<Button
				variant="ghost"
				size="icon"
				onClick={decrement}
				className="h-full w-12 rounded-none border-r border-white/5 text-[#94A3B8] hover:bg-white/5 hover:text-[#FFB400] transition-all"
				aria-label="Decrease quantity"
			>
				<Minus size={14} strokeWidth={3} />
			</Button>

			{/* READOUT */}
			<div className="flex flex-col items-center justify-center px-6 min-w-[70px]">
				<span className="text-[8px] font-mono text-[#94A3B8] uppercase tracking-[0.2em] mb-0.5 opacity-50">Qty</span>
				<span className="text-[#F5F5F0] font-mono font-bold text-sm leading-none">{count.toString().padStart(2, "0")}</span>
			</div>

			{/* INCREMENT BUTTON */}
			<Button
				variant="ghost"
				size="icon"
				onClick={increment}
				className="h-full w-12 rounded-none border-l border-white/5 text-[#94A3B8] hover:bg-white/5 hover:text-[#FFB400] transition-all"
				aria-label="Increase quantity"
			>
				<Plus size={14} strokeWidth={3} />
			</Button>
		</div>
	);
}
