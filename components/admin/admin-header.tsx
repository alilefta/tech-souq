"use client";

import { useState, useEffect } from "react";
import { Search, Bell, User, Terminal, Wifi, Clock } from "lucide-react";
import { motion } from "motion/react";
import { HeaderSearch } from "./header-search";
import { NotificationsTerminal } from "./notifications-terminal";
import { ProfileTerminal } from "./profile-terminal";

export function AdminHeader() {
	const [time, setTime] = useState("");

	// Live clock to maintain the "Operations Room" feel
	useEffect(() => {
		const timer = setInterval(() => {
			setTime(
				new Date().toLocaleTimeString("en-US", {
					hour12: false,
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				})
			);
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<header className="h-20 border-b border-white/5 bg-[#0A0E14] flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md">
			{/* 1. REGISTRY QUICK SEARCH */}
			<div className="flex-1 max-w-xl">
				<HeaderSearch />
			</div>

			{/* 2. SYSTEM DATA HUB */}
			<div className="flex items-center gap-8">
				{/* TELEMETRY: Clock & Node */}
				<div className="hidden xl:flex items-center gap-6 border-x border-white/5 px-8 h-20">
					<div className="flex flex-col items-end">
						<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.3em] mb-1">Foundry_Time</span>
						<div className="flex items-center gap-2 text-[11px] font-bold text-[#F5F5F0] font-mono">
							<Clock size={12} className="text-[#FFB400]" />
							{time || "00:00:00"}
						</div>
					</div>

					<div className="flex flex-col items-end">
						<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.3em] mb-1">Signal_Strength</span>
						<div className="flex items-center gap-2 text-[11px] font-bold text-green-500 font-mono">
							<Wifi size={12} />
							99.8 MS
						</div>
					</div>
				</div>

				{/* ACTIONS: Signals & Auth */}
				<div className="flex items-center gap-4">
					<NotificationsTerminal />
					<ProfileTerminal />
				</div>
			</div>
		</header>
	);
}
