"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getModuleDiagnostic } from "@/app/actions/product";
import { useEffect, useState } from "react";
import { ModulePreviewContent } from "./module-preview-content";
import { ProductDetailsDTO } from "@/app/data/products";
import { Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModulePreview({ productId, isOpen, onClose }: { productId: number | null; isOpen: boolean; onClose: () => void }) {
	const [product, setProduct] = useState<ProductDetailsDTO | null>(null);
	const [status, setStatus] = useState<"IDLE" | "SCANNING" | "SUCCESS" | "ERROR">("IDLE");

	// 1. RENDER-PHASE SYNC: Detect ID change during render to reset state without useEffect
	const [prevId, setPrevId] = useState<number | null>(null);
	if (productId !== prevId) {
		setPrevId(productId);
		setProduct(null);
		setStatus(productId ? "SCANNING" : "IDLE");
	}

	useEffect(() => {
		if (isOpen && productId && status === "SCANNING") {
			const fetchDiagnostic = async () => {
				try {
					const result = await getModuleDiagnostic(productId);
					if (result) {
						setProduct(result);
						setStatus("SUCCESS");
					} else {
						setStatus("ERROR");
					}
				} catch (err) {
					setStatus("ERROR");
				}
			};
			fetchDiagnostic();
		}
	}, [isOpen, productId, status]);

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="w-full sm:max-w-xl bg-[#0A0E14] border-l border-white/5 p-0 flex flex-col font-sans">
				<SheetDescription className="sr-only">Diagnostic Preview</SheetDescription>

				{/* SHARED HEADER */}
				<SheetHeader className="p-6 border-b border-white/5 bg-white/1 shrink-0">
					<div className="flex items-center justify-between mb-4">
						<div className="px-2 py-1 bg-[#FFB400] text-[#0A0E14] text-[9px] font-black uppercase tracking-tighter">
							{status === "SUCCESS" ? `ID://${product?.sku}` : "SCAN_INITIALIZING"}
						</div>
						<div className="flex items-center gap-2">
							<div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", status === "SUCCESS" ? "bg-green-500" : "bg-[#FFB400]")} />
							<span className="text-[9px] font-bold text-[#F5F5F0] uppercase">{status}</span>
						</div>
					</div>
					<SheetTitle className="text-[#F5F5F0] text-3xl font-black tracking-tighter uppercase truncate">{status === "SUCCESS" ? product?.name : "Awaiting_Data..."}</SheetTitle>
				</SheetHeader>

				<div className="flex-1 overflow-auto relative custom-scroll">
					{status === "SCANNING" && (
						<div className="h-full flex flex-col items-center justify-center space-y-6">
							<Loader2 className="w-12 h-12 text-[#FFB400] animate-spin opacity-20" />
							<p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#F5F5F0]">Initializing_Module_Scan</p>
						</div>
					)}
					{status === "ERROR" && (
						<div className="h-full flex flex-col items-center justify-center p-12 text-center">
							<AlertCircle size={40} className="text-red-500 opacity-50 mb-4" />
							<p className="text-xs font-bold uppercase text-[#94A3B8]">Registry_Link_Failure</p>
						</div>
					)}
					{status === "SUCCESS" && product && <ModulePreviewContent product={product} onClose={onClose} />}
				</div>
			</SheetContent>
		</Sheet>
	);
}
