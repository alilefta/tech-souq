"use server";

import { handleFoundryError } from "@/lib/action-utils";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";

const authorizeDispatchSchema = z.object({
	orderNumber: z.string(),
	trackingNumber: z.string().min(5, "TRACKING_ID_TOO_SHORT"),
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
