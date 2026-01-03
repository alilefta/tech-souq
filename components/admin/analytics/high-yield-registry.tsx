// components/admin/analytics/high-yield-registry.tsx
export function HighYieldRegistry() {
	const topModules = [
		{ name: "RTX 5090 FOUNDERS", flow: "$42,000", velocity: "HIGH" },
		{ name: "RYZEN 9 7950X3D", flow: "$28,500", velocity: "STABLE" },
		{ name: "ONYX_WORKSTATION", flow: "$19,200", velocity: "INCREASING" },
	];

	return (
		<div className="bg-white/[0.01] border border-white/5 p-6">
			<h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F5F5F0] mb-6 border-b border-white/5 pb-4">High-Yield_Modules</h3>
			<div className="space-y-4">
				{topModules.map((m, i) => (
					<div key={i} className="flex items-center justify-between group">
						<div className="flex flex-col">
							<span className="text-[11px] font-bold text-[#F5F5F0] uppercase tracking-tight">{m.name}</span>
							<span className="text-[8px] font-mono text-[#94A3B8] opacity-40">Velocity: {m.velocity}</span>
						</div>
						<div className="text-right">
							<p className="text-sm font-black text-[#FFB400] font-mono">{m.flow}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
