// app/actions/category.ts
"use server";

import { actionClient } from "@/lib/safe-action";
import { editSectorSchema, sectorSchema } from "@/lib/schemas/category";
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
