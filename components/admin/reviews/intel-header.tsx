"use client";

import { MessageSquare, Activity, ShieldCheck, Zap } from "lucide-react";

export function IntelHeader({ totalReports = 0, avgIntegrity = 98.4 }) {
	return (
		<header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 border-b border-white/5 pb-10 relative overflow-hidden">
			<div>
				<div className="flex items-center gap-3 mb-4">
					<div className="w-2 h-2 rounded-full bg-[#FFB400] animate-pulse shadow-[0_0_8px_#FFB400]" />
					<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.5em]">Vanguard_Intelligence: Receiving_Data</span>
				</div>
				<h1 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-[#F5F5F0] leading-none">
					Review <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Intel</span>
				</h1>
			</div>

			<div className="flex flex-wrap gap-4">
				<div className="bg-white/2 border border-white/5 px-8 py-4 flex flex-col items-end">
					<span className="text-[8px] font-black uppercase text-[#94A3B8] tracking-widest">Global_Integrity</span>
					<div className="flex items-baseline gap-2">
						<span className="text-3xl font-black text-green-500 font-mono tracking-tighter">{avgIntegrity}%</span>
						<span className="text-[10px] font-bold text-green-500 uppercase">Optimal</span>
					</div>
				</div>
				<div className="bg-white/2 border border-white/5 px-8 py-4 flex flex-col items-end">
					<span className="text-[8px] font-black uppercase text-[#94A3B8] tracking-widest">Total_Logs</span>
					<span className="text-3xl font-black text-[#F5F5F0] font-mono tracking-tighter">{totalReports.toString().padStart(3, "0")}</span>
				</div>
			</div>
		</header>
	);
}
