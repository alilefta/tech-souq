// app/actions/review.ts
"use server";

import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";

const reviewIdSchema = z.object({
	id: z.string(),
});

// 1. AUTHORIZE LOG (Update Status)
export const authorizeReview = actionClient.inputSchema(reviewIdSchema).action(async ({ parsedInput }) => {
	const { id } = parsedInput;

	// SIMULATION LOGIC:
	console.log(`PROTOCOL_START: Authorizing Log ${id}`);

	// In a real app: await prisma.review.update({ where: { id }, data: { status: 'AUTHORIZED' }})

	revalidatePath("/admin/reviews");
	return { success: true, message: "LOG_AUTHORIZED_SUCCESSFULLY" };
});

// 2. ARCHIVE LOG (Simulated Delete)
export const archiveReview = actionClient.inputSchema(reviewIdSchema).action(async ({ parsedInput }) => {
	const { id } = parsedInput;

	// SIMULATION LOGIC:
	console.log(`PROTOCOL_START: Archiving Log ${id}`);

	// In a real app: await prisma.review.delete({ where: { id }})

	revalidatePath("/admin/reviews");
	return { success: true, message: "LOG_REMOVED_FROM_REGISTRY" };
});

// 3. SUBMIT NEW REPORT (Create)
const submitReportSchema = z.object({
	user: z.string().min(2),
	rating: z.number().min(1).max(5),
	comment: z.string().min(10),
	hardwareId: z.number(),
});

export const submitVanguardReport = actionClient.inputSchema(submitReportSchema).action(async ({ parsedInput }) => {
	// SIMULATION: Create new log entry
	revalidatePath("/admin/reviews");
	revalidatePath("/products"); // Update the public PDP
	return { success: true, logId: `LOG-NEW-${Math.random().toString(36).substring(7)}` };
});
