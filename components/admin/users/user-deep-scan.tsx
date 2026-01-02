"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { UserDTO } from "@/app/data/user";
import { Package, MessageSquare, ShieldCheck, Activity, Terminal } from "lucide-react";

export function UserDeepScan({ user, isOpen, onClose }: { user: UserDTO | null; isOpen: boolean; onClose: () => void }) {
	if (!user) return null;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="w-full sm:max-w-xl bg-[#0A0E14] border-l border-white/5 p-0 flex flex-col overflow-hidden font-sans">
				<SheetDescription className="sr-only">Deep audit for Architect {user.id}</SheetDescription>

				{/* 1. HUD HEADER */}
				<SheetHeader className="p-8 border-b border-white/5 bg-white/[0.01]">
					<div className="flex justify-between items-center mb-4">
						<span className="text-[9px] font-mono text-[#FFB400] uppercase tracking-[0.4em]">ENTITY_ID: {user.id}</span>
						<span className="px-2 py-1 bg-white/5 border border-white/10 text-[8px] font-mono text-[#94A3B8]">LAST_SYNC: {user.lastSync.toLocaleTimeString()}</span>
					</div>
					<SheetTitle className="text-3xl font-black text-[#F5F5F0] uppercase tracking-tighter">
						{user.name} <span className="text-[#FFB400] opacity-20">{"// Dossier"}</span>
					</SheetTitle>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12">
					{/* 2. AGGREGATED METRICS */}
					<div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 shadow-2xl">
						<div className="bg-[#0A0E14] p-6 space-y-2">
							<span className="text-[8px] font-mono text-[#94A3B8] uppercase tracking-widest">Total_Allocation</span>
							<p className="text-2xl font-black text-[#F5F5F0] tracking-tighter">${user.totalAllocation.toLocaleString()}</p>
						</div>
						<div className="bg-[#0A0E14] p-6 space-y-2">
							<span className="text-[8px] font-mono text-[#94A3B8] uppercase tracking-widest">Report_Integrity</span>
							<div className="flex items-baseline gap-2">
								<p className="text-2xl font-black text-green-500 font-mono">{user.reportIntegrity}%</p>
							</div>
						</div>
					</div>

					{/* 3. LOG HISTORY (Simulated) */}
					<div className="space-y-6">
						<div className="flex items-center gap-3">
							<Terminal size={14} className="text-[#FFB400]" />
							<h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F5F5F0]">Interaction_History</h4>
						</div>

						<div className="space-y-4">
							{[
								{ type: "Order", id: "#BBL-1025", val: "Dispatch_Confirmed", date: "2 days ago" },
								{ type: "Intel", id: "#LOG-082", val: "Hardware_Verified", date: "5 days ago" },
								{ type: "Support", id: "#TK-004", val: "Node_Synchronization", date: "12 days ago" },
							].map((item, i) => (
								<div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 group hover:border-[#FFB400]/20 transition-all">
									<div className="flex items-center gap-4">
										<div className="w-8 h-8 bg-white/5 flex items-center justify-center">{item.type === "Order" ? <Package size={14} /> : <MessageSquare size={14} />}</div>
										<div>
											<p className="text-[10px] font-bold text-[#F5F5F0] uppercase tracking-tight">{item.id}</p>
											<p className="text-[8px] font-mono text-[#94A3B8] uppercase">{item.val}</p>
										</div>
									</div>
									<span className="text-[8px] font-mono text-[#94A3B8] opacity-30">{item.date}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* 4. CLEARANCE ACTIONS */}
				<div className="p-8 border-t border-white/5 bg-[#0A0E14] grid grid-cols-2 gap-4">
					<button className="py-4 border border-white/10 text-[#F5F5F0] text-[9px] font-black uppercase tracking-widest hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/40 transition-all">
						Suspend_Node
					</button>
					<button className="py-4 bg-[#FFB400] text-[#0A0E14] text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl">Calibrate_Rank</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
