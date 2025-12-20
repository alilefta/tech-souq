// components/home/featured-products.tsx

import { ProductCard } from "./product-card-v2";

const products = [
	{
		id: 1,
		name: "UltraBook Pro X15",
		category: "Laptops",
		price: 1299,
		originalPrice: 1599,
		rating: 4.8,
		reviews: 342,
		image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
		specs: ["M3 Max Chip", "32GB RAM", "1TB SSD"],
		isNew: true,
	},
	{
		id: 2,
		name: "RTX 4090 Phantom",
		category: "Graphics Cards",
		price: 1899,
		originalPrice: 2100,
		rating: 4.9,
		reviews: 128,
		image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800",
		specs: ["24GB GDDR6X", "DLSS 3.5", "Triple Fan"],
		isNew: false,
	},
	{
		id: 3,
		name: "Ryzen 9 7950X",
		category: "Processors",
		price: 549,
		originalPrice: 699,
		rating: 4.7,
		reviews: 850,
		image: "https://images.unsplash.com/photo-1591405351990-4726e33df58d?auto=format&fit=crop&q=80&w=800",
		specs: ["16 Cores", "32 Threads", "5.7GHz Boost"],
		isNew: false,
	},
	{
		id: 4,
		name: "Liquid Frost Z7",
		category: "Cooling",
		price: 189,
		originalPrice: 249,
		rating: 4.6,
		reviews: 215,
		image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
		specs: ["360mm Rad", "ARGB Sync", "Silent Pump"],
		isNew: true,
	},
];

export default function FeaturedProducts() {
	return (
		<section className="w-full bg-[#0A0E14] py-24 px-8 relative overflow-hidden">
			{/* Decorative Grid Overlay */}
			<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Header Section */}
				<div className="flex flex-col md:flex-row items-center justify-between mb-16 border-b border-white/5 pb-8">
					<div className="mb-6 md:mb-0 text-center md:text-left">
						<h2 className="text-[#FFB400] text-xs font-black uppercase tracking-[0.4em] mb-2">Current Arrivals</h2>
						<h3 className="text-[#F5F5F0] text-4xl md:text-6xl font-bold tracking-tighter">
							FEATURED <span className="italic font-light">STALL</span> ITEMS
						</h3>
					</div>

					<button className="px-6 py-3 border border-white/10 hover:border-[#FFB400] text-[#F5F5F0] text-xs font-bold uppercase tracking-widest transition-all rounded-sm">
						View All Components
					</button>
				</div>

				{/* Product Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</section>
	);
}
