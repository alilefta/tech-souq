import type { Metadata } from "next";
import { Geist_Mono, Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
			<head>
				<script src="https://tweakcn.com/live-preview.min.js"></script>
			</head>
			<body className={`${sans.variable} ${mono.variable}  ${serif.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<AnnouncementBanner />
					<Navbar /> {/* Stays persistent across pages */}
					<main className="min-h-screen">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
