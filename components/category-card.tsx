// components/home/category-card.tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Category {
	title: string;
	arabicTitle: string;
	slug: string;
	image: string;
	size: string;
	description: string;
}

export function CategoryCard({ category, index }: { category: Category; index: number }) {
	// Determine grid span based on the 'size' property
	const gridClasses =
		{
			large: "md:col-span-2 lg:col-span-2 row-span-1",
			tall: "md:col-span-1 lg:col-span-1 row-span-2",
			medium: "md:col-span-2 lg:col-span-2 row-span-1",
			small: "md:col-span-1 lg:col-span-1 row-span-1",
		}[category.size] || "col-span-1";

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.1 }}
			className={`${gridClasses} group relative overflow-hidden rounded-xl border border-white/5 bg-[#1E293B]/20 transition-all duration-500 hover:border-[#FFB400]/40`}
		>
			<Link href={`/categories/${category.slug}`} className="block h-full w-full">
				{/* Background Image with Overlay */}
				<div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
					<img src={category.image} alt={category.title} className="h-full w-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
					<div className="absolute inset-0 bg-linear-to-t from-[#0A0E14] via-[#0A0E14]/60 to-transparent" />
				</div>

				{/* Content */}
				<div className="relative z-10 flex h-full flex-col justify-end p-6">
					<div className="mb-2 flex items-center justify-between">
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-widest opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
							Enter Section
						</span>
						<ArrowUpRight size={18} className="text-[#FFB400] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
					</div>

					<div className="relative">
						{/* Arabic Background Text */}
						<span className="absolute -top-4 -left-2 text-white/5 text-4xl font-bold pointer-events-none group-hover:text-[#FFB400]/10 transition-colors">{category.arabicTitle}</span>

						<h4 className="text-2xl font-bold text-[#F5F5F0] tracking-tighter leading-none mb-1">{category.title}</h4>
						<p className="text-xs text-[#94A3B8] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">{category.description}</p>
					</div>
				</div>

				{/* Bottom Corner Accent */}
				<div className="absolute bottom-0 right-0 h-1 w-0 bg-[#FFB400] transition-all duration-500 group-hover:w-full" />
			</Link>
		</motion.div>
	);
}
