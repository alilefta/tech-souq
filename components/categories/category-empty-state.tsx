import Link from "next/link";
import { Box, ArrowLeft, AlertTriangle } from "lucide-react";

export function CategoryEmptyState() {
	return (
		<div className="w-full min-h-100 flex flex-col items-center justify-center border-2 border-dashed border-white/5 bg-white/1 relative overflow-hidden group">
			{/* 1. BACKGROUND NOISE (Technical Grid) */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

			{/* 2. CENTRAL ICON MODULE */}
			<div className="w-24 h-24 bg-[#1E293B]/40 border border-white/10 flex items-center justify-center mb-8 relative">
				<Box size={40} className="text-[#94A3B8] opacity-30" strokeWidth={1} />
				<div className="absolute top-2 right-2 text-red-500/40 animate-pulse">
					<AlertTriangle size={12} />
				</div>
				{/* Corner Accents */}
				<div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FFB400]/40" />
				<div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FFB400]/40" />
			</div>

			{/* 3. TERMINAL MESSAGE */}
			<div className="text-center space-y-2 mb-10 max-w-md px-6">
				<h3 className="text-2xl font-black text-[#F5F5F0] uppercase tracking-tight">Sector_Inventory_Depleted</h3>
				<p className="text-xs font-mono text-[#94A3B8] leading-relaxed">
					No active modules found at these coordinates. <br />
					Inventory resupply pending from <span className="text-[#FFB400]">Babylon_Node_01</span>.
				</p>
			</div>

			{/* 4. RECOVERY ACTION */}
			<Link href="/categories">
				<button className="px-8 py-4 border border-white/10 bg-white/2 text-[#F5F5F0] font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 hover:border-[#FFB400]/40 transition-all flex items-center gap-3 group/btn">
					<ArrowLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
					Return_To_Sector_Map
				</button>
			</Link>

			{/* 5. DECORATIVE SCANLINE */}
			<div className="absolute inset-0 pointer-events-none opacity-20">
				<div className="absolute top-0 left-0 w-full h-px bg-[#FFB400] animate-[scan_4s_linear_infinite]" />
			</div>
		</div>
	);
}
