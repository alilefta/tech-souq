// app/(admin)/admin/users/page.tsx
import { Users, Shield, Globe, Search, Filter, Terminal } from "lucide-react";
import { UserRegistryClient } from "@/components/admin/users/user-registry-client";
import { mockUsers } from "@/app/data/user";
import { FoundrySelect } from "@/components/ui/inputs/foundary-form-select";

export default async function VanguardRegistryPage() {
	// In production: const users = await prisma.user.findMany(...)
	const users = mockUsers;

	return (
		<div className="space-y-10 max-w-400 mx-auto">
			{/* 1. IDENTITY HEADER */}
			<header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 border-b border-white/5 pb-10 relative overflow-hidden">
				<div>
					<div className="flex items-center gap-3 mb-4">
						<Shield size={14} className="text-[#FFB400]" />
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.5em]">Identity_Access: Active</span>
					</div>
					<h1 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-[#F5F5F0] leading-none">
						Vanguard <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Registry</span>
					</h1>
				</div>

				<div className="flex flex-wrap gap-4">
					<div className="bg-white/2 border border-white/5 px-8 py-4 flex flex-col items-end">
						<span className="text-[8px] font-black uppercase text-[#94A3B8] tracking-widest">Authorized_Architects</span>
						<span className="text-3xl font-black text-[#F5F5F0] font-mono tracking-tighter">0{users.length}</span>
					</div>
					<div className="bg-white/2 border border-white/5 px-8 py-4 flex flex-col items-end">
						<span className="text-[8px] font-black uppercase text-[#94A3B8] tracking-widest">Global_Coverage</span>
						<span className="text-3xl font-black text-green-500 font-mono tracking-tighter">94%</span>
					</div>
				</div>
			</header>

			{/* 2. COMMAND COMMAND BAR */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/5 border border-white/5 p-px h-14">
				<div className="md:col-span-6 bg-[#0A0E14] flex items-center px-4 gap-4">
					<Search size={16} className="text-[#94A3B8] opacity-30" />
					<input placeholder="QUERY_ENTITY_NAME_OR_ID..." className="w-full bg-transparent border-none text-[10px] font-mono uppercase tracking-widest outline-none" />
				</div>
				<div className="md:col-span-3 bg-[#0A0E14] flex items-center border-l border-white/5 px-4">
					<select
						title="Select Role"
						className="bg-[#0A0E14] border-white/10 rounded-none shadow-2xl px-4 z-50 border-none text-[10px] font-mono uppercase text-[#94A3B8] w-full outline-none appearance-none cursor-pointer"
					>
						<option>Rank: ALL_LEVELS</option>
						<option>Rank: MASTER_ARCHITECT</option>
						<option>Rank: ELITE_BUILDER</option>
					</select>
				</div>
				<button className="md:col-span-3 bg-[#1E293B] hover:bg-[#FFB400] hover:text-[#0A0E14] text-[10px] font-black uppercase tracking-[0.2em] transition-all">Synchronize_Entities</button>
			</div>

			{/* 3. INTERACTIVE REGISTRY TABLE */}
			<UserRegistryClient initialUsers={users} />
		</div>
	);
}
