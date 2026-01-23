"use client";

import { BlogPostDTO } from "@/app/data/blog";
import { SafeImage } from "@/components/ui/safe-image";
import { ArrowRight, Calendar, Clock, Hash } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export function BlogCard({ post, index }: { post: BlogPostDTO; index: number }) {
	return (
		<Link href={`/blog/${post.slug}`} className="group block h-full">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: index * 0.1 }}
				className="h-full border border-white/5 bg-[#0A0E14] hover:border-[#FFB400]/40 transition-all flex flex-col relative overflow-hidden"
			>
				{/* 1. VISUAL HEADER */}
				<div className="relative aspect-video w-full overflow-hidden bg-[#1E293B]/20 border-b border-white/5">
					<SafeImage
						src={post.image}
						alt={post.title}
						fill
						className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-[#0A0E14] to-transparent opacity-60" />

					{/* Category Tag */}
					<div className="absolute top-4 left-4">
						<span className="bg-[#FFB400] text-[#0A0E14] px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">{post.category}</span>
					</div>
				</div>

				{/* 2. DOSSIER CONTENT */}
				<div className="p-6 flex flex-col flex-1">
					<div className="flex items-center gap-4 text-[9px] font-mono text-[#94A3B8] uppercase mb-4 tracking-widest">
						<div className="flex items-center gap-1.5">
							<Calendar size={10} /> {post.date}
						</div>
						<div className="flex items-center gap-1.5">
							<Clock size={10} /> {post.readTime}
						</div>
					</div>

					<h3 className="text-xl font-bold text-[#F5F5F0] uppercase tracking-tight leading-snug mb-3 group-hover:text-[#FFB400] transition-colors">{post.title}</h3>

					<p className="text-sm text-[#94A3B8] leading-relaxed mb-8 flex-1 opacity-60 group-hover:opacity-100 transition-opacity">{post.excerpt}</p>

					{/* 3. FOOTER ACTION */}
					<div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
						<span className="text-[9px] font-black uppercase text-[#94A3B8] tracking-[0.2em] group-hover:text-[#F5F5F0]">Access_Log</span>
						<ArrowRight size={14} className="text-[#FFB400] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
					</div>
				</div>

				{/* Scanline Hover Effect */}
				<div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
					<div className="h-px w-full bg-[#FFB400] absolute top-0 animate-[scan_2s_linear_infinite]" />
				</div>
			</motion.div>
		</Link>
	);
}
