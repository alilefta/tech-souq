import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe"; // Your stripe instance
import { prisma } from "@/prisma/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
	const body = await req.text(); // Get raw body
	const signature = (await headers()).get("Stripe-Signature") as string;

	let event: Stripe.Event;

	// 1. VERIFY SIGNATURE (Security Check)
	// Ensure this request actually came from Stripe, not a hacker
	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!, // Get this from Stripe Dashboard/CLI
		);
	} catch (error: any) {
		return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
	}

	// 2. HANDLE THE EVENT
	const session = event.data.object as Stripe.PaymentIntent;

	if (event.type === "payment_intent.succeeded") {
		console.log(`✅ PaymentIntent ${session.id} succeeded`);

		// Retrieve the Order ID we attached to metadata in Step 1
		const orderId = session.metadata.orderId;

		if (orderId) {
			// 3. UPDATE DATABASE (The "Second Action")
			await prisma.order.update({
				where: { id: orderId },
				data: {
					status: "PAID",
					// You could also save the Stripe Payment ID here for records
					// paymentId: session.id
				},
			});

			// Optional: Trigger email sending here (Resend/SendGrid)
		}
	}

	return new NextResponse(null, { status: 200 });
}
