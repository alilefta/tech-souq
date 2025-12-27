import { Order, OrderItem, OrderStatus } from "@/generated/prisma/client";
import { prisma } from "@/prisma/prisma";

interface OrderItemDTO {
	id: number;
	orderId: string;
	productId: number;
	quantity: number;
	priceAt_time: number;
}

export interface OrderDTO {
	id: string;
	orderNumber: string;
	trackingNumber: string | null;
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	city: string;
	country: string;
	total: number;
	shippingCost: number;
	status: OrderStatus;
	carrier: string | null;
	discountId: number | null;
	createdAt: Date;
	items: OrderItemDTO[];
}

export async function getOrderDetails(orderNumber: string) {
	const order = await prisma.order.findUnique({
		where: {
			orderNumber,
		},
		include: {
			items: true,
		},
	});

	if (!order) return null;

	return mapOrderToOrderDTO(order);
}

function mapOrderToOrderDTO(order: Order & { items: OrderItem[] }): OrderDTO {
	return {
		...order,
		total: Number(order.total),
		shippingCost: Number(order.shippingCost),
		items: order.items.map((oi) => ({
			...oi,
			priceAt_time: Number(oi.priceAt_time),
		})),
	};
}
