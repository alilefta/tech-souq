"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCallback, useEffect, useState } from "react";
import { CategoryFilterDTO } from "../data/category";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sanitizeNumber } from "@/lib/utils";

type CategorySelection = CategoryFilterDTO & { selected: boolean };
export function ProductFilters({ rawCategories }: { rawCategories: CategoryFilterDTO[] }) {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const urlParams = new URLSearchParams(searchParams.toString());

	const [priceRange, setPriceRange] = useState([Number(urlParams.get("low_price")) || 0, Number(urlParams.get("high_price")) || 5000]);
	const [categories, setCategories] = useState<CategorySelection[]>([
		...rawCategories.map((cat) => ({
			...cat,
			selected: searchParams.getAll("category").includes(cat.slug),
		})),
	]);

	const applyCategories = useCallback(
		(selectedCategories: CategorySelection[]) => {
			const selected = selectedCategories.filter((p) => p.selected);

			const params = new URLSearchParams(searchParams.toString());
			params.delete("category");
			for (const cat of selected) {
				params.append("category", cat.slug);
			}

			router.push(pathname + "?" + params.toString(), {
				scroll: false,
			});
		},
		[searchParams, router, pathname]
	);

	const applyPriceRange = useCallback(
		(priceRange: number[]) => {
			const isLowSelected = priceRange[0] > 0;
			const isHighSelected = priceRange[1] < 5000;
			const params = new URLSearchParams(searchParams.toString());

			if (!isLowSelected) {
				params.delete("low_price");
			} else {
				const isValid = sanitizeNumber(priceRange[0]);
				if (isValid) {
					params.set("low_price", priceRange[0].toString());
				} else {
					params.delete("low_price");
				}
			}

			if (!isHighSelected) {
				params.delete("high_price");
			} else {
				const isValid = sanitizeNumber(priceRange[1]);
				if (isValid) {
					params.set("high_price", priceRange[1].toString());
				} else {
					params.delete("low_price");
				}
			}

			router.push(pathname + "?" + params.toString(), {
				scroll: false,
			});
		},
		[searchParams, router, pathname]
	);

	useEffect(() => {
		applyCategories(categories);
	}, [categories]);

	return (
		<div className="flex flex-col gap-6">
			<div></div>
			<div>
				<h6 className="mb-4 text-sm font-semibold">Category</h6>
				<div className="flex flex-col gap-4">
					{categories.map((category) => (
						<div key={category.id} className="flex items-center gap-3">
							<Checkbox
								id={`cat-${category.id}`}
								onCheckedChange={(checked) => {
									if (checked === "indeterminate") return;
									setCategories((prev) => [...prev.map((cat) => (cat.id === category.id ? { ...cat, selected: checked } : cat))]);
								}}
							/>
							<Label htmlFor={`cat-${category.id}`}>{category.name}</Label>
						</div>
					))}
				</div>
			</div>
			<Separator />
			<div className="flex w-full max-w-md flex-col gap-2">
				<Label htmlFor="slider" className="mb-2">
					Price Range
				</Label>
				<Slider id="slider" max={5000} min={0} step={100} onValueCommit={(val) => applyPriceRange(val)} onValueChange={setPriceRange} value={priceRange} />
				<div className="flex items-center justify-between text-muted-foreground text-sm">
					<span>${priceRange[0]}</span>
					<span>${priceRange[1]}</span>
				</div>
			</div>
		</div>
	);
}
