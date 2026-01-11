"use client";

import { Html } from "@react-three/drei";
import { cn } from "@/lib/utils";

export function ARLabel({ text, status = "active" }: { text: string; status?: "active" | "warning" | "missing" }) {
	return (
		<Html distanceFactor={10} zIndexRange={[100, 0]}>
			<div
				className={cn(
					"px-2 py-1 border backdrop-blur-md flex items-center gap-2 transition-all select-none pointer-events-none",
					status === "active"
						? "bg-[#FFB400]/10 border-[#FFB400] text-[#FFB400]"
						: status === "warning"
						? "bg-red-500/10 border-red-500 text-red-500"
						: "bg-white/5 border-white/20 text-[#94A3B8]"
				)}
			>
				<div className={cn("w-1 h-1 rounded-full", status === "active" ? "bg-[#FFB400]" : status === "warning" ? "bg-red-500 animate-pulse" : "bg-[#94A3B8]")} />
				<span className="text-[8px] font-mono font-bold uppercase tracking-widest whitespace-nowrap">{text}</span>

				{/* Connector Line to Model */}
				<div className={cn("absolute top-full left-1/2 w-px h-8 origin-top", status === "active" ? "bg-[#FFB400]" : status === "warning" ? "bg-red-500" : "bg-[#94A3B8]")} />
			</div>
		</Html>
	);
}
