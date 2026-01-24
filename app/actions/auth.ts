"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginSchema = z.object({
	email: z.string().email("INVALID_IDENTITY_FORMAT"),
	password: z.string().min(1, "KEY_REQUIRED"),
});

export const loginAdmin = actionClient.inputSchema(loginSchema).action(async ({ parsedInput }) => {
	// SIMULATION: Real auth logic (NextAuth/Lucia/Supabase) goes here
	const { email, password } = parsedInput;

	// Mock check
	if (email === "admin@base60.io" && password === "babylon") {
		// Set session cookie
		(await cookies()).set("admin_session", "verified", { secure: true });

		// We return success here, client handles redirect for smooth animation
		return { success: true };
	}

	throw new Error("ACCESS_DENIED: CREDENTIALS_REJECTED");
});
