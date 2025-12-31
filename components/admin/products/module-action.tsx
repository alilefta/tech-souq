"use client";

import { cn } from "@/lib/utils";
import { Edit2, Trash2 } from "lucide-react";

interface ModuleActionProps {
	type: "edit" | "kill";
	onClick: () => void;
}

export function ModuleAction({ type, onClick }: ModuleActionProps) {
	const isKill = type === "kill";

	return (
		<button
			onClick={onClick}
			className={cn(
				"flex items-center gap-2 px-3 py-1.5 border text-[9px] font-black uppercase tracking-widest transition-all",
				isKill
					? "border-red-500/20 text-red-500/60 hover:bg-red-500 hover:text-white hover:border-red-500"
					: "border-white/10 text-[#94A3B8] hover:border-[#FFB400] hover:text-[#FFB400] hover:bg-[#FFB400]/5"
			)}
		>
			{isKill ? <Trash2 size={10} /> : <Edit2 size={10} />}
			{isKill ? "Kill_Process" : "Edit_Logic"}
		</button>
	);
}
