"use client";

import { Html } from "@react-three/drei";
import { cn } from "@/lib/utils";

interface ARLabelProps {
	text: string;
	status?: "active" | "warning" | "missing";
	position?: [x: number, y: number, z: number];
	scale?: number;
	// NEW: Logic for the "Scientific" L-shape
	variant?: "default" | "scientific";
	lineHeight?: number; // How high the line goes (px)
	lineWidth?: number; // How far left it goes (px)
}

export function ARLabel({ text, position, status = "active", scale = 0.4, variant = "default", lineHeight = 40, lineWidth = 30 }: ARLabelProps) {
	const colorClass =
		status === "active" ? "border-[#FFB400] text-[#FFB400] bg-[#FFB400]" : status === "warning" ? "border-red-500 text-red-500 bg-red-500" : "border-white/20 text-[#94A3B8] bg-[#94A3B8]";

	const lineGradient = status === "active" ? "from-[#FFB400]" : status === "warning" ? "from-red-500" : "from-[#94A3B8]";

	return (
		<Html
			position={position}
			center // The origin point (0,0) is the 3D position
			distanceFactor={10}
			zIndexRange={[100, 0]}
			style={{ pointerEvents: "none" }}
			sprite
		>
			<div style={{ transform: `scale(${scale})` }} className="relative flex flex-col items-center">
				{/* VARIANT A: DEFAULT (Vertical Drop - For Builder) */}
				{variant === "default" && (
					<>
						<div
							className={cn(
								"px-2 py-1 border backdrop-blur-sm flex items-center gap-1.5 rounded shadow-lg mb-2",
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
						{/* Connector Line (Points Down) */}
						<div className={cn("w-px h-6 bg-linear-to-b to-transparent", lineGradient)} />
					</>
				)}

				{/* VARIANT B: SCIENTIFIC (Reversed L-Shape - For Hero) */}
				{variant === "scientific" && (
					<div className="absolute bottom-0 left-0">
						{/* 1. The Origin Dot (On the model) */}
						<div className={cn("absolute bottom-0 left-0 w-1.5 h-1.5 -translate-x-1/2 translate-y-1/2 rounded-full shadow-[0_0_10px_currentColor]", colorClass.split(" ")[2])} />

						{/* 2. Vertical Line (Going Up) */}
						<div className={cn("absolute bottom-0 left-0 w-px bg-linear-to-t via-current to-transparent", colorClass.split(" ")[2])} style={{ height: `${lineHeight}px` }} />

						{/* 3. Horizontal Line (Going Left) */}
						<div
							className={cn("absolute w-px h-px bg-current", colorClass.split(" ")[2])}
							style={{
								bottom: `${lineHeight}px`,
								width: `${lineWidth}px`,
								right: 0, // Starts at the vertical line
								transform: "rotate(0deg)", // Points left
								transformOrigin: "right",
							}}
						/>

						{/* 4. The Label (Sitting at the end of the Left Line) */}
						<div
							className={cn(
								"absolute flex items-center px-3 py-1.5 border backdrop-blur-md shadow-2xl",
								status === "active" ? "bg-[#FFB400]/10 border-[#FFB400]" : "bg-white/5 border-white/20",
							)}
							style={{
								bottom: `${lineHeight - 10}px`, // Align vertically with horizontal line
								right: `${lineWidth}px`, // Align to end of horizontal line
								whiteSpace: "nowrap",
							}}
						>
							<span className={cn("text-[8px] font-black uppercase tracking-[0.2em]", status === "active" ? "text-[#FFB400]" : "text-white")}>{text}</span>
						</div>
					</div>
				)}
			</div>
		</Html>
	);
}
