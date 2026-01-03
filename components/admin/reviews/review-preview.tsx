// components/admin/reviews/review-preview.tsx
"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ReviewDTO } from "@/app/data/review";
import { User, Terminal, Star, ShieldCheck, Calendar, MapPin, Quote, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export function ReviewPreview({ log, isOpen, onClose }: { log: ReviewDTO | null; isOpen: boolean; onClose: () => void }) {
	if (!log) return null;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="w-full sm:max-w-lg bg-[#0A0E14] border-l border-white/5 p-0 flex flex-col overflow-hidden font-sans">
				<SheetDescription className="sr-only">Comprehensive Intel Scan for Log {log.id}</SheetDescription>

				{/* 1. HEADER: HUD TELEMETRY */}
				<SheetHeader className="p-8 border-b border-white/5 bg-white/[0.01]">
					<div className="flex justify-between items-center mb-4">
						<span className="text-[9px] font-mono text-[#FFB400] uppercase tracking-[0.4em]">Report_Hash: {log.id}</span>
						<div className="flex items-center gap-2">
							<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
							<span className="text-[8px] font-bold text-[#F5F5F0] uppercase">Signal_Verified</span>
						</div>
					</div>
					<SheetTitle className="text-3xl font-black text-[#F5F5F0] uppercase tracking-tighter">
						Vanguard <span className="text-[#FFB400]">Intelligence</span>
					</SheetTitle>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
					{/* 2. ENTITY PROFILE */}
					<div className="flex items-center gap-6 p-6 bg-white/2 border border-white/5 relative overflow-hidden">
						<div className="w-16 h-16 rounded-none bg-[#1E293B] border border-white/10 flex items-center justify-center relative">
							<User size={32} className="text-[#94A3B8] opacity-20" />
							<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFB400] flex items-center justify-center">
								<ShieldCheck size={10} className="text-[#0A0E14]" />
							</div>
						</div>
						<div>
							<h4 className="text-xl font-black text-[#F5F5F0] uppercase tracking-tight">{log.user}</h4>
							<p className="text-[#FFB400] text-[9px] font-mono uppercase tracking-widest">{log.rank}</p>
							<div className="flex items-center gap-2 mt-2 text-[#94A3B8] text-[9px] font-bold uppercase">
								<MapPin size={10} /> {log.location}
							</div>
						</div>
					</div>

					{/* 3. INTEGRITY READOUT */}
					<div className="grid grid-cols-2 gap-4">
						<div className="p-4 border border-white/5 bg-white/[0.01]">
							<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-widest block mb-2">Hardware_Integrity</span>
							<div className="flex items-baseline gap-2">
								<span className="text-2xl font-black text-[#F5F5F0] font-mono">{log.integrity}%</span>
								<span className="text-[8px] text-green-500 font-bold uppercase">Safe</span>
							</div>
						</div>
						<div className="p-4 border border-white/5 bg-white/[0.01]">
							<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-widest block mb-2">Registry_Date</span>
							<p className="text-sm font-bold text-[#F5F5F0] uppercase tracking-tighter">{new Date(log.createdAt).toLocaleDateString()}</p>
						</div>
					</div>

					{/* 4. THE FULL LOG (Comment) */}
					<div className="space-y-4">
						<div className="flex items-center gap-3 opacity-40">
							<Terminal size={12} className="text-[#FFB400]" />
							<span className="text-[9px] font-black uppercase tracking-widest">Decrypted_Narrative_Log</span>
						</div>
						<div className="relative p-6 bg-white/[0.01] border-l-2 border-[#FFB400]/20 italic">
							<Quote className="absolute top-2 right-2 text-white/5" size={40} />
							<p className="text-sm text-[#F5F5F0] leading-relaxed relative z-10">&quot;{log.comment}&quot;</p>
						</div>
					</div>

					{/* 5. MATCHED HARDWARE TILE */}
					<div className="p-6 border border-dashed border-white/10 flex items-center justify-between group hover:border-[#FFB400]/40 transition-all cursor-pointer">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 bg-white/5 flex items-center justify-center">
								<Terminal size={18} className="text-[#94A3B8] group-hover:text-[#FFB400] transition-colors" />
							</div>
							<div>
								<p className="text-[8px] font-mono text-[#94A3B8] uppercase opacity-40">Matched_Hardware</p>
								<p className="text-[10px] font-black text-[#F5F5F0] uppercase tracking-widest">{log.hardwareName}</p>
							</div>
						</div>
						<ArrowUpRight size={16} className="text-[#94A3B8] group-hover:text-[#FFB400]" />
					</div>
				</div>

				{/* 6. MODERATION ACTIONS */}
				<div className="p-8 border-t border-white/5 bg-[#0A0E14] grid grid-cols-2 gap-4">
					<button className="py-4 border border-white/10 text-[#F5F5F0] text-[9px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Archive_Log</button>
					<button className="py-4 bg-[#FFB400] text-[#0A0E14] text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl">Authorize_Signal</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
