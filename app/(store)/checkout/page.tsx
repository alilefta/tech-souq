// app/checkout/page.tsx
import { ShieldCheck, Globe } from "lucide-react";
import { ManifestSummary } from "@/components/checkout/manifest-summary";
import { LogisticsForm } from "@/components/checkout/logistics-form";

export default function CheckoutPage() {
	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 pb-20 selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-7xl mx-auto px-6 lg:px-12">
				{/* 1. PROTOCOL HEADER */}
				<header className="mb-12 border-b border-white/5 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
					<div>
						<div className="flex items-center gap-3 mb-4">
							<div className="w-2 h-2 rounded-full bg-[#FFB400] animate-pulse" />
							<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Protocol: Authorization_v6.0</span>
						</div>
						<h1 className="text-[#F5F5F0] text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
							Order <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Clearance</span>
						</h1>
					</div>
					<div className="hidden md:flex items-center gap-8 text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest opacity-40">
						<span className="flex items-center gap-2">
							<Globe size={12} /> Secure_Line: Active
						</span>
						<span className="flex items-center gap-2">
							<ShieldCheck size={12} /> Enc: AES-256
						</span>
					</div>
				</header>

				{/* 2. THE COMMAND GRID */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
					{/* LOGISTICS ENTRY (The Forms) */}
					<div className="lg:col-span-7 order-2 lg:order-1">
						<LogisticsForm />
					</div>

					{/* MANIFEST VERIFICATION (Sticky Summary) */}
					<aside className="lg:col-span-5 order-1 lg:order-2">
						<div className="lg:sticky lg:top-32">
							<ManifestSummary />
						</div>
					</aside>
				</div>
			</div>
		</main>
	);
}
