"use client";

import { LayoutDashboard, Box, Layers, Truck, MessageSquare, TrendingUp, ChevronRight, User, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const menuItems = [
	{ name: "Overview", icon: LayoutDashboard, path: "/admin" },
	{ name: "Modules", icon: Box, path: "/admin/products" },
	{ name: "Sectors", icon: Layers, path: "/admin/categories" },
	{ name: "Dispatches", icon: Truck, path: "/admin/orders" },
	{ name: "Analytics", icon: TrendingUp, path: "/admin/analytics" },
	{ name: "Intel", icon: MessageSquare, path: "/admin/reviews" },
	{ name: "Users", icon: User, path: "/admin/users" },
	{ name: "Settings", icon: Settings, path: "/admin/settings" },
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 border-r border-white/5 bg-[#0A0E14] hidden lg:flex flex-col">
			{/* BRAND UNIT */}
			<div className="p-8 border-b border-white/5">
				<Link href="/admin" className="flex items-center gap-3">
					<Logo />
					<div className="flex flex-col">
						<span className="text-sm font-black tracking-tighter uppercase leading-none">
							BASE <span className="text-[#FFB400]">60</span>
						</span>
						<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.4em] mt-1">Foundry_Control</span>
					</div>
				</Link>
			</div>

			{/* NAVIGATION MODULES */}
			<nav className="flex-1 p-4 space-y-2">
				<p className="text-[8px] font-black text-[#94A3B8] uppercase tracking-[0.3em] mb-6 px-4">Registry_Access</p>
				{menuItems.map((item) => {
					// 1. IMPROVED LOGIC: Use startsWith for sub-pages, but strict equality for Overview
					const isExact = pathname === item.path;
					const isParentOfActive = item.path !== "/admin" && pathname.startsWith(item.path);
					const isActive = isExact || isParentOfActive;

					// 2. PROTOCOL DETECTION: Detect if we are in 'New' or 'Edit' mode
					const isDeploying = isActive && pathname.endsWith("/new");
					const isReconfiguring = isActive && pathname.includes("/edit");

					return (
						<div key={item.name} className="flex flex-col gap-1">
							<Link
								href={item.path}
								className={cn(
									"flex items-center gap-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all relative group",
									isActive ? "text-[#FFB400] bg-[#FFB400]/5" : "text-[#94A3B8] hover:text-[#F5F5F0] hover:bg-white/2",
								)}
							>
								<item.icon size={16} strokeWidth={isActive ? 2.5 : 1.5} />
								<span className="flex-1">{item.name}</span>

								{isActive && <div className="absolute right-0 top-0 h-full w-0.5 bg-[#FFB400] shadow-[0_0_10px_#FFB400]" />}
							</Link>

							{/* 3. SUB-PROTOCOL INDICATOR: Shows when inside a sub-route */}
							{(isDeploying || isReconfiguring) && (
								<div className="ml-12 border-l border-[#FFB400]/20 pl-4 py-1 flex flex-col gap-2">
									<div className="flex items-center gap-2">
										<ChevronRight size={10} className="text-[#FFB400]" />
										<span className="text-[8px] font-mono text-[#FFB400] uppercase tracking-widest animate-pulse">{isDeploying ? "INITIALIZING..." : "RECONFIGURING..."}</span>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</nav>

			{/* SYSTEM STATUS FOOTER */}
			<div className="p-6 border-t border-white/5">
				<div className="bg-white/2 border border-white/5 p-4 space-y-3">
					<div className="flex justify-between items-center">
						<span className="text-[8px] font-mono text-[#94A3B8] uppercase">Sync_Status</span>
						<div className="flex items-center gap-1.5">
							<div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
							<span className="text-[8px] font-bold text-green-500 uppercase tracking-tighter">Live</span>
						</div>
					</div>
					<div className="h-1 w-full bg-white/5 overflow-hidden">
						<div className="h-full w-2/3 bg-[#FFB400] animate-pulse" />
					</div>
				</div>
			</div>
		</aside>
	);
}
