"use client";

import { useState } from "react";
import { ModuleRegistryRow } from "./module-registry-row";
import { ModulePreview } from "./module-preview";
import { AdminSearchProducts } from "./admin-search-products";
import { FilterBySector } from "./filter-by-sector";
import { FilterByAllocation } from "./filter-by-allocation";
import { FilterByCapacity } from "./filter-by-capacity";
import { PaginationBar } from "@/app/(store)/products/pagination-bar";
import { Terminal, Plus, Filter } from "lucide-react";
import Link from "next/link";
import { ProductCardDTO } from "@/app/data/products";
import { CategoryFlatDTO } from "@/app/data/category";

export function ModuleRegistryClient({
	products,
	categories,
	metadata,
}: {
	products: ProductCardDTO[];
	categories: CategoryFlatDTO[];
	metadata: {
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		totalPages: number;
		currentPage: number;
		totalItems: number;
	};
}) {
	const [activeScanId, setActiveScanId] = useState<number | null>(null);

	return (
		<div className="space-y-8 max-w-400 mx-auto">
			{/* 1. HEADER */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
				<div>
					<div className="flex items-center gap-2 text-[#FFB400] mb-2">
						<Terminal size={14} />
						<span className="text-[10px] font-black uppercase tracking-[0.4em]">Node_Alpha // Inventory_Access</span>
					</div>
					<h1 className="text-4xl font-black uppercase tracking-tighter text-[#F5F5F0]">
						Module_<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Registry</span>
					</h1>
				</div>
				<div className="flex items-center gap-3">
					<Link
						href="/admin/products/new"
						className="px-8 py-4 bg-[#FFB400] text-[#0A0E14] text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,180,0,0.3)] transition-all flex items-center gap-3"
					>
						<Plus size={16} strokeWidth={3} /> Initialize_Module
					</Link>
				</div>
			</div>
			{/* 2. COMMAND FILTER HUB */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-white/2 border border-white/5 items-stretch">
				<div className="md:col-span-4 h-12">
					<AdminSearchProducts />
				</div>
				<div className="md:col-span-2 h-12">
					<FilterBySector categories={categories} />
				</div>
				<div className="md:col-span-2 h-12">
					<FilterByAllocation />
				</div>
				<div className="md:col-span-2 h-12">
					<FilterByCapacity />
				</div>
				<div className="md:col-span-2 h-12">
					<button className="w-full h-full flex items-center justify-center gap-3 bg-white/5 hover:bg-[#FFB400] hover:text-[#0A0E14] transition-all text-[10px] font-black uppercase tracking-[0.2em] text-[#F5F5F0] border border-white/10">
						<Filter size={14} /> Execute
					</button>
				</div>
			</div>
			{/* 3. REGISTRY TABLE */}
			<div className="border border-white/5 bg-white/1 overflow-hidden">
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-b border-white/5 text-[9px] font-black uppercase text-[#94A3B8] tracking-[0.3em] bg-white/2">
							<th className="p-5 text-left">UID_Hash</th>
							<th className="p-5 text-left">Module_Identity</th>
							<th className="p-5 text-left">Sector</th>
							<th className="p-5 text-left">Allocation_Status</th>
							<th className="p-5 text-left">Base_Value</th>
							<th className="p-5 text-right">System_Actions</th>
						</tr>
					</thead>
					<tbody className="text-[11px] font-bold text-[#F5F5F0] uppercase tracking-tighter font-mono">
						{products.length > 0 ? (
							products.map((p) => <ModuleRegistryRow key={p.id} product={p} onScan={() => setActiveScanId(p.id)} />)
						) : (
							<tr>
								<td colSpan={6} className="p-20 text-center text-[#94A3B8] opacity-20 italic">
									No_Hardware_Matches_Search_Parameters
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{/* SCANNER SINGLETON */}
			<ModulePreview productId={activeScanId} isOpen={!!activeScanId} onClose={() => setActiveScanId(null)} />
			<div className="pt-8 border-t border-white/5">
				<PaginationBar currentPage={metadata.currentPage} totalPages={metadata.totalPages} />
			</div>
			{/* Table Footer Telemetry */}
			<div className="flex justify-between items-center px-2 opacity-20">
				<span className="text-[8px] font-mono uppercase tracking-widest">End_Of_Registry_Stream</span>
				<div className="flex gap-4">
					<span className="text-[8px] font-mono uppercase tracking-widest">Server: Babylon_Node_01</span>
					<span className="text-[8px] font-mono uppercase tracking-widest">Latency: 0.003ms</span>
				</div>
			</div>
		</div>
	);
}
