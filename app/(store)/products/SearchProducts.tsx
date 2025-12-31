// components/products/SearchProducts.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/useDebounce";
import { Search, Database, Activity } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function SearchProducts() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	// 1. INITIALIZE STATE DIRECTLY FROM URL
	// This ensures the first render already has the correct value.
	const urlQuery = searchParams.get("query") || "";
	const [query, setQuery] = useState(urlQuery);

	// 2. RENDER-PHASE SYNC (Handles Back/Forward navigation)
	// If the URL changes (e.g. user clicks "Back"), we update the input
	// state immediately during the render, avoiding the useEffect error.
	const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
	if (urlQuery !== prevUrlQuery) {
		setQuery(urlQuery);
		setPrevUrlQuery(urlQuery);
	}

	const debouncedQuery = useDebounce({ value: query });

	// 3. PUSH STATE TO URL
	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());

		// Only update if the debounced query is actually different from the URL
		if (debouncedQuery === (searchParams.get("query") || "")) return;

		if (debouncedQuery === "") {
			params.delete("query");
		} else {
			params.set("query", debouncedQuery);
		}

		params.set("page", "1"); // Always reset to page 1 on search

		router.push(pathname + "?" + params.toString(), {
			scroll: false,
		});
	}, [debouncedQuery]);

	return (
		<div className="w-full group">
			<Label className="sr-only" htmlFor="products-search">
				Inventory Registry Lookup
			</Label>

			<div className="relative font-mono">
				{/* HUD OVERLAYS */}
				<div className="absolute -top-3 left-4 px-2 bg-[#0A0E14] z-20">
					<span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#94A3B8] flex items-center gap-2">
						<Database size={10} className="text-[#FFB400]" />
						Registry_Query_Input
					</span>
				</div>

				{/* INPUT FIELD */}
				<div className="relative flex items-center">
					<div className="absolute left-4 z-20 text-[#FFB400] opacity-40 group-focus-within:opacity-100 transition-opacity">
						<Search size={18} strokeWidth={2.5} />
					</div>

					<Input
						id="products-search"
						placeholder="ENTER_IDENTIFIER..."
						className="w-full bg-white/[0.02] border-white/10 rounded-none h-14 pl-12 pr-4 text-sm font-mono tracking-tight uppercase placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-[#FFB400]/40 transition-all text-[#F5F5F0]"
						value={query}
						onChange={(e) => setQuery(e.currentTarget.value)}
					/>

					{/* SCANLINE ANIMATION */}
					<AnimatePresence>
						{query && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute bottom-0 left-0 h-[1px] bg-[#FFB400] shadow-[0_0_10px_#FFB400]"
								style={{ width: "100%" }}
							>
								<motion.div
									animate={{ x: ["-100%", "100%"] }}
									transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
									className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
