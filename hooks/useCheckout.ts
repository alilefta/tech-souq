"use client";

import { useEffect, useState } from "react";
import { createPaymentIntent } from "@/app/actions/stripe/create-payment-intent";
import { CartCheckoutSchemaType } from "@/lib/schemas/checkout";
export function useCheckout(input: CartCheckoutSchemaType) {
	const [loading, setLoading] = useState(true);
	const [clientSecret, setClientSecret] = useState<string | null>(null);

	async function fetch() {
		const secret = await createPaymentIntent(input);

		if (!secret || !secret.clientSecret) {
			setLoading(false);
			setClientSecret(null);
			return;
		}
		setLoading(false);
		setClientSecret(secret.clientSecret);
	}

	useEffect(() => {
		fetch();
	}, []);

	return { loading, clientSecret };
}
