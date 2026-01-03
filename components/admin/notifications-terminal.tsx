"use client";

import { Bell, Info, AlertTriangle, Zap, CheckCircle2, Terminal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Mock Data: In production, this comes from a useSWR or useQuery hook tied to Pusher
const alerts = [
	{ id: "ALR-01", type: "CRITICAL", msg: "SECTOR_CPU: STOCK_LEVEL_CRITICAL", time: "2m ago" },
	{ id: "ALR-02", type: "SUCCESS", msg: "DISPATCH_#BBL-1025_AUTHORIZED", time: "15m ago" },
	{ id: "ALR-03", type: "SYSTEM", msg: "BABYLON_CORE_SYNC_COMPLETE", time: "1h ago" },
];

export function NotificationsTerminal() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<button title="Show Notifications" className="relative p-2 text-[#94A3B8] hover:text-[#FFB400] transition-colors group">
					<Bell size={18} />
					<span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FFB400] rounded-full animate-pulse shadow-[0_0_8px_#FFB400]" />
					<div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FFB400] opacity-0 group-hover:opacity-100 transition-opacity" />
				</button>
			</PopoverTrigger>

			<PopoverContent className="w-80 bg-[#0A0E14] border-white/10 rounded-none p-0 shadow-2xl z-50 overflow-hidden">
				{/* TERMINAL HEADER */}
				<div className="p-4 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
					<span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F5F5F0]">Alert_Stream</span>
					<span className="text-[7px] font-mono text-[#94A3B8] opacity-40">NODE: BBL_ALPHA_LOG</span>
				</div>

				{/* LOG LIST */}
				<div className="max-h-[350px] overflow-y-auto custom-scrollbar">
					{alerts.map((alert) => (
						<div key={alert.id} className="p-4 border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors group/item">
							<div className="flex gap-4">
								<div className={cn("mt-1 shrink-0", alert.type === "CRITICAL" ? "text-red-500" : alert.type === "SUCCESS" ? "text-green-500" : "text-[#FFB400]")}>
									{alert.type === "CRITICAL" ? <AlertTriangle size={14} /> : <Zap size={14} />}
								</div>
								<div className="flex-1">
									<p className="text-[10px] font-bold text-[#F5F5F0] leading-tight uppercase tracking-tight group-hover/item:text-[#FFB400] transition-colors">{alert.msg}</p>
									<div className="flex items-center justify-between mt-2">
										<span className="text-[8px] font-mono text-[#94A3B8] opacity-40">{alert.id}</span>
										<span className="text-[8px] font-mono text-[#94A3B8] opacity-40">{alert.time}</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* FOOTER */}
				<button className="w-full py-3 bg-white/[0.02] text-[8px] font-black uppercase text-[#94A3B8] tracking-[0.4em] hover:text-[#FFB400] hover:bg-white/[0.04] transition-all">
					Clear_Session_Logs
				</button>
			</PopoverContent>
		</Popover>
	);
}
