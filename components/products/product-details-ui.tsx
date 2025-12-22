import { Globe, ShieldCheck, Star, Zap } from "lucide-react";
import { ProductGallery } from "./product-gallery";
import { QuantitySelector } from "./quantity-selector";
import { AddToCartButton } from "./add-to-cart-button";
import { ProductDetailsDTO } from "@/app/data/products";
import Link from "next/link";

export function ProductDetailsUI({ product }: { product: ProductDetailsDTO }) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
			{/* LEFT: THE GALLERY ISLAND */}
			<div className="lg:col-span-6 lg:sticky lg:top-32 h-fit">
				<ProductGallery images={product.images} name={product.name} sku={product.sku} isNew={product.isNew} />
			</div>

			{/* RIGHT: THE TECHNICAL DOSSIER */}
			<div className="lg:col-span-6">
				<div className="border-b border-white/5 pb-8 mb-8">
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-3">
							<Link href={`/categories/${product.category.slug}`}>
								<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.3em]">{product.category.name}</span>
							</Link>
							<div className="h-[1px] w-6 bg-[#FFB400]/30" />
							<span className="text-[#94A3B8] text-[10px] font-mono opacity-60">ID://{product.sku}</span>
						</div>
						{/* RATING DISPLAY */}
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-1 text-[#FFB400]">
								<Star size={12} fill="currentColor" />
								<span className="text-xs font-bold">{product.averageRating}</span>
							</div>
							<span className="text-[#94A3B8] text-[10px] font-medium">({product.reviewCount} Reports)</span>
						</div>
					</div>

					<h1 className="text-[#F5F5F0] text-5xl md:text-7xl font-bold tracking-tighter leading-[0.85] uppercase mb-4">
						<span className="block text-xl md:text-2xl text-[#94A3B8] font-medium tracking-normal mb-2">{product.brand}</span>
						{product.name}
					</h1>

					<div className="flex items-end justify-between md:justify-start gap-6 mt-8">
						<div className="flex flex-col">
							{product.originalPrice && product.originalPrice > product.price && (
								<span className="text-[#94A3B8] text-xs line-through opacity-40 font-mono mb-1">${product.originalPrice}</span>
							)}
							<span className="text-[#F5F5F0] text-5xl font-black tracking-tighter leading-none">
								<span className="text-[#FFB400] text-3xl mr-1">$</span>
								{product.price}
							</span>
						</div>
						<div className="flex flex-col border-l border-white/10 pl-6">
							<span className="text-green-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Ready to ship</span>
							<span className="text-[#94A3B8] text-[9px] font-medium uppercase tracking-tighter">Babylon Hub Alpha</span>
						</div>
					</div>
				</div>

				{/* DESCRIPTION */}
				<p className="text-[#94A3B8] text-lg leading-relaxed mb-12 font-medium max-w-2xl">{product.description}</p>

				{/* 2. THE SPECIFICATION GRID (Now using your DTO Specs array) */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
					{product.specs && product.specs.length > 0 ? (
						product.specs.map((spec) => (
							<div key={spec.id} className="p-4 border border-white/5 bg-white/[0.02] rounded-sm flex flex-col justify-center">
								<p className="text-[#94A3B8] text-[8px] font-black uppercase tracking-[0.2em] mb-1 opacity-50">{spec.label}</p>
								<p className="text-[#F5F5F0] text-sm font-bold tracking-tight">{spec.value}</p>
							</div>
						))
					) : (
						<div>
							<h2>No specs yet</h2>
						</div>
					)}
				</div>

				{/* 3. INTERACTIVE ISLANDS */}
				<div className="flex flex-col sm:flex-row gap-4 mb-12">
					<QuantitySelector />
					<AddToCartButton product={product} />
				</div>

				{/* 4. TECHNICAL FOOTER (Static Trust) */}
				<div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-10">
					<div className="flex flex-col items-center text-center gap-3">
						<div className="w-10 h-10 border border-white/5 flex items-center justify-center text-[#FFB400]">
							<ShieldCheck size={20} strokeWidth={1.5} />
						</div>
						<span className="text-[8px] font-black text-[#94A3B8] uppercase tracking-[0.2em] leading-tight">
							2Y TechSouq
							<br />
							Certified Warranty
						</span>
					</div>
					<div className="flex flex-col items-center text-center gap-3">
						<div className="w-10 h-10 border border-white/5 flex items-center justify-center text-[#FFB400]">
							<Globe size={20} strokeWidth={1.5} />
						</div>
						<span className="text-[8px] font-black text-[#94A3B8] uppercase tracking-[0.2em] leading-tight">
							Global Express
							<br />
							From Babylon Hub
						</span>
					</div>
					<div className="flex flex-col items-center text-center gap-3">
						<div className="w-10 h-10 border border-white/5 flex items-center justify-center text-[#FFB400]">
							<Zap size={20} strokeWidth={1.5} />
						</div>
						<span className="text-[8px] font-black text-[#94A3B8] uppercase tracking-[0.2em] leading-tight">
							Verified Elite
							<br />
							System Performance
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
