import { ProductCard } from "@/components/product-card-v2";
import { getFilteredProducts } from "@/app/data/products";
import { ProductFilters } from "./product-filters";
import { LayoutGrid, List, SearchX, SlidersHorizontal } from "lucide-react";
import { SortProducts } from "./SortProducts";
import { getCategoriesForFilters } from "../data/category";
import { SearchProducts } from "./SearchProducts";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PaginationBar } from "./pagination-bar";
import { ToggleView } from "@/components/products/toggle-view";
import { ProductListItem } from "@/components/product-list-item"; // Import the new component

interface PageParams {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const productsPageParamsSchema = z.object({
	category: z.string().or(z.array(z.string())).optional(),
	query: z.string().optional(),
	low_price: z.coerce.number().min(0).optional().catch(undefined), // If "3234xfdde3", this becomes undefined

	high_price: z.coerce.number().positive().optional().catch(undefined),
	sort: z.string().optional(),
	view: z.enum(["grid", "list"]).optional().default("grid"),
	page: z.coerce.number().default(1),
});

export default async function ProductsPage({ searchParams }: PageParams) {
	const categories = await getCategoriesForFilters();
	const p = await searchParams;
	const parsedParams = z.safeParse(productsPageParamsSchema, p);

	if (parsedParams.error) return null;

	const { category, low_price, high_price, query, sort, page, view } = parsedParams.data;

	const { data: products, metadata } = await getFilteredProducts({
		category,
		lowPrice: low_price,
		highPrice: high_price,
		searchQuery: query,
		sort,
		page,
	});

	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 pb-20 selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-400 mx-auto px-6 lg:px-12">
				{/* 1. TECHNICAL HEADER */}
				<header className="mb-12 border-b border-white/5 pb-12 relative overflow-hidden">
					<div className="absolute top-0 right-0 opacity-[0.02] text-[#F5F5F0] pointer-events-none">
						<span className="text-[15vw] font-black italic">BAZAAR</span>
					</div>

					<div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Node: Babylon_Alpha</span>
								<div className="h-px w-12 bg-[#FFB400]/30" />
							</div>
							<h1 className="text-[#F5F5F0] text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
								Global <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Registry</span>
							</h1>
						</div>
						<div className="flex flex-col items-end gap-2">
							<span className="text-[#94A3B8] text-[10px] font-mono uppercase tracking-widest opacity-40">Active_Inventory_Count</span>
							<p className="text-[#F5F5F0] text-2xl font-black font-mono tracking-tighter">[{metadata.totalItems.toString().padStart(3, "0")}]</p>
						</div>
					</div>
				</header>

				{/* 2. COMMAND DECK (Search & Controls) */}
				<div className="flex flex-col lg:flex-row items-center gap-6 mb-12 bg-white/2 border border-white/5 p-4 rounded-sm">
					<div className="w-full lg:flex-1">
						<SearchProducts />
					</div>

					<div className="flex items-center gap-6 w-full lg:w-auto">
						<ToggleView />

						<div className="flex items-center gap-3 flex-1 lg:flex-none">
							<span className="text-[#94A3B8] text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Sort_By:</span>
							<SortProducts />
						</div>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row gap-12">
					{/* 3. SIDEBAR: DIAGNOSTIC FILTERS */}
					<aside className="w-full lg:w-80 shrink-0">
						<div className="sticky top-32">
							<div className="flex items-center gap-2 mb-8 text-[#F5F5F0]">
								<SlidersHorizontal size={16} className="text-[#FFB400]" />
								<h2 className="text-xs font-black uppercase tracking-[0.3em]">Filter_Protocols</h2>
							</div>
							<ProductFilters rawCategories={categories} />
						</div>
					</aside>

					{/* 4. RESULTS GRID */}
					<div className="flex-1">
						{products.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/5 rounded-sm">
								<SearchX size={48} className="text-[#94A3B8] opacity-20 mb-6" />
								<h3 className="text-[#F5F5F0] text-xl font-bold uppercase tracking-tight mb-2">Signal_Lost</h3>
								<p className="text-[#94A3B8] text-sm mb-8 opacity-60">No matching coordinates found in the registry.</p>
								<Button asChild className="bg-[#FFB400] text-[#0A0E14] hover:bg-[#FFB400]/90 uppercase font-black tracking-widest text-[10px] px-8 py-6 rounded-none">
									<Link href="/products">Re-Initialize Search</Link>
								</Button>
							</div>
						) : (
							<div
								className={
									view === "list"
										? "flex flex-col gap-4" // List View Layout
										: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" // Grid View Layout
								}
							>
								{products.map((product) => (view === "list" ? <ProductListItem key={product.id} product={product} /> : <ProductCard key={product.id} product={product} />))}
							</div>
						)}

						{/* 5. PAGINATION TERMINAL */}
						<div className="mt-20 pt-12 border-t border-white/5">
							<PaginationBar currentPage={metadata.currentPage} totalPages={metadata.totalPages} />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
