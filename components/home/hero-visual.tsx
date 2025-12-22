// components/home/hero-visual.tsx
"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function HeroVisual() {
	return (
		<motion.div className="relative w-full aspect-square p-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}>
			{/* HUD BRACKETS */}
			<div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FFB400]/40" />
			<div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FFB400]/40" />

			{/* Background Glow */}
			<div className="absolute inset-0 bg-[#FFB400]/5 rounded-full blur-[80px] animate-pulse" />

			{/* THE MODULE CARD */}
			<motion.div
				whileHover={{ rotateY: 8, rotateX: -8, translateZ: 20 }}
				className="relative z-10 w-full h-full bg-[#1E293B]/20 border border-white/5 rounded-sm overflow-hidden shadow-2xl transition-all duration-500 flex items-center justify-center group"
			>
				{/* Use SafeImage logic here later, for now Next/Image */}
				<Image
					src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000"
					alt="Base 60 Hardware"
					fill
					priority
					className="object-contain grayscale group-hover:grayscale-0 transition-all duration-1000 p-12 lg:p-16"
				/>

				{/* SCANLINE EFFECT */}
				<div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
					<div className="absolute top-0 left-0 w-full h-[1px] bg-[#FFB400] shadow-[0_0_15px_#FFB400] animate-scan" />
				</div>

				<div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent opacity-80" />

				{/* DATA BADGE */}
				<div className="absolute bottom-8 left-8 right-8 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-none">
					<div className="flex justify-between items-center">
						<div>
							<p className="text-[#FFB400] text-[8px] font-black uppercase tracking-widest mb-1">Spotlight_Module</p>
							<p className="text-[#F5F5F0] font-bold text-sm tracking-tighter uppercase">RTX 5090 Founders_Ed</p>
						</div>
						<div className="text-right">
							<p className="text-[#94A3B8] text-[8px] font-mono">VAL://</p>
							<p className="text-[#FFB400] font-black text-lg tracking-tighter leading-none">$1,999</p>
						</div>
					</div>
				</div>
			</motion.div>

			{/* FLOATING SYSTEM TAG */}
			<motion.div
				animate={{ y: [0, -12, 0] }}
				transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
				className="absolute -top-2 -right-2 px-4 py-2 bg-[#FFB400] border border-[#FFB400] shadow-[0_0_20px_rgba(255,180,0,0.3)] z-20"
			>
				<div className="flex items-center gap-3">
					<div className="w-1.5 h-1.5 rounded-full bg-[#0A0E14] animate-pulse" />
					<span className="text-[#0A0E14] text-[10px] font-black uppercase tracking-widest">Foundry_Authorized</span>
				</div>
			</motion.div>
		</motion.div>
	);
}
