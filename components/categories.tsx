import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const categories = [
	{ name: "Laptops", icon: "💻", href: "/categories/laptops", image: "modern laptop on desk" },
	{ name: "Smartphones", icon: "📱", href: "/categories/smartphones", image: "sleek smartphone display" },
	{ name: "Headphones", icon: "🎧", href: "/categories/headphones", image: "premium headphones" },
	{ name: "Smartwatches", icon: "⌚", href: "/categories/watches", image: "modern smartwatch" },
	{ name: "Cameras", icon: "📷", href: "/categories/cameras", image: "professional camera" },
	{ name: "Gaming", icon: "🎮", href: "/categories/gaming", image: "gaming setup" },
];

export function Categories() {
	return (
		<section className="py-16 lg:py-24 bg-secondary/30">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="space-y-4 text-center mb-12">
					<h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Shop by Category</h2>
					<p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">Find exactly what you need from our extensive collection</p>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
					{categories.map((category) => (
						<Link key={category.name} href={category.href}>
							<Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border bg-card">
								<div className="aspect-square relative overflow-hidden bg-muted">
									<Image
										// src={`/.jpg?height=300&width=300&query=${category.image}`} // Should be replaced with ${category.image}
										src={`/images/hero-section/modern-tech-products-display-with-sleek-gadgets.jpg`} // Should be replaced with ${category.image}
										alt={category.name}
										fill
										className="object-cover transition-transform group-hover:scale-110"
									/>
								</div>
								<div className="p-4 text-center">
									<div className="text-3xl mb-2">{category.icon}</div>
									<div className="font-semibold text-card-foreground">{category.name}</div>
								</div>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
