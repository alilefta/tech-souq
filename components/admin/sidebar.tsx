// components/admin/sidebar.tsx
"use client";

import { LayoutDashboard, Box, Layers, Truck, MessageSquare, Settings, Activity, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const menuItems = [
	{ name: "Overview", icon: LayoutDashboard, path: "/admin" },
	{ name: "Modules", icon: Box, path: "/admin/products" },
	{ name: "Sectors", icon: Layers, path: "/admin/categories" },
	{ name: "Dispatches", icon: Truck, path: "/admin/orders" },
	{ name: "Intel", icon: MessageSquare, path: "/admin/reviews" },
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
					const isActive = pathname === item.path;
					return (
						<Link
							key={item.name}
							href={item.path}
							className={cn(
								"flex items-center gap-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all relative group",
								isActive ? "text-[#FFB400] bg-[#FFB400]/5" : "text-[#94A3B8] hover:text-[#F5F5F0] hover:bg-white/[0.02]"
							)}
						>
							<item.icon size={16} strokeWidth={isActive ? 2.5 : 1.5} />
							{item.name}
							{isActive && <div className="absolute right-0 top-0 h-full w-[2px] bg-[#FFB400] shadow-[0_0_10px_#FFB400]" />}
						</Link>
					);
				})}
			</nav>

			{/* SYSTEM STATUS FOOTER */}
			<div className="p-6 border-t border-white/5">
				<div className="bg-white/[0.02] border border-white/5 p-4 space-y-3">
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
