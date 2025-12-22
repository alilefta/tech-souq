import CategorySection from "@/components/category-section-v2";
import FeaturedProducts from "@/components/featured-products-v2";
import HeroSection from "@/components/hero-v2";
import AssemblySection from "@/components/home/assembly-section";
import TestimonialSection from "@/components/home/testimonial-section";

export default function Home() {
	return (
		<>
			<HeroSection />
			<CategorySection />
			<FeaturedProducts />
			<AssemblySection />
			<TestimonialSection />
		</>
	);
}
