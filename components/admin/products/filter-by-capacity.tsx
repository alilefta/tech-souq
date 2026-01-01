// components/admin/products/filter-by-capacity.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Layers } from "lucide-react";

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
		<div className="relative flex items-center w-full h-full bg-[#0A0E14] border border-white/10 px-3 group hover:border-[#FFB400]/40 transition-all">
			<Layers size={12} className="text-[#94A3B8] mr-2" />
			<select
				title="Stream_Capacity"
				value={searchParams.get("take") || "8"}
				onChange={(e) => handleCapacityChange(e.target.value)}
				className="w-full bg-[#0A0E14]  border-white/10 px-4 text-[10px] font-mono uppercase text-[#94A3B8] outline-none hover:border-white/20 transition-all cursor-pointer appearance-none"
			>
				{[4, 8, 16, 32].map((num) => (
					<option key={num} value={num}>
						Buffer: {num}_Units
					</option>
				))}
			</select>
			{/* Custom arrow detail */}
			<div className="absolute right-3 pointer-events-none text-[8px] opacity-20 group-hover:opacity-100 transition-opacity">▼</div>
		</div>
	);
}
