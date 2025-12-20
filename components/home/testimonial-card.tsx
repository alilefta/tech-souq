// components/home/testimonial-card.tsx
"use client";

import { motion } from "motion/react";
import { ShieldCheck, Quote } from "lucide-react";

export function TestimonialCard({ data, index }: { data: any; index: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.2 }}
			className="group relative bg-[#1E293B]/10 border border-white/5 rounded-sm p-8 flex flex-col transition-all duration-500 hover:border-[#FFB400]/30"
		>
			{/* 1. VERIFICATION HEADER */}
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-full bg-[#FFB400]/10 flex items-center justify-center text-[#FFB400]">
						<ShieldCheck size={16} />
					</div>
					<div className="flex flex-col">
						<span className="text-[8px] font-black text-[#FFB400] uppercase tracking-widest">Status: Verified</span>
						<span className="text-[8px] font-mono text-[#94A3B8]">ID: {data.id}00-TS-2025</span>
					</div>
				</div>
				<div className="text-right">
					<span className="text-[8px] font-mono text-[#94A3B8] uppercase">Trust_Score</span>
					<p className="text-[#F5F5F0] text-xs font-bold">{data.trustScore}%</p>
				</div>
			</div>

			{/* 2. THE QUOTE */}
			<div className="relative mb-8">
				<Quote className="absolute -top-4 -left-4 text-[#FFB400]/20 w-12 h-12" />
				<p className="relative z-10 text-[#F5F5F0] text-lg font-medium leading-relaxed tracking-tight italic">"{data.quote}"</p>
			</div>

			{/* 3. THE CURATOR PORTRAIT */}
			<div className="mt-auto pt-8 border-t border-white/5 flex items-center gap-4">
				<div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:border-[#FFB400]/50 transition-colors">
					<img src={data.image} alt={data.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
				</div>
				<div className="flex flex-col">
					<h4 className="text-[#F5F5F0] font-bold text-sm uppercase tracking-tighter">{data.name}</h4>
					<p className="text-[#94A3B8] text-[10px] font-medium">{data.role}</p>
					<p className="text-[#FFB400] text-[9px] font-black uppercase mt-1 tracking-widest">{data.location}</p>
				</div>
			</div>

			{/* 4. HARDWARE TAG */}
			<div className="absolute top-1/2 -right-4 -translate-y-1/2 rotate-90 origin-right">
				<span className="text-[7px] font-mono text-white/5 group-hover:text-[#FFB400]/40 transition-colors uppercase tracking-[0.5em] whitespace-nowrap">
					Matched_Hardware: {data.hardware}
				</span>
			</div>
		</motion.div>
	);
}
