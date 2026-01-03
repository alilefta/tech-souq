"use client";

import { motion, AnimatePresence } from "motion/react";
import { Terminal, ShieldCheck, Zap, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
	{ id: 1, type: "SALE", msg: "RTX_5090_VANGUARD DISPATCHED TO NODE_LONDON", time: "18:42:01" },
	{ id: 2, type: "AUTH", msg: "MASTER_ARCHITECT_ZAID LOGGED IN FROM BABYLON", time: "18:39:55" },
	{ id: 3, type: "WARN", msg: "SECTOR_CPU: STOCK_THRESHOLD_CRITICAL (3 units)", time: "18:35:12" },
	{ id: 4, type: "SYNC", msg: "REGISTRY_DATABASE_BACKUP_COMPLETE", time: "18:30:00" },
	{ id: 5, type: "SALE", msg: "RYZEN_9_7950X ALLOCATED TO NODE_RIYADH", time: "18:25:44" },
];

export function LiveFoundryLogs() {
	return (
		<div className="h-[400px] w-full bg-black/40 border border-white/5 font-mono overflow-hidden flex flex-col">
			<div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
				<span className="text-[8px] font-black uppercase text-[#94A3B8]">Foundry_Core_Live_Stream</span>
				<div className="flex gap-1">
					<div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
					<div className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-75" />
				</div>
			</div>

			<div className="p-4 space-y-3 overflow-y-auto custom-scrollbar">
				{logs.map((log) => (
					<div key={log.id} className="flex gap-4 group hover:bg-white/[0.02] p-1 transition-colors">
						<span className="text-[#94A3B8] text-[9px] shrink-0 opacity-40">{log.time}</span>
						<div className="flex items-center gap-3">
							<span
								className={cn(
									"text-[8px] px-1.5 py-0.5 border font-black uppercase",
									log.type === "SALE" ? "text-green-500 border-green-500/20" : log.type === "WARN" ? "text-red-500 border-red-500/20" : "text-[#FFB400] border-[#FFB400]/20"
								)}
							>
								{log.type}
							</span>
							<span className="text-[10px] text-[#F5F5F0] tracking-tight uppercase group-hover:text-[#FFB400] transition-colors">{log.msg}</span>
						</div>
					</div>
				))}
			</div>

			<div className="mt-auto p-4 border-t border-white/5 bg-white/[0.01]">
				<p className="text-[7px] text-[#94A3B8] uppercase italic">Awaiting_Next_System_Handshake...</p>
			</div>
		</div>
	);
}
