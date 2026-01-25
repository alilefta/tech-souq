import z from "zod";

export const CartCheckoutSchema = z.object({
	cartId: z.string("CartId is required!"),
	shippingMethodId: z.string("Shipping method Id is required"),
	discountCode: z.string().optional(),
});

export type CartCheckoutSchemaType = z.infer<typeof CartCheckoutSchema>;
