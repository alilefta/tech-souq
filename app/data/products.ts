// for fetching operations
import { Category, Product } from "@/generated/prisma/browser";
import { ProductOrderByWithAggregationInput, ProductWhereInput } from "@/generated/prisma/models";
import { CompatibilitySchemaType } from "@/lib/schemas/product";
import { prisma } from "@/prisma/prisma";

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
	originalPrice: number | null;
	images: string[];
	slug: string;
	category: ProductCategory;
	rating?: number;
	reviews?: number;
	coverImage: string | null;
	specs: ProductSpecs[];
	sku?: string;
	stock?: number;
	brand: string;
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
	isActive: boolean;
	category: ProductCategory;
	stock?: number;
	createdAt: Date;
	updatedAt: Date;
	compatibility?: CompatibilitySchemaType | null;
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
	allocation,
	page = 1,
	take = 8,
}: {
	category?: string | string[];
	searchQuery?: string;
	lowPrice?: number;
	highPrice?: number;
	sort?: string;
	allocation?: string; // "CRITICAL" | "OUT_OF_STOCK" | "DE_SYNCED" | "ALL"
	page?: number;
	take?: number;
}) {
	const skip = (page - 1) * take;

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

	let allocationCondition: ProductWhereInput | null = null;
	if (allocation && allocation !== "ALL") {
		switch (allocation) {
			case "CRITICAL":
				allocationCondition = { stock: { gt: 0, lt: 10 } };
				break;
			case "OUT_OF_STOCK":
				allocationCondition = { stock: 0 };
				break;
			case "DE_SYNCED":
				allocationCondition = { isActive: false };
				break;
		}
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

	const where: ProductWhereInput = {
		AND: [categoryCondition || {}, lowPriceCondition || {}, highPriceCondition || {}, query || {}, allocationCondition || {}],
	};

	const [total, products] = await prisma.$transaction([
		prisma.product.count({
			where: where,
		}),
		prisma.product.findMany({
			where: where,
			select: {
				id: true,
				name: true,
				price: true,
				images: true,
				slug: true,
				stock: true, // Crucial for admin
				brand: true,
				sku: true,
				isActive: true,
				category: { select: { name: true, id: true, slug: true } },
				specs: { select: { id: true, label: true, value: true } },
			},
			orderBy,
			skip,
			take: take,
		}),
	]);

	const totalPages = Math.ceil(total / take);

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
		include: {
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

export async function getProductById(productId: number): Promise<ProductDetailsDTO | null> {
	try {
		const product = await prisma.product.findUnique({
			where: {
				id: productId,
			},
			include: {
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

		if (!product) return null;

		return ProductToDetailsDTOMapper(product);
	} catch (error) {
		throw new Error("Failed to retrieve product data");
	}
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
		originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
		slug: p.slug!,
		category: p.category,
		images: p.images!,
		rating: p.averageRating,
		reviews: p.reviewCount,
		coverImage: p.images && p.images.length > 0 ? p.images[0] : null,
		specs: p.specs,
		sku: p.sku,
		stock: p.stock,
		brand: p.brand ?? "Base_60",
	};
}

export function ProductToDetailsDTOMapper(
	p: Product & {
		category: ProductCategory;
		specs: ProductSpecs[];
	}
): ProductDetailsDTO {
	return {
		...p,
		price: Number(p.price),
		originalPrice: p.originalPrice ? Number(p.originalPrice) : Number(p.price),
		coverImage: p.images && p.images.length > 0 ? p.images[0] : null,
		compatibility: p.compatibility as unknown as CompatibilitySchemaType | null,
	};
}
