// components/admin/products/filter-by-sector.tsx
"use client";

import { CategoryFlatDTO } from "@/app/data/category";
import { FoundrySelect } from "@/components/ui/inputs/foundry-select";
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
		<FoundrySelect
			onValueChange={(value) => handleSectorChange(value)}
			placeholder="Filter by Allocation"
			className="bg-[#0A0E14] w-full"
			value={searchParams.get("category") || "ALL"}
			options={[
				{
					label: "Sector: ALL_REGIONS",
					value: "ALL",
				},
				...categories.map((cat) => ({
					label: cat.name,
					value: cat.slug,
				})),
			]}
		/>
	);
}
