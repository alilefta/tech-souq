// app/(admin)/admin/analytics/page.tsx
import { CapitalFlowChart } from "@/components/admin/analytics/capital-flow-chart";
import { SectorAllocationChart } from "@/components/admin/analytics/sector-allocation-chart";
import { UnitSaturationChart } from "@/components/admin/analytics/unit-saturation-chart";
import { DispatchVelocityChart } from "@/components/admin/analytics/dispatch-velocity-chart";
import { PerformanceMetrics } from "@/components/admin/analytics/performance-metrics";
import { LiveFoundryLogs } from "@/components/admin/analytics/live-foundry-logs";
import { HighYieldRegistry } from "@/components/admin/analytics/high-yield-registry";
import { Activity, Globe, Terminal, Cpu } from "lucide-react";
import { RandomBar } from "@/components/admin/analytics/random-bar";

export default function AnalyticsHub() {
	return (
		<div className="space-y-8 max-w-[1600px] mx-auto pb-20 selection:bg-[#FFB400] selection:text-[#0A0E14]">
			{/* 1. MASTER TELEMETRY HEADER */}
			<header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 border-b border-white/5 pb-10">
				<div>
					<div className="flex items-center gap-3 mb-4">
						<Activity size={14} className="text-[#FFB400] animate-pulse" />
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.5em]">System_Intelligence: Operational</span>
					</div>
					<h1 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-[#F5F5F0]">
						Foundry <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB400] to-[#FF8C00]">Intelligence</span>
					</h1>
				</div>
				<div className="flex flex-col md:items-end gap-3">
					<div className="flex bg-white/[0.02] border border-white/5 p-1">
						{["60_MIN", "24_HRS", "30_DAYS", "YTD"].map((t) => (
							<button key={t} className="px-4 py-1.5 text-[8px] font-black text-[#94A3B8] hover:text-[#FFB400] transition-colors">
								[{t}]
							</button>
						))}
					</div>
				</div>
			</header>

			{/* 2. CORE KPI DECK */}
			<PerformanceMetrics />

			{/* 3. TRENDS & SATURATION (Primary Row) */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				<div className="lg:col-span-8 space-y-6">
					<h3 className="text-xs font-black uppercase tracking-[0.3em] px-2">Capital_Flow_Oscilloscope</h3>
					<CapitalFlowChart />
				</div>
				<div className="lg:col-span-4 space-y-6">
					<h3 className="text-xs font-black uppercase tracking-[0.3em] px-2">Unit_Saturation</h3>
					<UnitSaturationChart />
				</div>
			</div>

			{/* 4. SECTOR & VELOCITY (Distribution Row) */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				<div className="lg:col-span-6 space-y-6">
					<div className="flex items-center justify-between px-2">
						<h3 className="text-xs font-black uppercase tracking-[0.3em]">Sector_Mapping_Load</h3>
						<Cpu size={14} className="text-[#94A3B8] opacity-20" />
					</div>
					<SectorAllocationChart />
				</div>
				<div className="lg:col-span-6 space-y-6">
					<h3 className="text-xs font-black uppercase tracking-[0.3em] px-2">Dispatch_Velocity_Log</h3>
					<DispatchVelocityChart />
				</div>
			</div>

			{/* 5. LOGS & YIELD (Activity Row) */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				<div className="lg:col-span-8 space-y-6">
					<div className="flex items-center justify-between px-2">
						<h3 className="text-xs font-black uppercase tracking-[0.3em]">Live_Foundry_Logs</h3>
						<Terminal size={14} className="text-[#94A3B8] opacity-20" />
					</div>
					<LiveFoundryLogs />
				</div>
				<div className="lg:col-span-4 space-y-6">
					<h3 className="text-xs font-black uppercase tracking-[0.3em] px-2">High-Yield_Modules</h3>
					<HighYieldRegistry />
				</div>
			</div>

			{/* 6. GEOSPATIAL FOOTER */}
			<div className="bg-white/1 border border-white/5 p-8 relative overflow-hidden group">
				<Globe className="absolute -right-20 -bottom-20 w-64 h-64 text-[#FFB400] opacity-[0.02]" />
				<h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 relative z-10">Geospatial_Node_Distribution</h3>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative z-10">
					{["Baghdad_Central", "London_Node", "Dubai_Hub"].map((hub) => (
						<div key={hub} className="space-y-4">
							<div className="flex justify-between items-end">
								<p className="text-[10px] font-black uppercase text-[#F5F5F0]">{hub}</p>
								{/* Note: We can't show exact % here because it's calculated inside the child now. 
                        We replace it with a static "Active" label or handle state differently. 
                        For visual dashboards, "Active" is often cleaner. */}
								<p className="text-[8px] font-mono text-[#94A3B8] uppercase">Signal_Active</p>
							</div>

							{/* USE THE NEW COMPONENT */}
							<RandomBar />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
