// For writing operations
"use server";

import { Prisma } from "@/generated/prisma/client";
import { actionClient } from "@/lib/safe-action";
import { addProductSchema, deleteSchema, editProductSchema } from "@/lib/schemas/product";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slug";
import { ProductDetailsDTO, ProductToDetailsDTOMapper } from "../data/products";
import { handleFoundryError } from "@/lib/action-utils";

export async function getModuleDiagnostic(id: number): Promise<ProductDetailsDTO | null> {
	try {
		const product = await prisma.product.findUnique({
			where: {
				id: id,
			},
			include: {
				category: {
					select: {
						name: true,
						id: true,
						slug: true,
					},
				},
				specs: {
					select: {
						id: true,
						label: true,
						value: true,
					},
				},
			},
		});

		if (!product) return null;

		return ProductToDetailsDTOMapper(product);
	} catch (error) {
		handleFoundryError(error);
	}
}

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
				name: p.name.trim(),
				description: p.description.trim(),
				price: p.price,
				slug: finalSlug,
				stock: p.stock,
				brand: p.brand.trim(),
				sku: p.sku.trim(),
				originalPrice: p.originalPrice,
				images: p.images.map((img) => img.url),
				categoryId: Number(p.categoryId),
				isActive: p.isActive,
				isNew: p.isNew,
				isFeatured: p.isFeatured,
				compatibility: p.compatibility ?? undefined,
				// NESTED CREATE: This is the proper way to handle relations in one call
				specs: {
					create: p.specs.map((spec) => ({
						label: spec.label.trim(),
						value: spec.value.trim(),
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
	} catch (error) {
		handleFoundryError(error);
		// // Handle Prisma Unique Constraint Errors specifically
		// if (error instanceof Prisma.PrismaClientKnownRequestError) {
		// 	// P2002 = Unique Constraint Violation (Slug, SKU, or Code)
		// 	if (error.code === "P2002") {
		// 		// Optional: You can see which field failed via error.meta?.target
		// 		const target = (error.meta?.target as string[])?.join(", ") || "Field";
		// 		throw new Error(`UID_COLLISION: The ${target} already exists in the Registry.`);
		// 	}
		// }
		// // 2. Log the unknown error for your internal debugging (Server Logs)
		// console.error("CRITICAL_DB_FAILURE:", error);

		// // 3. Throw a generic error for the client (Security: Don't leak DB details)
		// throw new Error("DATABASE_SYNC_FAILURE: Contact System Administrator.");
	}
});

export const updateProduct = actionClient.inputSchema(editProductSchema).action(async ({ parsedInput }) => {
	const p = parsedInput;

	try {
		// 2. ATOMIC TRANSACTION (Nested Write)
		// This ensures product AND specs are created together. If one fails, both roll back.
		const product = await prisma.product.update({
			where: {
				id: Number(p.id),
			},
			data: {
				name: p.name.trim(),
				description: p.description.trim(),
				price: p.price,
				stock: p.stock,
				brand: p.brand.trim(),
				sku: p.sku.trim(),
				originalPrice: p.originalPrice,
				images: p.images.map((img) => img.url),
				categoryId: Number(p.categoryId),
				isActive: p.isActive,
				isNew: p.isNew,
				isFeatured: p.isFeatured,
				compatibility: p.compatibility ?? Prisma.JsonNull,
				// NESTED CREATE: This is the proper way to handle relations in one call
				specs: {
					deleteMany: {}, // Clear previous technical parameter,
					create: p.specs.map((spec) => ({
						label: spec.label.trim(),
						value: spec.value.trim(),
					})),
				},
			},
		});

		revalidatePath("/admin/products");
		revalidatePath(`/products/${product.slug}`);
		revalidatePath(`/products`);

		return {
			success: true,
			id: product.id,
		};
	} catch (error) {
		handleFoundryError(error);

		// if (error instanceof Prisma.PrismaClientKnownRequestError) {
		// 	if (error.code === "P2002") {
		// 		throw new Error("UID_COLLISION: SKU or SLUG conflict detected.");
		// 	}
		// }
		// console.error("RECONFIG_FAILURE:", error);
		// throw new Error("RECONFIGURATION_FAILURE: DATABASE_SYNC_HALTED");
	}
});

// SAFE DE-SYNC (Deactivate)
export const deactivateProduct = actionClient.inputSchema(deleteSchema).action(async ({ parsedInput }) => {
	try {
		await prisma.product.update({
			where: { id: parsedInput.id },
			data: { isActive: false },
		});
		revalidatePath("/admin/products");
		return { success: true, message: "MODULE_DE-SYNCED_SUCCESSFULLY" };
	} catch (error) {
		handleFoundryError(error);
	}
});

// REGISTRY WIPE (Delete)
export const deleteProduct = actionClient.inputSchema(deleteSchema).action(async ({ parsedInput }) => {
	try {
		await prisma.product.delete({
			where: { id: parsedInput.id },
		});
		revalidatePath("/admin/products");
		return { success: true, message: "REGISTRY_WIPE_COMPLETE" };
	} catch (error) {
		handleFoundryError(error);
	}
});
