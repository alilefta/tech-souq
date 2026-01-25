import z from "zod";

export const CartCheckoutSchema = z.object({
	cartId: z.string("CartId is required!").optional(),
	shippingMethodId: z.string("Shipping method Id is required").optional(),
	discountCode: z.string().optional(),
});

export type CartCheckoutSchemaType = z.infer<typeof CartCheckoutSchema>;
