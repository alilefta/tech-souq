"use client";

import { AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProtocolAlert } from "@/lib/builder/resolver";
import { cn } from "@/lib/utils";

export function SystemAlertTicker({ alerts }: { alerts: ProtocolAlert[] }) {
	// We only show the highest priority alert if multiple exist
	const activeAlert = alerts[0];

	return (
		<AnimatePresence>
			{activeAlert && (
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 20, opacity: 0 }}
					className="absolute bottom-20 left-0 right-0 lg:left-auto lg:right-6 lg:bottom-24 lg:w-96 z-50 pointer-events-auto"
				>
					<div
						className={cn(
							"p-4 border backdrop-blur-xl shadow-2xl flex gap-3 items-start",
							activeAlert.severity === "CRITICAL" ? "bg-red-500/10 border-red-500 text-red-100" : "bg-[#FFB400]/10 border-[#FFB400] text-[#FFB400]",
						)}
					>
						<div className="mt-0.5 shrink-0">{activeAlert.severity === "CRITICAL" ? <AlertTriangle size={16} /> : <Info size={16} />}</div>
						<div className="flex-1">
							<p className="text-[9px] font-black uppercase tracking-widest mb-1">{activeAlert.code}</p>
							<p className="text-[10px] font-medium leading-tight opacity-90">{activeAlert.message}</p>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
