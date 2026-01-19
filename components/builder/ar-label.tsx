"use client";

import { Html } from "@react-three/drei";
import { cn } from "@/lib/utils";

export function ARLabel({
	text,
	position,
	status = "active",
	scale = 0.4, // Default to your working scale
}: {
	text: string;
	status?: "active" | "warning" | "missing";
	position?: [x: number, y: number, z: number];
	scale?: number;
}) {
	return (
		<Html
			position={position}
			center // Center the label on the position point
			distanceFactor={10} // This controls size relative to distance
			zIndexRange={[100, 0]}
			style={{
				pointerEvents: "none",
			}}
			sprite
		>
			<div
				style={{
					transform: `scale(${scale})`,
					transformOrigin: "center center", // Scale from bottom (where line connects)
				}}
				className={cn(
					"px-2 py-1 border backdrop-blur-sm flex items-center gap-1.5 select-none pointer-events-none rounded",
					// Add a subtle drop shadow for depth
					"shadow-lg",
					status === "active"
						? "bg-[#FFB400]/10 border-[#FFB400] text-[#FFB400]"
						: status === "warning"
							? "bg-red-500/10 border-red-500 text-red-500"
							: "bg-white/5 border-white/20 text-[#94A3B8]",
				)}
			>
				<div className={cn("w-1 h-1 rounded-full shrink-0", status === "active" ? "bg-[#FFB400]" : status === "warning" ? "bg-red-500 animate-pulse" : "bg-[#94A3B8]")} />
				<span className="text-[7px] font-mono font-bold uppercase tracking-wider whitespace-nowrap">{text}</span>
			</div>

			{/* Connector Line - pointing DOWN to the part */}
			<div
				style={{
					transform: `scale(${scale})`,
					transformOrigin: "center top",
				}}
				className={cn(
					"absolute top-full left-1/2 w-px h-6 -translate-x-1/2",
					status === "active"
						? "bg-linear-to-b from-[#FFB400] to-transparent"
						: status === "warning"
							? "bg-linear-to-b from-red-500 to-transparent"
							: "bg-linear-to-b from-[#94A3B8]/60 to-transparent",
				)}
			/>
		</Html>
	);
}
