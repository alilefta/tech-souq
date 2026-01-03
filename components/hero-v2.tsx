// app/page.tsx (Server Component)
import HeroVisual from "@/components/home/hero-visual";
import { Reveal } from "@/components/ui/reveal";
import { ShoppingBag, Zap, Cpu, Activity } from "lucide-react";
import { Button } from "./ui/button";

export default function HeroSection() {
	return (
		<section className="relative min-h-screen w-full bg-[#0A0E14] overflow-hidden flex flex-col items-center justify-start pt-[100px] md:pt-[120px] font-sans">
			{/* BACKGROUND ELEMENTS */}
			{/* 1. Sexagesimal Watermark: Stylized "60" replacing "سوق" */}
			<div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
				<span className="text-[50vw] font-black text-[#F5F5F0] leading-none select-none tracking-tighter">60</span>
			</div>

			{/* 2. Technical Coordinate Badge (Babylon Location) */}
			<div className="absolute top-32 left-8 hidden xl:block opacity-20">
				<div className="flex flex-col gap-1 font-mono text-[10px] text-[#94A3B8] uppercase tracking-[0.3em]">
					<span>Lat: 32.47° N</span>
					<span>Lon: 44.42° E</span>
					<span className="text-[#FFB400]">Status: Foundry_Active</span>
				</div>
			</div>

			<div className="absolute top-0 right-[-5%] w-[600px] h-[600px] bg-[#FFB400] opacity-[0.05] blur-[120px] rounded-full" />

			<div className="relative z-10 w-full max-w-7xl px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
				{/* LEFT COLUMN: THE ARCHITECT'S VISION */}
				<div className="lg:col-span-7">
					<Reveal>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB400]/10 border border-[#FFB400]/20 mb-8">
							<Cpu size={14} className="text-[#FFB400]" />
							<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.3em]">Precision Protocol v60.0</span>
						</div>

						<h1 className="text-[#F5F5F0] text-6xl md:text-8xl font-bold leading-[0.85] mb-8 tracking-tighter uppercase">
							CALCULATION <br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">ORIGINATED</span> <br />
							HERE.
						</h1>

						<p className="text-[#94A3B8] text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-medium">
							Welcome to the Sexagesimal Foundry. We assemble high-performance computing modules engineered from the mathematical cradle of Babylon to your global workstation.
						</p>

						<div className="flex flex-wrap gap-6">
							{/* Primary CTA with our Kinetic Beam logic */}
							<Button className="group relative px-10 py-7 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] rounded-none overflow-hidden transition-all shadow-2xl hover:shadow-[0_0_40px_rgba(255,180,0,0.3)]">
								<span className="relative z-20 flex items-center gap-3">
									Access the Foundry <ShoppingBag size={18} strokeWidth={2.5} />
								</span>
								<div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
									<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-[30deg] bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
								</div>
							</Button>

							<Button className="px-10 py-7 bg-transparent border border-white/10 text-[#F5F5F0] font-black text-xs uppercase tracking-[0.2em] rounded-none hover:bg-white/5 transition-all">
								Engineering Logs
							</Button>
						</div>

						{/* STATS: DATA READOUTS */}
						<div className="mt-20 pt-10 border-t border-white/5 flex gap-12 md:gap-20">
							<div>
								<p className="text-[#FFB400] font-black text-3xl tracking-tighter mb-1">
									60.00<span className="text-xs ml-1 opacity-40">Hz</span>
								</p>
								<p className="text-[#94A3B8] text-[9px] font-black uppercase tracking-[0.2em]">Sync_Frequency</p>
							</div>
							<div>
								<p className="text-[#F5F5F0] font-black text-3xl tracking-tighter mb-1">360°</p>
								<p className="text-[#94A3B8] text-[9px] font-black uppercase tracking-[0.2em]">Visual_Fidelity</p>
							</div>
							<div>
								<p className="text-[#F5F5F0] font-black text-3xl tracking-tighter mb-1">BBL//IRQ</p>
								<p className="text-[#94A3B8] text-[9px] font-black uppercase tracking-[0.2em]">Origin_Point</p>
							</div>
						</div>
					</Reveal>
				</div>

				{/* RIGHT COLUMN: INTERACTIVE MODULE */}
				<div className="lg:col-span-5 relative flex justify-center items-center">
					<HeroVisual />
				</div>
			</div>

			{/* FOOTER NAVIGATOR */}
			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
				<span className="text-[#94A3B8] text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Initialize_Scroll</span>
				<div className="w-[1px] h-16 bg-gradient-to-b from-[#FFB400] via-[#FFB400]/20 to-transparent" />
			</div>
		</section>
	);
}
