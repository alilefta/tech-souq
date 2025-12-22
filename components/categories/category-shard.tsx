"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryDetailsDTO } from "@/app/data/category";
import { SafeImage } from "@/components/ui/safe-image";

export function CategoryShard({ category, index }: { category: CategoryDetailsDTO; index: number }) {
	// Logic to determine grid span based on the 'gridDisplay' DB property
	const gridClasses =
		{
			large: "md:col-span-2 lg:col-span-2 row-span-2",
			tall: "md:col-span-1 row-span-2",
			medium: "md:col-span-2",
			small: "col-span-1",
		}[category.gridDisplay as string] || "col-span-1";

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.05 }}
			className={`${gridClasses} group relative overflow-hidden bg-[#1E293B]/10 border border-white/5 hover:border-[#FFB400]/40 transition-all duration-700`}
		>
			<Link href={`/categories/${category.slug}`} className="block h-full w-full">
				{/* 1. BACKGROUND VISUAL WITH SAFE FALLBACK */}
				<div className="absolute inset-0 z-0 opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000">
					<SafeImage src={category.imageUrl} alt={category.name} fallbackName={`Sector_${category.name}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
					{/* Cinematic Overlay Gradient */}
					<div className="absolute inset-0 bg-linear-to-t from-[#0A0E14] via-[#0A0E14]/60 to-transparent z-10" />
				</div>

				{/* 2. HUD CONTENT */}
				<div className="relative z-20 h-full p-6 lg:p-8 flex flex-col justify-between">
					<div className="flex justify-between items-start">
						<div className="flex flex-col gap-1">
							<span className="text-[8px] font-mono text-[#FFB400] tracking-widest uppercase">Sector_ID: 0{index + 1}</span>
							<div className="flex items-center gap-2">
								<div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
								<span className="text-[9px] font-bold text-[#F5F5F0] uppercase tracking-tighter">System_Active</span>
							</div>
						</div>
						<div className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#94A3B8] group-hover:text-[#FFB400] group-hover:border-[#FFB400]/40 transition-all">
							<ArrowUpRight size={18} />
						</div>
					</div>

					<div className="relative">
						{/* ARABIC BACKGROUND GHOST-TEXT */}
						<span className="absolute -top-10 -left-2 text-white/3 group-hover:text-[#FFB400]/10 text-6xl font-black transition-colors pointer-events-none uppercase italic">
							{category.arabicName}
						</span>

						<h3 className="text-2xl lg:text-3xl font-black text-[#F5F5F0] tracking-tighter uppercase leading-none mb-2">{category.name}</h3>
						<div className="flex items-center gap-4">
							<p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-[0.2em]">Modules: [{category._count?.products || 0}]</p>
							<div className="h-px flex-1 bg-white/5" />
						</div>
					</div>
				</div>

				{/* 3. DYNAMIC PROGRESS BORDER */}
				<div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FFB400] group-hover:w-full transition-all duration-700 z-30" />
			</Link>
		</motion.div>
	);
}
