import { Order, OrderItem, OrderStatus, Product } from "@/generated/prisma/client";
import { prisma } from "@/prisma/prisma";

interface OrderItemDTO {
	id: number;
	orderId: string;
	productId: number;
	quantity: number;
	priceAt_time: number;
	product: Pick<Product, "id" | "name">;
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

export async function getOrders(): Promise<OrderDTO[]> {
	const orders = await prisma.order.findMany({
		include: {
			items: {
				include: {
					product: {
						select: {
							name: true,
							id: true,
						},
					},
				},
			},
		},
	});

	return orders.map((order) => mapOrderToOrderDTO(order));
}

export async function getOrderDetails(orderNumber: string) {
	const order = await prisma.order.findUnique({
		where: {
			orderNumber,
		},

		include: {
			items: {
				include: {
					product: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
		},
	});

	if (!order) return null;

	return mapOrderToOrderDTO(order);
}

export async function getFilteredOrders({ query, node, status }: { query?: string; node?: string; status?: string }) {
	const orders = await prisma.order.findMany({
		where: {
			AND: [
				// 1. Search by Order Number or Client Name
				query
					? {
							OR: [
								{ orderNumber: { contains: query, mode: "insensitive" } },
								{ firstName: { contains: query, mode: "insensitive" } },
								{ lastName: { contains: query, mode: "insensitive" } },
							],
					  }
					: {},
				// 2. Filter by Node (Country/Sector)
				node && node !== "ALL" ? { country: node } : {},
				// 3. Filter by Operational Status
				status && status !== "ALL" ? { status: status as OrderStatus } : {},
			],
		},
		include: {
			items: { include: { product: true } },
		},
		orderBy: { createdAt: "desc" },
	});

	return orders.map((o) => mapOrderToOrderDTO(o));
}

// Helpers
function mapOrderToOrderDTO(
	order: Order & {
		items: (OrderItem & { product: Pick<Product, "id" | "name"> })[];
	}
): OrderDTO {
	return {
		...order,
		total: Number(order.total),
		shippingCost: Number(order.shippingCost),
		items: order.items.map((oi) => ({
			...oi,
			priceAt_time: Number(oi.priceAt_time),
			product: {
				id: oi.productId,
				name: oi.product.name,
			},
		})),
	};
}
