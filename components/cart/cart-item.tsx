"use client";

import { motion } from "motion/react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartWithItemsDTO } from "@/app/data/cart";

export function CartItem({ item }: { item: CartWithItemsDTO["items"][0] }) {
	const removeItemFromCart = async () => {};

	return (
		<motion.div
			layout
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			className="group relative flex gap-4 p-4 bg-white/2 border border-white/5 rounded-sm hover:border-[#FFB400]/20 transition-all"
		>
			{/* 1. PRODUCT IMAGE */}
			<div className="relative w-20 h-20 bg-[#1E293B]/40 rounded-sm overflow-hidden shrink-0">
				<Image src={item.product.images[0]} alt={item.product.name} fill className="object-contain grayscale group-hover:grayscale-0 transition-all p-2" />
			</div>

			{/* 2. PRODUCT DATA */}
			<div className="flex-1 flex flex-col justify-between">
				<div className="flex justify-between items-start">
					<div>
						<p className="text-[#94A3B8] text-[8px] font-black uppercase tracking-widest mb-1">{item.product.category.name}</p>
						<h4 className="text-[#F5F5F0] text-sm font-bold tracking-tight line-clamp-1">{item.product.name}</h4>
					</div>
					<Button className="text-[#94A3B8] hover:text-red-500 transition-colors" onClick={() => removeItemFromCart()}>
						<Trash2 size={14} />
					</Button>
				</div>

				<div className="flex justify-between items-end">
					{/* QUANTITY CHIPS */}
					<div className="flex items-center border border-white/10 rounded-sm">
						<button className="p-1 px-2 text-[#94A3B8] hover:text-[#FFB400] transition-colors">-</button>
						<span className="text-[10px] font-mono text-[#F5F5F0] px-2 border-x border-white/5">{item.quantity}</span>
						<button className="p-1 px-2 text-[#94A3B8] hover:text-[#FFB400] transition-colors">+</button>
					</div>

					<div className="text-right">
						<span className="text-[#FFB400] text-sm font-black tracking-tighter">${Number(item.product.price)}</span>
					</div>
				</div>
			</div>

			{/* 3. SIDE ACCENT */}
			<div className="absolute top-0 right-0 h-full w-px bg-[#FFB400]/0 group-hover:bg-[#FFB400]/40 transition-all" />
		</motion.div>
	);
}
