import { AnnouncementBanner } from "@/components/announcement-banner";
import { Categories } from "@/components/categories";
import { FeaturedProducts } from "@/components/featured-products";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";

import { Newsletter } from "@/components/newsletter";

export default function Home() {
	return (
		<div className="min-h-screen">
			<AnnouncementBanner />
			<Header />
			<main>
				<Hero />
				<Categories />
				<FeaturedProducts />
				<Features />
				<Newsletter />
			</main>
			<Footer />
		</div>
	);
}
