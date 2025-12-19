// for fetching operations
import { Category, Product } from "@/generated/prisma/browser";
import { ProductOrderByRelationAggregateInput, ProductOrderByWithAggregationInput, ProductWhereInput } from "@/generated/prisma/models";
import { prisma } from "@/prisma/prisma";

const DEV_RATING = 4.5;
const DEV_REVIEWS = 312;

export interface ProductCardDTO {
	id: number;
	name: string;
	price: number;
	original_price: number;
	images: string[];
	slug: string;
	category_name: string;
	rating: number;
	reviews: number;
	cover_image: string | null;
}

export async function getAllProducts() {
	const products = await prisma.product.findMany({
		select: {
			id: true,
			name: true,
			price: true,
			images: true,
			slug: true,
			category: {
				select: {
					name: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return products.map((p) => ProductToCardDTOMapper(p));
}

export async function getFilteredProducts({
	category,
	searchQuery,
	lowPrice,
	highPrice,
	sort,
}: {
	category?: string | string[];
	searchQuery?: string;
	lowPrice?: number;
	highPrice?: number;
	sort?: string;
}) {
	console.log("Server params:", category, searchQuery, lowPrice, highPrice, sort);
	let categoryCondition: ProductWhereInput | null = null;
	if (category) {
		if (typeof category === "string") {
			categoryCondition = {
				OR: [
					{
						category: {
							name: {
								contains: category,
							},
						},
					},
					{
						category: {
							slug: {
								contains: category,
							},
						},
					},
				],
			};
		} else {
			categoryCondition = {
				OR: [
					{
						category: {
							name: {
								in: category,
							},
						},
					},
					{
						category: {
							slug: {
								in: category,
							},
						},
					},
				],
			};
		}
	}

	let lowPriceCondition: ProductWhereInput | null = null;
	if (lowPrice) {
		lowPriceCondition = {
			price: {
				gte: lowPrice,
			},
		};
	}

	let highPriceCondition: ProductWhereInput | null = null;
	if (highPrice) {
		highPriceCondition = {
			price: {
				lte: highPrice,
			},
		};
	}

	let query: ProductWhereInput | null = null;
	if (searchQuery) {
		query = {
			OR: [
				{
					name: {
						contains: searchQuery,
					},
				},
				{
					description: {
						contains: searchQuery,
					},
				},
			],
		};
	}

	let orderBy: ProductOrderByWithAggregationInput = { createdAt: "desc" }; // Default

	if (sort) {
		switch (sort) {
			case "price_low_to_high":
				orderBy = { price: "asc" };
				break;
			case "price_high_to_low":
				orderBy = { price: "desc" };
				break;
			case "sort_by_most_recent":
				orderBy = { createdAt: "desc" };
				break;
			// Add logic for rating/popularity later if you have that data
			default:
				orderBy = { createdAt: "desc" };
		}
	}

	const products = await prisma.product.findMany({
		where: {
			AND: [categoryCondition ? { ...categoryCondition } : {}, lowPriceCondition ? { ...lowPriceCondition } : {}, highPriceCondition ? { ...highPriceCondition } : {}, query ? { ...query } : {}],
		},
		select: {
			id: true,
			name: true,
			price: true,
			images: true,
			slug: true,
			category: {
				select: {
					name: true,
				},
			},
		},
		orderBy,
	});

	return products.map((p) => ProductToCardDTOMapper(p));
}

export async function getFeaturedProducts(): Promise<ProductCardDTO[]> {
	const products = await prisma.product.findMany({
		where: {
			isActive: true,
		},
		take: 8,
		orderBy: {
			createdAt: "desc",
		},
		select: {
			id: true,
			name: true,
			price: true,
			images: true,
			slug: true,
			category: {
				select: {
					name: true,
				},
			},
		},
	});

	return products.map((p) => ProductToCardDTOMapper(p));
}

export async function getLatestProducts(): Promise<ProductCardDTO[]> {
	const products = await prisma.product.findMany({
		where: {
			isActive: true,
		},
		take: 8,
		orderBy: {
			createdAt: "desc",
		},
		select: {
			id: true,
			name: true,
			price: true,
			images: true,
			slug: true,
			category: {
				select: {
					name: true,
				},
			},
		},
	});

	return products.map((p) => ProductToCardDTOMapper(p));
}

export async function getProductsByCategory(category: Category) {
	const products = await prisma.product.findMany({
		where: {
			category,
		},
		select: {
			id: true,
			name: true,
			price: true,
			images: true,
			slug: true,
			category: {
				select: {
					name: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return products.map((p) => ProductToCardDTOMapper(p));
}

function ProductToCardDTOMapper(
	p: Partial<Product> & {
		category: {
			name: string;
		};
	}
): ProductCardDTO {
	return {
		id: p.id!,
		name: p.name!,
		price: Number(p.price),
		original_price: Number(p.price) - 10,
		slug: p.slug!,
		category_name: p.category.name,
		images: p.images!,
		rating: DEV_RATING,
		reviews: DEV_REVIEWS,
		cover_image: p.images && p.images.length > 0 ? p.images[0] : null,
	};
}
