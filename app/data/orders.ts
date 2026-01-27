import { Order, OrderItem, OrderStatus, Product } from "@/generated/prisma/client";
import { CompatibilitySchemaType } from "@/lib/schemas/product";
import { prisma } from "@/prisma/prisma";

type Override<T, R> = Omit<T, keyof R> & R;

type ProductDetailDTO = Override<
	Product,
	{
		price: number;
		originalPrice: number | null;
		compatibility: CompatibilitySchemaType | null;
	}
>;
interface OrderItemDTO {
	id: number;
	orderId: string;
	productId: number;
	quantity: number;
	priceAt_time: number;
	product: ProductDetailDTO;
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
	phoneNumber: string;
	carrier: string | null;
	discountId: number | null;
	createdAt: Date;
	zipCode: string;
	items: OrderItemDTO[];
}

export async function getOrders(): Promise<OrderDTO[]> {
	const orders = await prisma.order.findMany({
		include: {
			items: {
				include: {
					product: true,
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
					product: true,
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
		items: (OrderItem & { product: Product })[];
	},
): OrderDTO {
	return {
		...order,
		total: Number(order.total),
		shippingCost: Number(order.shippingCost),

		items: order.items.map((oi) => ({
			...oi,
			priceAt_time: Number(oi.priceAt_time),
			product: {
				...oi.product,
				price: Number(oi.product.price),
				originalPrice: Number(oi.product.originalPrice),
				compatibility: oi.product.compatibility as unknown as CompatibilitySchemaType | null,
			},
		})),
	};
}
