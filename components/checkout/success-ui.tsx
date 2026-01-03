"use client";

import { motion } from "motion/react";
import { ShieldCheck, Package, Globe, ArrowRight, Zap, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";
import { OrderDTO } from "@/app/data/orders";

export function SuccessUI({ order }: { order: OrderDTO }) {
	return (
		<div className="max-w-4xl mx-auto px-6 relative">
			{/* 1. BACKGROUND SEAL: The Babylonian Star pulses behind everything */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
				<span className="text-[40vw] font-black italic select-none">BBL</span>
			</div>

			<div className="relative z-10 flex flex-col items-center text-center">
				{/* 2. ICON ANIMATION: The "Authorization" Pulse */}
				<motion.div
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ type: "spring", damping: 15 }}
					className="w-24 h-24 border-2 border-[#FFB400] flex items-center justify-center mb-10 relative"
				>
					<ShieldCheck size={48} className="text-[#FFB400]" />
					<motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 border border-[#FFB400]" />
				</motion.div>

				{/* 3. HEADLINE: Staggered reveal */}
				<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
					<div className="flex items-center justify-center gap-3 mb-4">
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.5em]">Auth_Code: BBL-60-INTL</span>
					</div>
					<h1 className="text-[#F5F5F0] text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
						Dispatch <br />
						<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Initialized</span>
					</h1>
					<p className="text-[#94A3B8] text-sm md:text-base max-w-md mx-auto mb-12 font-medium leading-relaxed">
						Order manifest <span className="text-[#F5F5F0]">#{order.orderNumber}</span> has been verified. Hardware synchronization complete. Transfer from{" "}
						<span className="text-[#FFB400]">Babylon Hub Alpha</span> is in progress.
					</p>
				</motion.div>

				{/* 4. DISPATCH DATA GRID */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="w-full grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 shadow-2xl mb-12"
				>
					<div className="bg-[#0A0E14] p-6 flex flex-col items-center">
						<Package size={20} className="text-[#FFB400] mb-3 opacity-50" />
						<span className="text-[8px] font-black text-[#94A3B8] uppercase tracking-widest mb-1 text-center">Modules_Allocated</span>
						<span className="text-[#F5F5F0] font-mono text-sm uppercase">{order.items.length} units</span>
					</div>
					<div className="bg-[#0A0E14] p-6 flex flex-col items-center">
						<Globe size={20} className="text-[#FFB400] mb-3 opacity-50" />
						<span className="text-[8px] font-black text-[#94A3B8] uppercase tracking-widest mb-1 text-center">Destination_Node</span>
						<span className="text-[#F5F5F0] font-mono text-sm uppercase truncate max-w-full">
							{order.city}, {order.country}
						</span>
					</div>
					<div className="bg-[#0A0E14] p-6 flex flex-col items-center">
						<Zap size={20} className="text-[#FFB400] mb-3 opacity-50" />
						<span className="text-[8px] font-black text-[#94A3B8] uppercase tracking-widest mb-1 text-center">Transit_Protocol</span>
						<span className="text-[#F5F5F0] font-mono text-sm uppercase">Global_Express</span>
					</div>
				</motion.div>

				{/* 5. SYSTEM LOG (Decorative but informative) */}
				<div className="w-full max-w-xl bg-white/2 border border-white/5 p-6 font-mono text-left mb-12 relative overflow-hidden">
					<div className="flex items-center gap-2 mb-4 text-[#FFB400]/40">
						<TerminalIcon size={12} />
						<span className="text-[9px] font-black uppercase tracking-widest">Real-Time_Log_Stream</span>
					</div>
					<div className="space-y-1 text-[9px] text-[#94A3B8] uppercase">
						<p>
							<span className="text-green-500">›</span> Payment_Verified: SUCCESS
						</p>
						<p>
							<span className="text-green-500">›</span> Stock_Locked: SECTOR_BBL_01
						</p>
						<p>
							<span className="text-green-500">›</span> Label_Generated: {order.orderNumber}
						</p>
						<p>
							<span className="text-[#FFB400] animate-pulse">›</span> Awaiting_Courier_Handshake...
						</p>
					</div>
					{/* Subtle scanline */}
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFB400]/5 to-transparent h-[20%] w-full animate-scan pointer-events-none" />
				</div>

				{/* 6. NEXT STEPS */}
				<div className="flex flex-wrap items-center justify-center gap-6">
					<Link href="/">
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="px-10 py-5 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_30px_rgba(255,180,0,0.3)]"
						>
							Return to Command Center
						</motion.button>
					</Link>
					<button className="px-10 py-5 border border-white/10 text-[#F5F5F0] font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center gap-3">
						Archive Manifest <ArrowRight size={14} />
					</button>
				</div>

				<p className="mt-12 text-[8px] font-mono text-[#94A3B8] uppercase tracking-[0.4em] opacity-30">A confirmation signal has been sent to {order.email}</p>
			</div>
		</div>
	);
}
