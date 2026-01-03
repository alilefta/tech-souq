// components/admin/products/filter-by-capacity.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FoundrySelect } from "@/components/ui/inputs/foundry-select";

export function FilterByCapacity() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleCapacityChange = (val: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("take", val);
		params.set("page", "1"); // Reset pagination on buffer change
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<FoundrySelect
			onValueChange={(value) => handleCapacityChange(value)}
			placeholder="Stream_Capacity"
			className="bg-[#0A0E14] w-full"
			value={searchParams.get("take") || "8"}
			options={[
				...[4, 8, 16, 32].map((num) => ({
					label: `Buffer: ${num}_Units`,
					value: String(num),
				})),
			]}
		/>
	);
}
