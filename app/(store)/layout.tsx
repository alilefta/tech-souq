import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar-v2";
import { AnnouncementBar } from "@/components/shared/announcement-banner-v2";
import FooterSection from "@/components/footer-section";
import { CartWrapper } from "@/components/cart/cart-warpper";
import FooterWrapper from "@/components/footer-wrapper";

// TODO should be replaced
export const metadata: Metadata = {
	title: "Base_60 - Your Trusted Tech Marketplace",
	description: "Discover the latest gadgets, electronics, and tech accessories at unbeatable prices",
	icons: {
		icon: [
			{
				url: "/icon-light-32x32.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/icon-dark-32x32.png",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/icon.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/apple-icon.png",
	},
};
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
