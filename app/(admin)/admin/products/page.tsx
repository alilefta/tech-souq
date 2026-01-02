import { getFilteredProducts } from "@/app/data/products"; // Fetch real data
import z from "zod";
import { getFlatCategories } from "@/app/data/category";
import { ModuleRegistryClient } from "@/components/admin/products/module-registry-client";

const adminParamsSchema = z.object({
	query: z.string().optional(),
	category: z.string().optional(),
	allocation: z.string().optional(),
	take: z.coerce.number().default(8),
	page: z.coerce.number().default(1),
});

interface PageParams {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminProductsPage({ searchParams }: PageParams) {
	const categories = await getFlatCategories();
	const p = await searchParams;
	const { query, category, allocation, page, take } = adminParamsSchema.parse(p);

	const { data: products, metadata } = await getFilteredProducts({
		searchQuery: query,
		category,
		allocation,
		take,
		page,
	});

	return <ModuleRegistryClient products={products} categories={categories} metadata={metadata} />;
}
