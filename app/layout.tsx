import type { Metadata } from "next";
import { Geist_Mono, Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnnouncementBanner } from "@/components/announcement-banner";
import Navbar from "@/components/ui/navbar-v2";
import { Footer } from "@/components/footer";
import { AnnouncementBar } from "@/components/announcement-banner-v2";
import FooterSection from "@/components/footer-section";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartWrapper } from "@/components/cart-warpper";

const sans = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const mono = Geist_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const serif = Lora({
	variable: "--font-serif",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "TechSouq - Your Trusted Tech Marketplace",
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
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${sans.variable} ${mono.variable}  ${serif.variable} bg-[#0A0E14] text-[#F5F5F0] antialiased `}>
				<AnnouncementBar />
				<Navbar />
				<CartWrapper />
				<main>{children}</main>
				<FooterSection />
			</body>
		</html>
	);
}
