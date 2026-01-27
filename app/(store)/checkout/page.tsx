// app/checkout/page.tsx
import { ShieldCheck, Globe, AlertTriangle, PackageOpen } from "lucide-react";
import { ManifestSummary } from "@/components/checkout/manifest-summary";
import { LogisticsForm } from "@/components/checkout/logistics-form";
import { getCart } from "@/app/data/cart";
import { EmptyStateButton } from "@/components/checkout/empty-state-button";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
	const cart = await getCart();
	const hasItems = cart && cart.items.length > 0;

	if (!hasItems) {
		return <EmptyManifestProtocol />;
	}

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
						<LogisticsForm searchParams={searchParams} />
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

// ----------------------------------------------------------------------
// SUB-COMPONENT: EMPTY STATE
// ----------------------------------------------------------------------

function EmptyManifestProtocol() {
	return (
		<main className="bg-[#0A0E14] min-h-screen flex items-center justify-center p-6 font-sans">
			<div className="w-full max-w-lg border border-red-500/20 bg-red-500/2 p-12 text-center relative overflow-hidden group">
				{/* 1. WARNING HUD */}
				<div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 shadow-[0_0_20px_#ef4444]" />
				<div className="absolute top-4 left-4 flex items-center gap-2 text-red-500">
					<AlertTriangle size={14} />
					<span className="text-[9px] font-black uppercase tracking-widest">Protocol_Halt</span>
				</div>

				{/* 2. VISUAL */}
				<div className="my-8 relative inline-block">
					<PackageOpen size={64} className="text-[#94A3B8] opacity-20" strokeWidth={1} />
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-24 h-24 border border-dashed border-red-500/20 rounded-full animate-spin-slow" />
					</div>
				</div>

				{/* 3. MESSAGE */}
				<h2 className="text-3xl font-black text-[#F5F5F0] uppercase tracking-tighter mb-4">
					Manifest <span className="text-red-500">Void</span>
				</h2>
				<p className="text-[#94A3B8] text-sm font-mono leading-relaxed mb-10">
					No hardware modules detected in the secure container. <br />
					Logistics clearance requires active inventory allocation.
				</p>

				{/* 4. RECOVERY ACTION */}
				<EmptyStateButton />

				{/* Background Noise */}
				<div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
			</div>
		</main>
	);
}
