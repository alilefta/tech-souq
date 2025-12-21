import { prisma } from "@/prisma/prisma";
import { ProductToCardDTOMapper } from "./products";

export interface CategoryFilterDTO {
	id: number;
	name: string;
	slug: string;
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
