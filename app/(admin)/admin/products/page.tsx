import { Plus, Filter, Download, Terminal } from "lucide-react";
import { getFeaturedProducts } from "@/app/data/products"; // Fetch real data
import { ModuleRegistryRow } from "@/components/admin/products/module-registry-row";
import Link from "next/link";

export default async function ModuleRegistryPage() {
	const products = await getFeaturedProducts();

	return (
		<div className="space-y-8 max-w-400 mx-auto">
			{/* 1. REGISTRY HEADER */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
				<div>
					<div className="flex items-center gap-2 text-[#FFB400] mb-2">
						<Terminal size={14} />
						<span className="text-[10px] font-black uppercase tracking-[0.4em]">Node_Alpha // Inventory_Access</span>
					</div>
					<h1 className="text-4xl font-black uppercase tracking-tighter text-[#F5F5F0]">
						Module_<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Registry</span>
					</h1>
					<p className="text-[#94A3B8] text-[10px] font-mono uppercase tracking-[0.2em] mt-1 opacity-40">Database://Foundry_Sector_32.5N</p>
				</div>

				<div className="flex items-center gap-3">
					<button className="px-6 py-3 border border-white/10 text-[#94A3B8] text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
						<Download size={14} className="inline mr-2" /> Export_Manifest
					</button>
					<Link
						href={"/admin/products/new"}
						className="px-8 py-4 bg-[#FFB400] text-[#0A0E14] text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_30_rgba(255,180,0,0.3)] transition-all flex items-center gap-3"
					>
						<Plus size={16} strokeWidth={3} /> Initialize_Module
					</Link>
				</div>
			</div>

			{/* 2. COMMAND FILTER HUB */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/2 border border-white/5">
				<div className="relative group">
					<input
						type="text"
						placeholder="QUERY_IDENTIFIER..."
						className="w-full bg-[#0A0E14] border border-white/10 h-12 px-4 text-[10px] font-mono uppercase tracking-widest focus:border-[#FFB400]/40 outline-none transition-all"
					/>
				</div>
				<select
					title="Filter by category"
					className="bg-[#0A0E14] border border-white/10 h-12 px-4 text-[10px] font-mono uppercase text-[#94A3B8] outline-none hover:border-white/20 transition-all appearance-none cursor-pointer"
				>
					<option>Sector: ALL_REGIONS</option>
					<option>Graphics_Cores</option>
					<option>Logic_Processors</option>
				</select>
				<select
					title="Filter by product status"
					className="bg-[#0A0E14] border border-white/10 h-12 px-4 text-[10px] font-mono uppercase text-[#94A3B8] outline-none hover:border-white/20 transition-all appearance-none cursor-pointer"
				>
					<option>Allocation: ALL_STATES</option>
					<option>Critical_Stock</option>
					<option>De-Synced</option>
				</select>
				<button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-[#FFB400] hover:text-[#0A0E14] transition-all text-[10px] font-black uppercase tracking-[0.2em] text-[#F5F5F0]">
					<Filter size={14} /> Execute_Filter
				</button>
			</div>

			{/* 3. THE MASTER DATA TABLE */}
			<div className="border border-white/5 bg-white/1 overflow-hidden">
				<div className="overflow-x-auto custom-scrollbar">
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b border-white/5 text-[9px] font-black uppercase text-[#94A3B8] tracking-[0.3em] bg-white/[0.02]">
								<th className="p-5 text-left">UID_Hash</th>
								<th className="p-5 text-left">Module_Identity</th>
								<th className="p-5 text-left">Sector</th>
								<th className="p-5 text-left">Allocation_Status</th>
								<th className="p-5 text-left">Base_Value</th>
								<th className="p-5 text-right">System_Actions</th>
							</tr>
						</thead>
						<tbody className="text-[11px] font-bold text-[#F5F5F0] uppercase tracking-tighter font-mono">
							{products.map((product) => (
								<ModuleRegistryRow key={product.id} product={product} />
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Table Footer Telemetry */}
			<div className="flex justify-between items-center px-2 opacity-20">
				<span className="text-[8px] font-mono uppercase tracking-widest">End_Of_Registry_Stream</span>
				<div className="flex gap-4">
					<span className="text-[8px] font-mono uppercase tracking-widest">Server: Babylon_Node_01</span>
					<span className="text-[8px] font-mono uppercase tracking-widest">Latency: 0.003ms</span>
				</div>
			</div>
		</div>
	);
}
