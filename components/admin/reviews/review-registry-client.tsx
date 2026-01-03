"use client";

import { useState } from "react";
import { ReviewRow } from "./review-row";
import { ReviewPreview } from "./review-preview";
import { ReviewDTO } from "@/app/data/review";

export function ReviewRegistryClient({ initialReviews }: { initialReviews: ReviewDTO[] }) {
	const [activeScanId, setActiveScanId] = useState<string | null>(null);

	// Find the full log data for the preview
	const selectedLog = initialReviews.find((r) => r.id === activeScanId) || null;

	return (
		<>
			<div className="border border-white/5 bg-white/[0.01]">
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-b border-white/5 text-[9px] font-black uppercase text-[#94A3B8] tracking-[0.3em] bg-white/2">
							<th className="p-5 text-left">Log_ID</th>
							<th className="p-5 text-left">Vanguard_Entity</th>
							<th className="p-5 text-left">Matched_Hardware</th>
							<th className="p-5 text-left">Integrity_Score</th>
							<th className="p-5 text-left">Telemetry_Log</th>
							<th className="p-5 text-right">System_Actions</th>
						</tr>
					</thead>
					<tbody className="text-[11px] font-bold text-[#F5F5F0] uppercase tracking-tighter font-mono">
						{initialReviews.map((log) => (
							<ReviewRow key={log.id} log={log} onScan={() => setActiveScanId(log.id)} />
						))}
					</tbody>
				</table>
			</div>

			{/* THE SINGLETON PREVIEW TERMINAL */}
			<ReviewPreview log={selectedLog} isOpen={!!activeScanId} onClose={() => setActiveScanId(null)} />
		</>
	);
}
