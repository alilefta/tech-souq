"use client";

import { MapPin, Mail, Clock, Globe } from "lucide-react";
import { motion } from "motion/react";

export function NodeInfo() {
	return (
		<div className="space-y-8">
			{/* 1. THE RADAR VISUAL */}
			<div className="relative aspect-video w-full bg-[#1E293B]/20 border border-white/5 overflow-hidden group">
				{/* Static Map Grid */}
				<div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

				{/* Radar Sweep Animation */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="w-64 h-64 border border-[#FFB400]/20 rounded-full flex items-center justify-center relative">
						<div className="absolute inset-0 border-t border-[#FFB400]/40 rounded-full animate-spin [animation-duration:3s]" />
						<div className="w-2 h-2 bg-[#FFB400] rounded-full shadow-[0_0_15px_#FFB400]" />
					</div>
				</div>

				{/* Coordinates Overlay */}
				<div className="absolute bottom-4 left-4 font-mono text-[9px] text-[#FFB400] uppercase tracking-widest bg-black/60 px-2 py-1 backdrop-blur-md border border-white/10">
					LAT: 32.47° N // LON: 44.42° E
				</div>
				<div className="absolute top-4 right-4 text-[9px] font-black text-[#F5F5F0] uppercase tracking-widest">Babylon_Sector_01</div>
			</div>

			{/* 2. CONTACT DETAILS */}
			<div className="bg-white/[0.02] border border-white/5 p-8 space-y-8">
				<div className="flex gap-4 items-start group hover:bg-white/[0.01] transition-colors p-2 -mx-2 rounded-sm">
					<div className="mt-1 text-[#94A3B8] group-hover:text-[#FFB400] transition-colors">
						<MapPin size={20} />
					</div>
					<div>
						<h4 className="text-[10px] font-black uppercase text-[#F5F5F0] tracking-widest mb-1">Physical_Node</h4>
						<p className="text-sm text-[#94A3B8] font-mono leading-relaxed">
							Foundry Complex Alpha
							<br />
							Sector 4, Industrial Quarter
							<br />
							Babylon, Iraq
						</p>
					</div>
				</div>

				<div className="flex gap-4 items-start group hover:bg-white/[0.01] transition-colors p-2 -mx-2 rounded-sm">
					<div className="mt-1 text-[#94A3B8] group-hover:text-[#FFB400] transition-colors">
						<Mail size={20} />
					</div>
					<div>
						<h4 className="text-[10px] font-black uppercase text-[#F5F5F0] tracking-widest mb-1">Digital_Relay</h4>
						<p className="text-sm text-[#94A3B8] font-mono">signals@base60.io</p>
						<p className="text-sm text-[#94A3B8] font-mono">architects@base60.io</p>
					</div>
				</div>

				<div className="flex gap-4 items-start group hover:bg-white/[0.01] transition-colors p-2 -mx-2 rounded-sm">
					<div className="mt-1 text-[#94A3B8] group-hover:text-[#FFB400] transition-colors">
						<Clock size={20} />
					</div>
					<div>
						<h4 className="text-[10px] font-black uppercase text-[#F5F5F0] tracking-widest mb-1">Operational_Cycles</h4>
						<p className="text-sm text-[#94A3B8] font-mono">MON - THU: 09:00 - 18:00 (GMT+3)</p>
						<p className="text-sm text-[#94A3B8] font-mono">FRI: Maintenance_Mode</p>
					</div>
				</div>
			</div>
		</div>
	);
}
