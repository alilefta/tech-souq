// app/page.tsx (Server Component)
import HeroVisual3D from "@/components/home/hero-visual-3d";
import { Reveal } from "@/components/ui/reveal";
import { ShoppingBag, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
	return (
		<section className="relative min-h-[100dvh] w-full bg-[#0A0E14] overflow-hidden flex flex-col items-center justify-center py-24 lg:py-0 font-sans">
			{/* BACKGROUND ELEMENTS */}
			{/* 1. Sexagesimal Watermark */}
			<div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
				<span className="text-[40vw] lg:text-[50vw] font-black text-[#F5F5F0] leading-none select-none tracking-tighter">60</span>
			</div>

			{/* 2. Technical Coordinate Badge (Hidden on Mobile to reduce clutter) */}
			<div className="absolute top-24 left-8 hidden xl:block opacity-20 z-0">
				<div className="flex flex-col gap-1 font-mono text-[10px] text-[#94A3B8] uppercase tracking-[0.3em]">
					<span>Lat: 32.47° N</span>
					<span>Lon: 44.42° E</span>
					<span className="text-[#FFB400]">Status: Foundry_Active</span>
				</div>
			</div>

			<div className="absolute top-0 right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#FFB400] opacity-[0.05] blur-[120px] rounded-full" />

			<div className="relative z-10 w-full max-w-7xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
				{/* LEFT COLUMN: THE ARCHITECT'S VISION */}
				<div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
					<Reveal>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB400]/10 border border-[#FFB400]/20 mb-8 mx-auto lg:mx-0">
							<Cpu size={14} className="text-[#FFB400]" />
							<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.3em]">Precision Protocol v60.0</span>
						</div>

						<h1 className="text-[#F5F5F0] text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.9] mb-8 tracking-tighter uppercase">
							CALCULATION <br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">ORIGINATED</span> <br />
							HERE.
						</h1>

						<p className="text-[#94A3B8] text-base md:text-xl max-w-xl mb-12 leading-relaxed font-medium mx-auto lg:mx-0">
							Welcome to the Sexagesimal Foundry. We assemble high-performance computing modules engineered from the mathematical cradle of Babylon to your global workstation.
						</p>

						<div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
							{/* Primary CTA */}
							<Button
								className="group relative px-8 md:px-10 py-6 md:py-7 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] rounded-none overflow-hidden transition-all shadow-2xl hover:shadow-[0_0_40px_rgba(255,180,0,0.3)]"
								asChild
							>
								<Link
									href={"/products"}
									className="group relative px-8 md:px-10 py-6 md:py-7 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] rounded-none overflow-hidden transition-all shadow-2xl hover:shadow-[0_0_40px_rgba(255,180,0,0.3)]"
								>
									<span className="relative z-20 flex items-center gap-3">
										Access Foundry <ShoppingBag size={18} strokeWidth={2.5} />
									</span>
									<div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
										<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-[30deg] bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
									</div>
								</Link>
							</Button>

							<Button
								className="px-8 md:px-10 py-6 md:py-7 bg-transparent border border-white/10 text-[#F5F5F0] font-black text-xs uppercase tracking-[0.2em] rounded-none hover:bg-white/5 transition-all"
								asChild
							>
								<Link
									className="px-8 md:px-10 py-6 md:py-7 bg-transparent border border-white/10 text-[#F5F5F0] font-black text-xs uppercase tracking-[0.2em] rounded-none hover:bg-white/5 transition-all"
									href={"/blog"}
								>
									Engineering Logs
								</Link>
							</Button>
						</div>

						{/* STATS: DATA READOUTS (Refined for Mobile) */}
						<div className="mt-16 lg:mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-6 md:gap-20 w-full">
							<div className="flex flex-col items-center lg:items-start">
								<p className="text-[#FFB400] font-black text-2xl md:text-3xl tracking-tighter mb-1">
									60.00<span className="text-xs ml-1 opacity-40">Hz</span>
								</p>
								<p className="text-[#94A3B8] text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">Sync_Frequency</p>
							</div>
							<div className="flex flex-col items-center lg:items-start">
								<p className="text-[#F5F5F0] font-black text-2xl md:text-3xl tracking-tighter mb-1">360°</p>
								<p className="text-[#94A3B8] text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">Visual_Fidelity</p>
							</div>
							<div className="flex flex-col items-center lg:items-start">
								<p className="text-[#F5F5F0] font-black text-2xl md:text-3xl tracking-tighter mb-1">BBL//IRQ</p>
								<p className="text-[#94A3B8] text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">Origin_Point</p>
							</div>
						</div>
					</Reveal>
				</div>

				{/* RIGHT COLUMN: INTERACTIVE MODULE */}
				<div className="lg:col-span-6 relative flex justify-center items-center w-full  lg:h-full order-first lg:order-last mb-8 lg:mb-0">
					<HeroVisual3D />
				</div>
			</div>

			{/* FOOTER NAVIGATOR (Safe from mobile bottom bar) */}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pb-safe">
				<span className="text-[#94A3B8] text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Initialize_Scroll</span>
				<div className="w-px h-12 md:h-16 bg-linear-to-b from-[#FFB400] via-[#FFB400]/20 to-transparent" />
			</div>
		</section>
	);
}
