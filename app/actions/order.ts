"use server";

import { handleFoundryError } from "@/lib/action-utils";
import { actionClient, cartActionClient } from "@/lib/safe-action";
import { checkoutFormSchema } from "@/lib/schemas/order";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";

const authorizeDispatchSchema = z.object({
	orderNumber: z.string(),
	trackingNumber: z.string().min(5, "TRACKING_ID_TOO_SHORT"),
});

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
