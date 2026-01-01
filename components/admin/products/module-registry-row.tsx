"use client";

import { ProductCardDTO } from "@/app/data/products";
import { ModuleAction } from "./module-action";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ModulePreview } from "./module-preview";
import { useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";

export function ModuleRegistryRow({ product, onScan }: { product: ProductCardDTO; onScan: () => void }) {
	const isLowStock = product.stock !== undefined && product.stock < 10;
	const [activeScanId, setActiveScanId] = useState<number | null>(null);

	const router = useRouter();

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
					<ModuleAction type="kill" onClick={() => console.log("KILL", product.id)} />
				</div>
				<ModulePreview productId={activeScanId} isOpen={!!activeScanId} onClose={() => setActiveScanId(null)} />{" "}
			</td>
		</tr>
	);
}
