"use client";

import { ShoppingBag, Search, Menu, Terminal } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { useCart } from "@/store/useCart";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/navigation"; // Import the registry
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FoundrySearch } from "../search/foundry-search";
import { MobileNav } from "../layout/mobile-nav";

export default function Navbar() {
	const openCart = useCart((state) => state.setIsOpen);
	const totalItems = useCart((state) => state.items.length);
	const pathname = usePathname();
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	// GLOBAL KEYBOARD LISTENER
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setIsSearchOpen(true);
			}
			if (e.key === "Escape") {
				setIsSearchOpen(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// HIDE ON BUILDER (App Mode)
	if (pathname === "/builder") return null;

	return (
		<nav className="sticky top-6 w-[95%] max-w-7xl z-50 mx-auto flex items-center justify-between px-6 py-4 bg-[#1E293B]/40 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-500 shadow-2xl">
			{/* 1. BRAND IDENTIFIER */}
			<Link href="/" className="flex items-center gap-3 group">
				<Logo />
				<div className="flex flex-col">
					<span className="text-[#F5F5F0] font-black text-xl tracking-tighter leading-none flex items-center gap-1">
						BASE <span className="text-[#FFB400]">60</span>
					</span>
					<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.4em] mt-1 opacity-60 group-hover:text-[#FFB400] transition-colors">Babylon // Foundry</span>
				</div>
			</Link>

			{/* 2. NAVIGATION REGISTRY (Dynamic Map) */}
			<div className="hidden md:flex items-center gap-10">
				{siteConfig.mainNav.map((item) => {
					const isActive = pathname.startsWith(item.href);

					return (
						<Link
							key={item.title}
							href={item.href}
							className={cn(
								"relative text-[10px] font-black uppercase tracking-[0.2em] transition-colors group/link",
								isActive ? "text-[#F5F5F0]" : "text-[#94A3B8] hover:text-[#FFB400]",
							)}
						>
							{item.title}
							{/* Active/Hover Underline */}
							<span className={cn("absolute -bottom-1 left-0 h-px bg-[#FFB400] transition-all duration-300", isActive ? "w-full" : "w-0 group-hover/link:w-full")} />
						</Link>
					);
				})}
			</div>

			{/* 3. UTILITY ACTIONS */}
			<div className="flex items-center gap-2.5 md:gap-6 text-[#F5F5F0]">
				{/* Admin Shortcut (Optional: Only show if admin logged in later) */}
				<Link href="/admin" title="Overseer Terminal">
					<button title="Home" className="hidden md:flex p-2 hover:bg-white/5 rounded-full transition-all text-[#94A3B8] hover:text-[#FFB400]">
						<Terminal size={18} strokeWidth={2.5} />
					</button>
				</Link>

				<button
					onClick={() => setIsSearchOpen(true)}
					type="button"
					className="p-2 hover:bg-white/5 rounded-full transition-all text-[#94A3B8] hover:text-[#FFB400] flex items-center gap-2 group"
					title="Registry Lookup"
				>
					<Search size={18} strokeWidth={2.5} />
					{/* Only show shortcut hint on Desktop */}
					<span className="hidden lg:block text-[9px] font-mono border border-white/10 px-1.5 py-0.5 rounded opacity-50 group-hover:border-[#FFB400] group-hover:text-[#FFB400] transition-all">
						CMD+K
					</span>
				</button>

				<button className="relative group p-2" onClick={() => openCart(true)}>
					<ShoppingBag size={18} strokeWidth={2.5} className="group-hover:text-[#FFB400] transition-colors" />
					<span className="absolute top-0 right-0 bg-[#FFB400] text-[#0A0E14] text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(255,180,0,0.5)]">{totalItems}</span>
				</button>

				{/* Mobile Menu Trigger */}
				<MobileNav />
			</div>

			{/* RENDER THE TERMINAL */}
			<FoundrySearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
		</nav>
	);
}
