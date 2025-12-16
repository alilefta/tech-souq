import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
	return (
		<footer className="border-t border-border bg-secondary/30">
			<div className="container mx-auto px-4 py-12  max-w-7xl">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
					<div className="col-span-2 md:col-span-1 space-y-4">
						<div className="text-2xl font-bold text-foreground">
							Tech<span className="text-primary">Souq</span>
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed">Your trusted destination for the latest technology and electronics at unbeatable prices.</p>
						<div className="flex gap-3">
							<Link href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
								<Facebook className="h-4 w-4" />
							</Link>
							<Link href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
								<Twitter className="h-4 w-4" />
							</Link>
							<Link href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
								<Instagram className="h-4 w-4" />
							</Link>
							<Link href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
								<Youtube className="h-4 w-4" />
							</Link>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="font-semibold text-foreground">Shop</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									All Products
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									New Arrivals
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Best Sellers
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Deals & Offers
								</Link>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h3 className="font-semibold text-foreground">Support</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Help Center
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Track Order
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Shipping Info
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Returns
								</Link>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h3 className="font-semibold text-foreground">Company</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									About Us
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Careers
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
					<p>© {new Date().getFullYear()} TechSouq. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
