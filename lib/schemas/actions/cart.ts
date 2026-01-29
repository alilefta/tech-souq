import z from "zod";

export const AddToCartSchema = z.object({
	productId: z.number(),
	quantity: z.number().min(1).default(1),
});

export const AddBulkToCartSchema = z.object({
	items: z.array(
		z.object({
			productId: z.number(),
			quantity: z.number().min(1),
		}),
	),
});

export type AddBulkToCartSchemaType = z.infer<typeof AddBulkToCartSchema>;

export const UpdateQuantitySchema = z.object({
	itemId: z.number(),
	quantity: z.number().min(1).default(1),
});

export const RemoveFromCartSchema = z.object({
	itemId: z.number(),
});
