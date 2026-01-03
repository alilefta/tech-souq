"use client";

import { FoundrySelect } from "@/components/ui/inputs/foundry-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface NodeDTO {
	name: string;
	slug: string;
}

export function FilterByNode() {
	const nodes: NodeDTO[] = [
		{
			name: "Babylon_Hub",
			slug: "Iraq",
		},
		{
			name: "London_Sync",
			slug: "United Kingdom",
		},
	];

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleNodeChange = (slug: string) => {
		const params = new URLSearchParams(searchParams);
		if (slug === "ALL") params.delete("node");
		else params.set("node", slug);
		params.set("page", "1");
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<FoundrySelect
			onValueChange={(value) => handleNodeChange(value)}
			placeholder="Sector: GLOBAL_ALL"
			className="bg-[#0A0E14] w-full"
			value={searchParams.get("node") || "ALL"}
			options={[
				{
					label: "Global_All",
					value: "ALL",
				},
				...nodes.map((node) => ({
					label: `Node: ${node.name}`,
					value: node.slug,
				})),
			]}
		/>
	);
}
