// app/(admin)/admin/reviews/page.tsx
import { getModuleReviews } from "@/app/data/review"; // Create this server action
import { IntelHeader } from "@/components/admin/reviews/intel-header";
import { Search } from "lucide-react";
import { ReviewRegistryClient } from "@/components/admin/reviews/review-registry-client";

export default async function ReviewIntelPage() {
	const reviews = await getModuleReviews();

	return (
		<div className="space-y-10 max-w-400 mx-auto">
			<IntelHeader totalReports={reviews.length} />

			{/* COMMAND CONTROLS */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/5 border border-white/5 p-px h-14">
				<div className="md:col-span-6 bg-[#0A0E14] flex items-center px-4 gap-4">
					<Search size={16} className="text-[#94A3B8] opacity-30" />
					<input placeholder="QUERY_LOG_ID_OR_VANGUARD_ID..." className="w-full bg-transparent border-none text-[10px] font-mono uppercase tracking-widest outline-none" />
				</div>
				<div className="md:col-span-3 bg-[#0A0E14] flex items-center border-l border-white/5 px-4">
					<select title="Filter Reviews" className="bg-transparent border-none text-[10px] font-mono uppercase text-[#94A3B8] w-full outline-none appearance-none">
						<option>Integrity: ALL_SCORES</option>
						<option>Integrity: CRITICAL_ONLY</option>
					</select>
				</div>
				<button className="md:col-span-3 bg-[#1E293B] hover:bg-[#FFB400] hover:text-[#0A0E14] text-[10px] font-black uppercase tracking-[0.2em] transition-all">Re-Sync_Logs</button>
			</div>

			{/* THE INTERACTIVE REGISTRY */}
			<ReviewRegistryClient initialReviews={reviews} />
		</div>
	);
}
