"use client";

import { motion } from "motion/react";
import { Plus, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ProductCardDTO } from "@/app/data/products";
import Link from "next/link";

import { TechPlaceholder } from "@/components/ui/tech-placeholder";
import { useState } from "react";

export function ProductCard({ product }: { product: ProductCardDTO }) {
	const [imgError, setImgError] = useState(false);
	const coverImage = product.coverImage; // Based on your DTO
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="group/card relative bg-[#1E293B]/10 border border-white/5 rounded-sm overflow-hidden transition-all duration-500 hover:border-[#FFB400]/40"
		>
			<div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFB400]/0 group-hover/card:border-[#FFB400]/40 transition-all duration-500" />
			<div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFB400]/0 group-hover/card:border-[#FFB400]/40 transition-all duration-500" />

			{/* Product Image Area */}
			<div className="relative aspect-square overflow-hidden bg-linear-to-b from-white/1 to-transparent">
				{/* FALLBACK LOGIC: If image is null OR fails to load */}
				{!coverImage || imgError ? (
					<TechPlaceholder name={product.name} />
				) : (
					<>
						<div className="absolute inset-0 z-10 pointer-events-none">
							<motion.div
								animate={{ y: ["-100%", "200%"] }}
								transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
								className="w-full h-[30%] bg-linear-to-b from-transparent via-[#FFB400]/5 to-transparent opacity-0 group-hover/card:opacity-100"
							/>
						</div>

						<Image
							src={coverImage}
							alt={product.name}
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
							onError={() => setImgError(true)} // Handle broken links
							className="object-contain grayscale group-hover/card:grayscale-0 transition-all duration-700 p-8"
						/>
					</>
				)}

				{/* TECH SPEC OVERLAY */}
				<div className="absolute inset-0 bg-[#0A0E14]/90 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 backdrop-blur-md z-30">
					<div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
						<ShieldCheck size={14} className="text-[#FFB400]" />
						<p className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-[0.2em]">Validated Hardware</p>
					</div>
					{/* Safe-check for specs */}
					{product.specs && (
						<ul className="space-y-3">
							{product.specs?.slice(0, 3).map((spec, i: number) => (
								<li key={i} className="text-[#94A3B8] text-xs font-medium flex items-start gap-2 ">
									<span className="text-[#FFB400] mt-1">/</span> {spec.value}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			{/* Product Info */}
			<div className="p-6">
				<div className="flex items-center justify-between mb-3">
					<Link href={`/categories/${product.category.slug}`} className="text-[#94A3B8] text-[9px] uppercase font-black tracking-[0.2em] hover:text-orange-300/50 transition-colors">
						{product.category.name}
					</Link>
					<div className="flex items-center gap-2">
						<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
						<span className="text-[#F5F5F0] text-[9px] font-bold uppercase tracking-wider">In Stock</span>
					</div>
				</div>

				<Link href={`/products/${product.slug}`}>
					<h4 className="text-[#F5F5F0] text-xl font-bold tracking-tighter mb-6 group-hover/card:text-[#FFB400] transition-colors line-clamp-1 cursor-pointer">{product.name}</h4>
				</Link>

				{/* PRICE & CTA BLOCK */}
				<div className="flex items-center justify-between ">
					<div className="flex flex-col">
						<span className="text-[#94A3B8] text-[10px] line-through opacity-40 mb-1">${product.originalPrice}</span>
						<span className="text-[#F5F5F0] text-2xl font-black tracking-tighter">
							<span className="text-[#FFB400]">$</span>
							{product.price}
						</span>
					</div>

					<motion.button
						whileHover={{ scale: 1.02, backgroundColor: "#FFB400", color: "#0A0E14" }}
						whileTap={{ scale: 0.98 }}
						className="flex items-center gap-2 px-5 py-3 border border-[#FFB400]/40 text-[#FFB400] rounded-sm transition-all group/btn"
					>
						<span className="text-[10px] font-black uppercase tracking-widest">Add to Cart</span>
						<Plus size={14} strokeWidth={3} className="group-hover/card/btn:rotate-90 transition-transform" />
					</motion.button>
				</div>
			</div>

			{/* BATCH INFO */}
			<div className="px-6 py-3 bg-white/2 border-t border-white/5 flex justify-between items-center">
				<span className="text-[8px] font-mono text-[#94A3B8] opacity-30">ORIGIN: BABYLON_IRQ</span>
				<div className="flex gap-1">
					{[1, 2, 3].map((i) => (
						<div key={i} className="w-1 h-1 bg-white/10 rounded-full group-hover/card:bg-[#FFB400]/30 transition-colors" />
					))}
				</div>
			</div>
		</motion.div>
	);
}
