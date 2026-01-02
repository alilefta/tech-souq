// app/(admin)/admin/categories/page.tsx
import { getCategoriesWithCount } from "@/app/data/category";
import { SectorRegistryClient } from "@/components/admin/categories/sector-registry-client";
import { Layers, Plus } from "lucide-react";
import Link from "next/link";

export default async function RegistryManagerPage() {
	const categories = await getCategoriesWithCount();

	return (
		<div className="space-y-10 not-first:max-w-400 mx-auto">
			{/* 1. SECTOR HEADER */}
			<header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
				<div>
					<div className="flex items-center gap-3 mb-4">
						<Layers size={14} className="text-[#FFB400]" />
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Sector_Mapping_Protocol</span>
					</div>
					<h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-[#F5F5F0]">
						Registry <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Manager</span>
					</h1>
				</div>

				<Link href="/admin/categories/new">
					<button className="px-8 py-4 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all flex items-center gap-3">
						<Plus size={16} strokeWidth={3} /> Initialize_New_Sector
					</button>
				</Link>
			</header>

			{/* 2. THE SECTOR GRID */}
			<SectorRegistryClient initialCategories={categories} />
		</div>
	);
}
