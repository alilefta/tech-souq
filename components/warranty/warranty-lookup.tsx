"use client";

import { useState } from "react";
import { Search, Loader2, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function WarrantyLookup() {
	const [query, setQuery] = useState("");
	const [status, setStatus] = useState<"IDLE" | "SCANNING" | "ACTIVE" | "EXPIRED">("IDLE");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (!query) return;

		setStatus("SCANNING");

		// SIMULATED NETWORK DELAY
		setTimeout(() => {
			// Mock Logic: If ID ends in "X", it's expired.
			if (query.toUpperCase().endsWith("X")) setStatus("EXPIRED");
			else setStatus("ACTIVE");
		}, 1500);
	};

	return (
		<div className="relative z-10">
			<form onSubmit={handleSearch} className="relative group max-w-xl mx-auto mb-12">
				<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
					<Search className={cn("w-5 h-5 transition-colors", status === "SCANNING" ? "text-[#FFB400] animate-pulse" : "text-[#94A3B8]")} />
				</div>
				<input
					type="text"
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						if (status !== "IDLE") setStatus("IDLE"); // Reset on type
					}}
					placeholder="ENTER_S/N_OR_ORDER_ID..."
					className="w-full h-16 bg-[#1E293B]/20 border border-white/10 pl-14 pr-32 text-sm font-mono uppercase tracking-widest text-[#F5F5F0] outline-none focus:border-[#FFB400]/40 focus:bg-[#FFB400]/5 transition-all placeholder:text-white/10"
				/>
				<button
					type="submit"
					disabled={status === "SCANNING"}
					className="absolute right-2 top-2 bottom-2 px-6 bg-[#FFB400] text-[#0A0E14] font-black text-[9px] uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 disabled:grayscale"
				>
					{status === "SCANNING" ? "PINGING..." : "VERIFY"}
				</button>
			</form>

			{/* RESULTS DISPLAY */}
			<div className="h-64 flex items-center justify-center">
				<AnimatePresence mode="wait">
					{status === "IDLE" && (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center opacity-30">
							<ShieldCheck size={48} className="mx-auto mb-4 text-[#94A3B8]" />
							<p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">Awaiting_Hardware_Signal</p>
						</motion.div>
					)}

					{status === "SCANNING" && (
						<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
							<div className="relative">
								<div className="w-20 h-20 border-2 border-[#FFB400]/20 rounded-full animate-spin-slow" />
								<div className="absolute inset-0 flex items-center justify-center">
									<Loader2 className="text-[#FFB400] animate-spin" size={24} />
								</div>
							</div>
							<p className="text-[10px] font-black text-[#F5F5F0] uppercase tracking-[0.3em]">Querying_Babylon_Database...</p>
						</motion.div>
					)}

					{status === "ACTIVE" && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							className="w-full max-w-lg border border-green-500/20 bg-green-500/5 p-8 relative overflow-hidden"
						>
							<div className="flex items-start gap-6 relative z-10">
								<div className="p-4 border border-green-500/20 bg-green-500/10 rounded-full">
									<CheckCircle2 size={32} className="text-green-500" />
								</div>
								<div className="flex-1">
									<h4 className="text-xl font-black text-[#F5F5F0] uppercase tracking-tight mb-1">Active_Protection</h4>
									<p className="text-xs text-[#94A3B8] font-mono mb-4">
										Valid until: <span className="text-green-500">2027.05.22</span>
									</p>
									<button className="flex items-center gap-2 text-[9px] font-black text-green-500 uppercase tracking-widest hover:text-white transition-colors">
										Initiate_Claim <ArrowRight size={12} />
									</button>
								</div>
							</div>
							{/* Success Scanline */}
							<div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 shadow-[0_0_20px_#22c55e]" />
						</motion.div>
					)}

					{status === "EXPIRED" && (
						<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full max-w-lg border border-red-500/20 bg-red-500/5 p-8 relative">
							<div className="flex items-start gap-6">
								<div className="p-4 border border-red-500/20 bg-red-500/10 rounded-full">
									<XCircle size={32} className="text-red-500" />
								</div>
								<div className="flex-1">
									<h4 className="text-xl font-black text-[#F5F5F0] uppercase tracking-tight mb-1">Coverage_Expired</h4>
									<p className="text-xs text-[#94A3B8] font-mono mb-4">Hardware ID: {query.toUpperCase()}</p>
									<p className="text-[10px] text-red-400 opacity-60 leading-relaxed">
										This module is outside the 2-Year Foundry Protection window. Support is limited to paid diagnostics.
									</p>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
