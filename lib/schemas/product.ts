import z from "zod";

export const productSpecSchema = z.object({
	label: z.string().min(1, "Required"),
	value: z.string().min(1, "Required"),
});

export const addProductSchema = z.object({
	name: z.string().min(3, "IDENT_TOO_SHORT"),
	brand: z.string().min(1, "BRAND_REQUIRED"),
	sku: z.string().min(3, "SKU_REQUIRED"),
	categoryId: z.string().min(1, "SECTOR_REQUIRED"),
	price: z.number().min(1),
	originalPrice: z.number().optional(),
	stock: z.number().min(0),
	description: z.string().min(10, "NARRATIVE_TOO_SHORT"),
	images: z
		.array(
			z.object({
				url: z.url("Must be a valid URL"),
			})
		)
		.min(1, "VISUAL_REQUIRED"),
	specs: z.array(productSpecSchema),
	isActive: z.boolean(),
	isFeatured: z.boolean(),
	isNew: z.boolean(),
});

export const editProductSchema = addProductSchema.extend({
	id: z.string(),
});

export const deleteSchema = z.object({ id: z.number() });
