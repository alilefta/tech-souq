"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function clearCartSession() {
	const cookieStore = await cookies();

	// Destroy the manifest ID
	cookieStore.delete("base60_cart_id");

	// Refresh the layout so the Navbar cart badge becomes "0" immediately
	revalidatePath("/", "layout");

	return { success: true };
}
