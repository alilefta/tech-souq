// app/checkout/return/page.tsx
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

interface PageProps {
	searchParams: Promise<{
		payment_intent?: string;
		payment_intent_client_secret?: string;
		redirect_status?: string; // 'succeeded' | 'failed' | 'canceled'
	}>;
}

export default async function ReturnPage({ searchParams }: PageProps) {
	const { payment_intent, redirect_status } = await searchParams;

	if (!payment_intent) return redirect("/checkout");

	// 1. FETCH STATUS FROM STRIPE (Single Source of Truth)
	const paymentIntentData = await stripe.paymentIntents.retrieve(payment_intent);

	// 2. SUCCESS CASE
	if (paymentIntentData.status === "succeeded") {
		// The Webhook handles the DB update, but we send user to the thank you page
		const orderNumber = paymentIntentData.metadata.orderNumber;
		return redirect(`/checkout/success/${orderNumber}`);
	}

	// 3. FAILURE / CANCEL CASE
	// We send them back to checkout to try again
	// We pass an error code so the checkout page can toast it
	return redirect(`/checkout?error=payment_failed&reason=${redirect_status}`);
}
