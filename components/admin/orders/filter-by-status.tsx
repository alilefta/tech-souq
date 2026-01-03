"use client";

import { FoundrySelect } from "@/components/ui/inputs/foundry-select";
// import { OrderStatus } from "@/generated/prisma/enums";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterByStatus() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleStatusChange = (slug: string) => {
		const params = new URLSearchParams(searchParams);
		if (slug === "ALL") params.delete("status");
		else params.set("status", slug);
		params.set("page", "1");
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<FoundrySelect
			onValueChange={(value) => handleStatusChange(value)}
			placeholder="Status: ALL"
			className="bg-[#0A0E14] w-full"
			value={searchParams.get("status") || "ALL"}
			options={[
				{
					label: "Status: ALL_PACKETS",
					value: "ALL",
				},
				{ label: "Pending_Clearance", value: "PENDING" },
				{ label: "Capital_Verified", value: "PAID" },
				{ label: "In_Transit", value: "SHIPPED" },
				{ label: "Delivered", value: "DELIVERED" },
				{ label: "Cancelled", value: "CANCELLED" },
			]}
		/>
	);
}
