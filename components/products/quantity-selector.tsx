"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function QuantitySelector() {
	const [count, setCount] = useState(1);

	const increment = () => setCount((prev) => prev + 1);
	const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

	return (
		/* 
		   FIX 1: added w-full sm:w-fit 
		   This ensures it doesn't look tiny on mobile but stays compact on desktop 
		*/
		<div className="flex items-center h-14 w-full sm:w-fit bg-[#1E293B]/40 border border-white/10 rounded-none overflow-hidden group hover:border-[#FFB400]/20 transition-colors">
			{/* DECREMENT BUTTON: Fixed width to prevent stretching */}
			<Button
				variant="ghost"
				size="icon"
				onClick={decrement}
				className="h-full w-14 shrink-0 rounded-none border-r border-white/5 text-[#94A3B8] hover:bg-white/5 hover:text-[#FFB400] transition-all"
				aria-label="Decrease quantity"
			>
				<Minus size={14} strokeWidth={3} />
			</Button>

			{/* 
			   READOUT: flex-1 ensures this middle part takes 
			   the "stretchy" space on mobile, keeping buttons balanced 
			*/}
			<div className="flex-1 flex flex-col items-center justify-center px-8 min-w-[80px]">
				<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.3em] mb-0.5 opacity-40">Unit_Count</span>
				<span className="text-[#F5F5F0] font-mono font-black text-sm leading-none">{count.toString().padStart(2, "0")}</span>
			</div>

			{/* INCREMENT BUTTON: Fixed width matching the decrement button */}
			<Button
				variant="ghost"
				size="icon"
				onClick={increment}
				className="h-full w-14 shrink-0 rounded-none border-l border-white/5 text-[#94A3B8] hover:bg-white/5 hover:text-[#FFB400] transition-all"
				aria-label="Increase quantity"
			>
				<Plus size={14} strokeWidth={3} />
			</Button>
		</div>
	);
}
