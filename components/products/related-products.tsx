// components/products/related-products.tsx
import { getRelatedProducts } from "@/app/data/products"; // Using your fetcher
import { ProductCarousel } from "@/components/products/product-carousel";

export default async function RelatedProducts({ categoryId, productId }: { categoryId: number; productId: number }) {
	// In a real scenario, you'd fetch by category. For now, we use Featured.
	const related = await getRelatedProducts(categoryId, productId);

	return (
		<section className="w-full bg-[#0A0E14] py-32 px-6 lg:px-8 border-t border-white/5 overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Header with Babylonian Pattern Accent */}
				<div className="flex items-end justify-between mb-16">
					<div className="relative">
						{/* Subtle Ishtar Star Watermark behind title */}
						<div className="absolute -top-10 -left-10 w-32 h-32 opacity-[0.03] text-[#FFB400] pointer-events-none">
							<svg viewBox="0 0 100 100" fill="currentColor">
								<path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
							</svg>
						</div>

						<h2 className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
							<span className="w-8 h-px bg-[#FFB400]" />
							System Synergies
						</h2>
						<h3 className="text-[#F5F5F0] text-4xl md:text-6xl font-bold tracking-tighter uppercase">
							COMPLETE THE <br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">LEGACY</span>
						</h3>
					</div>

					<div className="hidden md:block text-right pb-2">
						<span className="text-[#94A3B8] text-[10px] font-mono uppercase tracking-widest opacity-40">Scanning_Compatible_Modules...</span>
					</div>
				</div>

				{/* The Client Carousel Island */}
				<ProductCarousel products={related} />
			</div>
		</section>
	);
}
