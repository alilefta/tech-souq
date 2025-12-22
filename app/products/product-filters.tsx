// components/products/product-filters.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryFilterDTO } from "../data/category";

export function ProductFilters({ rawCategories }: { rawCategories: CategoryFilterDTO[] }) {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const [priceRange, setPriceRange] = useState([Number(searchParams.get("low_price")) || 0, Number(searchParams.get("high_price")) || 5000]);

	const [categories, setCategories] = useState(
		rawCategories.map((cat) => ({
			...cat,
			selected: searchParams.getAll("category").includes(cat.slug),
		}))
	);

	const applyFilters = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString());

		// Handle Categories
		params.delete("category");
		categories.filter((c) => c.selected).forEach((c) => params.append("category", c.slug));

		// Handle Price
		if (priceRange[0] > 0) params.set("low_price", priceRange[0].toString());
		else params.delete("low_price");

		if (priceRange[1] < 5000) params.set("high_price", priceRange[1].toString());
		else params.delete("high_price");

		// Reset to page 1 on filter change
		params.set("page", "1");

		router.push(pathname + "?" + params.toString(), { scroll: false });
	}, [categories, priceRange, pathname, router, searchParams]);

	// Auto-apply when categories change
	useEffect(() => {
		applyFilters();
	}, [categories, priceRange]);

	return (
		<div className="flex flex-col gap-10">
			{/* CATEGORY BLOCK */}
			<div className="space-y-6">
				<div className="flex justify-between items-center border-b border-white/5 pb-2">
					<h6 className="text-[10px] font-black uppercase text-[#94A3B8] tracking-widest">Section_Module</h6>
					<span className="text-[8px] font-mono text-[#FFB400]/40">01</span>
				</div>
				<div className="flex flex-col gap-4">
					{categories.map((category) => (
						<div key={category.id} className="flex items-center gap-3 group cursor-pointer">
							<Checkbox
								id={`cat-${category.id}`}
								checked={category.selected}
								className="border-[#FFB400]/20 data-[state=checked]:bg-[#FFB400] data-[state=checked]:text-[#0A0E14] rounded-none"
								onCheckedChange={(checked) => {
									setCategories((prev) => prev.map((c) => (c.id === category.id ? { ...c, selected: checked === true } : c)));
								}}
							/>
							<Label htmlFor={`cat-${category.id}`} className="text-xs font-bold text-[#94A3B8] uppercase tracking-tighter cursor-pointer group-hover:text-[#F5F5F0] transition-colors">
								{category.name}
							</Label>
						</div>
					))}
				</div>
			</div>

			{/* PRICE BLOCK */}
			<div className="space-y-6">
				<div className="flex justify-between items-center border-b border-white/5 pb-2">
					<h6 className="text-[10px] font-black uppercase text-[#94A3B8] tracking-widest">Price_Threshold</h6>
					<span className="text-[8px] font-mono text-[#FFB400]/40">02</span>
				</div>
				<div className="px-2">
					<Slider
						max={5000}
						min={0}
						step={100}
						onValueCommit={(val) => setPriceRange(val)}
						onValueChange={setPriceRange}
						value={priceRange}
						className="[&_[role=slider]]:bg-[#FFB400] [&_[role=slider]]:border-none [&_[role=slider]]:rounded-none"
					/>
					<div className="flex items-center justify-between mt-4 font-mono text-[10px] text-[#F5F5F0]">
						<div className="flex flex-col">
							<span className="text-[#94A3B8] text-[8px] uppercase mb-1">Min</span>
							<span className="text-[#FFB400]">${priceRange[0]}</span>
						</div>
						<div className="flex flex-col items-end">
							<span className="text-[#94A3B8] text-[8px] uppercase mb-1">Max</span>
							<span className="text-[#FFB400]">${priceRange[1]}</span>
						</div>
					</div>
				</div>
			</div>

			<button onClick={() => router.push(pathname)} className="text-[9px] font-black text-[#94A3B8] uppercase tracking-widest hover:text-[#FFB400] transition-colors text-left">
				[ Reset_All_Filters ]
			</button>
		</div>
	);
}
