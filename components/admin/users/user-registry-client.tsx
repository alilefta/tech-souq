"use client";

import { useState } from "react";
import { UserDTO } from "@/app/data/user";
import { UserRow } from "./user-row";
import { UserDeepScan } from "./user-deep-scan";
import { cn } from "@/lib/utils";

interface UserRegistryClientProps {
	initialUsers: UserDTO[];
}

export function UserRegistryClient({ initialUsers }: UserRegistryClientProps) {
	const [activeUserId, setActiveUserId] = useState<string | null>(null);

	// Find the specific entity data for the Deep Scan terminal
	const selectedUser = initialUsers.find((u) => u.id === activeUserId) || null;

	return (
		<div className="space-y-4">
			{/* 1. THE REGISTRY TABLE */}
			<div className="border border-white/5 bg-white/1 overflow-hidden">
				<div className="overflow-x-auto custom-scrollbar">
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b border-white/5 text-[9px] font-black uppercase text-[#94A3B8] tracking-[0.3em] bg-white/2">
								<th className="p-5 text-left font-black">Entity_ID</th>
								<th className="p-5 text-left font-black">Identity_String</th>
								<th className="p-5 text-left font-black">Rank_Protocol</th>
								<th className="p-5 text-left font-black">Geospatial_Node</th>
								<th className="p-5 text-left font-black">Total_Allocation</th>
								<th className="p-5 text-left font-black">Node_Status</th>
								<th className="p-5 text-right font-black">System_Actions</th>
							</tr>
						</thead>
						<tbody className="text-[11px] font-bold text-[#F5F5F0] uppercase tracking-tighter font-mono">
							{initialUsers.length > 0 ? (
								initialUsers.map((user) => <UserRow key={user.id} user={user} onScan={() => setActiveUserId(user.id)} />)
							) : (
								<tr>
									<td colSpan={7} className="p-20 text-center text-[#94A3B8] opacity-20 italic">
										No_Authorized_Entities_Found_In_Registry
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* 2. REGISTRY FOOTER TELEMETRY */}
			<div className="flex justify-between items-center px-2 opacity-20">
				<div className="flex gap-6">
					<span className="text-[8px] font-mono uppercase tracking-widest">Registry_Stream: ACTIVE</span>
					<span className="text-[8px] font-mono uppercase tracking-widest">Entities_Synced: {initialUsers.length.toString().padStart(3, "0")}</span>
				</div>
				<div className="flex gap-4">
					<span className="text-[8px] font-mono uppercase tracking-widest">Auth_Protocol: OAUTH_FOUNDRY_v2</span>
					<span className="text-[8px] font-mono uppercase tracking-widest">Node: BBL_ALPHA</span>
				</div>
			</div>

			{/* 3. THE SINGLETON DEEP SCAN TERMINAL */}
			<UserDeepScan user={selectedUser} isOpen={!!activeUserId} onClose={() => setActiveUserId(null)} />
		</div>
	);
}
