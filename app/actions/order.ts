"use server";

import { handleFoundryError } from "@/lib/action-utils";
import { actionClient, cartActionClient } from "@/lib/safe-action";
import { checkoutFormSchema } from "@/lib/schemas/order";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";

const authorizeDispatchSchema = z.object({
	orderNumber: z.string(),
	trackingNumber: z.string().min(5, "TRACKING_ID_TOO_SHORT"),
});

// initial stage
export const initializePaymentFlow = cartActionClient.inputSchema(checkoutFormSchema).action(async ({ parsedInput, ctx }) => {
	const cartId = ctx.cartId;

	if (!cartId) {
		throw new Error("SESSION_EXPIRED // NO_MANIFEST_FOUND");
	}

	try {
		// 1. FETCH ACTIVE MANIFEST (Security: Get items from DB)
		const cart = await prisma.cart.findUnique({
			where: { id: cartId },
			include: { items: { include: { product: true } } },
		});

		if (!cart || cart.items.length === 0) {
			throw new Error("MANIFEST_EMPTY // ACTION_ABORTED");
		}

		// 2. CALCULATE TOTALS (Security: Server-side math)
		const subtotal = cart.items.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0);

		const shippingMethodCost = 50; // Dynamic logic later
		const discountAmount = 0; // Dynamic logic later
		const totalAmount = subtotal + shippingMethodCost - discountAmount;

		// 3. GENERATE IDENTIFIER
		const timestamp = Date.now().toString(16).toUpperCase().slice(-4);
		const orderNumber = `BBL-${timestamp}-${Math.floor(1000 + Math.random() * 9000)}`;

		// 4. CREATE PENDING ORDER (The "Draft")
		// We do NOT delete the cart yet. This is just a "Draft Order".
		const order = await prisma.order.create({
			data: {
				orderNumber,
				firstName: parsedInput.firstName,
				lastName: parsedInput.lastName,
				email: parsedInput.email,
				address: parsedInput.address,
				city: parsedInput.city,
				country: parsedInput.country,
				zipCode: parsedInput.zipCode,
				phoneNumber: parsedInput.phoneNumber,
				total: totalAmount,
				status: "PENDING", // Wait for payment
				items: {
					create: cart.items.map((item) => ({
						productId: item.productId,
						quantity: item.quantity,
						priceAt_time: item.product.price,
					})),
				},
			},
		});

		// 5. TALK TO STRIPE
		// We tell Stripe: "We intend to collect $X for Order #Y"
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(totalAmount * 100), // Stripe expects cents!
			currency: "usd",
			automatic_payment_methods: { enabled: true }, // Allow Cards, Wallets, etc.
			metadata: {
				orderId: order.id, // CRITICAL: This links Stripe back to your DB
				orderNumber: order.orderNumber,
			},
		});

		// 6. RETURN KEYS TO CLIENT
		return {
			success: true,
			clientSecret: paymentIntent.client_secret,
			orderNumber: order.orderNumber,
		};
	} catch (error) {
		return handleFoundryError(error);
	}
});

// final stage
export const createOrderAction = cartActionClient.inputSchema(checkoutFormSchema).action(async ({ parsedInput, ctx }) => {
	const cartId = ctx.cartId;

	if (!cartId) {
		throw new Error("SESSION_EXPIRED // NO_MANIFEST_FOUND");
	}

	try {
		// 1. FETCH ACTIVE MANIFEST
		const cart = await prisma.cart.findUnique({
			where: { id: cartId },
			include: { items: { include: { product: true } } },
		});

		if (!cart || cart.items.length === 0) {
			throw new Error("MANIFEST_EMPTY // ACTION_ABORTED");
		}

		// 2. GENERATE TRACKING IDENTIFIER (Babylon Style)
		const timestamp = Date.now().toString(16).toUpperCase().slice(-4);
		const orderNumber = `BBL-${timestamp}-${Math.floor(1000 + Math.random() * 9000)}`;

		const subtotal = cart.items.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0);

		// 3. EXECUTE ATOMIC HANDSHAKE (Transaction)
		const result = await prisma.$transaction(async (tx) => {
			// A. Initialize Order Record
			const order = await tx.order.create({
				data: {
					orderNumber,
					firstName: parsedInput.firstName,
					lastName: parsedInput.lastName,
					email: parsedInput.email,
					address: parsedInput.address,
					city: parsedInput.city,
					country: parsedInput.country,
					total: subtotal,
					zipCode: parsedInput.zipCode,
					phoneNumber: parsedInput.phoneNumber,
					status: "PAID", // Simplified for MVP
					// Map items and snapshot their current price
					items: {
						create: cart.items.map((item) => ({
							productId: item.productId,
							quantity: item.quantity,
							priceAt_time: item.product.price, // 🔒 PRICE LOCK
						})),
					},
				},
			});

			// B. Wipe the Manifest (Clear Cart)
			await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

			return order;
		});

		// 4. PROTOCOL CLEANUP
		(await cookies()).delete("base60_cart_id");
		revalidatePath("/", "layout");

		return {
			success: true,
			orderNumber: result.orderNumber,
		};
	} catch (error) {
		return handleFoundryError(error);
	}
});

export const authorizeDispatch = actionClient.inputSchema(authorizeDispatchSchema).action(async ({ parsedInput }) => {
	const { orderNumber, trackingNumber } = parsedInput;

	try {
		await prisma.order.update({
			where: { orderNumber },
			data: {
				status: "SHIPPED", // Use your Enum
				trackingNumber: trackingNumber,
				carrier: "Global_Express_BBL", // Or make this dynamic
			},
		});

		revalidatePath("/admin/orders");
		return { success: true };
	} catch (error) {
		handleFoundryError(error);
	}
});
