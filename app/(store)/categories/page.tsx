import { getCategoriesWithCount } from "@/app/data/category";
import { CategoryShard } from "@/components/categories/category-shard";
import { Map, Terminal } from "lucide-react";

export default async function CategoriesPage() {
	const categories = await getCategoriesWithCount();

	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 pb-20 selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-400 mx-auto px-6 lg:px-12">
				{/* 1. SECTOR HEADER */}
				<header className="mb-16 border-b border-white/5 pb-12 relative overflow-hidden">
					<div className="absolute top-0 right-0 opacity-[0.02] text-[#F5F5F0] pointer-events-none select-none">
						<span className="text-[15vw] font-black italic">SECTORS</span>
					</div>

					<div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<Map size={14} className="text-[#FFB400]" />
								<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Map_Protocol: v6.0</span>
							</div>
							<h1 className="text-[#F5F5F0] text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
								Foundry <br />
								<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Sectors</span>
							</h1>
						</div>

						<div className="flex items-center gap-6 text-[#94A3B8] text-[10px] font-mono border border-white/5 px-6 py-3 bg-white/[0.01]">
							<Terminal size={12} />
							<span>ACTIVE_REGIONS: {categories.length.toString().padStart(2, "0")}</span>
						</div>
					</div>
				</header>

				{/* 2. THE BAZAAR MAP (Shard Grid) */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] gap-6">
					{categories.map((category, index) => (
						<CategoryShard key={category.id} category={category} index={index} />
					))}
				</div>

				{/* 3. SYSTEM LOGS (Footer) */}
				<div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center opacity-40 text-[8px] font-mono uppercase tracking-[0.3em] text-[#94A3B8]">
					<span className="hidden md:inline">Topographical_Data_Synced</span>
					<div className="flex gap-2">
						{[1, 2, 3].map((i) => (
							<div key={i} className="w-1 h-1 bg-[#FFB400] rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
						))}
					</div>
					<span>Scanning_Coordinates...</span>
				</div>
			</div>
		</main>
	);
}
