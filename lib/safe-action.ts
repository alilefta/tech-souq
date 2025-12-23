import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";

// base client
export const actionClient = createSafeActionClient({
	// Handle ALL errors globally here (Logging/Sentry)
	handleServerError(e) {
		console.error("Action error:", e.message);
		return "System Malfunction. Retrying connection...";
	},
});

// "Cart Aware" Action Client (Middleware!)
// This injects the cartId into every action automatically
export const cartActionClient = actionClient.use(async ({ next }) => {
	const cookieStore = await cookies();
	const cartId = cookieStore.get("base60_cart_id")?.value;

	return next({ ctx: { cartId } });
});
