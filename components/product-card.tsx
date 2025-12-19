import { ProductCardDTO } from "@/app/data/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export async function ProductCard({ product }: { product: ProductCardDTO }) {
	return (
		<Card key={product.id} className="group overflow-hidden border  hover:border-accent dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
			<CardContent className="p-0">
				<div className="relative aspect-square overflow-hidden bg-background">
					<Image
						// src={`/.jpg?height=400&width=400&query=${product.image}`} // Todo
						src={`/images/hero-section/modern-tech-products-display-with-smartphones-lapt.jpg`} // Todo
						alt={product.name}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>

					<div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					<Badge className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg">SALE</Badge>
					<Button
						size="icon"
						variant="secondary"
						className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-zinc-700 hover:scale-110"
					>
						<Heart className="h-4 w-4" />
					</Button>
				</div>
				<div className="p-5 space-y-3">
					<div className="text-xs font-medium text-orange-600 dark:text-orange-500 uppercase tracking-wide">
						<Link href={`/categories/${product.category_name}`}>{product.category_name}</Link>
					</div>
					<h3 className="font-semibold text-foreground text-lg leading-tight text-pretty group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors duration-200">
						<Link href={`/store/${product.slug}`}>{product.name}</Link>
					</h3>
					<div className="flex items-center gap-2 mb-6">
						<div className="flex items-center gap-1">
							<Star className="h-4 w-4 fill-orange-500 text-orange-500" />
							<span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{product.rating}</span>
						</div>
						<span className="text-sm text-zinc-500 dark:text-zinc-400">({product.reviews} reviews)</span>
					</div>
					<div className="flex items-baseline gap-2">
						<span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">${product.price}</span>
						<span className="text-sm text-zinc-400 dark:text-zinc-500 line-through">${product.original_price}</span>
						<span className="ml-auto text-sm font-semibold text-green-600 dark:text-green-500">
							Save {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
						</span>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button className="w-full  shadow-sm group-hover:shadow-md transition-all duration-300">
					<ShoppingCart size={16} className="mr-1 transition-transform" />
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	);
}

// <Image
// 	// src={`/.jpg?height=400&width=400&query=${product.image}`} // Todo
// 	src={`/images/hero-section/modern-tech-products-display-with-smartphones-lapt.jpg`} // Todo
// 	alt={product.name}
// 	fill
// 	className="object-cover transition-transform group-hover:scale-105"
// />;
