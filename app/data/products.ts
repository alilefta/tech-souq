// for fetching operations
import { Category, Product } from "@/generated/prisma/browser";
import { ProductOrderByWithAggregationInput, ProductWhereInput } from "@/generated/prisma/models";
import { prisma } from "@/prisma/prisma";

const DEV_RATING = 4.5;
const DEV_REVIEWS = 312;
const ITEMS_PER_PAGE = 12;

export type ProductSpecs = {
	id: number;
	label: string;
	value: string;
};

export type ProductCategory = {
	id: number;
	name: string;
	slug: string;
};
export interface ProductCardDTO {
	id: number;
	name: string;
	price: number;
	originalPrice?: number;
	images: string[];
	slug: string;
	category: ProductCategory;
	rating: number;
	reviews: number;
	coverImage: string | null;
	specs: ProductSpecs[];
	sku?: string;
}

export interface ProductDetailsDTO {
	id: number;
	name: string;
	price: number;
	description: string;
	originalPrice: number | null;
	images: string[];
	slug: string;
	// rating: number;
	// reviews: number;
	coverImage: string | null;
	brand: string;
	sku: string;
	reviewCount: number;
	averageRating: number;
	specs: ProductSpecs[];
	isNew: boolean;
	isFeatured: boolean;
	category: ProductCategory;
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
					id: true,
					slug: true,
				},
			},
			specs: {
				select: {
					id: true,
					label: true,
					value: true,
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
	page = 1,
}: {
	category?: string | string[];
	searchQuery?: string;
	lowPrice?: number;
	highPrice?: number;
	sort?: string;
	page?: number;
}) {
	const skip = (page - 1) * ITEMS_PER_PAGE;

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

	// const products = await prisma.product.findMany({
	// 	where: {
	// 		AND: [categoryCondition ? { ...categoryCondition } : {}, lowPriceCondition ? { ...lowPriceCondition } : {}, highPriceCondition ? { ...highPriceCondition } : {}, query ? { ...query } : {}],
	// 	},
	// 	select: {
	// 		id: true,
	// 		name: true,
	// 		price: true,
	// 		images: true,
	// 		slug: true,
	// 		category: {
	// 			select: {
	// 				name: true,
	// 			},
	// 		},
	// 	},
	// 	orderBy,
	// });

	const [total, products] = await prisma.$transaction([
		prisma.product.count({
			where: {
				AND: [
					categoryCondition ? { ...categoryCondition } : {},
					lowPriceCondition ? { ...lowPriceCondition } : {},
					highPriceCondition ? { ...highPriceCondition } : {},
					query ? { ...query } : {},
				],
			},
		}),
		prisma.product.findMany({
			where: {
				AND: [
					categoryCondition ? { ...categoryCondition } : {},
					lowPriceCondition ? { ...lowPriceCondition } : {},
					highPriceCondition ? { ...highPriceCondition } : {},
					query ? { ...query } : {},
				],
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
						id: true,
						slug: true,
					},
				},
				specs: {
					select: {
						id: true,
						label: true,
						value: true,
					},
				},
			},
			orderBy,
			skip,
			take: ITEMS_PER_PAGE,
		}),
	]);

	const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

	return {
		data: products.map((p) => ProductToCardDTOMapper(p)),
		metadata: {
			hasNextPage: page < totalPages,
			hasPreviousPage: page > 1,
			totalPages,
			currentPage: page,
			totalItems: total,
		},
	};
}

export async function getFeaturedProducts(): Promise<ProductCardDTO[]> {
	const products = await prisma.product.findMany({
		where: {
			isActive: true,
			isFeatured: true,
		},
		take: 4,
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
					id: true,
					slug: true,
				},
			},
			specs: {
				select: {
					id: true,
					label: true,
					value: true,
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
					id: true,
					slug: true,
				},
			},
			specs: {
				select: {
					id: true,
					label: true,
					value: true,
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
					id: true,
					slug: true,
				},
			},
			specs: {
				select: {
					id: true,
					label: true,
					value: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return products.map((p) => ProductToCardDTOMapper(p));
}

export async function getProductBySlug(slug: string): Promise<ProductDetailsDTO | null> {
	const product = await prisma.product.findUnique({
		where: {
			slug: slug,
		},
		select: {
			id: true,
			name: true,
			price: true,
			images: true,
			slug: true,
			isActive: true,
			description: true,
			stock: true,
			specs: {
				select: {
					id: true,
					label: true,
					value: true,
				},
			},
			brand: true,
			reviewCount: true,
			sku: true,
			originalPrice: true,
			averageRating: true,
			isNew: true,
			isFeatured: true,
			category: {
				select: {
					name: true,
					id: true,
					slug: true,
				},
			},
			categoryId: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	if (!product) {
		return null;
	}

	return ProductToDetailsDTOMapper(product);
}

export async function getRelatedProducts(categoryId: number, currentProductId: number): Promise<ProductCardDTO[]> {
	const products = await prisma.product.findMany({
		where: {
			categoryId: categoryId,
			isActive: true,
			id: {
				not: currentProductId, // DO NOT show the current product
			},
		},
		take: 8, // The elite "sweet spot" for carousels
		orderBy: {
			createdAt: "desc", // Show newest related items first
		},
		select: {
			id: true,
			name: true,
			price: true,
			originalPrice: true,
			images: true,
			slug: true,
			category: {
				select: {
					name: true,
					id: true,
					slug: true,
				},
			},
			specs: true,
		},
	});

	return products.map((p) => ProductToCardDTOMapper(p));
}

// Helpers
export function ProductToCardDTOMapper(
	p: Partial<Product> & {
		category: ProductCategory;
		specs: ProductSpecs[];
	}
): ProductCardDTO {
	return {
		id: p.id!,
		name: p.name!,
		price: Number(p.price),
		originalPrice: p.originalPrice ? Number(p.originalPrice) : Number(p.price),
		slug: p.slug!,
		category: p.category,
		images: p.images!,
		rating: DEV_RATING,
		reviews: DEV_REVIEWS,
		coverImage: p.images && p.images.length > 0 ? p.images[0] : null,
		specs: p.specs,
		sku: p.sku,
	};
}

export function ProductToDetailsDTOMapper(
	p: Partial<Product> & {
		category: ProductCategory;
		specs: ProductSpecs[];
	}
): ProductDetailsDTO {
	return {
		id: p.id!,
		name: p.name ?? "",
		price: Number(p.price),
		originalPrice: p.originalPrice ? Number(p.originalPrice) : Number(p.price),
		slug: p.slug ?? "",
		images: p.images ?? [],
		description: p.description ?? "",
		coverImage: p.images && p.images.length > 0 ? p.images[0] : null,
		isFeatured: p.isFeatured ?? false,
		isNew: p.isNew ?? true,
		averageRating: p.averageRating!,
		brand: p.brand ?? "",
		reviewCount: p.reviewCount!,
		sku: p.sku ?? "",
		specs: p.specs,
		category: p.category,
	};
}
