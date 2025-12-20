// components/AnnouncementBar.tsx
"use client";

import { X, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export function AnnouncementBar() {
	const [isVisible, setIsVisible] = useState(true);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: "auto", opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					className="relative w-full bg-[#FFB400] text-[#0A0E14] overflow-hidden"
				>
					{/* Subtle Scanline Effect */}
					<div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(10,14,20,0.1)_50%,transparent_50%)] bg-[length:100%_4px]" />

					<div className="max-w-7xl mx-auto px-4">
						<div className="flex items-center justify-between gap-3 py-2.5">
							{/* Left Decoration (Hidden on mobile) */}
							<div className="hidden md:flex items-center gap-2 opacity-60">
								<Zap size={14} fill="currentColor" />
								<span className="text-[10px] font-black uppercase tracking-[0.2em]">Priority_Stream</span>
							</div>

							{/* Main Content */}
							<div className="flex-1 flex items-center justify-center gap-3 text-xs md:text-sm font-bold tracking-tight">
								<motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
									<Sparkles size={16} className="min-w-4" />
								</motion.div>

								<p className="text-center">
									<span className="uppercase font-black">Limited Time Bazaar:</span> Up to 50% off on RTX Series & Gaming Peripherals!{" "}
									<Link href="/deals" className="ml-2 inline-block underline underline-offset-4 hover:text-white transition-colors decoration-2">
										DEPLOY DISCOUNT
									</Link>
								</p>
							</div>

							{/* Close Button */}
							<button onClick={() => setIsVisible(false)} className="p-1 hover:bg-black/10 rounded-sm transition-colors" aria-label="Close banner">
								<X size={16} strokeWidth={3} />
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
