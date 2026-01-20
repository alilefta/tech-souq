"use client";

import { motion } from "motion/react";
import { Activity, Plus, ShieldCheck } from "lucide-react";
import { ProductCardDTO } from "@/app/data/products";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { useCart } from "@/store/useCart";
import { addToCartAction } from "@/app/actions/cart";
import { toast } from "sonner";
import { SafeImage } from "./ui/safe-image";

export function ProductCard({ product }: { product: ProductCardDTO }) {
	const coverImage = product.coverImage; // Based on your DTO

	const addItemOptimistically = useCart((state) => state.addItem);
	const removeItemOptimistically = useCart((state) => state.removeItem);

	const { executeAsync: executeAddToCart, isPending } = useAction(addToCartAction, {
		onError({ error }) {
			// 1. NETWORK / SERVER TIMEOUT
			if (error.serverError) {
				toast.error("SIGNAL_INTERRUPT: TRANSMISSION_FAILED", {
					description: `NODE: BBL_ALPHA // DATA_STREAM_TIMEOUT // ERR_0x60_SYNC`,
					icon: <Activity className="text-red-500" size={16} />,
				});
			}

			// 2. UNEXPECTED LOGIC CRASH
			if (error.thrownError) {
				toast.error("SYSTEM_CRITICAL: CALCULATION_ERROR", {
					description: `SECTOR: 32_NORTH // LOGIC_OVERFLOW // TRACE: ${product.sku || "UNK"}`,
					icon: <Activity className="text-red-500" size={16} />,
				});
			}

			// 3. VALIDATION (e.g. Stock limitations)
			if (error.validationErrors) {
				toast.error("PROTOCOL_REJECTED: VALIDATION_FAILURE", {
					description: "MANIFEST_ENTRY_INVALID // CHECK_UNIT_PARAMETERS",
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
		// 1. Instant UI Update (Optimistic)
		addItemOptimistically(product); // Pass the ProductCardDTO directly!

		// 2. Server Action (Background)
		await executeAddToCart({ productId: product.id, quantity: 1 });
	};

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
				<motion.div
					className="relative w-full h-full"
					// ELITE MOBILE LOGIC:
					// Grayscale 0 (color) when in view on mobile
					// but remains grayscale on desktop until hover (via Tailwind classes below)
					initial={{ filter: "grayscale(100%)" }}
					whileInView={{ filter: "grayscale(0%)" }}
					viewport={{
						once: false,
						amount: 0.6, // Trigger when 60% of the card is visible
					}}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					{/* Scanline overlay */}
					<div className="absolute inset-0 z-10 pointer-events-none">
						<motion.div
							animate={{ y: ["-100%", "200%"] }}
							transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
							className="w-full h-[30%] bg-linear-to-b from-transparent via-[#FFB400]/5 to-transparent opacity-0 group-hover/card:opacity-100"
						/>
					</div>

					<SafeImage
						src={coverImage}
						alt={product.name}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						// On MD (Desktop), the group-hover handles the reset
						// On Mobile, the 'whileInView' parent div handles the filter
						className="object-contain transition-all duration-700 p-8 md:grayscale md:group-hover/card:grayscale-0"
					/>
				</motion.div>

				{/* TECH SPEC OVERLAY */}
				<div className="absolute inset-0 bg-[#0A0E14]/90 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 backdrop-blur-md z-30">
					<div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
						<ShieldCheck size={14} className="text-[#FFB400]" />
						<p className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-[0.2em]">Validated Hardware</p>
					</div>
					{product.specs && (
						<ul className="space-y-3">
							{product.specs?.slice(0, 3).map((spec, i: number) => (
								<li key={i} className="text-[#94A3B8] text-xs font-medium flex items-start gap-2 ">
									<span className="text-[#FFB400] mt-1">/</span>
									{spec.label} - {spec.value}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			{/* Product Info */}
			<div className="p-4 sm:p-6">
				{/* Reduced padding slightly for small mobile */}
				<div className="flex items-center justify-between mb-3">
					<Link href={`/categories/${product.category.slug}`} className="text-[#94A3B8] text-[9px] font-black uppercase tracking-[0.2em] hover:text-[#FFB400] transition-colors">
						{product.category.name}
					</Link>
					<div className="flex items-center gap-2">
						<div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
						<span className="text-[#F5F5F0] text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">In_Stock</span>
					</div>
				</div>
				<Link href={`/products/${product.slug}`}>
					<h4 className="text-[#F5F5F0] text-lg sm:text-xl font-bold tracking-tighter mb-4 sm:mb-6 group-hover/card:text-[#FFB400] transition-colors line-clamp-1 cursor-pointer">
						{product.name}
					</h4>
				</Link>
				{/* 
                    FIXED PRICE & CTA BLOCK: 
                */}
				<div className="flex flex-col mt-2 gap-4 sm:flex-row   sm:items-end sm:justify-between">
					<div className="flex flex-col">
						<span className="text-[#94A3B8] text-[10px] line-through opacity-40 mb-0.5">${product.originalPrice}</span>
						<span className="text-[#F5F5F0] text-2xl font-black tracking-tighter leading-none">
							<span className="text-[#FFB400] text-lg mr-0.5">$</span>
							{product.price}
						</span>
					</div>

					<motion.button
						whileHover={{ scale: 1.02, backgroundColor: "#FFB400", color: "#0A0E14" }}
						whileTap={{ scale: 0.98 }}
						onClick={handleAddToCart}
						disabled={isPending}
						className="group/btn flex items-center justify-center gap-2 px-2 sm:px-4 py-3 sm:py-3 border border-[#FFB400]/40 text-[#FFB400] rounded-none transition-all w-full sm:w-auto disabled:opacity-50 disabled:cursor-wait"
					>
						<span className="text-[10px] font-black uppercase tracking-widest">{isPending ? "INITIALIZING_SYNC..." : "Add_To_Manifest"}</span>
						{isPending ? (
							<motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
								<Activity size={14} strokeWidth={3} />
							</motion.div>
						) : (
							<Plus size={14} strokeWidth={3} className="group-hover:btn:rotate-90 transition-transform" />
						)}
					</motion.button>
				</div>
			</div>

			{/* BATCH INFO */}
			<div className="px-6 py-3 bg-white/2 border-t border-white/5 flex justify-between items-center">
				<span className="text-[7px] sm:text-[8px] font-mono text-[#94A3B8] opacity-30 uppercase tracking-widest">Babylon_Node_01</span>
				<div className="flex gap-1.5">
					{[1, 2, 3].map((i) => (
						<div key={i} className="w-1 h-1 bg-white/10 rounded-full group-hover/card:bg-[#FFB400]/30 transition-colors" />
					))}
				</div>
			</div>
		</motion.div>
	);
}
