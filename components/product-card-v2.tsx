// components/home/product-card.tsx
"use client";

import { motion } from "motion/react";
import { ShoppingCart, Star, Plus, ShieldCheck, Activity } from "lucide-react";
import { useState, useMemo } from "react";

export function ProductCard({ product }: { product: any }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="group relative bg-[#1E293B]/10 border border-white/5 rounded-sm overflow-hidden transition-all duration-500 hover:border-[#FFB400]/40"
		>
			{/* 1. CLEAN CORNER BRACKETS (Preserved but subtle) */}
			<div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFB400]/0 group-hover:border-[#FFB400]/40 transition-all duration-500" />
			<div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFB400]/0 group-hover:border-[#FFB400]/40 transition-all duration-500" />

			{/* Product Image Area */}
			<div className="relative aspect-square overflow-hidden p-8 bg-gradient-to-b from-white/[0.01] to-transparent">
				{/* SUBTLE SCANLINE (Keep the movement, remove the noise) */}
				<div className="absolute inset-0 z-10 pointer-events-none">
					<motion.div
						animate={{ y: ["-100%", "200%"] }}
						transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
						className="w-full h-[30%] bg-gradient-to-b from-transparent via-[#FFB400]/5 to-transparent opacity-0 group-hover:opacity-100"
					/>
				</div>

				<motion.img
					whileHover={{ scale: 1.05 }}
					src={product.image}
					alt={product.name}
					className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 relative z-0"
				/>

				{/* TECH SPEC OVERLAY (High-Clarity Reveal) */}
				<div className="absolute inset-0 bg-[#0A0E14]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 backdrop-blur-md">
					<div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
						<ShieldCheck size={14} className="text-[#FFB400]" />
						<p className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-[0.2em]">Validated Hardware</p>
					</div>
					<ul className="space-y-3">
						{product.specs.map((spec: string, i: number) => (
							<li key={i} className="text-[#94A3B8] text-xs font-medium flex items-start gap-2">
								<span className="text-[#FFB400] mt-1">/</span> {spec}
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Product Info */}
			<div className="p-6">
				<div className="flex items-center justify-between mb-3">
					<span className="text-[#94A3B8] text-[9px] uppercase font-black tracking-[0.2em]">{product.category}</span>

					{/* REPLACED WIFI SIGNAL WITH CLEAN STOCK INDICATOR */}
					<div className="flex items-center gap-2">
						<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
						<span className="text-[#F5F5F0] text-[9px] font-bold uppercase tracking-wider">In Stock</span>
					</div>
				</div>

				<h4 className="text-[#F5F5F0] text-xl font-bold tracking-tighter mb-6 group-hover:text-[#FFB400] transition-colors line-clamp-1">{product.name}</h4>

				{/* PRICE & CTA BLOCK (High Clarity) */}
				<div className="flex items-center justify-between">
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
						<Plus size={14} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform" />
					</motion.button>
				</div>
			</div>

			{/* 5. SUBTLE BATCH INFO (Minimalist data) */}
			<div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex justify-between items-center">
				<span className="text-[8px] font-mono text-[#94A3B8] opacity-30">BATCH_TS_2025_v1</span>
				<div className="flex gap-1">
					{[1, 2, 3].map((i) => (
						<div key={i} className="w-1 h-1 bg-white/10 rounded-full group-hover:bg-[#FFB400]/30 transition-colors" />
					))}
				</div>
			</div>
		</motion.div>
	);
}
