"use client";

import { motion } from "motion/react";
import { Activity, ShieldCheck, Terminal, Trash2 } from "lucide-react";
import Image from "next/image";
import { CartWithItemsDTO } from "@/app/data/cart";
import { useCart } from "@/store/useCart";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { CartQuantityModule } from "./cart-quantity-module";
import { removeFromCartAction, updateItemQuantityAction } from "@/app/actions/cart";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export function CartItem({ item }: { item: CartWithItemsDTO["items"][0] }) {
	const removeItem = useCart((state) => state.removeItem);
	const updateQty = useCart((state) => state.updateQuantity);

	const [quantity, setQuantity] = useState(item.quantity);
	const debouncedQty = useDebounce({ value: quantity.toString() });
	const productId = useMemo(() => item.productId, [item.productId]);

	const totalVal = Number(item.product.price) * quantity;

	const { executeAsync: executeRemoveFromCart, isPending: isRemoving } = useAction(removeFromCartAction, {
		onError({ error }) {
			toast.error("DE-INITIALIZATION_FAILED", {
				description: "ERR_0x60_SIG_LOSS // NODE: BBL_ALPHA // REMOVAL_ABORTED",
				icon: <Activity className="text-red-500" size={16} />,
			});
		},
		onSuccess() {
			toast.success("MANIFEST_RECALIBRATED", {
				description: `MODULE: ${item.product.name.toUpperCase()} // DE-LISTED_SUCCESSFULLY`,
				icon: <ShieldCheck className="text-[#FFB400]" size={16} />,
			});
		},
	});

	const handleIncrement = () => {
		if (quantity < item.product.stock) {
			setQuantity((p) => p + 1);
		} else {
			toast.error("STOCK_THRESHOLD_REACHED", {
				description: "MAX_ALLOCATION_REACHED_IN_SECTOR",
				icon: <Terminal className="text-[#FFB400]" size={14} />,
			});
		}
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			// Prevents hitting 0 or negative
			setQuantity((p) => p - 1);
		}
	};

	useEffect(() => {
		if (Number(debouncedQty) === item.quantity) return;
		const newQty = Number(debouncedQty);

		// A. Optimistic Local Update
		updateQty(productId, newQty);

		// B. Server Handshake
		const syncServer = async () => {
			const result = await updateItemQuantityAction({ itemId: item.id, quantity: newQty });
			if (result?.validationErrors || result?.serverError) {
				toast.error("SYNC_INTERRUPT", {
					description: "QUANTITY_STREAMS_OUT_OF_SYNC // REVERTING...",
					icon: <Activity className="text-red-500" size={16} />,
				});
				// Revert local state to previous known good state
				setQuantity(item.quantity);
			}
		};
		syncServer();
	}, [debouncedQty]);

	const handleRemoveItem = async () => {
		removeItem(item.productId);
		await executeRemoveFromCart({ itemId: item.id });
	};

	return (
		<motion.div
			layout
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: isRemoving ? 0.5 : 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			className={`group relative flex gap-4 p-4 bg-white/2 border border-white/5 rounded-none transition-all ${isRemoving ? "grayscale pointer-events-none" : "hover:border-[#FFB400]/20"}`}
		>
			{/* 1. PRODUCT IMAGE */}
			<div className="relative w-20 h-20 bg-[#1E293B]/40 border border-white/5 overflow-hidden shrink-0">
				<Image src={item.product.images[0]} alt={item.product.name} fill sizes="80px" className="object-contain grayscale group-hover:grayscale-0 transition-all p-2" />
			</div>

			{/* 2. PRODUCT DATA */}
			<div className="flex-1 flex flex-col justify-between">
				<div className="flex justify-between items-start">
					<div>
						<p className="text-[#94A3B8] text-[8px] font-black uppercase tracking-[0.3em] mb-1">Sector_{item.product.category.name.toUpperCase()}</p>
						<h4 className="text-[#F5F5F0] text-sm font-bold tracking-tighter leading-tight line-clamp-1">{item.product.name}</h4>
					</div>
					<button title="De-list Module" className="text-[#94A3B8] hover:text-red-500 transition-colors p-1" onClick={handleRemoveItem} disabled={isRemoving}>
						{isRemoving ? <Activity size={14} className="animate-pulse" /> : <Trash2 size={14} />}
					</button>
				</div>

				<div className="flex justify-between items-end mt-2">
					<CartQuantityModule qty={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />

					<div className="text-right flex flex-col">
						<span className="text-[8px] font-mono text-[#94A3B8] uppercase opacity-40 tracking-widest">Unit_Val_Total</span>
						<span className="text-[#FFB400] text-sm font-black tracking-tighter">{totalVal.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
					</div>
				</div>
			</div>

			{/* SIDE ACCENT: Diagnostic Line */}
			<div className="absolute top-0 right-0 h-full w-px bg-[#FFB400]/0 group-hover:bg-[#FFB400]/40 transition-all duration-500" />
		</motion.div>
	);
}
