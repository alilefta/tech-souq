"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ShoppingBag, Box, Truck, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "@/components/cart/cart-item";

export function CartDrawer({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
	// NOTE: You will replace this with your actual cart state
	const isEmpty = false;

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent className="w-full sm:max-w-md bg-[#0A0E14] border-l border-white/5 p-0 flex flex-col font-sans">
				{/* 1. HEADER: Manifest Info */}
				<SheetHeader className="p-6 border-b border-white/5 bg-white/[0.01]">
					<div className="flex items-center justify-between mb-2">
						<span className="text-[10px] font-mono text-[#94A3B8] tracking-[0.3em] uppercase">
							Terminal_Session: {new Date().getHours()}
							{new Date().getMinutes()}
						</span>
						<div className="flex items-center gap-2">
							<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
							<span className="text-[8px] font-bold text-[#F5F5F0] uppercase">System_Live</span>
						</div>
					</div>
					<SheetTitle className="text-[#F5F5F0] text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
						Active <span className="text-[#FFB400]">Manifest</span>
						<ShoppingBag size={20} className="text-[#FFB400]" />
					</SheetTitle>
				</SheetHeader>

				{/* 2. THE PAYLOAD LIST (The scrollable area) */}
				<div className="flex-1 overflow-y-auto custom-scrollbar p-6">
					<AnimatePresence mode="popLayout">
						{isEmpty ? (
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center opacity-20">
								<Box size={48} strokeWidth={1} className="mb-4" />
								<p className="text-[10px] font-black uppercase tracking-[0.4em]">Payload_Empty</p>
								<p className="text-[8px] mt-2 italic">Scanning for coordinates...</p>
							</motion.div>
						) : (
							<div className="space-y-6">
								{/* 
                   You will map your cart items here. 
                   I'll provide the 'CartItem' UI component next. 
                */}
								<CartItem />
								<CartItem />
							</div>
						)}
					</AnimatePresence>
				</div>

				{/* 3. FOOTER: Logistics & Checkout */}
				<SheetFooter className="p-6 bg-white/[0.02] border-t border-white/5 flex flex-col gap-6">
					<div className="space-y-3">
						<div className="flex justify-between text-[10px] font-bold uppercase text-[#94A3B8] tracking-widest">
							<span>Subtotal</span>
							<span className="text-[#F5F5F0]">$0,000.00</span>
						</div>
						<div className="flex justify-between items-center text-[10px] font-bold uppercase text-[#94A3B8] tracking-widest">
							<div className="flex items-center gap-2">
								<Truck size={12} className="text-[#FFB400]" />
								<span>Estimated Transit</span>
							</div>
							<span className="text-green-500">Calculated_at_BBL_Hub</span>
						</div>
						<div className="pt-3 border-t border-white/5 flex justify-between items-end">
							<span className="text-xs font-black text-[#F5F5F0] uppercase">Total Payload Value</span>
							<span className="text-3xl font-black text-[#FFB400] tracking-tighter">$0,000.00</span>
						</div>
					</div>

					<button className="w-full bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.3em] py-5 flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(255,180,0,0.3)] transition-all group">
						Initialize Checkout <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
					</button>

					<p className="text-[7px] text-[#94A3B8] text-center uppercase tracking-widest opacity-40">Secure_Transfer_AES256 // Origin_Babylon_IRQ</p>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
