"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Terminal, ArrowRight, Shield, Globe } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function MobileNav() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<button type="button" className="md:hidden p-2 text-[#94A3B8] hover:text-[#FFB400] transition-colors" title="Open Directory">
					<Menu size={20} />
				</button>
			</SheetTrigger>

			{/* FULL SCREEN SLATE OVERLAY */}
			<SheetContent
				side="top"
				className="w-full h-dvh bg-[#0A0E14]/98 border-b border-white/5 p-0 flex flex-col font-sans z-[100]"
				// Remove default close button styling via CSS or custom override if needed,
				// but Shadcn handles it well usually. We can add a custom close area if desired.
			>
				{/* 1. HEADER: IDENTITY */}
				<SheetHeader className="p-6 border-b border-white/5 flex flex-row items-center justify-between">
					<div className="flex items-center gap-3">
						<Logo />
						<div className="flex flex-col items-start">
							<SheetTitle className="text-[#F5F5F0] font-black text-xl tracking-tighter leading-none uppercase">
								BASE <span className="text-[#FFB400]">60</span>
							</SheetTitle>
							<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.3em]">Mobile_Uplink_Active</span>
						</div>
					</div>
					{/* The Close Button is auto-rendered by Sheet, but we can style the header area around it */}
				</SheetHeader>

				{/* 2. NAVIGATION GRID */}
				<div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col justify-center">
					<nav className="flex flex-col gap-6">
						{siteConfig.mainNav.map((item, i) => {
							const isActive = pathname.startsWith(item.href);

							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className="group flex items-end justify-between border-b border-white/5 pb-4 hover:border-[#FFB400]/40 transition-all"
								>
									<div className="flex flex-col">
										<span className="text-[9px] font-mono text-[#94A3B8] group-hover:text-[#FFB400] transition-colors mb-1">
											0{i + 1}
											{" // SECTOR_ACCESS"}
										</span>
										<span
											className={cn(
												"text-4xl font-black uppercase tracking-tighter transition-all",
												isActive ? "text-[#F5F5F0]" : "text-[#94A3B8] opacity-60 group-hover:text-[#F5F5F0] group-hover:opacity-100",
											)}
										>
											{item.title}
										</span>
									</div>
									<ArrowRight
										size={24}
										className={cn(
											"mb-2 transition-transform duration-300",
											isActive ? "text-[#FFB400]" : "text-[#94A3B8] opacity-20 -rotate-45 group-hover:rotate-0 group-hover:text-[#FFB400] group-hover:opacity-100",
										)}
									/>
								</Link>
							);
						})}
					</nav>
				</div>

				{/* 3. FOOTER: ADMIN & TELEMETRY */}
				<div className="p-6 bg-white/2 border-t border-white/5 space-y-6">
					{/* Admin Shortcut */}
					<Link
						href="/admin"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-4 p-4 border border-white/10 bg-[#0A0E14] hover:border-[#FFB400]/40 hover:bg-[#FFB400]/5 transition-all group"
					>
						<div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-none group-hover:text-[#FFB400]">
							<Terminal size={18} />
						</div>
						<div className="flex flex-col">
							<span className="text-xs font-bold text-[#F5F5F0] uppercase tracking-widest">Overseer_Terminal</span>
							<span className="text-[8px] font-mono text-[#94A3B8]">Authorized_Personnel_Only</span>
						</div>
					</Link>

					{/* System Status */}
					<div className="flex justify-between items-end opacity-40">
						<div className="flex flex-col gap-1">
							<div className="flex items-center gap-2">
								<Globe size={10} />
								<span className="text-[8px] font-mono uppercase tracking-widest">Node: Babylon_Alpha</span>
							</div>
							<div className="flex items-center gap-2">
								<Shield size={10} />
								<span className="text-[8px] font-mono uppercase tracking-widest">Secure_Link: TLS_1.3</span>
							</div>
						</div>
						<span className="text-[20px] font-black text-[#F5F5F0] opacity-10">B60</span>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
