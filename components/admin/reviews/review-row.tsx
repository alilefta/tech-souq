"use client";

import { Star, ShieldCheck, Trash2, ArrowUpRight, User, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useAction } from "next-safe-action/hooks";
import { archiveReview, authorizeReview } from "@/app/actions/review";
import { toast } from "sonner";
import { ReviewDTO } from "@/app/data/review";

export function ReviewRow({ log, onScan }: { log: ReviewDTO; onScan: () => void }) {
	const isHighIntegrity = log.integrity >= 95;

	const { executeAsync: executeAuthorize, isExecuting: isAuthorizing } = useAction(authorizeReview);
	const { executeAsync: executeArchive, isExecuting: isArchiving } = useAction(archiveReview);

	const handleAuthorize = async () => {
		const res = await executeAuthorize({ id: log.id });
		if (res?.data?.success) {
			toast.success("CLEARANCE_GRANTED", { description: "LOG_SYNCHRONIZED_WITH_VANGUARD_FEED" });
		}
	};

	return (
		<tr className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
			{/* LOG ID */}
			<td className="p-5 text-[#FFB400] opacity-40 font-mono text-[9px]">#{log.id}</td>

			{/* VANGUARD ENTITY */}
			<td className="p-5">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
						<User size={14} className="text-[#94A3B8]" />
					</div>
					<div className="flex flex-col">
						<span className="text-[#F5F5F0]">{log.user}</span>
						<span className="text-[7px] text-[#FFB400] tracking-widest uppercase">{log.rank}</span>
					</div>
				</div>
			</td>

			{/* MATCHED HARDWARE */}
			<td className="p-5">
				<div className="flex items-center gap-2">
					<Terminal size={12} className="text-[#94A3B8] opacity-30" />
					<span className="text-[#94A3B8] text-[10px] group-hover:text-[#F5F5F0] transition-colors">{log.hardwareName || "RTX_5090_VANGUARD"}</span>
				</div>
			</td>

			{/* INTEGRITY SCORE */}
			<td className="p-5">
				<div className="flex flex-col gap-1.5">
					<div className="flex justify-between items-center text-[9px] font-mono">
						<span className={isHighIntegrity ? "text-green-500" : "text-[#FFB400]"}>{log.integrity}%</span>
					</div>
					<div className="h-0.5 w-24 bg-white/5">
						<div className={cn("h-full", isHighIntegrity ? "bg-green-500" : "bg-[#FFB400]")} style={{ width: `${log.integrity}%` }} />
					</div>
				</div>
			</td>

			{/* LOG PREVIEW */}
			<td className="p-5 max-w-xs">
				<p className="text-[#94A3B8] text-[10px] leading-relaxed line-clamp-1 italic">&quot;{log.comment}&quot;</p>
			</td>

			{/* ACTIONS */}
			<td className="p-5 text-right">
				<div className="flex items-center justify-end gap-3">
					{/* THE DEEP SCAN TRIGGER */}
					<button
						onClick={onScan}
						className="px-3 py-1.5 border border-blue-500/20 text-blue-400 text-[8px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
					>
						[Deep_Scan]
					</button>
					{log.status === "PENDING" && (
						<button
							onClick={handleAuthorize}
							disabled={isAuthorizing}
							className="px-3 py-1.5 border border-[#FFB400]/20 text-[#FFB400] text-[8px] font-black uppercase tracking-widest hover:bg-[#FFB400] hover:text-[#0A0E14] transition-all disabled:opacity-20"
						>
							{isAuthorizing ? "AUTHORIZING..." : "Authorize_Log"}
						</button>
					)}
					<button onClick={() => executeArchive({ id: log.id })} disabled={isArchiving} className="p-2 text-red-500/40 hover:text-red-500 transition-colors disabled:opacity-0">
						<Trash2 size={14} />
					</button>
				</div>
			</td>
		</tr>
	);
}
