"use client";

import { FoundrySelect } from "@/components/ui/inputs/foundry-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterReviews() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleIntegrityChange = (status: string) => {
		const params = new URLSearchParams(searchParams);
		if (status === "ALL") params.delete("integrity");
		else params.set("integrity", status);
		params.set("page", "1");
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<FoundrySelect
			onValueChange={(value) => handleIntegrityChange(value)}
			className="bg-[#0A0E14] w-full"
			options={[
				{
					value: "ALL",
					label: "Integrity: ALL_SCORES",
				},
				{
					value: "CRITICAL",
					label: "Integrity: CRITICAL_ONLY",
				},
			]}
			placeholder="Filter_Reviews"
			value={searchParams.get("integrity") || "ALL"}
			containerClassName="w-full"
		/>
	);
}
