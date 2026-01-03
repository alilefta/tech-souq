// components/admin/users/user-row.tsx
"use client";

import { UserDTO } from "@/app/data/user";
import { cn } from "@/lib/utils";
import { User, MapPin, Zap } from "lucide-react";

export function UserRow({ user, onScan }: { user: UserDTO; onScan: () => void }) {
	return (
		<tr className="border-b border-white/5 hover:bg-white/2 transition-all group">
			{/* IDENTITY */}
			<td className="p-5">
				<div className="flex items-center gap-4">
					<div className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center relative overflow-hidden">
						<User size={20} className="text-[#94A3B8] opacity-20" />
						<div className="absolute inset-0 bg-linear-to-b from-transparent via-[#FFB400]/5 to-transparent h-1/2 w-full -translate-y-full group-hover:translate-y-[200%] transition-transform duration-1000" />
					</div>
					<div className="flex flex-col">
						<span className="text-[#F5F5F0] font-bold tracking-tight uppercase">{user.name}</span>
						<span className="text-[8px] font-mono text-[#94A3B8] opacity-40">{user.email}</span>
					</div>
				</div>
			</td>

			{/* RANK PROTOCOL */}
			<td className="p-5">
				<div className="inline-flex items-center gap-2 px-2 py-1 bg-[#FFB400]/5 border border-[#FFB400]/20">
					<Zap size={10} className="text-[#FFB400]" />
					<span className="text-[8px] font-black uppercase tracking-widest text-[#FFB400]">{user.rank}</span>
				</div>
			</td>

			{/* GEOSPATIAL LOCATION */}
			<td className="p-5">
				<div className="flex items-center gap-2 text-[#94A3B8]">
					<MapPin size={12} className="opacity-40" />
					<span className="text-[10px] font-bold uppercase">{user.location}</span>
				</div>
			</td>

			{/* ALLOCATED CAPITAL */}
			<td className="p-5 font-black text-[#F5F5F0] font-mono">${user.totalAllocation.toLocaleString()}</td>

			{/* NODE STATUS */}
			<td className="p-5">
				<div className="flex items-center gap-2">
					<div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", user.status === "ACTIVE_NODE" ? "bg-green-500" : "bg-red-500")} />
					<span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{user.status}</span>
				</div>
			</td>

			{/* ACTIONS */}
			<td className="p-5 text-right">
				<button
					onClick={onScan}
					className="px-4 py-2 border border-blue-500/20 text-blue-400 text-[8px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
				>
					[ Deep_Scan ]
				</button>
			</td>
		</tr>
	);
}
