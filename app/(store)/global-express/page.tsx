import { Plane, Globe, Package, ShieldCheck, Clock, MapPin, ArrowRight, Anchor } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata = {
	title: "Global Express Protocol | BASE 60",
	description: "Worldwide hardware logistics and secure transfer timelines.",
};

export default function GlobalExpressPage() {
	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 lg:pt-32 pb-20 font-sans selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-[1600px] mx-auto px-6 lg:px-12">
				{/* 1. HEADER: LOGISTICS COMMAND */}
				<header className="mb-20 border-b border-white/5 pb-12 relative overflow-hidden">
					<div className="absolute top-0 right-0 opacity-[0.02] text-[#F5F5F0] pointer-events-none select-none">
						<span className="text-[20vw] font-black italic">TRANSIT</span>
					</div>
					<div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<Plane size={14} className="text-[#FFB400]" />
								<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Logistics_Network: Active</span>
							</div>
							<h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-[#F5F5F0]">
								Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB400] to-[#FF8C00]">Express</span>
							</h1>
						</div>

						<div className="flex flex-col items-end gap-2">
							<span className="text-[8px] font-mono text-[#94A3B8] uppercase tracking-widest">Primary_Hub_Coordinates</span>
							<div className="flex items-center gap-4 px-6 py-3 bg-white/[0.02] border border-white/5">
								<Anchor size={16} className="text-[#FFB400]" />
								<span className="text-xl font-black text-[#F5F5F0] tracking-tighter">BBL_AIR_01</span>
							</div>
						</div>
					</div>
				</header>

				{/* 2. TRANSIT ZONES (Data Grid) */}
				<section className="mb-24">
					<div className="flex items-center gap-4 mb-8">
						<Globe size={18} className="text-[#94A3B8]" />
						<h3 className="text-xl font-black uppercase tracking-tighter text-[#F5F5F0]">Transit_Time_Estimates</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 shadow-2xl">
						<ZoneCard zone="Zone_01: MENA" regions="Iraq, UAE, KSA, Qatar" time="24 - 48 Hours" carrier="Local_Direct" />
						<ZoneCard zone="Zone_02: EU/UK" regions="Germany, UK, France, NLD" time="3 - 5 Days" carrier="DHL_Express" />
						<ZoneCard zone="Zone_03: AMERICAS" regions="USA, Canada, Brazil" time="4 - 7 Days" carrier="FedEx_Intl" />
						<ZoneCard zone="Zone_04: APAC" regions="Japan, Korea, Singapore" time="5 - 8 Days" carrier="Global_Freight" />
					</div>
				</section>

				{/* 3. CONTAINMENT PROTOCOLS (Feature List) */}
				<section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
					<div className="lg:col-span-5 relative min-h-[400px] border border-white/5 bg-[#1E293B]/20">
						{/* Visual Representation of a Package */}
						<div className="absolute inset-4 border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center p-8">
							<Package size={64} className="text-[#FFB400] mb-6 opacity-80" strokeWidth={1} />
							<h4 className="text-lg font-black uppercase text-[#F5F5F0] tracking-tight mb-2">Secure_Crate_v4</h4>
							<p className="text-[10px] font-mono text-[#94A3B8] max-w-xs leading-relaxed">
								Triple-layer shock absorption foam. Anti-static shielding. Every module is sealed with a holographic tamper-evident Foundry Seal.
							</p>

							<div className="mt-8 flex gap-4 text-[8px] font-black uppercase tracking-widest text-[#94A3B8]">
								<span className="border border-white/10 px-2 py-1">Water_Resistant</span>
								<span className="border border-white/10 px-2 py-1">Impact_Rated</span>
							</div>
						</div>
						{/* Corner Details */}
						<div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FFB400]" />
						<div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FFB400]" />
					</div>

					<div className="lg:col-span-7 space-y-10">
						<div className="space-y-4">
							<h3 className="text-2xl font-black uppercase tracking-tighter text-[#F5F5F0]">Logistics_Methodology</h3>
							<p className="text-[#94A3B8] text-sm leading-relaxed max-w-2xl">
								We do not use standard postal services. Every dispatch is handled as a <strong>High-Value Asset Transfer</strong>. From the moment it leaves the Babylon Node until it
								reaches your coordinates, the chain of custody is digitally tracked and insured.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FeatureRow icon={<ShieldCheck size={18} />} title="100% Transfer Insurance" desc="Full coverage against loss, damage, or cosmic interference during transit." />
							<FeatureRow icon={<Clock size={18} />} title="Same-Day Dispatch" desc="Orders authorized before 14:00 (GMT+3) are processed and handed to carriers within 4 hours." />
							<FeatureRow icon={<MapPin size={18} />} title="Live Node Tracking" desc="Real-time geospatial updates via our proprietary Tracking_Node terminal." />
							<FeatureRow icon={<Anchor size={18} />} title="Customs Clearance" desc="Pre-cleared documentation for EU/US zones to minimize border latency." />
						</div>
					</div>
				</section>

				{/* 4. CTA FOOTER */}
				<section className="border-t border-white/5 pt-12 flex flex-col items-center text-center">
					<p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-[0.3em] mb-6">Ready_To_Receive_Payload?</p>
					<div className="flex flex-wrap justify-center gap-6">
						<Link href="/products">
							<button className="px-10 py-5 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,180,0,0.2)] hover:bg-white transition-all flex items-center gap-3">
								Browse_Registry <ArrowRight size={16} />
							</button>
						</Link>
						<Link href="/tracking-node">
							<button className="px-10 py-5 border border-white/10 text-[#F5F5F0] font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
								Track_Existing_Order
							</button>
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}

// --- SUB COMPONENTS ---

function ZoneCard({ zone, regions, time, carrier }: { zone: string; regions: string; time: string; carrier: string }) {
	return (
		<div className="bg-[#0A0E14] p-8 hover:bg-white/[0.02] transition-colors group">
			<span className="text-[8px] font-black text-[#FFB400] uppercase tracking-widest mb-4 block">{zone}</span>
			<h4 className="text-3xl font-black text-[#F5F5F0] tracking-tighter mb-1">{time}</h4>
			<p className="text-[9px] font-mono text-[#94A3B8] uppercase opacity-60 mb-6">Avg_Transit_Time</p>

			<div className="space-y-2 pt-6 border-t border-white/5">
				<div className="flex justify-between">
					<span className="text-[9px] text-[#94A3B8] uppercase font-bold">Scope</span>
					<span className="text-[9px] text-[#F5F5F0] font-mono text-right max-w-[100px] truncate">{regions}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-[9px] text-[#94A3B8] uppercase font-bold">Carrier</span>
					<span className="text-[9px] text-[#FFB400] font-mono">{carrier}</span>
				</div>
			</div>
		</div>
	);
}

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
	return (
		<div className="flex gap-4 group">
			<div className="w-10 h-10 bg-white/5 flex items-center justify-center text-[#94A3B8] shrink-0 group-hover:text-[#FFB400] group-hover:bg-[#FFB400]/10 transition-colors">{icon}</div>
			<div>
				<h5 className="text-sm font-bold text-[#F5F5F0] uppercase tracking-tight mb-2 group-hover:text-[#FFB400] transition-colors">{title}</h5>
				<p className="text-xs text-[#94A3B8] leading-relaxed opacity-60">{desc}</p>
			</div>
		</div>
	);
}
