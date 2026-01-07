// components/builder/telemetry-readout.tsx
"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { resolveCompatibility } from "@/lib/builder/resolver";

export function TelemetryReadout() {
	const manifest = useBuilderStore((state) => state.manifest);

	// DERIVED DATA: Calculated on every render of this component
	const alerts = resolveCompatibility(manifest);
	const totalPrice = Object.values(manifest).reduce((acc, item) => acc + (item?.price || 0), 0);

	return (
		<div className="space-y-4">
			{/* PRICE HUB */}
			<div className="bg-[#FFB400] p-4 text-[#0A0E14]">
				<p className="text-[8px] font-black uppercase">Current_Allocation</p>
				<p className="text-2xl font-black">${totalPrice.toLocaleString()}</p>
			</div>

			{/* ALERTS TERMINAL */}
			<div className="space-y-2">
				{alerts.map((alert) => (
					<div key={alert.code} className="p-3 border border-white/5 bg-white/2">
						<p className={`text-[9px] font-black uppercase ${alert.severity === "CRITICAL" ? "text-red-500" : "text-[#FFB400]"}`}>{alert.code}</p>
						<p className="text-[10px] text-[#94A3B8] leading-tight mt-1">{alert.message}</p>
					</div>
				))}
			</div>
		</div>
	);
}
