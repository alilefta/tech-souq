// app/checkout/success/[orderNumber]/page.tsx
import { getOrderDetails, OrderDTO } from "@/app/data/orders"; // You'll create this fetcher
import { notFound } from "next/navigation";
import { SuccessUI } from "@/components/checkout/success-ui";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dispatch Confirmed | BASE 60",
	description: "Your hardware module has been cleared for global transfer.",
};

export default async function SuccessPage({ params }: { params: Promise<{ orderNumber: string }> }) {
	const { orderNumber } = await params;

	// Fetch order from DB to ensure security and valid access
	const order = await getOrderDetails(orderNumber);

	if (!order) notFound();

	// sample data
	// const order: OrderDTO = {
	// 	orderNumber: "TEST",
	// 	firstName: "Jane",
	// 	lastName: "Doe",
	// 	email: "jane@example.com",
	// 	address: "123 Test St",
	// 	city: "Testville",
	// 	country: "Testland",
	// 	total: Number("499.99") * 2 + Number("10.00"),
	// 	shippingCost: Number("10.00"),
	// 	status: "PAID",
	// 	carrier: "Global Express",
	// 	createdAt: new Date(),
	// 	discountId: null,
	// 	id: "X",
	// 	trackingNumber: null,
	// 	items: [
	// 		{
	// 			productId: 1,
	// 			quantity: 2,
	// 			priceAt_time: Number("499.99"),
	// 			id: 10,
	// 			orderId: "X",
	// 		},
	// 	],
	// };

	return (
		<main className="bg-[#0A0E14] min-h-screen pt-32 pb-20 overflow-hidden">
			<SuccessUI order={order} />
		</main>
	);
}
