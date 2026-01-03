"use client";

import { Search, Database } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";

export function DispatchSearch() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const [query, setQuery] = useState(searchParams.get("query") || "");
	const debouncedQuery = useDebounce({ value: query });

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (debouncedQuery) params.set("query", debouncedQuery);
		else params.delete("query");
		params.set("page", "1");
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	}, [debouncedQuery]);

	return (
		<div className="relative flex-1 group">
			<Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] opacity-30 group-focus-within:text-[#FFB400] group-focus-within:opacity-100 transition-all" />
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="QUERY_MANIFEST_ID_OR_CLIENT..."
				className="w-full bg-transparent border-none text-[10px] font-mono uppercase tracking-widest outline-none h-14 pl-12 pr-4 text-[#F5F5F0] placeholder:text-white/5"
			/>
			<div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
				<Database size={14} />
			</div>
		</div>
	);
}
