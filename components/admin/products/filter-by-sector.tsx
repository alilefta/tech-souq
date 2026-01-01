// components/admin/products/filter-by-sector.tsx
"use client";

import { CategoryFlatDTO } from "@/app/data/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterBySector({ categories }: { categories: CategoryFlatDTO[] }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSectorChange = (slug: string) => {
		const params = new URLSearchParams(searchParams);
		if (slug === "ALL") params.delete("category");
		else params.set("category", slug);
		params.set("page", "1");
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<select
			title="Sector_Allocation"
			value={searchParams.get("category") || "ALL"}
			onChange={(e) => handleSectorChange(e.target.value)}
			className="w-full bg-[#0A0E14] border border-white/10 h-12 px-4 text-[10px] font-mono uppercase text-[#FFB400] outline-none hover:border-[#FFB400]/40 transition-all cursor-pointer appearance-none"
		>
			<option value="ALL">Sector: ALL_REGIONS</option>
			{categories.map((cat) => (
				<option key={cat.id} value={cat.slug}>
					{cat.name}
				</option>
			))}
		</select>
	);
}
