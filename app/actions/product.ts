// For writing operations
"use server";

import { actionClient } from "@/lib/safe-action";
import { addProductSchema } from "@/lib/schemas/product";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slug";
import z from "zod";

export const addProduct = actionClient.inputSchema(addProductSchema).action(async ({ parsedInput }) => {
	const p = parsedInput;

	// 1. UNIQUE SLUG PROTOCOL
	// We append a short 4-character hex hash to ensure uniqueness even if names match
	const uniqueHash = Math.random().toString(16).substring(2, 6);
	const baseSlug = slugify(p.name, { lower: true });
	const finalSlug = `${baseSlug}-${uniqueHash}`;

	try {
		// 2. ATOMIC TRANSACTION (Nested Write)
		// This ensures product AND specs are created together. If one fails, both roll back.
		const product = await prisma.product.create({
			data: {
				name: p.name,
				description: p.description,
				price: p.price,
				slug: finalSlug,
				stock: p.stock,
				brand: p.brand,
				sku: p.sku,
				originalPrice: p.originalPrice,
				images: p.images,
				categoryId: Number(p.categoryId),
				// NESTED CREATE: This is the proper way to handle relations in one call
				specs: {
					create: p.specs.map((spec) => ({
						label: spec.label,
						value: spec.value,
					})),
				},
			},
		});

		revalidatePath("/admin/products");
		revalidatePath("/products");

		return {
			success: true,
			slug: product.slug,
			id: product.id,
		};
	} catch (error: any) {
		// Handle Prisma Unique Constraint Errors specifically
		if (error.code === "P2002") {
			throw new Error("UID_COLLISION: SKU or SLUG already exists in the Registry.");
		}
		throw new Error("DATABASE_SYNC_FAILURE: Contact System Administrator.");
	}
});
