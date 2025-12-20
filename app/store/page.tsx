import { ProductCard } from "@/components/product-card";
import { getFilteredProducts } from "@/app/data/products";
import { ProductFilters } from "./ProductFilters";
import { Grid, List, SearchX, SortDesc } from "lucide-react";
import { SortProducts } from "./SortProducts";
import { getCategoriesForFilters } from "../data/category";
import { SearchProducts } from "./SearchProducts";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PaginationBar } from "./pagination-bar";

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
	//const products = await getAllProducts();
	const categories = await getCategoriesForFilters();
	const p = await searchParams;
	const parsedParams = z.safeParse(productsPageParamsSchema, p);
	console.log("Parsed Params", parsedParams.data);

	if (parsedParams.error) {
		console.error(parsedParams.error);
		return;
	}

	const { category, low_price, high_price, query, sort, page } = parsedParams.data;

	const { data: products, metadata } = await getFilteredProducts({
		category,
		lowPrice: low_price,
		highPrice: high_price,
		searchQuery: query,
		sort,
		page,
	});

	return (
		<div className="container mx-auto px-4 lg:px-16 py-16 lg:py-16">
			<h1 className="text-3xl font-bold mb-8">All Products</h1>

			<div className="flex items-center justify-between mb-6 gap-8 ">
				<h6 className="text-sm text-foreground/70 min-w-64">Showing {products.length} products</h6>
				<SearchProducts />

				<div className="flex items-center gap-8">
					<div className="flex items-center gap-2">
						<Grid size={16} />
						<span className="text-foreground/60">/</span>
						<List size={16} />
					</div>
					<div className="flex items-center gap-2.5">
						<SortDesc size={16} />
						<SortProducts />
					</div>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* Left Sidebar - Hidden on mobile, usually */}
				<aside className="w-full lg:w-64 shrink-0 space-y-8 bg-sidebar px-4 py-4 rounded-lg">
					<ProductFilters rawCategories={categories} /> {/* Create a dummy component for now */}
				</aside>

				{/* Right Product Grid */}
				<div className="flex-1">
					{products.length === 0 ? (
						<div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
							<div className="bg-muted rounded-full p-6 mb-4">
								<SearchX size={48} className="text-muted-foreground" />
							</div>
							<h3 className="text-xl font-bold mb-2">No products found</h3>
							<p className="text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
							<Button asChild>
								<Link href="/store">Clear All Filters</Link>
							</Button>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{products.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>
					)}

					<PaginationBar currentPage={metadata.currentPage} totalPages={metadata.totalPages} />
				</div>
			</div>
		</div>
	);
}
