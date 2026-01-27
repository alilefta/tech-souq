import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = (await headers()).get("Stripe-Signature") as string;

	let event: Stripe.Event;

	// 1. SECURITY HANDSHAKE
	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`Webhook Signature Error: ${error.message}`);
			return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
		} else {
			console.error(`An unknown error occurred`);
			return;
		}
	}

	const session = event.data.object as Stripe.PaymentIntent;
	const orderId = session.metadata?.orderId;

	if (!orderId) {
		// If it's a payment_intent.succeeded without order ID, we can't process it.
		// Return 200 to stop Stripe from retrying.
		return new NextResponse(null, { status: 200 });
	}

	// 2. EVENT ROUTER
	try {
		switch (event.type) {
			// ✅ CASE A: CAPITAL_VERIFIED (Success)
			case "payment_intent.succeeded":
				console.log(`[FOUNDRY_LOG] Capital Verified for Manifest: ${orderId}`);

				// RUN ATOMIC TRANSACTION
				await prisma.$transaction(async (tx) => {
					// A. Update Order Status
					const order = await tx.order.update({
						where: { id: orderId },
						data: { status: "PAID" },
						include: { items: true },
					});

					// B. Inventory Allocation (Decrement Stock)
					// We iterate through items to adjust the physical foundry count
					for (const item of order.items) {
						await tx.product.update({
							where: { id: item.productId },
							data: {
								stock: { decrement: item.quantity },
							},
						});
					}
				});
				break;

			// ⏳ PROCESSING: BANK IS THINKING
			case "payment_intent.processing":
				// Usually we don't need to do anything as order is already PENDING
				// But logging it helps debug slow bank transfers (ACH/SEPA)
				console.log(`⏳ Payment processing for Order: ${orderId}`);

				// RUN ATOMIC TRANSACTION
				await prisma.$transaction(async (tx) => {
					// A. Update Order Status
					const order = await tx.order.update({
						where: { id: orderId },
						data: { status: "PAID" },
						include: { items: true },
					});

					// B. Inventory Allocation (Decrement Stock)
					// We iterate through items to adjust the physical foundry count
					for (const item of order.items) {
						await tx.product.update({
							where: { id: item.productId },
							data: {
								stock: { decrement: item.quantity },
							},
						});
					}
				});
				break;

			// ❌ CASE B: TRANSACTION_TERMINATED (Failure)
			case "payment_intent.payment_failed":
				console.error(`[FOUNDRY_ALERT] Transaction Failed for Manifest: ${orderId}`);

				await prisma.order.update({
					where: { id: orderId },
					data: { status: "CANCELLED" },
				});
				break;

			default:
				// Handle other event types if needed
				console.log(`Unhandled event type ${event.type}`);
		}

		return new NextResponse(null, { status: 200 });
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`Webhook Logic Error: ${error.message}`);
		} else {
			console.error(`Webhook Logic Error: Unknown error occured.`);
		}
		// Return 200 anyway so Stripe doesn't retry infinitely if it's a logic bug on our end
		// (Unless you want it to retry, then return 500)
		return new NextResponse("Webhook Handler Error", { status: 500 });
	}
}
