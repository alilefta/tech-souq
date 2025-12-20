// components/HeroVisual.tsx
"use client";

import { motion } from "motion/react";

export default function HeroVisual() {
	return (
		<motion.div className="relative w-full aspect-square" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }}>
			{/* Background Glow */}
			<div className="absolute inset-0 bg-[#FFB400]/5 rounded-full blur-[60px] animate-pulse" />

			{/* Floating Card */}
			<motion.div
				whileHover={{ rotateY: 10, rotateX: -10 }}
				className="relative z-10 w-full h-full bg-gradient-to-br from-[#1E293B] to-[#0A0E14] border border-white/10 rounded-2xl p-4 overflow-hidden shadow-2xl transition-all duration-500"
			>
				<img
					src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000"
					alt="Premium Tech"
					className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-1000"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent" />

				{/* Floating Badge */}
				<div className="absolute bottom-6 left-6 right-6 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
					<div className="flex justify-between items-center">
						<div>
							<p className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-tighter">Current Spotlight</p>
							<p className="text-[#F5F5F0] font-bold">RTX 5090 FOUNDERS</p>
						</div>
						<div className="text-[#FFB400] font-bold">$1,999</div>
					</div>
				</div>
			</motion.div>

			{/* Interactive Status Tag */}
			<motion.div
				animate={{ y: [0, -10, 0] }}
				transition={{ duration: 4, repeat: Infinity }}
				className="absolute -top-4 -right-4 px-4 py-2 bg-[#1E293B] border border-[#FFB400]/30 rounded-lg shadow-xl z-20"
			>
				<div className="flex items-center gap-2">
					<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
					<span className="text-[#F5F5F0] text-[10px] font-bold font-mono">STOCK: READY TO SHIP</span>
				</div>
			</motion.div>
		</motion.div>
	);
}
