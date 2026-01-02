// app/(admin)/admin/analytics/page.tsx
import { CapitalFlowChart } from "@/components/admin/analytics/capital-flow-chart";
import { SectorAllocationChart } from "@/components/admin/analytics/sector-allocation-chart";
import { Terminal, Activity, TrendingUp, Zap } from "lucide-react";

export default function AnalyticsHub() {
	return (
		<div className="space-y-10 max-w-400 mx-auto">
			{/* 1. TELEMETRY HEADER */}
			<header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
				<div>
					<div className="flex items-center gap-3 mb-4">
						<Activity size={14} className="text-[#FFB400] animate-pulse" />
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.5em]">System_Telemetry: Active</span>
					</div>
					<h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-[#F5F5F0]">
						Analytics <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Core</span>
					</h1>
				</div>
				<div className="flex items-center gap-4 text-[#94A3B8] text-[10px] font-mono border border-white/5 px-4 py-2 bg-white/1">LOG_STATUS: SYNCED // DATA_STREAMS: 04</div>
			</header>

			{/* 2. THE MAIN CHARTS GRID */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* CAPITAL FLOW (Large Area Chart) */}
				<div className="lg:col-span-8 space-y-6">
					<div className="flex items-center justify-between">
						<h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#F5F5F0]">Capital_Flow_Telemetry</h3>
						<span className="text-[9px] font-mono text-[#94A3B8] opacity-40">Period: Last_30_Cycles</span>
					</div>
					<CapitalFlowChart />
				</div>

				{/* SECTOR ALLOCATION (Bar Chart) */}
				<div className="lg:col-span-4 space-y-6">
					<div className="flex items-center justify-between">
						<h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#F5F5F0]">Sector_Volume</h3>
						<Zap size={14} className="text-[#FFB400]" />
					</div>
					<SectorAllocationChart />
				</div>
			</div>

			{/* 3. PERFORMANCE LOGS GRID */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<MetricCard label="Average_Unit_Value" val="$2,499.12" trend="+0.4%" />
				<MetricCard label="Logistics_Efficiency" val="94.2%" trend="+2.1%" />
				<MetricCard label="Registry_Growth" val="+12 Modules" trend="Optimal" />
			</div>
		</div>
	);
}

function MetricCard({ label, val, trend }: { label: string; val: string; trend: string }) {
	return (
		<div className="bg-white/2 border border-white/5 p-6 hover:border-[#FFB400]/20 transition-all group">
			<p className="text-[8px] font-black uppercase text-[#94A3B8] tracking-widest mb-2">{label}</p>
			<div className="flex items-end justify-between">
				<p className="text-3xl font-black text-[#F5F5F0] tracking-tighter">{val}</p>
				<span className="text-[10px] font-mono text-green-500 mb-1">{trend}</span>
			</div>
		</div>
	);
}
