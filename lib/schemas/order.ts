// lib/schemas/order.ts
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const checkoutFormSchema = z.object({
	firstName: z.string().min(1, "IDENT_REQUIRED"),
	lastName: z.string().min(1, "IDENT_REQUIRED"),
	email: z.string().email("INVALID_SIGNAL_ADDRESS"),
	phoneNumber: z
		.string()
		.min(1, "COMM_LINE_REQUIRED")
		.refine((val) => parsePhoneNumberFromString(val)?.isValid(), { message: "INVALID_SIGNAL_FORMAT" }),
	country: z.string().min(1, "SECTOR_REQUIRED"),
	city: z.string().min(1, "HUB_REQUIRED"),
	address: z.string().min(1, "COORDINATES_REQUIRED"),
	zipCode: z.coerce.string().min(1, "ROUTING_INDEX_REQUIRED"),
	payment_method: z.enum(["stripe", "paypal", "wire"]),
	// Payment details (Optional based on method)
	cardNumber: z.string().optional(),
	expireDate: z.string().optional(),
	cvv: z.string().optional(),

	discountCode: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
