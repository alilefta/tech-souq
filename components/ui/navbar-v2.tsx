// components/Navbar.tsx
"use client";

import { ShoppingBag, Cpu, Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
	return (
		// Changed fixed to sticky. top-6 gives it that "floating" gap from the top/banner.
		<nav className="sticky top-6 w-[95%] max-w-7xl z-50 mx-auto flex items-center justify-between px-6 py-4 bg-[#1E293B]/40 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300 shadow-2xl">
			{/* Logo */}
			<Link href="/" className="flex items-center gap-2 group">
				<div className="w-8 h-8 bg-[#FFB400] rounded-sm flex items-center justify-center group-hover:rotate-12 transition-transform">
					<Cpu size={20} className="text-[#0A0E14]" />
				</div>
				<span className="text-[#F5F5F0] font-bold text-xl tracking-tighter">
					TECH<span className="text-[#FFB400]">SOUQ</span>
				</span>
			</Link>

			{/* Desktop Links */}
			<div className="hidden md:flex items-center gap-8 text-[#94A3B8] text-[10px] font-black uppercase tracking-[0.2em]">
				<Link href="/components" className="hover:text-[#FFB400] transition-colors">
					Components
				</Link>
				<Link href="/builds" className="hover:text-[#FFB400] transition-colors">
					Builds
				</Link>
				<Link href="/peripherals" className="hover:text-[#FFB400] transition-colors">
					Peripherals
				</Link>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-5 text-[#F5F5F0]">
				<button className="hover:text-[#FFB400] transition-colors" title="search">
					<Search size={18} />
				</button>
				<Link href="/cart" className="relative group">
					<ShoppingBag size={18} className="group-hover:text-[#FFB400] transition-colors" />
					<span className="absolute -top-2 -right-2 bg-[#FFB400] text-[#0A0E14] text-[9px] font-black px-1.5 py-0.5 rounded-full">0</span>
				</Link>
			</div>
		</nav>
	);
}
