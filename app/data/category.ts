import { prisma } from "@/prisma/prisma";
import { Category } from "@/generated/prisma/client";

export interface CategoryFilterDTO {
	id: number;
	name: string;
	slug: string;
}

export interface CategoryDetailsDTO {
	id: number;
	name: string;
	arabicName: string | null;
	slug: string;
	description: string | null;
	imageUrl: string | null;
	gridDisplay: string;
	createdAt: Date;
	updatedAt: Date;
	_count: {
		products: number;
	};
}

export async function getCategoriesForFilters(): Promise<CategoryFilterDTO[]> {
	const categories = await prisma.category.findMany({
		select: {
			id: true,
			name: true,
			slug: true,
		},
	});

	return categories.map((cat) => ({
		id: cat.id,
		name: cat.name,
		slug: cat.slug,
	}));
}

export async function getCategoriesWithCount(): Promise<CategoryDetailsDTO[]> {
	const categories = await prisma.category.findMany({
		select: {
			id: true,
			name: true,
			arabicName: true,
			description: true,
			gridDisplay: true,
			imageUrl: true,
			slug: true,
			_count: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return categories.map((c) => categoryToDetailsMapper(c));
}

export async function getCategoryBySlug(slug: string): Promise<CategoryDetailsDTO | null> {
	const category = await prisma.category.findUnique({
		where: {
			slug,
		},
		select: {
			id: true,
			name: true,
			arabicName: true,
			description: true,
			gridDisplay: true,
			imageUrl: true,
			slug: true,
			_count: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	if (!category) {
		return null;
	}

	return categoryToDetailsMapper(category);
}

export function categoryToDetailsMapper(
	c: Category & {
		_count: {
			products: number;
		};
	}
): CategoryDetailsDTO {
	return {
		id: c.id,
		name: c.name,
		arabicName: c.arabicName ?? "",
		description: c.description ?? "",
		gridDisplay: c.gridDisplay,
		imageUrl: c.imageUrl,
		slug: c.slug,
		_count: c._count,
		createdAt: c.createdAt,
		updatedAt: c.updatedAt,
	};
}
