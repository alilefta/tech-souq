"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode } from "react";

// 1. Load Stripe Async (Outside component to avoid re-loading on renders)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeWrapperProps {
	clientSecret: string;
	children: ReactNode;
}

export function StripePaymentWrapper({ clientSecret, children }: StripeWrapperProps) {
	return (
		<Elements
			stripe={stripePromise}
			options={{
				clientSecret,
				appearance: {
					theme: "night",

					variables: {
						colorPrimary: "#FFB400", // Brand Amber
						colorBackground: "#0A0E14", // KEY FIX: Let parent color show through
						colorText: "#F5F5F0",
						colorDanger: "#ef4444",
						fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
						borderRadius: "0px", // Industrial Edge
						spacingUnit: "5px",
						gridRowSpacing: "24px", // Breathing room between inputs
					},
					rules: {
						".Input": {
							border: "1px solid rgba(255, 255, 255, 0.1)",
							backgroundColor: "rgba(255, 255, 255, 0.02)", // Matches bg-white/2
							color: "#F5F5F0",
							paddingTop: "12px",
							paddingBottom: "12px",
							fontSize: "12px", // text-xs
							lineHeight: "1.5",
							boxShadow: "none", // Remove default shadow
						},
						".Input:focus": {
							border: "1px solid rgba(255, 180, 0, 0.4)", // focus:border-[#FFB400]/40
							boxShadow: "none",
							outline: "none",
						},
						".Input--invalid": {
							border: "1px solid #ef4444",
							color: "#ef4444",
						},
						".Label": {
							color: "#94A3B8", // text-muted
							fontWeight: "900", // font-black
							textTransform: "uppercase",
							fontSize: "9px",
							letterSpacing: "0.2em", // tracking-[0.2em]
							marginBottom: "8px",
						},
						".Block": {
							backgroundColor: "transparent",
							boxShadow: "none",
							padding: "0",
						},
						// If using the Payment Element Tabs
						".Tab": {
							borderRadius: "0px",
							border: "1px solid rgba(255, 255, 255, 0.1)",
							backgroundColor: "rgba(255, 255, 255, 0.02)",
							color: "#94A3B8",
						},
						".Tab:hover": {
							color: "#F5F5F0",
							border: "1px solid rgba(255, 255, 255, 0.2)",
						},
						".Tab--selected": {
							borderColor: "#FFB400",
							backgroundColor: "rgba(255, 180, 0, 0.05)",
							color: "#FFB400",
						},
					},
				},
			}}
		>
			{children}
		</Elements>
	);
}
