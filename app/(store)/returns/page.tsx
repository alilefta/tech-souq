import { RefreshCw, Box, ClipboardCheck, ArrowLeftRight, Terminal } from "lucide-react";
import { RMAForm } from "@/components/returns/rma-form";
import { ReactNode } from "react";

export const metadata = {
	title: "Asset Recovery Protocol | BASE 60",
	description: "Reverse logistics and hardware reintegration procedures.",
};

export default function ReturnsPage() {
	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 lg:pt-32 pb-20 font-sans selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-6xl mx-auto px-6 lg:px-8">
				{/* 1. HEADER: REVERSE LOGISTICS */}
				<header className="mb-20 text-center space-y-6">
					<div className="inline-flex items-center gap-3 px-4 py-2 border border-white/5 bg-white/1">
						<RefreshCw size={14} className="text-[#FFB400] animate-spin-slow" />
						<span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#94A3B8]">Protocol: Reverse_Flow_v2</span>
					</div>

					<h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-[#F5F5F0]">
						Asset <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Recovery</span>
					</h1>

					<p className="text-[#94A3B8] text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
						Hardware re-integration protocol. Initiate a return sequence to send modules back to the <span className="text-[#F5F5F0] font-mono">Babylon Foundry</span> for inspection and
						credit reversal.
					</p>
				</header>

				{/* 2. THE RMA TERMINAL (Form) */}
				<section className="mb-24">
					<RMAForm />
				</section>

				{/* 3. THE RECOVERY TIMELINE */}
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 relative">
					{/* Connecting Line (Desktop) */}
					<div className="absolute top-8 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

					<StepCard step="01" icon={<Terminal size={20} />} title="Signal_Auth" desc="Submit RMA request. System verifies purchase window (30 Cycles)." />
					<StepCard step="02" icon={<Box size={20} />} title="Secure_Pack" desc="Re-seal hardware in original anti-static containment." />
					<StepCard step="03" icon={<ArrowLeftRight size={20} />} title="Transit_Loop" desc="Global Express courier retrieves payload from your coordinates." />
					<StepCard step="04" icon={<ClipboardCheck size={20} />} title="Core_Inspect" desc="Foundry Architects verify integrity. Credit released within 48h." />
				</section>

				{/* 4. POLICY GRID */}
				<div className="border-t border-white/5 pt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
					<div className="space-y-4">
						<h4 className="text-sm font-black uppercase text-[#F5F5F0] tracking-widest">Eligibility_Matrix</h4>
						<ul className="space-y-3 text-xs text-[#94A3B8] font-mono">
							<li className="flex gap-3">
								<span className="text-green-500">✓</span> Dead_On_Arrival (DOA)
							</li>
							<li className="flex gap-3">
								<span className="text-green-500">✓</span> Performance_De-Sync
							</li>
							<li className="flex gap-3">
								<span className="text-green-500">✓</span> Sealed_Box_Return (Buyer Remorse)
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h4 className="text-sm font-black uppercase text-[#F5F5F0] tracking-widest">Exclusion_Zones</h4>
						<ul className="space-y-3 text-xs text-[#94A3B8] font-mono">
							<li className="flex gap-3">
								<span className="text-red-500">✕</span> Physical_Impact_Damage
							</li>
							<li className="flex gap-3">
								<span className="text-red-500">✕</span> Missing_Accessories
							</li>
							<li className="flex gap-3">
								<span className="text-red-500">✕</span> Liquid_Submersion
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
}

function StepCard({ step, icon, title, desc }: { step: string; icon: ReactNode; title: string; desc: string }) {
	return (
		<div className="relative bg-[#0A0E14] border border-white/5 p-8 group hover:border-[#FFB400]/40 transition-all z-10">
			<span className="text-[9px] font-black text-[#FFB400] bg-[#FFB400]/10 px-2 py-1 mb-6 inline-block rounded-sm">PHASE_{step}</span>
			<div className="text-[#94A3B8] mb-4 group-hover:text-[#F5F5F0] transition-colors">{icon}</div>
			<h3 className="text-lg font-bold text-[#F5F5F0] uppercase tracking-tight mb-2">{title}</h3>
			<p className="text-xs text-[#94A3B8] leading-relaxed opacity-60 font-medium">{desc}</p>
		</div>
	);
}
