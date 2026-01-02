"use client";

import { OrderDTO } from "@/app/data/orders";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Package, ShieldCheck, Terminal as TerminalIcon } from "lucide-react";
import { motion } from "motion/react";

export function DispatchAuthorization({ order, isOpen, onClose }: { order: OrderDTO; isOpen: boolean; onClose: () => void }) {
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="w-full sm:max-w-xl bg-[#0A0E14] border-l border-white/5 p-0 flex flex-col font-sans overflow-hidden">
				{/* 1. HUD HEADER */}
				<SheetHeader className="p-8 border-b border-white/5 bg-white/1">
					<div className="flex justify-between items-center mb-4">
						<span className="text-[10px] font-mono text-[#FFB400] uppercase tracking-[0.4em]">Auth_Sequence: v6.0</span>
						<div className="flex items-center gap-2">
							<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
							<span className="text-[8px] font-bold text-[#F5F5F0] uppercase">Secure_Session</span>
						</div>
					</div>
					<SheetTitle className="text-3xl font-black text-[#F5F5F0] uppercase tracking-tighter">
						Clearance_Packet <span className="text-[#FFB400]">#{order.orderNumber}</span>
					</SheetTitle>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12">
					{/* 2. ITEM CHECKLIST */}
					<div className="space-y-6">
						<h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#94A3B8] border-b border-white/5 pb-2">Hardware_Verification</h4>
						<div className="grid grid-cols-1 gap-4">
							{order.items?.map((item) => (
								<div key={item.id} className="flex items-center justify-between p-4 bg-white/2 border border-white/5 group hover:border-[#FFB400]/40 transition-all">
									<div className="flex items-center gap-4">
										<div className="w-8 h-8 bg-white/5 flex items-center justify-center">
											<Package size={14} className="text-[#94A3B8] group-hover:text-[#FFB400]" />
										</div>
										<p className="text-xs font-bold text-[#F5F5F0] uppercase tracking-tight">{item.product.name}</p>
									</div>
									<span className="text-[10px] font-mono text-[#FFB400]">QTY: {item.quantity}</span>
								</div>
							))}
						</div>
					</div>

					{/* 3. LOGISTICS DATA */}
					<div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5">
						<div className="bg-[#0A0E14] p-6 space-y-2">
							<span className="text-[8px] font-mono text-[#94A3B8] uppercase opacity-40 tracking-widest">Routing_Node</span>
							<p className="text-xs font-black text-[#F5F5F0] uppercase">
								{order.city}, {order.country}
							</p>
						</div>
						<div className="bg-[#0A0E14] p-6 space-y-2">
							<span className="text-[8px] font-mono text-[#94A3B8] uppercase opacity-40 tracking-widest">Authorized_Carrier</span>
							<p className="text-xs font-black text-[#F5F5F0] uppercase">Global_Express_BBL</p>
						</div>
					</div>

					{/* 4. TRACKING INPUT TERMINAL */}
					<div className="space-y-4">
						<Label className="text-[9px] font-black uppercase text-[#FFB400] tracking-widest ml-1">Input_Tracking_Identifier</Label>
						<div className="relative">
							<TerminalIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] opacity-30" />
							<input
								className="w-full bg-white/3 border border-white/10 rounded-none h-14 pl-12 pr-4 text-xs font-mono uppercase tracking-widest focus:border-[#FFB400]/40 outline-none transition-all text-[#F5F5F0]"
								placeholder="BBL-TRANS-XXXXX"
							/>
						</div>
					</div>
				</div>

				{/* 5. FINAL AUTHORIZATION ACTION */}
				<div className="p-8 bg-[#0A0E14] border-t border-white/10">
					<motion.button
						whileHover={{ scale: 1.01 }}
						whileTap={{ scale: 0.99 }}
						className="w-full py-6 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.4em] shadow-[0_0_50px_rgba(255,180,0,0.1)] hover:shadow-[0_0_80px_rgba(255,180,0,0.3)] transition-all flex items-center justify-center gap-3"
					>
						Authorize_Transfer <ShieldCheck size={18} strokeWidth={2.5} />
					</motion.button>
					<p className="text-center mt-6 text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.3em] opacity-30">Final_Signature_Required // Action_Is_Irreversible</p>
				</div>
			</SheetContent>
		</Sheet>
	);
}
