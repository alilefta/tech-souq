export enum ProductSort {
	SORT_BY_POPULARITY = "sort_by_popularity",
	SORT_BY_RATING = "sort_by_rating",
	SORT_BY_MOST_RECENT = "sort_by_most_recent",
	PRICE_LOW_TO_HIGH = "price_low_to_high",
	PRICE_HIGH_TO_LOW = "price_high_to_low",
	DEFAULT = "none",
}

export type ProductSortOption = {
	label: string;
	value: ProductSort;
};

export const productSortOptions: ProductSortOption[] = [
	{ label: "Sort by Popularity", value: ProductSort.SORT_BY_POPULARITY },
	{ label: "Sort by Rating", value: ProductSort.SORT_BY_RATING },
	{ label: "Recently Added", value: ProductSort.SORT_BY_MOST_RECENT },
	{ label: "Price: low to high", value: ProductSort.PRICE_LOW_TO_HIGH },
	{ label: "Price: High to low", value: ProductSort.PRICE_HIGH_TO_LOW },
	{ label: "Default", value: ProductSort.DEFAULT },
];
