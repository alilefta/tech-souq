"use server";

import { prisma } from "@/prisma/prisma";
import { actionClient } from "@/lib/safe-action";
import z from "zod";

const trackingSchema = z.object({
	orderNumber: z.string().min(5, "INVALID_SEQUENCE"),
});

export const trackOrder = actionClient.inputSchema(trackingSchema).action(async ({ parsedInput }) => {
	const order = await prisma.order.findUnique({
		where: { orderNumber: parsedInput.orderNumber },
		include: {
			items: {
				include: {
					product: { select: { name: true, brand: true, images: true } },
				},
			},
		},
	});

	if (!order) {
		throw new Error("SIGNAL_LOSS: NO_MATCHING_COORDINATES_FOUND");
	}

	return { success: true, order: { coverImage: order.items.map((i) => i.product.images[0]), ...order } };
});
