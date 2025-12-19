"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductSort, ProductSortOption, productSortOptions } from "@/lib/data/products";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SortProducts() {
	const [selectedSort, setSelectedSort] = useState<ProductSortOption>(productSortOptions[0]);
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());
		if (selectedSort.value === ProductSort.DEFAULT) {
			params.delete("sort");
		} else {
			params.set("sort", selectedSort.value.toString());
		}

		router.push(pathname + "?" + params.toString(), { scroll: false });
	}, [selectedSort]);

	return (
		<Select
			onValueChange={(value) => {
				if (value !== "") {
					const option = productSortOptions.find((op) => op.value.toString() === value);
					if (option) setSelectedSort(option);
				}
			}}
		>
			<SelectTrigger className="w-45">
				<SelectValue placeholder="Sort by" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{productSortOptions.map((option) => (
						<SelectItem key={option.value} value={option.value.toString()}>
							{option.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
