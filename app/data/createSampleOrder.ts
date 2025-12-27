import { prisma } from "@/prisma/prisma";
import { getOrderDetails, OrderDTO } from "@/app/data/orders";

export async function createSampleOrder(): Promise<OrderDTO> {
	// create a lightweight test category
	const category = await prisma.category.create({
		data: {
			name: "Test Category",
			slug: `test-cat-${Date.now()}`,
			gridDisplay: "small",
		},
	});

	// create a test product
	const product = await prisma.product.create({
		data: {
			name: "Test GPU — Sample",
			brand: "TestBrand",
			description: "Sample product used for automated testing",
			price: "499.99",
			originalPrice: null,
			images: ["https://placehold.co/600x400"],
			slug: `test-gpu-${Date.now()}`,
			sku: `TEST-SKU-${Date.now()}`,
			categoryId: category.id,
			stock: 10,
			isActive: true,
		},
	});

	// create an order with one item
	const orderNumber = `TS-TEST-${Date.now()}`;
	await prisma.order.create({
		data: {
			orderNumber,
			firstName: "Jane",
			lastName: "Doe",
			email: "jane@example.com",
			address: "123 Test St",
			city: "Testville",
			country: "Testland",
			total: (Number("499.99") * 2 + Number("10.00")).toFixed(2),
			shippingCost: "10.00",
			status: "PAID",
			carrier: "Global Express",
			items: {
				create: [
					{
						productId: product.id,
						quantity: 2,
						priceAt_time: "499.99",
					},
				],
			},
		},
	});

	// return the mapped DTO using existing fetcher
	const dto = await getOrderDetails(orderNumber);
	if (!dto) throw new Error("Failed to create sample order");
	return dto;
}
