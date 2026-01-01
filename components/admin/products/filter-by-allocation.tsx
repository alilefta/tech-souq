// components/admin/products/filter-by-allocation.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterByAllocation() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleStatusChange = (status: string) => {
		const params = new URLSearchParams(searchParams);
		if (status === "ALL") params.delete("allocation");
		else params.set("allocation", status);
		params.set("page", "1");
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<select
			title="Allocation_Status"
			value={searchParams.get("allocation") || "ALL"}
			onChange={(e) => handleStatusChange(e.target.value)}
			className="w-full bg-[#0A0E14] border border-white/10 h-12 px-4 text-[10px] font-mono uppercase text-[#94A3B8] outline-none hover:border-white/20 transition-all cursor-pointer appearance-none"
		>
			<option value="ALL">Allocation: ALL_STATES</option>
			<option value="CRITICAL">Critical_Stock (&lt;10)</option>
			<option value="OUT_OF_STOCK">Depleted (0)</option>
			<option value="DE_SYNCED">De-Synced (Hidden)</option>
		</select>
	);
}
