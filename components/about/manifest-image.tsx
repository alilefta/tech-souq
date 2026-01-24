"use client";

import { motion } from "motion/react";
import { SafeImage } from "@/components/ui/safe-image";

interface ManifestImageProps {
	src: string;
	label: string;
	sub: string;
	delay?: number;
}

export function ManifestImage({ src, label, sub, delay = 0 }: ManifestImageProps) {
	return (
		<motion.div
			// Mobile: Fixed height per card. Desktop: Full height of parent grid.
			className="relative group overflow-hidden border-b md:border-b-0 md:border-r border-white/5 last:border-none h-100 md:h-auto w-full"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.5 }}
		>
			{/* 
               LOGIC: 
               1. Wrapper 'motion.div' handles the Mobile "Scroll to Color".
               2. Inner Image has 'md:grayscale' to force B&W on Desktop until hover.
            */}
			<motion.div
				className="absolute inset-0 w-full h-full"
				// MOBILE: Start Grayscale, animate to Color when 50% in view
				initial={{ filter: "grayscale(100%)" }}
				whileInView={{ filter: "grayscale(0%)" }}
				viewport={{ amount: 0.5 }}
				transition={{ duration: 1.2, ease: "easeOut" }}
			>
				<SafeImage src={src} alt={label} fill className="object-cover transition-all duration-1000 group-hover:scale-105 md:grayscale md:group-hover:grayscale-0" />
			</motion.div>

			<div className="absolute inset-0 bg-linear-to-t from-[#0A0E14] via-[#0A0E14]/40 to-transparent opacity-80 pointer-events-none" />

			{/* HUD Overlay */}
			<div className="absolute bottom-8 left-8 z-10 pointer-events-none">
				<div className="flex items-center gap-2 mb-2">
					<div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full animate-pulse" />
					<span className="text-[9px] font-mono text-[#FFB400] uppercase tracking-widest">{label}</span>
				</div>
				<p className="text-xl font-bold text-[#F5F5F0] uppercase tracking-tight">{sub}</p>
			</div>

			{/* Scanline (Desktop Hover Only) */}
			<div className="absolute inset-0 bg-white/2 translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none hidden md:block" />
		</motion.div>
	);
}
