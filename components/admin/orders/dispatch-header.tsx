"use client";

import { motion } from "motion/react";
import { Truck, Activity, Globe, Terminal } from "lucide-react";

interface DispatchHeaderProps {
	activeTransfers: number;
	systemHealth: string;
}

export function DispatchHeader({ activeTransfers = 42, systemHealth = "99.9%" }: DispatchHeaderProps) {
	return (
		<header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 border-b border-white/5 pb-10 relative overflow-hidden">
			{/* 1. SECTOR IDENTITY */}
			<div className="relative z-10">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-2 h-2 rounded-full bg-[#FFB400] animate-pulse shadow-[0_0_8px_#FFB400]" />
					<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.5em]">Logistics_Command: Active_Node_32.5N</span>
				</div>

				<h1 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-[#F5F5F0] leading-none">
					Dispatch <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Hub</span>
				</h1>

				<div className="mt-4 flex items-center gap-6">
					<div className="flex items-center gap-2">
						<Terminal size={12} className="text-[#94A3B8] opacity-40" />
						<span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest">Protocol: GLOBAL_TRANSFER_v6.0</span>
					</div>
					<div className="h-px w-12 bg-white/10" />
					<div className="flex items-center gap-2">
						<Globe size={12} className="text-[#94A3B8] opacity-40" />
						<span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest">Origin: BABYLON_IRQ</span>
					</div>
				</div>
			</div>

			{/* 2. REAL-TIME TELEMETRY MODULES */}
			<div className="flex flex-wrap gap-4 relative z-10">
				{/* ACTIVE TRANSFERS READOUT */}
				<div className="bg-white/2 border border-white/5 px-8 py-4 min-w-45 group hover:border-[#FFB400]/40 transition-all relative">
					<div className="flex justify-between items-start mb-2">
						<span className="text-[8px] font-black uppercase text-[#94A3B8] tracking-[0.2em]">Active_Transfers</span>
						<Truck size={14} className="text-[#94A3B8] group-hover:text-[#FFB400] transition-colors" />
					</div>
					<div className="flex items-baseline gap-2">
						<span className="text-3xl font-black text-[#F5F5F0] font-mono tracking-tighter">{activeTransfers.toString().padStart(3, "0")}</span>
						<span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Units</span>
					</div>
					{/* Decorative micro-chart line */}
					<div className="absolute bottom-0 left-0 w-full h-px bg-white/5 overflow-hidden">
						<motion.div
							animate={{ x: ["-100%", "100%"] }}
							transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
							className="w-1/3 h-full bg-linear-to-r from-transparent via-[#FFB400]/40 to-transparent"
						/>
					</div>
				</div>

				{/* SYSTEM HEALTH READOUT */}
				<div className="bg-white/2 border border-white/5 px-8 py-4 min-w-45 group hover:border-[#FFB400]/40 transition-all relative">
					<div className="flex justify-between items-start mb-2">
						<span className="text-[8px] font-black uppercase text-[#94A3B8] tracking-[0.2em]">Foundry_Health</span>
						<Activity size={14} className="text-[#94A3B8] group-hover:text-[#FFB400] transition-colors" />
					</div>
					<div className="flex items-baseline gap-2">
						<span className="text-3xl font-black text-green-500 font-mono tracking-tighter">{systemHealth}</span>
						<span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-tighter">Optimal</span>
					</div>
					{/* Corner Brackets */}
					<div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFB400]/0 group-hover:border-[#FFB400]/40 transition-all" />
				</div>
			</div>

			{/* 3. BACKGROUND DECORATION: Logistics Matrix */}
			<div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
				<span className="absolute top-[-20%] right-[-10%] text-[20vw] font-black italic text-white uppercase tracking-tighter">LOGS</span>
			</div>
		</header>
	);
}
