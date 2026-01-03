"use client";

import { ProductCardDTO } from "@/app/data/products";
import { ModuleAction } from "./module-action";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ModulePreview } from "./module-preview";
import { useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { useAction } from "next-safe-action/hooks";
import { deactivateProduct, deleteProduct } from "@/app/actions/product";
import { toast } from "sonner";
import { KillModuleModal } from "../ui/kill-module-modal";
import { PowerOff, ShieldCheck } from "lucide-react";

export function ModuleRegistryRow({ product, onScan }: { product: ProductCardDTO; onScan: () => void }) {
	const isLowStock = product.stock !== undefined && product.stock < 10;
	const [activeScanId, setActiveScanId] = useState<number | null>(null);
	const [isKillModalOpen, setIsKillModalOpen] = useState(false);

	// 1. DEACTIVATE ACTION (Safe Path)
	const { executeAsync: executeDeactivate, isExecuting: isDeactivating } = useAction(deactivateProduct, {
		onSuccess: () => {
			toast.success("MODULE_DE-SYNCED", {
				description: `UID: ${product.sku} // REMOVED_FROM_PUBLIC_BAZAAR`,
				icon: <PowerOff className="text-[#FFB400]" size={16} />,
			});
			setIsKillModalOpen(false);
		},
		onError: ({ error }) => {
			toast.error("DE-SYNC_HALTED", {
				description: error.serverError || "SYSTEM_INTERRUPT",
			});
		},
	});

	// 2. DELETE ACTION (Destructive Path)
	const { executeAsync: executeWipe, isExecuting: isWiping } = useAction(deleteProduct, {
		onSuccess: () => {
			toast.success("REGISTRY_WIPE_COMPLETE", {
				description: `MODULE: ${product.name} // DATA_TRACES_PURGED`,
				icon: <ShieldCheck className="text-[#FFB400]" size={16} />,
			});
			setIsKillModalOpen(false);
		},
		onError: ({ error }) => {
			toast.error("WIPE_PROTOCOL_BLOCKED", {
				description: error.serverError || "SECURITY_VIOLATION",
			});
		},
	});

	const router = useRouter();
	const isProcessing = isDeactivating || isWiping;

	return (
		<tr className="border-b border-white/5 hover:bg-white/2 transition-all group">
			{/* 1. UID HASH */}
			<td className="p-5 font-mono text-[#FFB400] opacity-40 group-hover:opacity-100 transition-opacity">#{product.sku || product.slug.substring(0, 8).toUpperCase()}</td>

			{/* 2. IDENTITY */}
			<td className="p-5">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-white/5 border border-white/10 rounded-none shrink-0 relative overflow-hidden">
						{/* Small preview of the actual image */}
						{product.coverImage && <SafeImage src={product.coverImage} fill className="object-contain p-1 grayscale group-hover:grayscale-0 transition-all" alt="" />}
					</div>
					<div className="flex flex-col">
						<span className="text-[#F5F5F0] leading-none mb-1">{product.name}</span>
						<span className="text-[8px] font-mono text-[#94A3B8] opacity-40 uppercase tracking-widest">Brand_ID: {product.brand || "BASE_60"}</span>
					</div>
				</div>
			</td>

			{/* 3. SECTOR */}
			<td className="p-5 text-[#94A3B8] uppercase text-[10px]">{product.category.name.replace(" ", "_")}</td>

			{/* 4. STOCK ALLOCATION */}
			<td className="p-5">
				<div className="flex flex-col gap-2 max-w-35 justify-center">
					<div className="flex justify-between items-center text-[10px] font-mono">
						<span className={cn(isLowStock ? "text-red-500" : "text-green-500")}>{isLowStock ? "CRITICAL_LEVEL" : "OPTIMAL_LEVEL"}</span>
						<span className="text-[#F5F5F0]">{product.stock || 0} units</span>
					</div>
					<div className="h-px w-full bg-white/5">
						<div
							className={cn("h-full transition-all duration-1000", isLowStock ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-green-500")}
							style={{ width: `${Math.min(product.stock || 0, 100)}%` }}
						/>
					</div>
				</div>
			</td>

			{/* 5. BASE VALUE */}
			<td className="p-5 text-[#F5F5F0] font-black tracking-tighter">
				<span className="text-[#FFB400] mr-1">$</span>
				{product.price.toLocaleString()}
			</td>

			{/* 6. SYSTEM ACTIONS */}
			<td className="p-5">
				<div className="flex items-center justify-end gap-2">
					<ModuleAction type="scan" onClick={onScan} />
					<ModuleAction type="edit" onClick={() => router.push(`/admin/products/${product.id}/edit`)} />
					<ModuleAction type="kill" onClick={() => setIsKillModalOpen(true)} />
				</div>
				<ModulePreview productId={activeScanId} isOpen={!!activeScanId} onClose={() => setActiveScanId(null)} />
				<KillModuleModal
					isOpen={isKillModalOpen}
					onClose={() => !isProcessing && setIsKillModalOpen(false)}
					title={product.name}
					isProcessing={isProcessing}
					onDeactivate={() => executeDeactivate({ id: product.id })}
					onWipe={() => executeWipe({ id: product.id })}
					isWiping={isWiping}
				/>
			</td>
		</tr>
	);
}
