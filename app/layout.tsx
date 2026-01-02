// app/layout.tsx
import type { Metadata } from "next";
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// 1. SANS: For standard UI and body text
const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans", // Standard Tailwind naming
});

// 2. MONO: For terminal readouts and data strings
const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	// adjustFontFallback: 'Arial', // Prevents the "Size Jump" if font takes time to load
});
// 3. DISPLAY: For aggressive "BASE 60" headings
const fontDisplay = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-display",
});

export const metadata: Metadata = {
	title: "BASE 60 // Global Hardware Foundry",
	description: "Precision-engineered PC components dispatched from Babylon to the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning className="dark">
			<body
				className={`
				${fontSans.variable} 
				${fontMono.variable} 
				${fontDisplay.variable} 
				bg-[#0A0E14] text-[#F5F5F0] antialiased font-sans dark
			`}
			>
				<main>{children}</main>
				<Toaster position="bottom-left" />
			</body>
		</html>
	);
}
