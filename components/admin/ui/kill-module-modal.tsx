"use client";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertTriangle, ShieldCheck, Trash2, PowerOff, Info, Loader2, X } from "lucide-react";

interface KillModuleModalProps {
	isOpen: boolean;
	onClose: () => void;
	onDeactivate: () => void;
	onWipe: () => void;
	title: string;
	isProcessing: boolean;
	isWiping: boolean;
}

export function KillModuleModal({ isOpen, onClose, onDeactivate, onWipe, title, isProcessing, isWiping }: KillModuleModalProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent className="bg-[#0A0E14] border-white/10 rounded-none max-w-xl font-sans">
				<AlertDialogHeader>
					<div className="flex items-center gap-3 text-red-500 mb-4">
						<AlertTriangle size={20} className="animate-pulse" />
						<span className="text-[10px] font-black uppercase tracking-[0.5em]">Destructive_Protocol_Initiated</span>
					</div>

					<AlertDialogTitle className="text-3xl font-black text-[#F5F5F0] uppercase tracking-tighter leading-none">
						Terminate <span className="text-red-500">{title}</span>?
					</AlertDialogTitle>

					<div className="mt-6 p-4 bg-[#FFB400]/5 border border-[#FFB400]/20 flex gap-4">
						<Info className="text-[#FFB400] shrink-0" size={18} />
						<div className="space-y-1">
							<p className="text-[10px] font-black text-[#FFB400] uppercase tracking-widest">Architect_Guidance</p>
							<p className="text-[11px] text-[#94A3B8] leading-relaxed uppercase font-medium">
								Wiping is permanent. To preserve history, use <span className="text-[#F5F5F0] font-bold">De-Sync</span>.
							</p>
						</div>
					</div>
				</AlertDialogHeader>

				<AlertDialogFooter className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-between items-center w-full">
					<AlertDialogCancel disabled={isProcessing} asChild={true}>
						<button className="rounded-none  border-white/10 bg-transparent text-[#94A3B8] text-[9px] font-black uppercase tracking-widest hover:bg-white/5 w-full sm:w-auto">
							<X size={14} /> Abort_Process
						</button>
					</AlertDialogCancel>

					<div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
						<button
							onClick={onDeactivate}
							disabled={isProcessing}
							className="flex items-center justify-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-[#F5F5F0] text-[9px] font-black uppercase tracking-widest hover:bg-[#FFB400] hover:text-[#0A0E14] transition-all disabled:opacity-20"
						>
							{isProcessing && !isWiping ? <Loader2 size={12} className="animate-spin" /> : <PowerOff size={14} />}
							De-Sync
						</button>

						<button
							onClick={onWipe}
							disabled={isProcessing}
							className="flex items-center justify-center gap-3 px-6 py-3 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] disabled:opacity-20"
						>
							{isProcessing && isWiping ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={14} />}
							Authorize_Wipe
						</button>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
