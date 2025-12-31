// app/products/[slug]/page.tsx
import { getProductBySlug } from "@/app/data/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// ICONS (Server Side)
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductDetailsUI } from "@/components/products/product-details-ui";
import { ProductTechnicalDetailsUI } from "@/components/products/product-technical-details-ui";
import RelatedProducts from "@/components/products/related-products";
import VanguardIntelligence from "@/components/products/vanguard-intelligence";

interface PageParams {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	const { slug } = await params;
	const product = await getProductBySlug(slug);
	if (!product) return { title: "Product Not Found" };

	return {
		title: `${product.brand} ${product.name} | TechSouq Babylon`,
		description: product.description.substring(0, 160),
	};
}

export default async function ProductPage({ params }: PageParams) {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) notFound();

	// Structured Data for Google (Rich Snippets)
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.name,
		image: product.images,
		description: product.description,
		brand: { "@type": "Brand", name: product.brand },
		sku: product.sku,
		offers: {
			"@type": "Offer",
			price: product.price,
			priceCurrency: "USD",
			availability: "https://schema.org/InStock",
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: product.averageRating,
			reviewCount: product.reviewCount,
		},
	};

	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 lg:pt-32 pb-20 selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* BREADCRUMBS */}
				<Link href="/" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#FFB400] transition-colors mb-12 text-[10px] font-black uppercase tracking-[0.2em] group">
					<ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
					Back to Bazaar
				</Link>

				<ProductDetailsUI product={product} />
				<ProductTechnicalDetailsUI product={product} />
				<RelatedProducts categoryId={product.category.id} productId={product.id} />

				<VanguardIntelligence />
			</div>
		</main>
	);
}
