"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription } from "@/components/ui/sheet";
import { ShoppingBag, Box, Truck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "@/components/cart/cart-item";
import { useCart } from "@/store/useCart";
import { CartWithItemsDTO } from "@/app/data/cart";
import { useEffect } from "react";
import Link from "next/link";

export function CartDrawer({ cart }: { cart: CartWithItemsDTO | null }) {
	// cart prop used to get stored cart data and for syncing with UI cart items
	const syncCart = useCart((state) => state.syncCart);

	const items = useCart((state) => state.items); // Read from STORE, not props

	const isEmpty = items.length === 0;
	const isOpen = useCart((state) => state.isOpen);
	const setIsOpen = useCart((state) => state.setIsOpen);
	const totalPrice = items.reduce((prev, curr) => prev + Number(curr.product.price) * curr.quantity, 0);

	useEffect(() => {
		if (cart) {
			syncCart(cart.items);
		}
	}, [cart, syncCart]);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetDescription className="sr-only">Shopping Cart Manifest</SheetDescription>
			<SheetContent className="w-full sm:max-w-md bg-[#0A0E14] border-l border-white/5 p-0 flex flex-col font-sans" aria-description="shopping cart">
				{/* 1. HEADER: Manifest Info (Always Visible) */}
				<SheetHeader className="p-6 border-b border-white/5 bg-white/[0.01]">
					<div className="flex items-center justify-between mb-2">
						<span className="text-[10px] font-mono text-[#94A3B8] tracking-[0.3em] uppercase">
							Terminal_Session: {new Date().getHours()}
							{new Date().getMinutes()}
						</span>
						<div className="flex items-center gap-2">
							<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
							<span className="text-[8px] font-bold text-[#F5F5F0] uppercase tracking-widest">System_Live</span>
						</div>
					</div>
					<SheetTitle className="text-[#F5F5F0] text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
						Active <span className="text-[#FFB400]">Manifest</span>
						<ShoppingBag size={20} className="text-[#FFB400]" />
					</SheetTitle>
				</SheetHeader>

				{/* 2. THE PAYLOAD LIST */}
				<div className="flex-1 overflow-y-auto custom-scrollbar p-6">
					<AnimatePresence mode="popLayout" initial={false}>
						{isEmpty ? (
							<motion.div
								key="empty"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								className="h-full flex flex-col items-center justify-center text-center"
							>
								<div className="relative mb-6">
									<Box size={48} strokeWidth={1} className="text-[#94A3B8] opacity-20" />
									<motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 flex items-center justify-center">
										<div className="w-12 h-12 border border-[#FFB400]/20 rounded-full scale-150" />
									</motion.div>
								</div>
								<p className="text-[10px] font-black uppercase text-[#F5F5F0] tracking-[0.4em] mb-2">Payload_Empty</p>
								<p className="text-[9px] text-[#94A3B8] font-mono uppercase tracking-widest opacity-40 italic">Awaiting_Coordinate_Input...</p>
							</motion.div>
						) : (
							<div className="space-y-6">
								{items.map((item) => (
									<CartItem item={item} key={item.id} />
								))}
							</div>
						)}
					</AnimatePresence>
				</div>

				{/* 3. FOOTER: Logistics & Checkout (Conditional with Animation) */}
				<AnimatePresence>
					{!isEmpty && (
						<motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 200 }}>
							<SheetFooter className="p-6 bg-white/2 border-t border-white/5 flex flex-col gap-6 sm:flex-col">
								<div className="space-y-4 w-full">
									<div className="flex justify-between items-center text-[10px] font-bold uppercase text-[#94A3B8] tracking-widest">
										<span>Subtotal_Value</span>
										<span className="text-[#F5F5F0] font-mono">${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
									</div>

									<div className="flex justify-between items-center text-[10px] font-bold uppercase text-[#94A3B8] tracking-widest">
										<div className="flex items-center gap-2">
											<Truck size={12} className="text-[#FFB400]" />
											<span>Transit_Protocol</span>
										</div>
										<span className="text-green-500 font-mono">BBL_HUB_READY</span>
									</div>

									<div className="pt-4 border-t border-white/5 flex justify-between items-end w-full">
										<div className="flex flex-col">
											<span className="text-[8px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-1">Total Payload Value</span>
											<span className="text-3xl font-black text-[#FFB400] tracking-tighter leading-none">
												${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
											</span>
										</div>
										<span className="text-[10px] font-mono text-[#94A3B8] opacity-30 pb-1">USD//IRQ</span>
									</div>
								</div>

								<button
									className="group relative w-full bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.3em] py-5 flex items-center justify-center gap-3 overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,180,0,0.3)]"
									disabled={isEmpty}
								>
									<Link href={"/checkout"}>
										<span className="relative z-10 flex items-center gap-3">
											Initialize Checkout <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
										</span>
									</Link>
									{/* Diagonal Shine Animation */}
									<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
										<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
									</div>
								</button>

								<div className="flex flex-col items-center gap-2 opacity-30">
									<p className="text-[7px] text-[#94A3B8] text-center uppercase tracking-widest font-mono">Secure_Transfer_AES256 // Origin_Babylon_Node_01</p>
									<div className="flex gap-1">
										{[1, 2, 3].map((i) => (
											<div key={i} className="w-1 h-1 bg-white/40 rounded-full" />
										))}
									</div>
								</div>
							</SheetFooter>
						</motion.div>
					)}
				</AnimatePresence>
			</SheetContent>
		</Sheet>
	);
}
