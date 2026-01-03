"use client";

import { FoundrySelect } from "@/components/ui/inputs/foundry-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterByRank() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleRankChange = (slug: string) => {
		const params = new URLSearchParams(searchParams);
		if (slug === "ALL") params.delete("rank");
		else params.set("rank", slug);
		params.set("page", "1");
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<FoundrySelect
			onValueChange={(value) => handleRankChange(value)}
			placeholder="Filter_By_Rank"
			className="bg-[#0A0E14] w-full"
			value={searchParams.get("rank") || "ALL"}
			containerClassName="w-full"
			options={[
				{
					label: "Rank: ALL_LEVELS",
					value: "ALL",
				},
				{ label: "Rank: MASTER_ARCHITECT", value: "ARCHITECT" },
				{ label: "Rank: ELITE_BUILDER", value: "BUILDER" },
			]}
		/>
	);
}
