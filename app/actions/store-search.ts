"use server";

import { prisma } from "@/prisma/prisma";

export async function searchStorefront(query: string) {
	if (query.length < 2) return { success: true, results: [] };

	try {
		const [products, categories] = await Promise.all([
			prisma.product.findMany({
				where: {
					isActive: true, // PUBLIC ONLY
					OR: [{ name: { contains: query, mode: "insensitive" } }, { brand: { contains: query, mode: "insensitive" } }, { description: { contains: query, mode: "insensitive" } }],
				},
				take: 5,
				select: {
					id: true,
					name: true,
					slug: true,
					price: true,
					images: true, // Need this for the thumbnail
					brand: true,
					category: { select: { name: true } },
				},
			}),
			prisma.category.findMany({
				where: { name: { contains: query, mode: "insensitive" } },
				take: 3,
				select: { id: true, name: true, slug: true },
			}),
		]);

		return {
			success: true,
			data: { products, categories },
		};
	} catch (error) {
		return { success: false, error: "SIGNAL_LOSS" };
	}
}
