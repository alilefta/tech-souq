"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Category {
	title: string;
	arabicTitle: string;
	slug: string;
	image: string;
	size: string;
	description: string;
}

export function CategoryCard({ category, index }: { category: Category; index: number }) {
	const [isActive, setIsActive] = useState(false);

	// GRID LAYOUT LOGIC (Keep this at 'md' so tablets get the nice grid)
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
			// VIEWPORT LOGIC: Activates on Mobile AND Tablets
			onViewportEnter={() => setIsActive(true)}
			onViewportLeave={() => setIsActive(false)}
			viewport={{ once: false, amount: 0.4 }} // 40% visibility triggers it
			transition={{ delay: index * 0.1 }}
			className={`${gridClasses} group relative overflow-hidden rounded-xl border border-white/5 bg-[#1E293B]/20 transition-all duration-500 hover:border-[#FFB400]/40`}
		>
			<Link href={`/categories/${category.slug}`} className="block h-full w-full">
				{/* 1. IMAGE LAYER */}
				<div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
					<img
						src={category.image}
						alt={category.title}
						className={cn(
							"h-full w-full object-cover transition-all duration-700",
							// Default (Mobile & Tablet): State-based
							isActive ? "grayscale-0 opacity-60" : "grayscale opacity-40",
							// Desktop Override (LG+): Always grayscale until hover
							"lg:grayscale lg:opacity-40 lg:group-hover:grayscale-0 lg:group-hover:opacity-60",
						)}
					/>
					<div className="absolute inset-0 bg-linear-to-t from-[#0A0E14] via-[#0A0E14]/60 to-transparent" />
				</div>

				{/* 2. CONTENT LAYER */}
				<div className="relative z-10 flex h-full flex-col justify-end p-6">
					{/* Top Right Arrow */}
					<div className="mb-2 flex items-center justify-between">
						<span
							className={cn(
								"text-[#FFB400] text-[10px] font-black uppercase tracking-widest transition-all duration-300",
								// Mobile/Tablet
								isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2",
								// Desktop Override
								"lg:opacity-0 lg:-translate-x-2 lg:group-hover:opacity-100 lg:group-hover:translate-x-0",
							)}
						>
							Enter Section
						</span>
						<ArrowUpRight
							size={18}
							className={cn(
								"text-[#FFB400] transition-all duration-300",
								isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
								"lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0",
							)}
						/>
					</div>

					<div className="relative">
						{/* Arabic Watermark */}
						<span
							className={cn(
								"absolute -top-4 -left-2 text-4xl font-bold pointer-events-none transition-colors duration-500",
								isActive ? "text-[#FFB400]/10" : "text-white/5",
								"lg:text-white/5 lg:group-hover:text-[#FFB400]/10",
							)}
						>
							{category.arabicTitle}
						</span>

						{/* Main Title */}
						<h4 className="text-2xl font-bold text-[#F5F5F0] tracking-tighter leading-none mb-1">{category.title}</h4>

						{/* Description */}
						<p className={cn("text-xs text-[#94A3B8] font-medium transition-opacity duration-500", isActive ? "opacity-100" : "opacity-0", "lg:opacity-0 lg:group-hover:opacity-100")}>
							{category.description}
						</p>
					</div>
				</div>

				{/* 3. PROGRESS LINE ACCENT */}
				<div className={cn("absolute bottom-0 right-0 h-1 bg-[#FFB400] transition-all duration-500", isActive ? "w-full" : "w-0", "lg:w-0 lg:group-hover:w-full")} />
			</Link>
		</motion.div>
	);
}
