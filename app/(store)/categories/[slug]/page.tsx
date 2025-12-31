// app/categories/[slug]/page.tsx
import { getCategoryBySlug } from "@/app/data/category";
import { getFilteredProducts } from "@/app/data/products";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card-v2";

interface CategoryDetailPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
	const { slug } = await params;
	const category = await getCategoryBySlug(slug);
	if (!category) notFound();

	const { data: products } = await getFilteredProducts({ category: category.slug });

	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 pb-20">
			<div className="max-w-400 mx-auto px-6 lg:px-12">
				{/* CINEMATIC SECTOR HEADER */}
				<div className="relative py-24 mb-16 border-b border-white/5 overflow-hidden">
					{/* Huge background text */}
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
						<span className="text-[25vw] font-black text-white/2 italic uppercase select-none">{category.arabicName || category.name}</span>
					</div>

					<div className="relative z-10 text-center">
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">INITIALIZING_SECTOR_PROTOCOL</span>
						<h1 className="text-[#F5F5F0] text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">{category.name}</h1>
						<p className="text-[#94A3B8] text-sm md:text-lg mt-6 max-w-2xl mx-auto font-medium opacity-60">{category.description}</p>
					</div>
				</div>

				{/* PRODUCT GRID */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((p) => (
						<ProductCard key={p.id} product={p} />
					))}
				</div>
			</div>
		</main>
	);
}
