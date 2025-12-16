import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
	return (
		<section className="py-16 lg:py-24 bg-background">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="max-w-3xl mx-auto text-center space-y-8">
					<div className="space-y-4">
						<h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Stay Updated with TechSouq</h2>
						<p className="text-lg text-muted-foreground text-pretty">Subscribe to get special offers, free giveaways, and exclusive deals delivered to your inbox.</p>
					</div>
					<form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
						<Input type="email" placeholder="Enter your email" className="flex-1 bg-secondary border-0" required />
						<Button type="submit" size="lg">
							Subscribe
						</Button>
					</form>
					<p className="text-sm text-muted-foreground">Join 50,000+ subscribers. Unsubscribe anytime.</p>
				</div>
			</div>
		</section>
	);
}
