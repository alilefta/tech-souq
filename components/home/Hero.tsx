import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight, Shield, TrendingUp, Zap } from "lucide-react";

export default function HeroSection() {
	return (
		<div className="w-full min-h-[80vh] flex items-center">
			<section className="relative overflow-hidden bg-white dark:bg-zinc-950">
				<div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-transparent to-orange-600/10 pointer-events-none" />

				<div className="container relative mx-auto px-4 py-16 lg:py-24">
					<div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
						<div className="space-y-8">
							<div className="inline-flex items-center gap-2 rounded-full bg-orange-100 dark:bg-orange-950 border border-orange-200 dark:border-orange-900 px-4 py-1.5 text-sm font-medium text-orange-700 dark:text-orange-400">
								<Zap className="h-3.5 w-3.5" />
								Limited Time Offer - Up to 40% Off
							</div>
							<h1 className="text-4xl font-bold tracking-tight text-balance text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">Technology That Moves You Forward</h1>
							<p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-pretty">
								Discover cutting-edge electronics, innovative gadgets, and premium tech accessories. Your gateway to the future of technology.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Button size="lg" className="text-base bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20">
									Shop Now
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>
								<Button size="lg" variant="outline" className="text-base border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800">
									Explore Deals
								</Button>
							</div>

							<div className="grid grid-cols-3 gap-4 pt-4">
								<div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800">
									<div className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100">50K+</div>
									<div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 mt-1">Products</div>
								</div>
								<div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800">
									<div className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100">200K+</div>
									<div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 mt-1">Customers</div>
								</div>
								<div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800">
									<div className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100">500+</div>
									<div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 mt-1">Brands</div>
								</div>
							</div>
						</div>

						<div className="relative">
							<div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
								<Image src="/modern-tech-products-display-with-smartphones-lapt.jpg" alt="Featured tech products" fill className="object-cover" priority />
							</div>

							<div className="absolute -bottom-4 -left-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xl">
								<div className="flex items-center gap-3">
									<div className="h-12 w-12 rounded-xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
										<Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
									</div>
									<div>
										<div className="font-semibold text-zinc-900 dark:text-zinc-100">Fast Delivery</div>
										<div className="text-sm text-zinc-600 dark:text-zinc-400">Free on orders $50+</div>
									</div>
								</div>
							</div>

							<div className="absolute -top-4 -right-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xl">
								<div className="flex items-center gap-3">
									<div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center">
										<Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
									</div>
									<div>
										<div className="font-semibold text-zinc-900 dark:text-zinc-100">Secure</div>
										<div className="text-sm text-zinc-600 dark:text-zinc-400">100% Protected</div>
									</div>
								</div>
							</div>

							<div className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 shadow-xl">
								<div className="flex items-center gap-2">
									<TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
									<div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Top Rated</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
