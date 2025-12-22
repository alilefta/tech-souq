"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ProductDetailsDTO } from "@/app/data/products";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { TechPlaceholder } from "@/components/ui/tech-placeholder";

export function ProductGallery({
	images,
	name,
	sku,
	isNew,
}: {
	images: ProductDetailsDTO["images"];
	name: ProductDetailsDTO["name"];
	sku: ProductDetailsDTO["sku"];
	isNew: ProductDetailsDTO["isNew"];
}) {
	const [activeImage, setActiveImage] = useState(images[0]);

	// 1. HARD FALLBACK: If the array is empty or null
	if (!images || images.length === 0) {
		return (
			<div className="aspect-square w-full border border-white/5 rounded-sm overflow-hidden">
				<TechPlaceholder name={name} />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			{/* MAIN VIEWPORT */}
			<div className="relative aspect-square bg-[#1E293B]/20 border border-white/5 rounded-sm overflow-hidden group">
				{isNew && <div className="absolute top-6 left-6 z-20 bg-[#FFB400] text-[#0A0E14] text-[10px] font-black px-3 py-1 uppercase tracking-tighter">New Generation</div>}

				<AnimatePresence mode="wait">
					<motion.div
						key={activeImage}
						initial={{ opacity: 0, filter: "grayscale(100%)" }}
						animate={{ opacity: 1 }}
						// ELITE MOBILE LOGIC:
						// Transition to color when the image enters the user's focus zone
						whileInView={{ filter: "grayscale(0%)" }}
						viewport={{ once: false, amount: 0.5 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="relative w-full h-full p-8 lg:p-12"
					>
						<SafeImage
							src={activeImage}
							alt={name}
							fill
							priority // Critical for LCP on the product page
							fallbackName={name}
							sizes="(max-width: 768px) 100vw, 50vw"
							// On Desktop: we keep it grayscale until the parent 'group' is hovered
							className="object-contain transition-all duration-700 md:grayscale md:group-hover:grayscale-0"
						/>
					</motion.div>
				</AnimatePresence>

				{/* HUD DATA OVERLAY */}
				<div className="absolute bottom-6 right-6 flex flex-col items-end pointer-events-none z-20">
					<span className="text-[8px] font-mono text-[#94A3B8] opacity-40 mb-1 tracking-widest">SKU_VERIFICATION_TAG</span>
					<div className="px-3 py-1 bg-white/5 backdrop-blur-md text-[#F5F5F0] text-[10px] font-mono border border-white/10 uppercase tracking-tighter">{sku}</div>
				</div>
			</div>

			{/* THUMBNAIL TRACK */}
			{images.length > 1 && (
				<div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
					{images.map((img: string, i: number) => (
						<Button
							key={i}
							variant="ghost"
							onClick={() => setActiveImage(img)}
							className={`relative w-20 h-20 shrink-0 border transition-all overflow-hidden p-0 rounded-none ${
								activeImage === img ? "border-[#FFB400] opacity-100" : "border-white/5 opacity-40 hover:opacity-70"
							}`}
						>
							<SafeImage src={img} alt={`${name} thumb ${i}`} fill fallbackName={name} sizes="80px" className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
						</Button>
					))}
				</div>
			)}
		</div>
	);
}
