"use server";

import { Cart, CartItem } from "@/generated/prisma/client";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type CartDTO = Cart & { items: CartItem[] };

export async function addToCartAction(productId: number, quantity: number = 1) {
	const cookieStore = await cookies();

	const cartId = cookieStore.get("base60_cart_id")?.value;

	let cart: CartDTO | null | Cart = null;

	if (cartId) {
		cart = await prisma.cart.findUnique({
			where: {
				id: cartId,
			},
			include: {
				items: true,
			},
		});
	}

	if (!cart) {
		cart = await prisma.cart.create({
			data: {
				// userId is null by default
			},
		});

		// store cookie
		cookieStore.set("base60_cart_id", cart.id, {
			path: "/",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true, // to be hidden from javascript on the client
			maxAge: 60 * 60 * 24 * 30, // 30 days
		});
	}

	// add/update the item
	// we use the "upsert" (update if exists, insert if not).
	const existingItem = await prisma.cartItem.findUnique({
		where: {
			productId_cartId: {
				cartId: cart.id,
				productId: productId,
			},
		},
	});

	if (existingItem) {
		await prisma.cartItem.update({
			where: {
				id: existingItem.id,
			},
			data: { quantity: existingItem.quantity + quantity },
		});
	} else {
		await prisma.cartItem.create({
			data: {
				quantity,
				cartId: cart.id,
				productId: productId,
			},
		});
	}

	// 4. THE MAGIC: Tell Next.js to refresh the UI
	// This causes CartWrapper to re-run and fetch fresh data
	revalidatePath("/", "layout");
}
