import { AnnouncementBanner } from "@/components/announcement-banner";
import { Categories } from "@/components/categories";
import CategorySection from "@/components/category-section-v2";
import FeaturedProducts from "@/components/featured-products-v2";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import FooterSection from "@/components/footer-section";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import HeroSection from "@/components/hero-v2";
import AssemblySection from "@/components/home/assembly-section";
import TestimonialSection from "@/components/home/testimonial-section";
// import { Navbar } from "@/components/navbar";

import { Newsletter } from "@/components/newsletter";

export default function Home() {
	return (
		<>
			<HeroSection />
			<CategorySection />
			<FeaturedProducts />
			<AssemblySection />
			<TestimonialSection />
			{/* Other sections */}
			{/* <Categories />
			<FeaturedProducts />
			<Features />
			<Newsletter /> */}
		</>
	);
}
