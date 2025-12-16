import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

const products = [
	{
		id: 1,
		name: "UltraBook Pro X15",
		category: "Laptops",
		price: 1299,
		originalPrice: 1599,
		rating: 4.8,
		reviews: 342,
		image: "premium laptop thin design",
	},
	{
		id: 2,
		name: "SmartPhone Edge 12",
		category: "Smartphones",
		price: 899,
		originalPrice: 999,
		rating: 4.9,
		reviews: 567,
		image: "modern smartphone edge to edge",
	},
	{
		id: 3,
		name: "NoiseCancel Pro",
		category: "Headphones",
		price: 349,
		originalPrice: 449,
		rating: 4.7,
		reviews: 892,
		image: "premium noise cancelling headphones",
	},
	{
		id: 4,
		name: "FitWatch Ultra",
		category: "Smartwatches",
		price: 399,
		originalPrice: 499,
		rating: 4.6,
		reviews: 234,
		image: "modern fitness smartwatch",
	},
];

export function FeaturedProducts() {
	return (
		<section className="py-16 lg:py-24 bg-background">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="flex items-end justify-between mb-12">
					<div className="space-y-4">
						<h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Featured Products</h2>
						<p className="text-lg text-muted-foreground text-pretty max-w-2xl">Handpicked deals on top-rated tech essentials</p>
					</div>
					<Button variant="outline" className="hidden sm:flex bg-transparent">
						View All Products
					</Button>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((product) => (
						<Card key={product.id} className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all">
							<CardContent className="p-0">
								<div className="relative aspect-square overflow-hidden bg-muted">
									<Image
										// src={`/.jpg?height=400&width=400&query=${product.image}`} // Todo
										src={`/images/hero-section/modern-tech-products-display-with-smartphones-lapt.jpg`} // Todo
										alt={product.name}
										fill
										className="object-cover transition-transform group-hover:scale-105"
									/>
									<div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">SALE</div>
								</div>
								<div className="p-4 space-y-3">
									<div className="text-sm text-muted-foreground">{product.category}</div>
									<h3 className="font-semibold text-card-foreground leading-tight">{product.name}</h3>
									<div className="flex items-center gap-2">
										<div className="flex items-center gap-1">
											<Star className="h-4 w-4 fill-primary text-primary" />
											<span className="text-sm font-medium text-foreground">{product.rating}</span>
										</div>
										<span className="text-sm text-muted-foreground">({product.reviews})</span>
									</div>
									<div className="flex items-baseline gap-2">
										<span className="text-2xl font-bold text-foreground">${product.price}</span>
										<span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
									</div>
								</div>
							</CardContent>
							<CardFooter className="p-4 pt-0">
								<Button className="w-full" size="sm">
									<ShoppingCart className="mr-2 h-4 w-4" />
									Add to Cart
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
