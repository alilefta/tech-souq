// components/navbar.tsx
"use client";

import { ShoppingBag, Search, Menu } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "./button";
import { useState } from "react";
import { CartState, useCart } from "@/store/useCart";

export default function Navbar() {
	const openCart = useCart((state) => state.setIsOpen);

	return (
		<nav className="sticky top-6 w-[95%] max-w-7xl z-50 mx-auto flex items-center justify-between px-6 py-4 bg-[#1E293B]/40 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-500 shadow-2xl">
			{/* BRAND LOGO & NAME */}
			<Link href="/" className="flex items-center gap-3 group">
				<Logo />
				<div className="flex flex-col">
					<span className="text-[#F5F5F0] font-black text-xl tracking-tighter leading-none flex items-center gap-1">
						BASE <span className="text-[#FFB400]">60</span>
					</span>
					<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.4em] mt-1 opacity-60 group-hover:text-[#FFB400] transition-colors">Babylon // Foundry</span>
				</div>
			</Link>

			{/* NAVIGATION: DATA SECTORS */}
			<div className="hidden md:flex items-center gap-10">
				{["Components", "Builds", "Peripherals"].map((item) => (
					<Link
						key={item}
						href={`/${item.toLowerCase()}`}
						className="relative text-[#94A3B8] text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#F5F5F0] transition-colors group/link"
					>
						{item}
						<span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FFB400] transition-all group-hover/link:w-full" />
					</Link>
				))}
			</div>

			{/* UTILITY ACTIONS */}
			<div className="flex items-center gap-2.5 md:gap-6 text-[#F5F5F0]">
				<button type="button" className="p-2 hover:bg-white/5 rounded-full transition-all text-[#94A3B8] hover:text-[#FFB400]" title="Registry Lookup">
					<Search size={18} strokeWidth={2.5} />
				</button>

				<Button className="relative group p-2" onClick={() => openCart(true)}>
					<ShoppingBag size={18} strokeWidth={2.5} className="group-hover:text-[#FFB400] transition-colors" />
					<span className="absolute top-0 right-0 bg-[#FFB400] text-[#0A0E14] text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(255,180,0,0.5)]">0</span>
				</Button>

				{/* Mobile Menu Trigger */}
				<button type="button" className="md:hidden p-2 text-[#94A3B8]" title="Mobile Menu">
					<Menu size={20} />
				</button>
			</div>
		</nav>
	);
}
