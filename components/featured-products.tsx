import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFeaturedProducts } from "@/app/data/products";
import { ProductCard } from "./product-card";

// const products = [
// 	{
// 		id: 1,
// 		name: "UltraBook Pro X15",
// 		category: "Laptops",
// 		price: 1299,
// 		originalPrice: 1599,
// 		rating: 4.8,
// 		reviews: 342,
// 		image: "premium laptop thin design",
// 	},
// 	{
// 		id: 2,
// 		name: "SmartPhone Edge 12",
// 		category: "Smartphones",
// 		price: 899,
// 		originalPrice: 999,
// 		rating: 4.9,
// 		reviews: 567,
// 		image: "modern smartphone edge to edge",
// 	},
// 	{
// 		id: 3,
// 		name: "NoiseCancel Pro",
// 		category: "Headphones",
// 		price: 349,
// 		originalPrice: 449,
// 		rating: 4.7,
// 		reviews: 892,
// 		image: "premium noise cancelling headphones",
// 	},
// 	{
// 		id: 4,
// 		name: "FitWatch Ultra",
// 		category: "Smartwatches",
// 		price: 399,
// 		originalPrice: 499,
// 		rating: 4.6,
// 		reviews: 234,
// 		image: "modern fitness smartwatch",
// 	},
// ];

export async function FeaturedProducts() {
	const products = await getFeaturedProducts();

	return (
		<section className="py-16 lg:py-24 bg-background">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="flex items-end justify-between mb-12">
					<div className="space-y-4">
						<h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Featured Products</h2>
						<p className="text-lg text-muted-foreground text-pretty max-w-2xl">Handpicked deals on top-rated tech essentials</p>
					</div>
					<Button variant="outline" className="hidden sm:flex bg-transparent" asChild>
						<Link href={"/products"}>
							View All Products
							<MoveRight />
						</Link>
					</Button>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</section>
	);
}
