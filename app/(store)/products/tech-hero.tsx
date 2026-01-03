// app/page.tsx (Server Component)
import Navbar from "@/components/ui/navbar-v2";
import HeroVisual from "@/components/home/hero-visual";
import { Reveal } from "@/components/ui/reveal"; // Our Client Wrapper
import { ShoppingBag, Zap } from "lucide-react";

export default function HeroSection() {
	return (
		<section className="relative min-h-screen w-full bg-[#0A0E14] overflow-hidden flex flex-col items-center justify-center font-sans">
			{/* BACKGROUND ELEMENTS (Static/Server) */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
				<span className="text-[40vw] font-bold text-[#F5F5F0] leading-none select-none">سوق</span>
			</div>
			<div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#FFB400] opacity-[0.07] blur-[120px] rounded-full" />

			<Navbar />

			<div className="relative z-10 w-full max-w-7xl px-8 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
				{/* LEFT COLUMN: SEO CONTENT */}
				<div className="lg:col-span-7">
					<Reveal>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB400]/10 border border-[#FFB400]/20 mb-6">
							<Zap size={14} className="text-[#FFB400] fill-[#FFB400]" />
							<span className="text-[#FFB400] text-xs font-bold tracking-widest uppercase">Next-Gen Inventory Arrived</span>
						</div>

						<h1 className="text-[#F5F5F0] text-6xl md:text-8xl font-bold leading-[0.9] mb-8 tracking-tighter">
							THE FUTURE IS <br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">ASSEMBLED</span> HERE
						</h1>

						<p className="text-[#94A3B8] text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
							Step into the premium digital bazaar. From elite PC components to custom-built machines, find the raw power needed to build your legacy.
						</p>

						<div className="flex flex-wrap gap-4">
							<button className="group relative px-8 py-4 bg-[#FFB400] text-[#0A0E14] font-bold rounded-sm overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,180,0,0.4)]">
								<span className="relative z-10 flex items-center gap-2 uppercase">
									Explore the Souq <ShoppingBag size={18} />
								</span>
								{/* Visual highlight on hover */}
								<div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
							</button>

							<button className="px-8 py-4 bg-transparent border border-white/10 text-[#F5F5F0] font-bold rounded-sm hover:bg-white/5 transition-all uppercase">View Build Guides</button>
						</div>

						{/* STATIC TRUST BADGES */}
						<div className="mt-16 pt-8 border-t border-white/5 flex gap-12">
							<div>
								<p className="text-[#FFB400] font-bold text-2xl">12.4k+</p>
								<p className="text-[#94A3B8] text-[10px] uppercase tracking-widest">Active Builds</p>
							</div>
							<div>
								<p className="text-[#F5F5F0] font-bold text-2xl">24h</p>
								<p className="text-[#94A3B8] text-[10px] uppercase tracking-widest">Global Express</p>
							</div>
							<div>
								<p className="text-[#F5F5F0] font-bold text-2xl">4.9/5</p>
								<p className="text-[#94A3B8] text-[10px] uppercase tracking-widest">Curator Rating</p>
							</div>
						</div>
					</Reveal>
				</div>

				{/* RIGHT COLUMN: INTERACTIVE VISUAL */}
				<div className="lg:col-span-5 relative flex justify-center items-center">
					<HeroVisual />
				</div>
			</div>

			{/* STATIC SCROLL INDICATOR */}
			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
				<span className="text-[#94A3B8] text-[10px] uppercase tracking-[0.3em]">Enter Bazaar</span>
				<div className="w-[1px] h-12 bg-gradient-to-b from-[#FFB400] to-transparent" />
			</div>
		</section>
	);
}
