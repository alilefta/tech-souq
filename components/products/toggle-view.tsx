"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

export function ToggleView() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const currentView = searchParams.get("view") || "grid";
	// const [view, setView] = useState(currentView);

	const handleChangeView = (value: string) => {
		const params = new URLSearchParams(searchParams);
		if (value === "grid") {
			params.delete("view");
		} else if (value === "list") {
			params.set("view", value);
		} else {
			params.set("view", value);
		}
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		// TODO: View Toggle (Purely Visual for now)
		<div className="hidden md:flex items-center gap-2 border-r border-white/10 pr-6">
			<button
				title="grid view"
				className={clsx("p-3  text-[#94A3B8] hover:text-[#F5F5F0] bg-white/5 rounded-sm transition-colors", {
					"bg-gray-500/20 text-[#FFB400]": currentView === "grid",
				})}
				onClick={() => handleChangeView("grid")}
			>
				<LayoutGrid size={18} />
			</button>
			<button
				title="list view"
				className={clsx("p-3 text-[#94A3B8] hover:text-[#F5F5F0] transition-colors bg-white/5 rounded-sm", {
					"bg-gray-500/20 text-[#FFB400]": currentView === "list",
				})}
				onClick={() => handleChangeView("list")}
			>
				<List size={18} />
			</button>
		</div>
	);
}
