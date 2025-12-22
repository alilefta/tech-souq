"use client";

import { motion } from "motion/react";

export function Logo() {
	return (
		<div className="relative w-9 h-9 flex items-center justify-center group">
			{/* The Outer Hexagon Frame */}
			<svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#FFB400] stroke-[4]" strokeLinecap="round">
				<motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z" />
			</svg>

			{/* The "60" Circuit Pattern */}
			<div className="absolute inset-0 flex items-center justify-center">
				<svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-[#F5F5F0] stroke-[6]" strokeLinecap="round">
					{/* The "6" */}
					<path d="M70 20 L30 20 L30 80 L70 80 L70 50 L30 50" />
					{/* The "0" is implied by the hexagon or can be added as a dot/dash */}
					<motion.circle cx="70" cy="50" r="4" className="fill-[#FFB400] stroke-none" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
				</svg>
			</div>

			{/* Hover Glow Effect */}
			<div className="absolute inset-0 bg-[#FFB400] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500 rounded-full" />
		</div>
	);
}
