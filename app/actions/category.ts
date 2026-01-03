// app/actions/category.ts
"use server";

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

export const deleteSector = actionClient.inputSchema(deleteSchema).action(async ({ parsedInput }) => {
	try {
		// INTEGRITY CHECK: Prevent deletion if sector has products
		const moduleCount = await prisma.product.count({
			where: { categoryId: parsedInput.id },
		});

		if (moduleCount > 0) {
			throw new Error(`INTEGRITY_VIOLATION: ${moduleCount}_MODULES_STILL_ALLOCATED`);
		}

		await prisma.category.delete({
			where: { id: parsedInput.id },
		});

		revalidatePath("/admin/categories");
		revalidatePath("/categories");
		return { success: true };
	} catch (error: any) {
		throw new Error(error.message || "WIPE_FAILURE: SECTOR_SYNC_ERROR");
	}
});
