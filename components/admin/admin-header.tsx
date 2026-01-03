"use client";

import { useState, useEffect } from "react";
import { Search, Bell, User, Terminal, Wifi, Clock } from "lucide-react";
import { motion } from "motion/react";
import { HeaderSearch } from "./header-search";

export function AdminHeader() {
	const [time, setTime] = useState("");

	// Live clock to maintain the "Operations Room" feel
	useEffect(() => {
		const timer = setInterval(() => {
			setTime(
				new Date().toLocaleTimeString("en-US", {
					hour12: false,
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				})
			);
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<header className="h-20 border-b border-white/5 bg-[#0A0E14] flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md">
			{/* 1. REGISTRY QUICK SEARCH */}
			<div className="flex-1 max-w-xl">
				<HeaderSearch />
			</div>

			{/* 2. SYSTEM DATA HUB */}
			<div className="flex items-center gap-8">
				{/* TELEMETRY: Clock & Node */}
				<div className="hidden xl:flex items-center gap-6 border-x border-white/5 px-8 h-20">
					<div className="flex flex-col items-end">
						<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.3em] mb-1">Foundry_Time</span>
						<div className="flex items-center gap-2 text-[11px] font-bold text-[#F5F5F0] font-mono">
							<Clock size={12} className="text-[#FFB400]" />
							{time || "00:00:00"}
						</div>
					</div>

					<div className="flex flex-col items-end">
						<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.3em] mb-1">Signal_Strength</span>
						<div className="flex items-center gap-2 text-[11px] font-bold text-green-500 font-mono">
							<Wifi size={12} />
							99.8 MS
						</div>
					</div>
				</div>

				{/* ACTIONS: Signals & Auth */}
				<div className="flex items-center gap-4">
					{/* System Alerts */}
					<button className="relative p-2 text-[#94A3B8] hover:text-[#FFB400] transition-colors group">
						<Bell size={18} />
						<span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FFB400] rounded-full animate-pulse shadow-[0_0_8px_#FFB400]" />
						{/* Corner Hover Detail */}
						<div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FFB400] opacity-0 group-hover:opacity-100 transition-opacity" />
					</button>

					{/* Profile / Auth Level */}
					<div className="flex items-center gap-4 pl-4 border-l border-white/5">
						<div className="flex flex-col items-end">
							<span className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-tighter">Zaid_Al-Hilli</span>
							<span className="text-[#FFB400] text-[8px] font-mono uppercase tracking-widest opacity-60">[Master_Architect]</span>
						</div>
						<div className="w-10 h-10 border border-white/10 bg-white/2 flex items-center justify-center relative group cursor-pointer overflow-hidden">
							<User size={20} className="text-[#94A3B8] group-hover:text-[#F5F5F0] transition-colors" />
							{/* Technical Scanning Animation on Profile Pic hover */}
							<div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFB400]/10 to-transparent h-1/2 w-full -translate-y-full group-hover:translate-y-[200%] transition-transform duration-1000 pointer-events-none" />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
