"use server";

import { getCart } from "@/app/data/cart";
import { CartCheckoutSchemaType } from "@/lib/schemas/checkout";
import { stripe } from "@/lib/stripe";
import { config } from "dotenv";

config({
	path: "/.env.local",
});

console.log(process.env.STRIPE_SECRET_KEY);
export async function createPaymentIntent(input: CartCheckoutSchemaType) {
	const cart = await getCart();

	if (!cart) return null;

	const cartSubTotal = cart?.items.reduce((p, c) => p + Number(c.product.price), 0);
	const discountCode = "Not_IMPLEMENTED!";
	const shippingMethodCost = input.shippingMethodId === "X" ? 50 : 0;

	const discountAmount = discountCode === "Not_IMPLEMENTED!" ? 0 : 10;

	const total = cartSubTotal + shippingMethodCost - discountAmount;

	const intent = await stripe.paymentIntents.create({
		metadata: {
			test: "",
		},
		amount: total,
		currency: "usd",
		description: "payment intent",
		statement_descriptor: "Base_60",
	});

	return { clientSecret: intent.client_secret };
}
