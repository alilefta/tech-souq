"use client";

import { useState } from "react";
import { ArrowRight, Loader2, FileText, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function RMAForm() {
	const [state, setState] = useState<"IDLE" | "PROCESSING" | "AUTHORIZED">("IDLE");
	const [rmaCode, setRmaCode] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setState("PROCESSING");

		// Simulate Logic
		setTimeout(() => {
			setRmaCode(`RMA-${Math.floor(Math.random() * 90000) + 10000}-BBL`);
			setState("AUTHORIZED");
			toast.success("RETURN_AUTHORIZED", {
				description: "LABEL_GENERATED // CHECK_SIGNAL_ADDRESS (EMAIL)",
			});
		}, 2000);
	};

	return (
		<div className="w-full max-w-2xl mx-auto bg-[#1E293B]/20 border border-white/5 p-8 md:p-12 relative overflow-hidden">
			{/* Background Texture */}
			<div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

			<div className="relative z-10">
				<AnimatePresence mode="wait">
					{state !== "AUTHORIZED" ? (
						<motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-8">
							<div className="space-y-2 text-center">
								<h3 className="text-xl font-black text-[#F5F5F0] uppercase tracking-tighter">Initiate_Return_Ticket</h3>
								<p className="text-xs text-[#94A3B8] font-mono">Enter manifest details to generate shipping label.</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Manifest_ID</label>
									<input
										required
										type="text"
										placeholder="BBL-HEX-XXXX"
										className="w-full h-12 bg-[#0A0E14] border border-white/10 px-4 text-xs font-mono text-[#F5F5F0] outline-none focus:border-[#FFB400]/40 transition-all uppercase"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Signal_Address</label>
									<input
										required
										type="email"
										placeholder="EMAIL@DOMAIN.COM"
										className="w-full h-12 bg-[#0A0E14] border border-white/10 px-4 text-xs font-mono text-[#F5F5F0] outline-none focus:border-[#FFB400]/40 transition-all uppercase"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Return_Logic</label>
								<select
									title="Return_Reason"
									className="w-full h-12 bg-[#0A0E14] border border-white/10 px-4 text-xs font-mono text-[#F5F5F0] outline-none focus:border-[#FFB400]/40 transition-all uppercase cursor-pointer"
								>
									<option>Hardware_Defect (DOA)</option>
									<option>Performance_Instability</option>
									<option>Protocol_Change (Changed Mind)</option>
								</select>
							</div>

							<button
								type="submit"
								disabled={state === "PROCESSING"}
								className="w-full h-14 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50 disabled:grayscale"
							>
								{state === "PROCESSING" ? (
									<>
										Processing_Request <Loader2 size={16} className="animate-spin" />
									</>
								) : (
									<>
										Generate_RMA_Label <ArrowRight size={16} />
									</>
								)}
							</button>
						</motion.form>
					) : (
						<motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
							<div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto relative">
								<FileText size={32} className="text-green-500" />
								<div className="absolute inset-0 border-t-2 border-green-500 rounded-full animate-spin-slow" />
							</div>

							<div className="space-y-2">
								<h3 className="text-2xl font-black text-[#F5F5F0] uppercase tracking-tighter">Return_Authorized</h3>
								<p className="text-xs text-[#94A3B8] font-mono">Your unique recovery code has been generated.</p>
							</div>

							<div className="p-6 bg-[#0A0E14] border border-white/10 inline-block w-full">
								<p className="text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.3em] mb-2">RMA_IDENTIFIER</p>
								<p className="text-3xl font-black text-[#FFB400] font-mono tracking-widest">{rmaCode}</p>
							</div>

							<button className="w-full h-14 border border-white/10 text-[#F5F5F0] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white/5 transition-all">
								<Download size={16} /> Download_Shipping_Label
							</button>

							<button onClick={() => setState("IDLE")} className="text-[9px] font-mono text-[#94A3B8] underline uppercase tracking-widest hover:text-[#FFB400]">
								Process_Another_Ticket
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
