// app/admin/page.tsx
import { Terminal, Package, Users, DollarSign, Activity, Truck } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
	return (
		<div className="space-y-10">
			{/* 1. SECTOR OVERVIEW HEADER */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
				<div>
					<div className="flex items-center gap-2 text-[#FFB400] mb-2">
						<Terminal size={14} />
						<span className="text-[10px] font-black uppercase tracking-[0.4em]">Initialize Overseer_Protocol</span>
					</div>
					<h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter">
						Foundry <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Metrics</span>
					</h1>
				</div>
				<div className="flex items-center gap-4 text-[#94A3B8] text-[10px] font-mono border border-white/5 px-4 py-2 bg-white/1">
					<span className="animate-pulse text-green-500">●</span> SYSTEM_READY_NODE_01 // BABYLON_IRQ
				</div>
			</div>

			{/* 2. TOP-TIER KPIS */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{[
					{ label: "Total_Revenue", val: "$142,500.00", icon: DollarSign, trend: "+12.5%" },
					{ label: "Active_Dispatches", val: "032", icon: Truck, trend: "+4" },
					{ label: "Stock_Threshold", val: "94.2%", icon: Package, trend: "Optimal" },
					{ label: "Vanguard_Pulse", val: "4.9", icon: Users, trend: "Verified" },
				].map((kpi, i) => (
					<div key={i} className="bg-[#1E293B]/20 border border-white/5 p-6 hover:border-[#FFB400]/40 transition-all group relative">
						<div className="flex justify-between items-start mb-4">
							<kpi.icon size={18} className="text-[#94A3B8] group-hover:text-[#FFB400] transition-colors" />
							<span className="text-[9px] font-mono text-green-500">{kpi.trend}</span>
						</div>
						<p className="text-[#94A3B8] text-[9px] font-black uppercase tracking-widest mb-1">{kpi.label}</p>
						<p className="text-2xl font-black tracking-tighter text-[#F5F5F0]">{kpi.val}</p>

						{/* Background geometric detail */}
						<div className="absolute bottom-2 right-2 text-[20px] font-black italic text-white/2 pointer-events-none uppercase">{kpi.label.split("_")[0]}</div>
					</div>
				))}
			</div>

			{/* 3. SYSTEM LOGS & RECENT DISPATCHES */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Recent Dispatches (Orders) */}
				<div className="lg:col-span-8 space-y-6">
					<div className="flex items-center justify-between border-b border-white/5 pb-4">
						<h3 className="text-xs font-black uppercase tracking-[0.3em]">Recent_Dispatches</h3>
						<Link href={"/admin/orders"} className="text-[9px] font-black text-[#FFB400] uppercase underline underline-offset-4">
							View_Registry
						</Link>
					</div>
					<div className="border border-white/5 bg-white/[0.01] overflow-hidden">
						<div className="overflow-x-auto custom-scrollbar">
							<table className="w-full text-left border-collapse min-w-[800px]">
								<thead>
									<tr className="border-b border-white/5 text-[9px] font-black uppercase text-[#94A3B8] tracking-widest bg-white/[0.02]">
										<th className="p-4">Dispatch_ID</th>
										<th className="p-4">Recipient_Node</th>
										<th className="p-4">Module_Count</th>
										<th className="p-4">Status</th>
										<th className="p-4 text-right">Value</th>
									</tr>
								</thead>
								<tbody className="text-[11px] font-bold text-[#F5F5F0] uppercase tracking-tighter font-mono">
									{[1, 2, 3, 4, 5].map((order) => (
										<tr key={order} className="border-b border-white/5 hover:bg-white/2 transition-colors group cursor-pointer">
											<td className="p-4 text-[#FFB400]">#BBL-102{order}</td>
											<td className="p-4">Baghdad // node_0{order}</td>
											<td className="p-4">02 Units</td>
											<td className="p-4">
												<span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[8px] font-black uppercase">Cleared</span>
											</td>
											<td className="p-4 text-right">$2,499.00</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* System Activity Feed */}
				<div className="lg:col-span-4 space-y-6">
					<div className="flex items-center justify-between border-b border-white/5 pb-4">
						<h3 className="text-xs font-black uppercase tracking-[0.3em]">Core_Activity</h3>
						<Activity size={14} className="text-[#FFB400] animate-pulse" />
					</div>
					<div className="space-y-4">
						{[
							{ time: "12:44", log: "Inventory_Sync_Successful", node: "BBL_ALPHA" },
							{ time: "12:30", log: "New_Order_Dispatch: #BBL-1025", node: "BBL_G-SEC" },
							{ time: "11:55", log: "Security_Protocol_Authorized", node: "NODE_01" },
							{ time: "11:20", log: "Stock_Warning: RTX_5090_LOW", node: "SECTOR_02" },
						].map((log, i) => (
							<div key={i} className="flex gap-4 p-4 bg-white/2 border border-white/5 group hover:border-[#FFB400]/20 transition-all">
								<span className="text-[9px] font-mono text-[#94A3B8] opacity-40">{log.time}</span>
								<div className="flex flex-col gap-1">
									<p className="text-[10px] font-bold uppercase tracking-tight text-[#F5F5F0]">{log.log}</p>
									<span className="text-[8px] font-mono text-[#FFB400]/50">{log.node}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
