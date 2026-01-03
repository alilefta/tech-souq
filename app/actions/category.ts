// app/actions/category.ts
"use server";

import { handleFoundryError } from "@/lib/action-utils";
import { actionClient } from "@/lib/safe-action";
import { deleteSchema, editSectorSchema, sectorSchema } from "@/lib/schemas/category";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export const createSector = actionClient.inputSchema(sectorSchema).action(async ({ parsedInput }) => {
	try {
		const sector = await prisma.category.create({
			data: parsedInput,
		});

		revalidatePath("/admin/categories");
		revalidatePath("/categories");

		return { success: true, id: sector.id };
	} catch (error) {
		console.error("INITIALIZATION_FAILURE:", error);
		throw new Error("INITIALIZATION_FAILURE: COORDINATE_CONFLICT");
	}
});

export const updateSector = actionClient.inputSchema(editSectorSchema).action(async ({ parsedInput }) => {
	const { id, ...data } = parsedInput;

	try {
		const category = await prisma.category.update({
			where: { id },
			data: {
				name: data.name,
				arabicName: data.arabicName,
				slug: data.slug,
				description: data.description,
				gridDisplay: data.gridDisplay,
				imageUrl: data.imageUrl,
			},
		});

		revalidatePath("/admin/categories");
		revalidatePath("/categories");
		revalidatePath(`/categories/${category.slug}`);

		return { success: true, id: category.id };
	} catch (error) {
		console.error("RECONFIG_FAILURE:", error);
		throw new Error("RECONFIGURATION_FAILURE: SECTOR_SYNC_HALTED");
	}
});

// 1. SAFE DE-SYNC (Deactivate)
export const deactivateSector = actionClient.inputSchema(deleteSchema).action(async ({ parsedInput }) => {
	try {
		await prisma.category.update({
			where: { id: parsedInput.id },
			data: {
				// We'll need to ensure your schema has an isActive field on Category
				// If not, this action can be used to set a 'visibility' flag
				description: "DEACTIVATED_SECTOR",
			},
		});
		revalidatePath("/admin/categories");
		return { success: true };
	} catch (error) {
		handleFoundryError(error);
	}
});

// 2. REGISTRY WIPE (Delete)
export const deleteSector = actionClient.inputSchema(deleteSchema).action(async ({ parsedInput }) => {
	try {
		// PRE-FLIGHT CHECK: Verify no modules are allocated
		const moduleCount = await prisma.product.count({
			where: { categoryId: parsedInput.id },
		});

		if (moduleCount > 0) {
			throw new Error(`INTEGRITY_VIOLATION: ${moduleCount}_MODULES_ALLOCATED_TO_SECTOR`);
		}

		await prisma.category.delete({
			where: { id: parsedInput.id },
		});

		revalidatePath("/admin/categories");
		revalidatePath("/categories");
		return { success: true };
	} catch (error) {
		handleFoundryError(error);
	}
});
