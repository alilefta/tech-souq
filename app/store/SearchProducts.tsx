"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchProducts() {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce({ value: query });
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());
		if (debouncedQuery === "") {
			params.delete("query");
		} else {
			params.set("query", debouncedQuery);
		}
		router.push(pathname + "?" + params.toString(), {
			scroll: false,
		});
	}, [debouncedQuery]);
	return (
		<div className="w-full">
			<Label className="sr-only" htmlFor="products-search">
				Products Search
			</Label>
			<div className="relative group font-sans w-full">
				<Search className="absolute inset-0 left-2 bottom-0 z-10 top-0 my-auto group-focus-within:text-blue-600/70 text-foreground/40" size={16} />
				<Input id="products-search" placeholder="Search Products" className="py-5 pl-8" value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
			</div>
		</div>
	);
}
