"use server";

import { Cart, CartItem } from "@/generated/prisma/client";
import { cartActionClient } from "@/lib/safe-action";
import { AddBulkToCartSchema, AddToCartSchema, RemoveFromCartSchema, UpdateQuantitySchema } from "@/lib/schemas/actions/cart";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type CartDTO = Cart & { items: CartItem[] };

export const addToCartAction = cartActionClient.inputSchema(AddToCartSchema).action(async ({ parsedInput, ctx }) => {
	const { productId, quantity } = parsedInput;
	let cartId = ctx.cartId; // Injected by middleware!

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

		cartId = cart.id;

		// store cookie
		(await cookies()).set("base60_cart_id", cart.id, {
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

	return { success: true, cartId };
});

export const addBulkToCartAction = cartActionClient.inputSchema(AddBulkToCartSchema).action(async ({ parsedInput, ctx }) => {
	const { items } = parsedInput;
	let cartId = ctx.cartId;

	// 1. ENSURE CART EXISTS (Same logic as single add)
	if (!cartId) {
		const cart = await prisma.cart.create({ data: {} });
		cartId = cart.id;
		(await cookies()).set("base60_cart_id", cart.id, {
			path: "/",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 30,
		});
	}

	// 2. BULK UPSERT LOGIC (Atomic Transaction)
	// We use a transaction to ensure all parts land in the cart together
	await prisma.$transaction(async (tx) => {
		for (const item of items) {
			const existingItem = await tx.cartItem.findUnique({
				where: {
					productId_cartId: {
						cartId: cartId!,
						productId: item.productId,
					},
				},
			});

			if (existingItem) {
				await tx.cartItem.update({
					where: { id: existingItem.id },
					data: { quantity: existingItem.quantity + item.quantity },
				});
			} else {
				await tx.cartItem.create({
					data: {
						quantity: item.quantity,
						cartId: cartId!,
						productId: item.productId,
					},
				});
			}
		}
	});

	revalidatePath("/", "layout");
	return { success: true, cartId };
});

export const updateItemQuantityAction = cartActionClient.inputSchema(UpdateQuantitySchema).action(async ({ parsedInput, ctx }) => {
	const { itemId, quantity } = parsedInput;
	const cartId = ctx.cartId;

	if (!cartId) return { success: false, error: "No session found" };

	if (quantity <= 0) {
		// SECURE DELETE
		await prisma.cartItem.deleteMany({
			where: {
				id: itemId,
				cartId: cartId, // 🔒 Lock it to this user
			},
		});
	} else {
		// SECURE UPDATE
		// updateMany allows filtering by multiple fields
		await prisma.cartItem.updateMany({
			where: {
				id: itemId,
				cartId: cartId, // 🔒 Lock it to this user
			},
			data: { quantity },
		});
	}

	revalidatePath("/", "layout");
	return { success: true };
});

export const removeFromCartAction = cartActionClient.inputSchema(RemoveFromCartSchema).action(async ({ parsedInput, ctx }) => {
	const itemId = parsedInput.itemId;

	if (!ctx.cartId) {
		return { success: false, error: "No active session" };
	}
	// USE deleteMany INSTEAD of delete
	// This allows us to filter by TWO conditions:
	// 1. The Item ID
	// 2. The Cart ID (Ownership)
	await prisma.cartItem.deleteMany({
		where: {
			id: itemId,
			cartId: ctx.cartId, // 👈 THIS LOCKS IT DOWN
		},
	});

	revalidatePath("/", "layout");

	return { success: true };
});
