"use client";

import { motion } from "motion/react";
import { Activity, Plus, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import { ProductCardDTO } from "@/app/data/products";
import Link from "next/link";
import { useState } from "react";
import { TechPlaceholder } from "@/components/ui/tech-placeholder";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useCart } from "@/store/useCart";
import { addToCartAction } from "@/app/actions/cart";

export function ProductListItem({ product }: { product: ProductCardDTO }) {
	const [imgError, setImgError] = useState(false);
	const coverImage = product.coverImage;

	const addItemOptimistically = useCart((state) => state.addItem);
	const removeItemOptimistically = useCart((state) => state.removeItem);

	// 2. SERVER ACTION LOGIC (Synchronized with ProductCard)
	const { executeAsync: executeAddToCart, isPending } = useAction(addToCartAction, {
		onError({ error }) {
			if (error.serverError) {
				toast.error("SIGNAL_INTERRUPT: TRANSMISSION_FAILED", {
					description: `NODE: BBL_ALPHA // DATA_STREAM_TIMEOUT // ERR_0x60_SYNC`,
					icon: <Activity className="text-red-500" size={16} />,
				});
			}

			if (error.thrownError) {
				toast.error("SYSTEM_CRITICAL: CALCULATION_ERROR", {
					description: `SECTOR: 32_NORTH // LOGIC_OVERFLOW // TRACE: ${product.slug.toUpperCase()}`,
					icon: <Activity className="text-red-500" size={16} />,
				});
			}

			// Revert UI on failure
			removeItemOptimistically(product.id);
		},
		onSuccess() {
			toast.success("PROTOCOL: DEPLOYMENT_SUCCESS", {
				description: `MODULE: ${product.name.toUpperCase()} // SYNCED_TO_MANIFEST`,
				icon: <ShieldCheck className="text-[#FFB400]" size={16} />,
			});
		},
	});

	const handleAddToCart = async () => {
		// Instant UI Update
		addItemOptimistically(product);
		// Background Server Sync
		await executeAddToCart({ productId: product.id, quantity: 1 });
	};
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
						initial={{ filter: "grayscale(100%)" }}
						whileInView={{ filter: "grayscale(0%)" }}
						viewport={{ once: false, amount: 0.6 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<Image
							src={coverImage}
							alt={product.name}
							fill
							sizes="200px"
							onError={() => setImgError(true)}
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

				{/* TECH SPECS: Visible in list view */}
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
						{product.originalPrice !== null && Number(product.originalPrice) > Number(product.price) && (
							<span className="text-[#94A3B8] text-[10px] line-through opacity-40 mb-0.5 font-mono">${product.originalPrice}</span>
						)}
						<span className="text-[#F5F5F0] text-3xl font-black tracking-tighter leading-none">
							<span className="text-[#FFB400] text-xl mr-1">$</span>
							{product.price}
						</span>
					</div>
				</div>

				<motion.button
					whileHover={{ scale: 1.02, backgroundColor: "#FFB400", color: "#0A0E14" }}
					whileTap={{ scale: 0.98 }}
					onClick={handleAddToCart}
					disabled={isPending}
					className="group/btn flex items-center justify-center gap-2 px-6 py-4 border border-[#FFB400]/40 text-[#FFB400] rounded-none transition-all flex-1 md:flex-none disabled:opacity-50 disabled:cursor-wait"
				>
					<span className="text-[10px] font-black uppercase tracking-widest">{isPending ? "SYNCING_LOG..." : "Deploy_Module"}</span>
					{isPending ? (
						<motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
							<Activity size={14} strokeWidth={3} />
						</motion.div>
					) : (
						<Plus size={14} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform" />
					)}
				</motion.button>
			</div>

			{/* Side Log Detail */}
			<div className="absolute top-4 right-4 hidden md:block">
				<span className="text-[8px] font-mono text-[#94A3B8] opacity-20 uppercase tracking-[0.4em]">Node_BBL_01</span>
			</div>
		</motion.div>
	);
}
