// components/ui/not-found-ui.tsx
"use client";

import { motion } from "motion/react";
import { Compass, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function NotFoundUI() {
	return (
		<div className="relative z-20 container max-w-4xl px-8 flex flex-col items-center text-center">
			{/* THE ERROR CODE (Holographic Glitch) */}
			<div className="relative mb-4 md:mb-8">
				<motion.h1
					animate={{ opacity: [1, 0.5, 1, 0.2, 1] }}
					transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
					className="text-[10rem] md:text-[18rem] font-black text-[#F5F5F0] leading-none tracking-tighter"
				>
					404
				</motion.h1>

				{/* RGB Split Glitch Layers */}
				<motion.span
					animate={{ x: [-3, 3, -1], opacity: [0, 0.4, 0] }}
					transition={{ duration: 0.1, repeat: Infinity }}
					className="absolute inset-0 text-[#FF0000] text-[10rem] md:text-[18rem] font-black leading-none tracking-tighter mix-blend-screen pointer-events-none"
				>
					404
				</motion.span>
				<motion.span
					animate={{ x: [3, -3, 1], opacity: [0, 0.4, 0] }}
					transition={{ duration: 0.1, repeat: Infinity, delay: 0.05 }}
					className="absolute inset-0 text-[#00FFFF] text-[10rem] md:text-[18rem] font-black leading-none tracking-tighter mix-blend-screen pointer-events-none"
				>
					404
				</motion.span>
			</div>

			{/* ERROR DESCRIPTION */}
			<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
				<div className="flex items-center justify-center gap-3 text-[#FFB400] mb-6">
					<Compass className="animate-[spin_8s_linear_infinite]" size={20} />
					<span className="text-[10px] font-black uppercase tracking-[0.5em]">Coordinates_Lost_In_Babylon</span>
				</div>

				<h2 className="text-[#F5F5F0] text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-6">
					You&apos;ve reached <br />
					<span className="italic font-light">The Mirage</span>
				</h2>

				<p className="text-[#94A3B8] text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed font-medium">
					The requested terminal has been de-initialized. The digital sands of the Souq have shifted your path.
				</p>
			</motion.div>

			{/* RECOVERY ACTIONS */}
			<div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
				<Link href="/">
					<motion.button
						whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,180,0,0.4)" }}
						whileTap={{ scale: 0.95 }}
						className="flex items-center gap-3 px-8 py-4 bg-[#FFB400] text-[#0A0E14] font-black text-[10px] uppercase tracking-widest rounded-sm"
					>
						<Home size={16} /> Return to Home
					</motion.button>
				</Link>

				<button
					onClick={() => window.location.reload()}
					className="flex items-center gap-3 px-8 py-4 border border-white/10 text-[#F5F5F0] font-black text-[10px] uppercase tracking-widest rounded-sm hover:bg-white/5 transition-all"
				>
					<RefreshCw size={16} /> Re-Sync Terminal
				</button>
			</div>

			{/* SYSTEM LOGS (Decorative) */}
			<div className="mt-16 pt-8 border-t border-white/5 w-full max-w-xs opacity-30 text-left font-mono text-[8px] space-y-1">
				<p className="text-[#94A3B8]">ERR_SIGNAL_LOSS_ZONE_32.5N</p>
				<p className="text-[#94A3B8]">ORIGIN: BABYLON_IRQ_HUB_ALPHA</p>
				<p className="text-[#FFB400]">STATUS: REDIRECT_PENDING...</p>
			</div>
		</div>
	);
}
