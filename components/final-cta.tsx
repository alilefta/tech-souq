// components/home/final-cta.tsx
"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
	return (
		<div className="w-full py-24 mb-20 border-b border-white/5 group/cta">
			<div className="flex flex-col lg:flex-row items-center justify-between gap-12">
				<div className="text-center lg:text-left">
					<h2 className="text-[#F5F5F0] text-5xl md:text-8xl font-bold tracking-[-0.05em] leading-none uppercase">
						READY TO <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB400] to-[#FF8C00]">INITIALIZE?</span>
					</h2>
					<p className="text-[#94A3B8] text-lg mt-6 max-w-lg font-medium leading-relaxed">
						Your custom legacy starts here. From our hub in ancient Babylon to your desk, anywhere in the world.
					</p>
				</div>

				{/* 
            FIXED BUTTON: 
            1. Added 'overflow-hidden' to clip the beam.
            2. Added 'group' to trigger the child animation.
        */}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="group relative px-12 py-8 bg-[#FFB400] text-[#0A0E14] font-black text-xl uppercase tracking-[0.2em] overflow-hidden shadow-[0_0_50px_rgba(255,180,0,0.1)] hover:shadow-[0_0_80px_rgba(255,180,0,0.4)] transition-all duration-500"
				>
					{/* TEXT CONTENT: Forced z-index to stay above the beam */}
					<span className="relative z-20 flex items-center gap-4">
						Begin the Build <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-2 transition-transform duration-300" />
					</span>

					{/* 
              THE KINETIC BEAM:
              - skew-x-[-20deg]: Gives it that aggressive diagonal "tech" look.
              - group-hover: Moving it from far left to far right.
          */}
					<div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
						<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
					</div>

					{/* SECONDARY GLOW: A subtle pulse on hover */}
					<div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
				</motion.button>
			</div>
		</div>
	);
}
