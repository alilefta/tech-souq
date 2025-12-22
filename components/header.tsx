"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, Cpu, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function Header() {
	return (
		/* 
       ELITE UI TIP: We use sticky top-6 with a width of 95% 
       to create a "floating" detached navbar effect.
    */
		<header className="sticky top-6 z-50 w-[95%] max-w-7xl mx-auto">
			<nav className="bg-[#0A0E14]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
				<div className="flex h-12 items-center justify-between gap-4">
					{/* 1. BRAND LOGO SECTION */}
					<div className="flex items-center gap-8">
						<Link href="/" className="flex items-center gap-3 group">
							<div className="relative w-8 h-8 flex items-center justify-center transition-transform group-hover:rotate-[60deg] duration-500">
								{/* Logo SVG */}
								<svg viewBox="0 0 100 100" className="w-full h-full">
									<path d="M50 5L89 27.5V72.5L50 95L11 72.5V27.5L50 5Z" className="stroke-[#FFB400]" strokeWidth="8" fill="none" />
									<path d="M35 40 H50 V50 H35 V65 H50" className="stroke-white" strokeWidth="8" fill="none" />
									<rect x="60" y="40" width="15" height="25" className="stroke-[#FFB400]" strokeWidth="8" fill="none" />
								</svg>
							</div>
							<div className="flex flex-col">
								<span className="text-lg font-black tracking-tighter text-[#F5F5F0] leading-none">
									BASE<span className="text-[#FFB400]">_60</span>
								</span>
								<span className="text-[7px] font-mono text-[#94A3B8] tracking-[0.3em] uppercase opacity-50">Babylon_Foundry</span>
							</div>
						</Link>

						{/* 2. NAVIGATION: Technical Naming */}
						<nav className="hidden lg:flex items-center gap-8">
							{[
								{ name: "Registry", href: "/products" },
								{ name: "Builds", href: "/builds" },
								{ name: "Logistics", href: "/support" },
							].map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] hover:text-[#FFB400] transition-colors relative group"
								>
									{item.name}
									<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FFB400] transition-all group-hover:w-full" />
								</Link>
							))}
						</nav>
					</div>

					{/* 3. CENTER: LIVE STATUS (Fills space visually) */}
					<div className="hidden xl:flex items-center gap-4 border-x border-white/5 px-8 h-full">
						<div className="flex items-center gap-2">
							<Activity size={12} className="text-green-500 animate-pulse" />
							<span className="text-[8px] font-mono text-[#94A3B8] uppercase tracking-widest">System_Live</span>
						</div>
						<div className="w-[1px] h-3 bg-white/10" />
						<span className="text-[8px] font-mono text-[#94A3B8] uppercase tracking-widest">Origin: 32.5° N</span>
					</div>

					{/* 4. ACTIONS */}
					<div className="flex items-center gap-2">
						{/* Search Trigger */}
						<Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-[#FFB400] hover:bg-white/5">
							<Search className="h-4 w-4" />
						</Button>

						<Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-[#FFB400] hover:bg-white/5 hidden sm:flex">
							<User className="h-4 w-4" />
						</Button>

						{/* Cart with "Payload" count */}
						<Button variant="ghost" size="icon" className="relative text-[#94A3B8] hover:text-[#FFB400] hover:bg-white/5 group">
							<ShoppingCart className="h-4 w-4" />
							<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFB400] text-[9px] font-black text-[#0A0E14] group-hover:scale-110 transition-transform">
								03
							</span>
						</Button>

						<Button variant="ghost" size="icon" className="lg:hidden text-[#94A3B8]">
							<Menu className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</nav>
		</header>
	);
}
