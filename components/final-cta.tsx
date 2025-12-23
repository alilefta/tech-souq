// components/home/final-cta.tsx
"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
	return (
		<div className="w-full py-24 mb-20 border-b border-white/5 group/cta">
			<div className="flex flex-col lg:flex-row items-center justify-between gap-12">
				<div className="text-center lg:text-left">
					<h2 className="text-[#F5F5F0] text-5xl md:text-8xl font-bold tracking-[-0.05em] leading-[0.85] uppercase">
						READY TO <br />
						<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">CALCULATE?</span>
					</h2>
					<p className="text-[#94A3B8] text-lg mt-6 max-w-lg font-medium leading-relaxed">
						Your high-performance legacy begins at the source. Engineered in the cradle of Babylon, deployed to your workstation.
					</p>
				</div>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="group relative px-12 py-8 bg-[#FFB400] text-[#0A0E14] font-black text-xl uppercase tracking-[0.2em] overflow-hidden shadow-[0_0_50px_rgba(255,180,0,0.1)] hover:shadow-[0_0_80px_rgba(255,180,0,0.4)] transition-all duration-500 rounded-none"
				>
					<Link href={"/products"}>
						<span className="relative z-20 flex items-center gap-4">
							Initialize Assembly <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-2 transition-transform duration-300" />
						</span>
					</Link>

					<div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
						<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
					</div>
				</motion.button>
			</div>
		</div>
	);
}
