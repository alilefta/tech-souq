"use client";

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";

export function StripePaymentForm({ orderNumber }: { orderNumber: string }) {
	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			return;
		}

		setIsProcessing(true);
		setErrorMessage(null);

		// 1. DIRECT TO STRIPE
		// We confirm the payment using the secret injected by the Wrapper
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// 2. THE RETURN URL
				// Where Stripe redirects the user after payment succeeds/fails.
				// We will build this page in Step 5.
				return_url: `${window.location.origin}/checkout/success/${orderNumber}`,
			},
		});

		// 3. ERROR HANDLING
		// If we reach this line, it means there was an error (e.g., "Card Declined")
		// If success, the browser redirects automatically, so this code never runs.
		if (error) {
			setErrorMessage(error.message ?? "An unexpected error occurred.");
			setIsProcessing(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* HEADER */}
			<div className="flex items-center gap-2 mb-6">
				<div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full animate-pulse" />
				<h3 className="text-[#F5F5F0] text-xs font-black uppercase tracking-[0.2em]">Secure_Gateway_Active</h3>
			</div>

			{/* STRIPE ELEMENT INJECTION POINT */}
			<div className="bg-[#0A0E14] border border-white/10 p-1">
				<PaymentElement />
			</div>

			{/* ERROR TERMINAL */}
			{errorMessage && (
				<div className="bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-3">
					<AlertCircle className="text-red-500 shrink-0" size={16} />
					<p className="text-red-500 text-[10px] font-mono uppercase">{errorMessage}</p>
				</div>
			)}

			{/* ACTION BUTTON */}
			<motion.button
				whileHover={{ scale: 1.01 }}
				whileTap={{ scale: 0.99 }}
				disabled={!stripe || isProcessing}
				className="group relative w-full bg-[#FFB400] text-[#0A0E14] font-black text-sm uppercase tracking-[0.3em] py-6 flex items-center justify-center gap-3 overflow-hidden transition-all shadow-[0_0_30px_rgba(255,180,0,0.1)] hover:shadow-[0_0_50px_rgba(255,180,0,0.3)] disabled:opacity-50 disabled:grayscale"
			>
				<span className="relative z-10 flex items-center gap-3">
					{isProcessing ? (
						<>
							VERIFYING_FUNDS... <Loader2 className="animate-spin" size={16} />
						</>
					) : (
						<>
							Authorize_Transfer <Lock size={16} strokeWidth={2.5} />
						</>
					)}
				</span>

				{/* Kinetic Beam */}
				{!isProcessing && (
					<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
						<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
					</div>
				)}
			</motion.button>

			<div className="flex justify-center items-center gap-2 opacity-30">
				<Lock size={10} className="text-[#94A3B8]" />
				<p className="text-[8px] font-mono text-[#94A3B8] uppercase tracking-widest">End-to-End Encryption // AES-256</p>
			</div>
		</form>
	);
}
