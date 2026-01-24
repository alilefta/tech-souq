import { Terminal, ShieldCheck, Cpu, Globe, History, Activity } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export const metadata = {
	title: "The Origin Protocol | BASE 60",
	description: "From the sexagesimal system of Babylon to the silicon frontiers of today.",
};

export default function AboutPage() {
	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 lg:pt-32 pb-20 font-sans selection:bg-[#FFB400] selection:text-[#0A0E14] overflow-hidden">
			{/* 1. HERO: THE ORIGIN SIGNAL */}
			<section className="relative px-6 lg:px-12 mb-32">
				{/* Background Watermark */}
				<div className="absolute top-0 right-0 opacity-[0.03] text-[#F5F5F0] pointer-events-none select-none">
					<span className="text-[20vw] font-black italic">ORIGIN</span>
				</div>

				<div className="max-w-7xl mx-auto relative z-10">
					<div className="flex items-center gap-3 mb-6">
						<History size={16} className="text-[#FFB400]" />
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Protocol: Genesis</span>
					</div>

					<h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-[#F5F5F0] mb-12">
						From Clay <br />
						To <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Silicon.</span>
					</h1>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 border-t border-white/5 pt-12">
						<div className="lg:col-span-5">
							<p className="text-xl md:text-2xl font-bold text-[#F5F5F0] leading-tight uppercase tracking-tight">
								We are the Architects of the new Babylon. A foundry dedicated to the precision of high-performance hardware.
							</p>
						</div>
						<div className="lg:col-span-7 text-[#94A3B8] leading-relaxed space-y-6">
							<p>
								4,000 years ago, in the cradle of civilization, Babylonian astronomers invented the <strong>Sexagesimal (Base 60)</strong> system. It gave the world the 60-minute hour,
								the 360-degree circle, and the foundations of advanced calculation.
							</p>
							<p>
								Today, <strong>BASE 60</strong> honors that legacy. We don&apos;t just sell components; we curate the hardware that drives the next era of human calculation. From the
								Euphrates to the global grid, we are the foundry of the future.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* 2. THE VISUAL MANIFEST (Image Grid) */}
			<section className="mb-32">
				<div className="grid grid-cols-1 md:grid-cols-3 h-150 w-full border-y border-white/5">
					<ManifestImage src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000" label="Foundry_Core_01" sub="Baghdad_HQ" />
					<ManifestImage src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" label="Assembly_Line" sub="Precision_Engineering" delay={0.1} />
					<ManifestImage src="https://images.unsplash.com/photo-1555664424-778a69022365?auto=format&fit=crop&q=80&w=1000" label="Global_Dispatch" sub="Logistics_Network" delay={0.2} />
				</div>
			</section>

			{/* 3. CORE VALUES (The Code) */}
			<section className="max-w-7xl mx-auto px-6 lg:px-12 mb-32">
				<div className="flex items-center gap-4 mb-12">
					<Terminal size={18} className="text-[#FFB400]" />
					<h2 className="text-xl font-black uppercase tracking-tighter text-[#F5F5F0]">Foundry_Code_Of_Conduct</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 shadow-2xl">
					<ValueCard
						icon={<ShieldCheck size={20} />}
						title="Integrity_First"
						desc="We do not ship silicone we haven't stress-tested. Every module passes the 48H Foundry Burn-in protocol."
					/>
					<ValueCard
						icon={<Cpu size={20} />}
						title="Architecture_Focus"
						desc="We don't chase trends. We chase performance. Our inventory is curated for architects, engineers, and pro-gamers."
					/>
					<ValueCard
						icon={<Globe size={20} />}
						title="Global_Signal"
						desc="Born in Iraq, deployed worldwide. Our logistics network ensures a secure handshake between Babylon and your doorstep."
					/>
				</div>
			</section>

			{/* 4. TELEMETRY STATS */}
			<section className="border-y border-white/5 bg-white/1">
				<div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-12">
						<StatBlock val="2025" label="Foundry_Initialized" />
						<StatBlock val="12K+" label="Modules_Deployed" />
						<StatBlock val="99.9%" label="Uptime_Reliability" />
						<StatBlock val="32.5°N" label="Coordinate_Origin" isHighlight />
					</div>
				</div>
			</section>
		</main>
	);
}

// --- SUB COMPONENTS ---

function ManifestImage({ src, label, sub, delay = 0 }: { src: string; label: string; sub: string; delay?: number }) {
	return (
		<div className="relative group overflow-hidden border-r border-white/5 last:border-none">
			<SafeImage src={src} alt={label} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
			<div className="absolute inset-0 bg-linear-to-t from-[#0A0E14] via-[#0A0E14]/40 to-transparent opacity-80" />

			{/* HUD Overlay */}
			<div className="absolute bottom-8 left-8">
				<div className="flex items-center gap-2 mb-2">
					<div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full animate-pulse" />
					<span className="text-[9px] font-mono text-[#FFB400] uppercase tracking-widest">{label}</span>
				</div>
				<p className="text-xl font-bold text-[#F5F5F0] uppercase tracking-tight">{sub}</p>
			</div>

			{/* Scanline */}
			<div className="absolute inset-0 bg-white/2 translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none" />
		</div>
	);
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
	return (
		<div className="bg-[#0A0E14] p-10 group hover:bg-white/2 transition-colors relative">
			<div className="mb-6 text-[#94A3B8] group-hover:text-[#FFB400] transition-colors">{icon}</div>
			<h3 className="text-lg font-black uppercase text-[#F5F5F0] tracking-tight mb-4">{title}</h3>
			<p className="text-sm text-[#94A3B8] leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-opacity">{desc}</p>
			{/* Corner Accent */}
			<div className="absolute top-0 right-0 w-0 h-0 border-t-20 border-r-20 border-t-transparent border-r-[#FFB400]/0 group-hover:border-r-[#FFB400] transition-all duration-300" />
		</div>
	);
}

function StatBlock({ val, label, isHighlight }: { val: string; label: string; isHighlight?: boolean }) {
	return (
		<div className="flex flex-col gap-2">
			<span className={cn("text-4xl md:text-6xl font-black tracking-tighter", isHighlight ? "text-[#FFB400]" : "text-[#F5F5F0]")}>{val}</span>
			<div className="flex items-center gap-2">
				<Activity size={12} className="text-[#94A3B8] opacity-50" />
				<span className="text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.2em]">{label}</span>
			</div>
		</div>
	);
}
