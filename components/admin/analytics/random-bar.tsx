"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function RandomBar({ className }: { className?: string }) {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		// 1. ELITE FIX: The Timeout
		// Pushing state update to the next event loop tick prevents
		// "Synchronous State" warnings and allows the UI to paint first.
		const timer = setTimeout(() => {
			// Generate random value (20% to 90%)
			const randomValue = Math.floor(Math.random() * 70) + 20;
			setWidth(randomValue);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="h-1 w-full bg-white/5 overflow-hidden">
			<motion.div
				// 2. ANIMATION: Grow from 0 to random width
				initial={{ width: 0 }}
				animate={{ width: `${width}%` }}
				transition={{ duration: 1.5, ease: "circOut" }}
				className={cn("h-full bg-[#FFB400] shadow-[0_0_8px_rgba(255,180,0,0.3)]", className)}
			/>
		</div>
	);
}
