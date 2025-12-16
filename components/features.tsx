import { Truck, Shield, Headphones, CreditCard } from "lucide-react";

const features = [
	{
		icon: Truck,
		title: "Fast & Free Delivery",
		description: "Free shipping on orders over $50. Express delivery available.",
	},
	{
		icon: Shield,
		title: "Secure Shopping",
		description: "100% secure payment with SSL encryption and buyer protection.",
	},
	{
		icon: Headphones,
		title: "24/7 Support",
		description: "Our expert team is always ready to help you anytime.",
	},
	{
		icon: CreditCard,
		title: "Easy Returns",
		description: "30-day money back guarantee. No questions asked.",
	},
];

export function Features() {
	return (
		<section className="py-16 lg:py-24 bg-secondary/30">
			<div className="container mx-auto px-4  max-w-7xl">
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature) => (
						<div key={feature.title} className="text-center space-y-4">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
								<feature.icon className="h-8 w-8 text-primary" />
							</div>
							<h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
							<p className="text-muted-foreground leading-relaxed">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
