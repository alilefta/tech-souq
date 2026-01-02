"use server";

import { prisma } from "@/prisma/prisma";

export async function searchFoundryRegistry(query: string) {
	if (query.length < 2) return { success: true, results: [] };

	try {
		// Perform parallel queries for maximum speed
		const [products, orders, categories] = await Promise.all([
			prisma.product.findMany({
				where: { OR: [{ name: { contains: query, mode: "insensitive" } }, { sku: { contains: query, mode: "insensitive" } }] },
				take: 3,
				select: { id: true, name: true, sku: true, slug: true },
			}),
			prisma.order.findMany({
				where: { OR: [{ orderNumber: { contains: query, mode: "insensitive" } }, { email: { contains: query, mode: "insensitive" } }] },
				take: 3,
				select: { id: true, orderNumber: true, firstName: true, lastName: true },
			}),
			prisma.category.findMany({
				where: { name: { contains: query, mode: "insensitive" } },
				take: 2,
				select: { id: true, name: true, slug: true },
			}),
		]);

		// Map to a unified Result format
		const results = [
			...products.map((p) => ({ type: "MODULE", label: p.name, sub: p.sku, path: `/admin/products/${p.id}/edit` })),
			...orders.map((o) => ({ type: "DISPATCH", label: `#${o.orderNumber}`, sub: `${o.firstName} ${o.lastName}`, path: `/admin/orders` })),
			...categories.map((c) => ({ type: "SECTOR", label: c.name, sub: "Logistics_Sector", path: `/admin/categories/${c.id}/edit` })),
		];

		return { success: true, results };
	} catch (error) {
		return { success: false, error: "QUERY_INTERRUPT" };
	}
}
