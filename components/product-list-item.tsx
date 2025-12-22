"use client";

import { motion } from "motion/react";
import { Plus, Star } from "lucide-react";
import Image from "next/image";
import { ProductCardDTO } from "@/app/data/products";
import Link from "next/link";
import { useState } from "react";
import { TechPlaceholder } from "@/components/ui/tech-placeholder";

export function ProductListItem({ product }: { product: ProductCardDTO }) {
	const [imgError, setImgError] = useState(false);
	const coverImage = product.coverImage;

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			className="group/item relative bg-[#1E293B]/10 border border-white/5 rounded-none overflow-hidden transition-all duration-500 hover:border-[#FFB400]/40 flex flex-col md:flex-row items-center gap-6 p-4 md:p-6"
		>
			{/* 1. IMAGE MODULE (Left) */}
			<div className="relative w-full md:w-48 aspect-square shrink-0 overflow-hidden bg-white/2">
				{!coverImage || imgError ? (
					<TechPlaceholder name={product.name} />
				) : (
					<motion.div
						className="relative w-full h-full"
						// ELITE MOBILE LOGIC:
						// Activates color when the row enters the focus zone
						initial={{ filter: "grayscale(100%)" }}
						whileInView={{ filter: "grayscale(0%)" }}
						viewport={{
							once: false,
							amount: 0.6, // Trigger when 60% of the row is visible
						}}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<Image
							src={coverImage}
							alt={product.name}
							fill
							sizes="200px"
							onError={() => setImgError(true)}
							// On Desktop: remains grayscale until row hover
							// On Mobile: controlled by the motion.div proximity filter
							className="object-contain transition-all duration-700 p-4 md:grayscale md:group-hover/item:grayscale-0"
						/>
					</motion.div>
				)}
			</div>

			{/* 2. DATA MODULE (Middle) */}
			<div className="flex-1 w-full space-y-4">
				<div className="flex items-center gap-4">
					<Link href={`/categories/${product.category.slug}`} className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors">
						{product.category.name}
					</Link>
					<div className="h-px w-8 bg-white/10" />
					<div className="flex items-center gap-1">
						<Star size={10} className="text-[#FFB400] fill-[#FFB400]" />
						<span className="text-[10px] font-mono text-[#F5F5F0]">{product.rating}</span>
					</div>
				</div>

				<Link href={`/products/${product.slug}`}>
					<h4 className="text-[#F5F5F0] text-2xl font-bold tracking-tighter uppercase group-hover/item:text-[#FFB400] transition-colors line-clamp-1">{product.name}</h4>
				</Link>

				{/* TECH SPECS */}
				<div className="flex flex-wrap gap-x-6 gap-y-2">
					{product.specs?.slice(0, 3).map((spec, i) => (
						<div key={i} className="flex items-center gap-2">
							<span className="text-[#94A3B8] text-[9px] font-black uppercase tracking-widest">{spec.label}:</span>
							<span className="text-[#F5F5F0] text-[10px] font-bold">{spec.value}</span>
						</div>
					))}
				</div>
			</div>

			{/* 3. TRANSACTION MODULE (Right) */}
			<div className="w-full md:w-64 md:border-l md:border-white/5 md:pl-8 flex flex-row md:flex-col justify-between md:justify-center gap-4">
				<div className="space-y-1">
					<div className="flex items-center gap-2 mb-1">
						<div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
						<span className="text-[#94A3B8] text-[9px] font-bold uppercase tracking-widest">Foundry_In_Stock</span>
					</div>
					<div className="flex flex-col">
						<span className="text-[#94A3B8] text-[10px] line-through opacity-40 font-mono">${product.originalPrice}</span>
						<span className="text-[#F5F5F0] text-3xl font-black tracking-tighter leading-none">
							<span className="text-[#FFB400] text-xl mr-1">$</span>
							{product.price}
						</span>
					</div>
				</div>

				<motion.button
					whileHover={{ scale: 1.02, backgroundColor: "#FFB400", color: "#0A0E14" }}
					whileTap={{ scale: 0.98 }}
					className="group/btn flex items-center justify-center gap-3 px-6 py-4 border border-[#FFB400]/40 text-[#FFB400] rounded-none transition-all flex-1 md:flex-none"
				>
					<span className="text-[10px] font-black uppercase tracking-widest">Deploy_Module</span>
					<Plus size={14} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform" />
				</motion.button>
			</div>

			{/* Side Log Detail */}
			<div className="absolute top-4 right-4 hidden md:block">
				<span className="text-[8px] font-mono text-[#94A3B8] opacity-20 uppercase tracking-[0.4em]">Node_BBL_01</span>
			</div>
		</motion.div>
	);
}
