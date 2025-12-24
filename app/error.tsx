"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { AlertTriangle, RefreshCw, Home, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		// Log the technical error to an external service if needed
		console.error("FOUNDRY_CRITICAL_FAILURE:", error);
	}, [error]);

	return (
		<main className="relative min-h-screen w-full bg-[#0A0E14] flex flex-col items-center justify-center overflow-hidden font-sans p-6">
			{/* 1. BACKGROUND ALARM LIGHT */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[120px] rounded-full animate-pulse" />
				<div className="absolute inset-0 opacity-[0.02] flex items-center justify-center">
					<span className="text-[30vw] font-black italic select-none text-red-500">FAILURE</span>
				</div>
			</div>

			<div className="relative z-10 max-w-2xl w-full text-center">
				{/* 2. ERROR HUD */}
				<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-10 inline-flex flex-col items-center">
					<div className="w-20 h-20 border-2 border-red-500/20 flex items-center justify-center mb-6 relative">
						<AlertTriangle size={40} className="text-red-500 animate-pulse" />
						<div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-red-500" />
						<div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-red-500" />
					</div>

					<h1 className="text-[#F5F5F0] text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
						System <span className="text-red-500">Destabilized</span>
					</h1>
				</motion.div>

				{/* 3. DIAGNOSTIC DATA */}
				<div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 mb-12 text-left font-mono relative overflow-hidden">
					<div className="flex items-center gap-3 mb-4 text-red-500/50">
						<TerminalIcon size={14} />
						<span className="text-[10px] font-black uppercase tracking-[0.3em]">Core_Diagnostic_Report</span>
					</div>

					<div className="space-y-2">
						<p className="text-[#94A3B8] text-xs uppercase tracking-tight">
							<span className="text-red-500/40 mr-2">›</span> Status: <span className="text-[#F5F5F0]">ERROR_CONNECTION_OVERFLOW</span>
						</p>
						<p className="text-[#94A3B8] text-xs uppercase tracking-tight leading-relaxed">
							<span className="text-red-500/40 mr-2">›</span> Message:{" "}
							<span className="text-[#F5F5F0]">{error.message || "An unauthorized calculation sequence caused a foundry halt."}</span>
						</p>
						<p className="text-[#94A3B8] text-[10px] opacity-40 mt-4">TRACE_ID: {error.digest || "BBL_ERR_UNKNOWN"}</p>
					</div>

					{/* Decorative Scanline */}
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-[10%] w-full animate-scan pointer-events-none" />
				</div>

				{/* 4. RECOVERY ACTIONS */}
				<div className="flex flex-wrap items-center justify-center gap-6">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => reset()}
						className="flex items-center gap-3 px-10 py-5 bg-red-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-none shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:bg-red-500 transition-all"
					>
						<RefreshCw size={16} /> Attempt_Re-Sync
					</motion.button>

					<Link href="/">
						<button className="flex items-center gap-3 px-10 py-5 border border-white/10 text-[#F5F5F0] font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
							<Home size={16} /> Emergency_Exit
						</button>
					</Link>
				</div>
			</div>

			{/* Decorative Frame */}
			<div className="absolute top-8 left-8 bottom-8 right-8 border border-red-500/5 pointer-events-none" />
		</main>
	);
}
