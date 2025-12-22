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
			<div className="flex justify-between items-center text-[9px]">
				<span className="text-[#94A3B8] uppercase tracking-widest">Base_Coord:</span>
				<span className="text-[#F5F5F0] font-bold">32.47° N // 44.42° E</span>
			</div>
			<div className="flex justify-between items-center text-[9px]">
				<span className="text-[#94A3B8] uppercase tracking-widest">Foundry_Time:</span>
				<span className="text-[#FFB400] font-bold">{time} GMT+3</span>
			</div>
			<div className="flex justify-between items-center text-[9px]">
				<span className="text-[#94A3B8] uppercase tracking-widest">Logic_Protocol:</span>
				<span className="text-[#F5F5F0] font-bold">SEXAGESIMAL_v6.0</span>
			</div>
			<div className="flex justify-between items-center text-[9px]">
				<span className="text-[#94A3B8] uppercase tracking-widest">Transit_Lanes:</span>
				<span className="text-green-500 font-bold">ALL_ZONES_OPTIMAL</span>
			</div>

			{/* Visual Activity Bar */}
			<div className="mt-6 h-0.5 w-full bg-white/5 overflow-hidden">
				<motion.div
					animate={{ x: ["-100%", "100%"] }}
					transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
					className="h-full w-1/2 bg-linear-to-r from-transparent via-[#FFB400]/40 to-transparent"
				/>
			</div>

			<p className="text-[7px] text-[#94A3B8] opacity-30 leading-tight uppercase tracking-tighter">
				* Technical components undergo 48h synchronization at Babylon Foundry Node. Deployment authorized for all global sectors.
			</p>
		</div>
	);
}
