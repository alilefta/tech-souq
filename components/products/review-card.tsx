// components/products/review-card.tsx
"use client";

import { motion } from "motion/react";
import { Star, ShieldCheck, MapPin, Calendar } from "lucide-react";

export function ReviewCard({ review }: { review: any }) {
	return (
		<motion.div whileHover={{ backgroundColor: "rgba(255, 180, 0, 0.02)" }} className="bg-[#0A0E14] p-8 flex flex-col transition-colors group relative">
			{/* 1. STATUS LINE */}
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-2">
					<ShieldCheck size={14} className="text-[#FFB400]" />
					<span className="text-[8px] font-mono text-[#FFB400] uppercase tracking-widest">Verification_Passed</span>
				</div>
				<span className="text-[8px] font-mono text-[#94A3B8] opacity-40">{review.id}</span>
			</div>

			{/* 2. RATING & INTEGRITY BAR */}
			<div className="mb-6">
				<div className="flex items-center gap-1 text-[#FFB400] mb-2">
					{[...Array(5)].map((_, i) => (
						<Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "opacity-100" : "opacity-20"} />
					))}
				</div>
				<div className="flex justify-between items-end">
					<span className="text-[8px] font-black text-[#94A3B8] uppercase">Hardware_Integrity</span>
					<span className="text-[10px] font-mono text-[#F5F5F0]">{review.integrity}%</span>
				</div>
				<div className="mt-1 h-px w-full bg-white/5 relative">
					<motion.div initial={{ width: 0 }} whileInView={{ width: `${review.integrity}%` }} className="absolute top-0 left-0 h-full bg-[#FFB400]" />
				</div>
			</div>

			{/* 3. CONTENT */}
			<p className="text-[#F5F5F0] text-sm leading-relaxed mb-8 italic opacity-80 group-hover:opacity-100 transition-opacity">&quot;{review.comment}&quot;</p>

			{/* 4. USER DATA */}
			<div className="mt-auto pt-6 border-t border-white/5">
				<h4 className="text-[#F5F5F0] text-sm font-bold uppercase tracking-tighter mb-1">{review.user}</h4>
				<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
					<div className="flex items-center gap-1.5 text-[#94A3B8] text-[9px] font-bold">
						<MapPin size={10} className="text-[#FFB400]" /> {review.location}
					</div>
					<div className="flex items-center gap-1.5 text-[#94A3B8] text-[9px] font-bold">
						<Calendar size={10} className="text-[#FFB400]" /> {review.date}
					</div>
				</div>

				{/* 5. TAGS */}
				<div className="mt-4 flex flex-wrap gap-2">
					{review.tags.map((tag: string) => (
						<span
							key={tag}
							className="text-[7px] font-black uppercase tracking-[0.2em] border border-white/10 px-2 py-0.5 text-[#94A3B8] group-hover:border-[#FFB400]/30 transition-colors"
						>
							{tag}
						</span>
					))}
				</div>
			</div>

			{/* 6. HOVER CORNER DETAIL */}
			<div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#FFB400]/0 group-hover:border-[#FFB400]/40 transition-all" />
		</motion.div>
	);
}
