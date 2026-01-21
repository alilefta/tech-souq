"use client";

import { cn } from "@/lib/utils";
import { useProgress } from "@react-three/drei";

export function FoundryLoader() {
	const { active, progress } = useProgress();

	// Only show if loading is happening
	if (!active || progress === 100) return null;

	return (
		<div
			className={cn(
				"absolute inset-0 z-60 bg-[#0A0E14] flex flex-col items-center justify-center font-mono transition-opacity duration-500",
				active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
			)}
		>
			<div className="w-64 h-1 bg-white/10 mb-4 overflow-hidden">
				<div className="h-full bg-[#FFB400] transition-all duration-200" style={{ width: `${progress}%` }} />
			</div>
			<div className="flex items-center gap-4 text-[#94A3B8] text-[10px] uppercase tracking-widest">
				<span>System_Boot</span>
				<span className="text-[#FFB400]">{Math.round(progress)}%</span>
			</div>
			<p className="mt-8 text-[8px] text-[#94A3B8] opacity-40">Loading_Geometric_Assets...</p>
		</div>
	);
}
