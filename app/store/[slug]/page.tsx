import HeroSection from "../tech-hero";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
	return <HeroSection />;
}
