import { cn } from "@/lib/utils";

export function PerformanceMetrics() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 shadow-2xl">
			<MetricTile label="Capital_Velocity" val="$12,402.00" trend="+4.2%" sub="Last_24H_Flow" />
			<MetricTile label="Conversion_Logic" val="3.84%" trend="+0.2%" sub="Initialization_Rate" />
			<MetricTile label="Payload_Loss" val="12 Units" trend="-5.1%" sub="Cart_Abandonment" isWarning />
			<MetricTile label="Active_Vanguard" val="1,204" trend="+82" sub="Authorized_Architects" />
		</div>
	);
}

function MetricTile({ label, val, trend, sub, isWarning }: { label: string; val: string; isWarning?: boolean; sub: string; trend: string }) {
	return (
		<div className="bg-[#0A0E14] p-6 hover:bg-white/[0.02] transition-colors group">
			<p className="text-[8px] font-black uppercase text-[#94A3B8] tracking-[0.3em] mb-2">{label}</p>
			<div className="flex items-baseline justify-between mb-1">
				<p className={cn("text-3xl font-black tracking-tighter", isWarning ? "text-red-500" : "text-[#F5F5F0]")}>{val}</p>
				<span className="text-[10px] font-mono text-green-500">{trend}</span>
			</div>
			<p className="text-[7px] font-mono text-[#94A3B8] opacity-30 uppercase">{sub}</p>
		</div>
	);
}
