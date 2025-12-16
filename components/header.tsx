import Link from "next/link";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
	return (
		<header className="sticky top-0 z-50 border-b   border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="flex h-16 items-center justify-between gap-4">
					<div className="flex items-center gap-8">
						<Link href="/" className="flex items-center gap-2">
							<div className="text-2xl font-bold text-foreground">
								Tech<span className="text-primary">Souq</span>
							</div>
						</Link>
						<nav className="hidden md:flex items-center gap-6">
							<Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
								Products
							</Link>
							<Link href="/deals" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
								Deals
							</Link>
							<Link href="/brands" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
								Brands
							</Link>
							<Link href="/support" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
								Support
							</Link>
						</nav>
					</div>

					<div className="flex flex-1 max-w-md items-center gap-2">
						<div className="relative flex-1 hidden sm:block">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input type="search" placeholder="Search products..." className="w-full pl-10 bg-secondary border-0" />
						</div>
					</div>

					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon" className="hidden sm:flex">
							<User className="h-5 w-5" />
						</Button>
						<Button variant="ghost" size="icon" className="relative">
							<ShoppingCart className="h-5 w-5" />
							<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">3</span>
						</Button>
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
