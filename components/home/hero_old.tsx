import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Star, Truck, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";

export function Hero_old() {
	return (
		<section className="relative overflow-hidden bg-white dark:bg-zinc-950 font-sans">
			<div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-transparent to-orange-600/10 pointer-events-none" />

			<div className="container relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
					<div className="space-y-6 lg:space-y-8">
						<Badge variant={"default"}>
							<Zap size={16} />
							Limited Time Offer - Up to 40% Off
						</Badge>
						<h1 className="text-4xl font-bold font-sans tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">Technology That Moves You Forward</h1>
						<p className="text-lg text-foreground/60 leading-relaxed text-pretty max-w-xl">
							Discover cutting-edge electronics, innovative gadgets, and premium tech accessories. Your gateway to the future of technology.
						</p>

						<div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
							<div className="flex items-center gap-1.5">
								<CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
								<span>Free Shipping $50+</span>
							</div>
							<div className="flex items-center gap-1.5">
								<CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
								<span>2-Year Warranty</span>
							</div>
							<div className="flex items-center gap-1.5">
								<CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
								<span>30-Day Returns</span>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-4">
							<Button size="lg">
								Shop Now
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
							<Button size="lg" variant="outline">
								Explore Deals
							</Button>
						</div>

						<div className="grid grid-cols-3 gap-3 lg:gap-4 pt-2">
							<div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 lg:p-4 border border-zinc-200 dark:border-zinc-800">
								<div className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100">50K+</div>
								<div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 mt-1">Products</div>
							</div>
							<div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 lg:p-4 border border-zinc-200 dark:border-zinc-800">
								<div className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100">200K+</div>
								<div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 mt-1">Customers</div>
							</div>
							<div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-3 lg:p-4 border border-zinc-200 dark:border-zinc-800">
								<div className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100">4.9★</div>
								<div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 mt-1">Rating</div>
							</div>
						</div>
					</div>

					<div className="relative lg:ml-8">
						<div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
							<Image src="/images/hero-section/modern-tech-products-display-with-smartphones-lapt.jpg" alt="Featured tech products" fill className="object-cover" priority />
						</div>

						<div className="absolute top-4 right-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 shadow-lg">
							<div className="flex items-center gap-2">
								<div className="flex">
									{[...Array(5)].map((_, i) => (
										<Star key={i} className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
									))}
								</div>
								<div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Top Rated</div>
							</div>
						</div>

						<div className="absolute bottom-4 left-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-lg">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center shrink-0">
									<Truck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
								</div>
								<div>
									<div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Fast Delivery</div>
									<div className="text-xs text-zinc-600 dark:text-zinc-400">Free on $50+</div>
								</div>
							</div>
						</div>

						<div className="absolute top-4 left-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-lg">
							<div className="flex items-center gap-2.5">
								<div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center shrink-0">
									<Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
								</div>
								<div>
									<div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Secure</div>
									<div className="text-xs text-zinc-600 dark:text-zinc-400">100% Safe</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
