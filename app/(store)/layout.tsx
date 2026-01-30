import Navbar from "@/components/ui/navbar-v2";
import { AnnouncementBar } from "@/components/shared/announcement-banner-v2";
import FooterSection from "@/components/footer-section";
import { CartWrapper } from "@/components/cart/cart-warpper";
import FooterWrapper from "@/components/footer-wrapper";

export default function StoreLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<AnnouncementBar />
			<Navbar />
			<CartWrapper />
			<div>{children}</div>
			<FooterWrapper>
				<FooterSection />
			</FooterWrapper>
		</>
	);
}
