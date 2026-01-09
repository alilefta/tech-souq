"use client";

import { cn } from "@/lib/utils";
import { Edit2, Trash2 } from "lucide-react";

interface ModuleActionProps {
	type: "edit" | "kill" | "scan";
	onClick: () => void;
}

export function ModuleAction({ type, onClick }: ModuleActionProps) {
	const styles = {
		edit: "border-white/10 text-[#94A3B8] hover:border-[#FFB400] hover:text-[#FFB400] hover:bg-[#FFB400]/5",
		kill: "border-red-500/20 text-red-500/60 hover:bg-red-500 hover:text-white hover:border-red-500",
		scan: "border-blue-500/20 text-blue-400 hover:border-blue-400 hover:bg-blue-400/5",
	};

	return (
		<button onClick={onClick} className={cn("px-3 py-1.5 border text-[9px] font-black uppercase tracking-widest transition-all", styles[type])}>
			{type === "scan" ? "[Scan]" : type === "kill" ? "Kill_Process" : "Edit_Logic"}
		</button>
	);
}
