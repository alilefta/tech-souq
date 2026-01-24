import { ShieldCheck, Zap, AlertTriangle, Terminal } from "lucide-react";
import { WarrantyLookup } from "@/components/warranty/warranty-lookup";
import { cn } from "@/lib/utils";

export const metadata = {
	title: "Warranty Authorization | BASE 60",
	description: "Verify hardware protection status and initiate RMA protocols.",
};

export default function WarrantyPage() {
	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 lg:pt-32 pb-20 font-sans selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-4xl mx-auto px-6 lg:px-8">
				{/* 1. HEADER */}
				<header className="mb-16 text-center space-y-6">
					<div className="inline-flex items-center gap-3 px-4 py-2 border border-white/5 bg-white/1">
						<ShieldCheck size={14} className="text-[#FFB400]" />
						<span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#94A3B8]">Protocol: Protection_Layer_v4</span>
					</div>

					<h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-[#F5F5F0]">
						Warranty <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Auth</span>
					</h1>

					<p className="text-[#94A3B8] text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed">
						Input your hardware <span className="text-[#F5F5F0] font-mono">Serial_Number (S/N)</span> or <span className="text-[#F5F5F0] font-mono">Manifest_ID</span> to verify coverage
						status and authorize repair tickets.
					</p>
				</header>

				{/* 2. THE LOOKUP TERMINAL */}
				<WarrantyLookup />

				{/* 3. COVERAGE MATRIX */}
				<section className="mt-24 border-t border-white/5 pt-12">
					<div className="flex items-center gap-4 mb-10">
						<Terminal size={18} className="text-[#94A3B8]" />
						<h3 className="text-xl font-black uppercase tracking-tighter text-[#F5F5F0]">Coverage_Parameters</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 shadow-2xl">
						<CoverageCard status="COVERED" title="Logic_Failure" desc="Manufacturing defects in silicon, PCB circuitry, or soldier joints." />
						<CoverageCard status="COVERED" title="Thermal_Degradation" desc="Pump failure, fan motor seizure, or abnormal thermal throttling." />
						<CoverageCard status="VOID" title="Kinetic_Damage" desc="Drops, impact fractures, or installation errors (bent pins)." />
						<CoverageCard status="VOID" title="Liquid_Intrusion" desc="Coolant leaks from custom loops or external liquid exposure." />
					</div>
				</section>
			</div>
		</main>
	);
}

function CoverageCard({ status, title, desc }: { status: "COVERED" | "VOID"; title: string; desc: string }) {
	const isCovered = status === "COVERED";
	return (
		<div className="bg-[#0A0E14] p-8 group hover:bg-white/2 transition-colors">
			<div className="flex justify-between items-start mb-4">
				<span
					className={cn(
						"px-2 py-1 text-[8px] font-black uppercase tracking-widest border",
						isCovered ? "border-green-500/30 text-green-500 bg-green-500/5" : "border-red-500/30 text-red-500 bg-red-500/5",
					)}
				>
					{status}
				</span>
				{isCovered ? <Zap size={14} className="text-green-500 opacity-50" /> : <AlertTriangle size={14} className="text-red-500 opacity-50" />}
			</div>
			<h4 className="text-sm font-bold text-[#F5F5F0] uppercase tracking-tight mb-2">{title}</h4>
			<p className="text-xs text-[#94A3B8] leading-relaxed opacity-60 font-mono">{desc}</p>
		</div>
	);
}
