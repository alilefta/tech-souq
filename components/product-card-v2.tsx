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
import { cn } from "@/lib/utils";

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

	console.log(product.originalPrice && product.originalPrice > product.price);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }} // Trigger slightly before full view
			className="group/card relative bg-[#1E293B]/20 border border-white/5 rounded-none overflow-hidden transition-all duration-500 hover:border-[#FFB400]/40"
		>
			{/* CORNER BRACKETS */}
			<div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFB400]/0 group-hover/card:border-[#FFB400]/40 transition-all duration-500" />
			<div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFB400]/0 group-hover/card:border-[#FFB400]/40 transition-all duration-500" />

			{/* IMAGE AREA */}
			<div className="relative aspect-square overflow-hidden bg-linear-to-b from-white/2 to-transparent">
				{/* 
                   MOBILE ACTIVATION LOGIC:
                   We wrap the image in a motion div that handles the grayscale filter based on viewport.
                */}
				<motion.div
					className="relative w-full h-full p-8"
					initial={{ filter: "grayscale(100%) opacity(0.8)" }}
					whileInView={{ filter: "grayscale(0%) opacity(1)" }}
					viewport={{ once: false, amount: 0.6 }} // Re-triggers on scroll
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					<SafeImage
						src={coverImage}
						alt={product.name}
						fill
						loading="eager"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						className="object-contain transition-transform duration-700 md:group-hover/card:scale-110"
					/>
				</motion.div>

				{/* SCANLINE */}
				<div className="absolute inset-0 z-10 pointer-events-none">
					<motion.div
						animate={{ y: ["-100%", "200%"] }}
						transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
						className="w-full h-[30%] bg-linear-to-b from-transparent via-[#FFB400]/5 to-transparent opacity-0 group-hover/card:opacity-100"
					/>
				</div>

				{/* TECH OVERLAY */}
				<div className="absolute inset-0 bg-[#0A0E14]/90 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 backdrop-blur-md z-20">
					<div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
						<ShieldCheck size={14} className="text-[#FFB400]" />
						<p className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-[0.2em]">Verified_Specs</p>
					</div>
					<ul className="space-y-2">
						{product.specs?.slice(0, 3).map((spec, i) => (
							<li key={i} className="text-[#94A3B8] text-[10px] font-mono flex items-center justify-between border-b border-white/5 pb-1 last:border-0">
								<span className="uppercase opacity-60">{spec.label}</span>
								<span className="text-[#F5F5F0] font-bold">{spec.value}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* INFO AREA */}
			<div className="p-4 sm:p-6 border-t border-white/5">
				<div className="flex items-center justify-between mb-3">
					<Link href={`/categories/${product.category.slug}`} className="text-[#94A3B8] text-[9px] font-black uppercase tracking-[0.2em] hover:text-[#FFB400] transition-colors">
						{product.category.name}
					</Link>
					<div className="flex items-center gap-2">
						<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
						<span className="text-[#F5F5F0] text-[9px] font-bold uppercase tracking-wider">In_Stock</span>
					</div>
				</div>

				<Link href={`/products/${product.slug}`}>
					<h4 className="text-[#F5F5F0] text-lg sm:text-xl font-bold tracking-tighter mb-4 group-hover/card:text-[#FFB400] transition-colors line-clamp-1">{product.name}</h4>
				</Link>

				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div className="flex flex-col">
						{product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
							<span className="text-[#94A3B8] text-[10px] line-through opacity-40 mb-0.5 font-mono">${product.originalPrice}</span>
						)}
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
						className={cn(
							"group/btn flex items-center justify-center gap-2 px-4 py-3 border border-[#FFB400]/40 text-[#FFB400] rounded-none transition-all w-full sm:w-auto",
							isPending && "opacity-50 cursor-wait",
						)}
					>
						<span className="text-[10px] font-black uppercase tracking-widest">{isPending ? "Syncing..." : "Add_To_Cart"}</span>
						{isPending ? <Activity size={14} className="animate-spin" /> : <Plus size={14} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform" />}
					</motion.button>
				</div>
			</div>

			{/* FOOTER METADATA */}
			<div className="px-6 py-2 bg-white/1 border-t border-white/5 flex justify-between items-center opacity-40 group-hover/card:opacity-100 transition-opacity">
				<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-widest">Node_BBL_01</span>
				<div className="flex gap-1">
					{[1, 2, 3].map((i) => (
						<div key={i} className="w-1 h-1 bg-white/20 rounded-full" />
					))}
				</div>
			</div>
		</motion.div>
	);
}
