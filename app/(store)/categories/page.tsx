// app/categories/page.tsx
import { getCategoriesWithCount } from "@/app/data/category";
import { CategoryShard } from "@/components/categories/category-shard";
import { Map } from "lucide-react";

export default async function CategoriesPage() {
	const categories = await getCategoriesWithCount(); // Fetch categories with product counts

	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 pb-20 selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-400 mx-auto px-6 lg:px-12">
				{/* 1. SECTOR HEADER */}
				<header className="mb-16 border-b border-white/5 pb-12 relative overflow-hidden">
					<div className="absolute top-0 right-0 opacity-[0.02] text-[#F5F5F0] pointer-events-none select-none">
						<span className="text-[18vw] font-black italic">SECTORS</span>
					</div>

					<div className="relative z-10">
						<div className="flex items-center gap-3 mb-4">
							<Map size={14} className="text-[#FFB400]" />
							<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Map_Protocol: v6.0</span>
						</div>
						<h1 className="text-[#F5F5F0] text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
							Foundry <br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Sectors</span>
						</h1>
					</div>
				</header>

				{/* 2. THE BAZAAR MAP (Shard Grid) */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] gap-6">
					{categories.map((category, index) => (
						<CategoryShard key={category.id} category={category} index={index} />
					))}
				</div>

				{/* 3. SYSTEM LOGS (Footer of grid) */}
				<div className="mt-12 flex justify-between items-center opacity-30 text-[8px] font-mono uppercase tracking-[0.3em] text-[#94A3B8]">
					<span>Foundry_Sectors_Active: [{categories.length.toString().padStart(2, "0")}]</span>
					<div className="flex gap-2">
						{[1, 2, 3].map((i) => (
							<div key={i} className="w-1 h-1 bg-[#FFB400] rounded-full" />
						))}
					</div>
					<span>Scanning_Coordinates...</span>
				</div>
			</div>
		</main>
	);
}
