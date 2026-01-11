"use client";

import { CompatibilitySchemaType } from "@/lib/schemas/product";
import { cn } from "@/lib/utils";

export function LogicValue({ value }: { value: CompatibilitySchemaType }) {
	// 1. HANDLE ARRAYS (e.g., Radiator Sizes, M.2 Slots)
	if (Array.isArray(value)) {
		return (
			<div className="flex flex-col gap-1 mt-1">
				{value.map((item, i) => (
					<div key={i} className="flex items-center gap-2 text-[8px]">
						<span className="text-[#FFB400] opacity-50 font-mono">[{i + 1}]</span>
						<LogicValue value={item} />
					</div>
				))}
			</div>
		);
	}

	// 2. HANDLE OBJECTS (e.g., Nested Slot Data: { interface: "PCIE_4", size: "2280" })
	if (typeof value === "object" && value !== null) {
		return (
			<div className="grid grid-cols-1 gap-x-2 gap-y-0.5 ml-2 border-l border-white/10 pl-2">
				{Object.entries(value).map(([subKey, subVal]) => (
					<div key={subKey} className="flex gap-1">
						<span className="text-[#94A3B8] opacity-70 uppercase tracking-wider text-[8px]">{subKey}:</span>
						<span className="text-[#F5F5F0] text-[8px] font-bold">
							<LogicValue value={subVal} />
						</span>
					</div>
				))}
			</div>
		);
	}

	// 3. HANDLE BOOLEANS
	if (typeof value === "boolean") {
		return <span className={cn("text-[9px] font-bold", value ? "text-green-500" : "text-red-500")}>{value ? "TRUE" : "FALSE"}</span>;
	}

	// 4. HANDLE PRIMITIVES (Strings/Numbers)
	return <span className="text-[#F5F5F0]">{String(value)}</span>;
}
