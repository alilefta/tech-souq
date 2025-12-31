// components/products/SortProducts.tsx
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductSort, productSortOptions } from "@/lib/data/products";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Terminal } from "lucide-react";

export function SortProducts() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const currentSort = searchParams.get("sort") || ProductSort.DEFAULT;

	const handleSortChange = (value: string) => {
		const params = new URLSearchParams(searchParams);
		if (value === ProductSort.DEFAULT) {
			params.delete("sort");
		} else {
			params.set("sort", value);
		}
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<Select value={currentSort} onValueChange={handleSortChange}>
			<SelectTrigger className="w-50 bg-white/2 border-white/10 rounded-none h-10 font-mono text-[10px] uppercase tracking-widest focus:ring-0 focus:border-[#FFB400]/40 group">
				<div className="flex items-center gap-2">
					<Terminal size={12} className="text-[#FFB400] opacity-40 group-hover:opacity-100 transition-opacity" />
					<SelectValue placeholder="Protocol_Select" />
				</div>
			</SelectTrigger>
			<SelectContent className="bg-[#0A0E14] border-white/10 rounded-none shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
				{productSortOptions.map((option) => (
					<SelectItem
						key={option.value}
						value={option.value}
						className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] focus:bg-[#FFB400] focus:text-[#0A0E14] cursor-pointer rounded-none py-3"
					>
						{option.label.replace(/ /g, "_")}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
