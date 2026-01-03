"use client";

import { motion } from "motion/react";
import { Cpu, Zap, Thermometer, DollarSign, ShieldCheck, Terminal, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CrucibleHUD() {
	return (
		<div className="h-full w-full flex flex-col justify-between p-6">
			{/* TOP: SYSTEM IDENTIFIER */}
			<div className="flex justify-between items-start pointer-events-auto">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-3">
						<Terminal size={14} className="text-[#FFB400]" />
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.5em]">Architect_Protocol: v60.4</span>
					</div>
					<h1 className="text-4xl font-black uppercase tracking-tighter text-[#F5F5F0]">
						Crucible_<span className="text-[#FFB400]">Assembly</span>
					</h1>
				</div>

				<div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 backdrop-blur-md">
					<div className="flex flex-col items-end">
						<span className="text-[8px] font-mono text-[#94A3B8] uppercase">Authorization_Level</span>
						<span className="text-[10px] font-bold text-[#F5F5F0]">VANGUARD_ARCHITECT</span>
					</div>
					<div className="w-1 h-8 bg-[#FFB400]" />
				</div>
			</div>

			{/* MIDDLE: THE DUAL SIDEBARS */}
			<div className="flex-1 flex justify-between items-center my-8">
				{/* LEFT: PART SELECTOR (The Schematic) */}
				<aside className="w-80 h-full pointer-events-auto bg-black/40 border border-white/5 backdrop-blur-xl p-6 overflow-y-auto custom-scrollbar">
					<h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#94A3B8] mb-6 border-b border-white/5 pb-2">Schematic_Registry</h2>

					{/* Category Selection Modules */}
					<div className="space-y-4">
						{["Chassis", "Logic_Board", "CPU_Core", "Graphics_Node", "Energy_Cell"].map((step, i) => (
							<div key={step} className="group relative p-4 border border-white/5 bg-white/[0.01] hover:border-[#FFB400]/40 transition-all cursor-pointer">
								<div className="flex justify-between items-center">
									<span className="text-[9px] font-mono text-[#FFB400] opacity-40">0{i + 1}</span>
									<ShieldCheck size={12} className="text-green-500 opacity-20 group-hover:opacity-100 transition-opacity" />
								</div>
								<p className="text-xs font-black uppercase text-[#F5F5F0] mt-1">{step}</p>
							</div>
						))}
					</div>
				</aside>

				{/* RIGHT: THE TELEMETRY HUB */}
				<aside className="w-80 h-full pointer-events-auto flex flex-col gap-6">
					{/* PERFORMANCE READOUT */}
					<div className="bg-black/60 border border-white/5 backdrop-blur-xl p-6 space-y-6">
						<h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F5F5F0]">System_Telemetry</h3>

						<div className="space-y-4">
							<TelemetryBar label="Wattage_Draw" current={450} max={850} unit="W" color="text-[#FFB400]" />
							<TelemetryBar label="Thermal_Load" current={62} max={100} unit="°C" color="text-red-500" />
							<TelemetryBar label="Core_Symmetry" current={98} max={100} unit="%" color="text-green-500" />
						</div>
					</div>

					{/* PRICE MODULE */}
					<div className="bg-[#FFB400] p-6 text-[#0A0E14]">
						<p className="text-[9px] font-black uppercase tracking-widest mb-1">Total_Allocation_Value</p>
						<div className="flex items-baseline gap-2">
							<span className="text-4xl font-black tracking-tighter">$2,499.00</span>
							<span className="text-[10px] font-bold">USD</span>
						</div>
					</div>
				</aside>
			</div>

			{/* BOTTOM: THE DEPLOYMENT BAR */}
			<div className="flex items-center gap-6 pointer-events-auto">
				<div className="flex-1 h-14 bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-center px-6">
					<div className="flex gap-4">
						<span className="text-[9px] font-mono text-[#94A3B8] uppercase">LOG: </span>
						<span className="text-[9px] font-mono text-[#F5F5F0] uppercase animate-pulse">Awaiting_Graphics_Node_Allocation...</span>
					</div>
				</div>

				<button className="h-14 px-12 bg-[#FFB400] text-[#0A0E14] font-black uppercase text-xs tracking-[0.3em] shadow-[0_0_50px_rgba(255,180,0,0.2)] hover:bg-white transition-all flex items-center gap-4 group">
					Authorize_Build <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
				</button>
			</div>
		</div>
	);
}

function TelemetryBar({ label, current, max, unit, color }: any) {
	const percent = (current / max) * 100;
	return (
		<div className="space-y-2">
			<div className="flex justify-between items-end">
				<span className="text-[8px] font-black uppercase text-[#94A3B8] tracking-widest">{label}</span>
				<span className={cn("text-xs font-mono font-bold", color)}>
					{current}
					{unit}
				</span>
			</div>
			<div className="h-0.5 w-full bg-white/5">
				<div className={cn("h-full transition-all duration-1000 bg-current", color)} style={{ width: `${percent}%` }} />
			</div>
		</div>
	);
}
