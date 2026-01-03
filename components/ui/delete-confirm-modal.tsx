// components/admin/ui/delete-confirm-modal.tsx
"use client";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	isLoading?: boolean;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, isLoading }: DeleteModalProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent className="bg-[#0A0E14] border-white/10 rounded-none max-w-md font-sans">
				<AlertDialogHeader>
					<div className="flex items-center gap-3 text-red-500 mb-2">
						<AlertTriangle size={18} className="animate-pulse" />
						<span className="text-[10px] font-black uppercase tracking-[0.4em]">Security_Override_Required</span>
					</div>
					<AlertDialogTitle className="text-2xl font-black text-[#F5F5F0] uppercase tracking-tighter">
						Wipe <span className="text-red-500">{title}</span>?
					</AlertDialogTitle>
					<AlertDialogDescription className="text-xs text-[#94A3B8] font-medium leading-relaxed uppercase tracking-tight">
						You are about to terminate this data trace from the Babylonian Registry. This action is <span className="text-red-500 font-bold">irreversible</span> and will cause a permanent
						de-sync in the Foundry Core.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="mt-8 gap-4">
					<AlertDialogCancel className="rounded-none border-white/5 bg-white/5 text-[#94A3B8] text-[9px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-[#F5F5F0]">
						Abort_Process
					</AlertDialogCancel>
					<button
						disabled={isLoading}
						onClick={(e) => {
							e.preventDefault();
							onConfirm();
						}}
						className="bg-red-600 text-white px-6 py-2 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 transition-all flex items-center gap-2 disabled:opacity-20"
					>
						{isLoading ? <Loader2 size={12} className="animate-spin" /> : "Authorize_Wipe"}
					</button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
