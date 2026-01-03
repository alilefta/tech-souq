"use client";

import { User, LogOut, Settings, Shield, Activity, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ProfileTerminal() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex items-center gap-4 pl-4 border-l border-white/5 cursor-pointer group">
					<div className="flex flex-col items-end">
						<span className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-tighter group-hover:text-[#FFB400] transition-colors">Zaid_Al-Hilli</span>
						<span className="text-[#FFB400] text-[8px] font-mono uppercase tracking-widest opacity-60">[Master_Architect]</span>
					</div>
					<div className="w-10 h-10 border border-white/10 bg-white/[0.02] flex items-center justify-center relative overflow-hidden group-hover:border-[#FFB400]/40 transition-all">
						<User size={20} className="text-[#94A3B8] group-hover:text-[#F5F5F0]" />
						{/* Animated scanline */}
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFB400]/10 to-transparent h-1/2 w-full -translate-y-full group-hover:translate-y-[200%] transition-transform duration-1000" />
					</div>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56 bg-[#0A0E14] border-white/10 rounded-none p-0 shadow-2xl z-50 font-sans" align="end">
				<DropdownMenuLabel className="p-4 bg-white/[0.02]">
					<div className="flex flex-col gap-1">
						<span className="text-[10px] font-black text-[#F5F5F0] uppercase tracking-widest">Access_Authorization</span>
						<span className="text-[7px] font-mono text-[#94A3B8] opacity-40 uppercase">Token: BBL_60_ADMIN_SECURE</span>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator className="bg-white/5 m-0" />

				<div className="p-2">
					<DropdownMenuItem className="flex items-center gap-3 px-3 py-3 text-[10px] font-bold text-[#94A3B8] focus:bg-[#FFB400] focus:text-[#0A0E14] rounded-none cursor-pointer uppercase tracking-widest">
						<Settings size={14} /> System_Settings
					</DropdownMenuItem>
					<DropdownMenuItem className="flex items-center gap-3 px-3 py-3 text-[10px] font-bold text-[#94A3B8] focus:bg-[#FFB400] focus:text-[#0A0E14] rounded-none cursor-pointer uppercase tracking-widest">
						<Shield size={14} /> Security_Protocol
					</DropdownMenuItem>
				</div>

				<DropdownMenuSeparator className="bg-white/5 m-0" />

				<div className="p-2">
					<DropdownMenuItem className="flex items-center gap-3 px-3 py-3 text-[10px] font-bold text-red-500 focus:bg-red-500 focus:text-white rounded-none cursor-pointer uppercase tracking-widest transition-colors">
						<LogOut size={14} /> Terminate_Session
					</DropdownMenuItem>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
