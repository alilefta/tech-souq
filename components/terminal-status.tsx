// components/home/terminal-status.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function TerminalStatus() {
	const [time, setTime] = useState("");

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="space-y-4 font-mono">
			<div className="flex justify-between items-center text-[10px]">
				<span className="text-[#94A3B8] uppercase tracking-widest">Base_Location:</span>
				<span className="text-[#F5F5F0] font-bold">BABYLON, IRQ (32.5° N)</span>
			</div>
			<div className="flex justify-between items-center text-[10px]">
				<span className="text-[#94A3B8] uppercase tracking-widest">Local_Time:</span>
				<span className="text-[#FFB400] font-bold">{time} GMT+3</span>
			</div>
			<div className="flex justify-between items-center text-[10px]">
				<span className="text-[#94A3B8] uppercase tracking-widest">Shipping_Lanes:</span>
				<span className="text-green-500 font-bold">ALL_ZONES_OPTIMAL</span>
			</div>

			{/* Visual Activity Bar */}
			<div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
				<motion.div
					animate={{ x: ["-100%", "100%"] }}
					transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
					className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#FFB400] to-transparent"
				/>
			</div>

			<p className="text-[8px] text-[#94A3B8] opacity-40 leading-tight">* Orders dispatched within 24h from Babylon Hub Alpha. Global transit times vary by localized node protocols.</p>
		</div>
	);
}
