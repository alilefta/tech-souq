// components/home/assembly-scroller.tsx
"use client";

import { motion, useTransform, useScroll } from "motion/react";
import { useRef } from "react";
import { MoveRight, Zap } from "lucide-react";

const builds = [
	{
		id: "build-1",
		tier: "01 / The Mirage",
		title: "Silent Creator",
		arabicTitle: "محطة السراب",
		price: "2,499",
		specs: ["RTX 4080 Super", "Core i9-14900K", "64GB DDR5"],
		image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200",
	},
	{
		id: "build-2",
		tier: "02 / The Onyx",
		title: "Pro Vanguard",
		arabicTitle: "حارس العقيق",
		price: "3,850",
		specs: ["RTX 4090", "Ryzen 9 7950X3D", "96GB DDR5"],
		image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1200",
	},
	{
		id: "build-3",
		tier: "03 / The Sandstorm",
		title: "Extreme Rig",
		arabicTitle: "عاصفة الرمل",
		price: "1,950",
		specs: ["RTX 4070 Ti", "Core i7-14700K", "32GB DDR5"],
		image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1200",
	},
];

export function AssemblyScroller() {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		// Start tracking when the top of the container hits the top of the viewport
		// End tracking when the bottom of the container hits the bottom of the viewport
		offset: ["start start", "end end"],
	});

	// Math: 3 Builds + 1 Outro = 4 Viewports total.
	// To show all 4, we must move -75% of the total width.
	// We use a slight "dead-zone" at the end (0.95) to ensure
	// the user sees the last item fully before it un-sticks.
	const x = useTransform(scrollYProgress, [0, 0.95], ["0%", "-75%"]);

	return (
		/* 
       INCREASED HEIGHT TO 600vh: 
       This is the secret. It adds "friction." 
       The user has to scroll more to move the items, which prevents the "jumping" effect.
    */
		<div ref={containerRef} className="relative h-[600vh] bg-[#0A0E14]">
			{/* STICKY VIEWPORT */}
			<div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
				{/* REFINED HUD (Glass Sidebar) */}
				<div className="absolute top-12 lg:top-0 lg:left-0 lg:bottom-0 z-40 w-full lg:w-[30vw] pointer-events-none flex flex-col justify-center px-8 lg:px-16">
					<div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#0A0E14] via-[#0A0E14]/80 to-transparent backdrop-blur-sm hidden lg:block" />

					<div className="relative">
						<h2 className="text-[#94A3B8] text-[9px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
							<span className="w-6 h-[1px] bg-[#FFB400]" />
							Assembly Floor
						</h2>
						<h3 className="text-[#F5F5F0] text-4xl md:text-6xl font-bold tracking-tighter leading-[0.85] uppercase">
							Architect <br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB400] to-[#FF8C00]">Builds</span>
						</h3>
					</div>
				</div>

				{/* HORIZONTAL TRACK */}
				<motion.div style={{ x, willChange: "transform" }} className="flex items-center h-full">
					{builds.map((build) => (
						<div key={build.id} className="relative w-screen h-screen shrink-0 flex items-center justify-center px-6 lg:pl-[35vw] lg:pr-12">
							<div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
								{/* Image Container */}
								<div className="relative aspect-4/3 lg:aspect-square group overflow-hidden border border-white/5 rounded-sm bg-[#1E293B]/20">
									<img
										src={build.image}
										alt={build.title}
										className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
									/>
									<div className="absolute inset-0 bg-linear-to-t from-[#0A0E14] via-transparent to-transparent opacity-80" />
								</div>

								{/* Build Specs */}
								<div className="flex flex-col items-start">
									<span className="text-[#FFB400] font-mono text-[10px] tracking-[0.3em] uppercase mb-2">{build.tier}</span>
									<h4 className="text-[#F5F5F0] text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-none uppercase">{build.title}</h4>

									<div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8 border-l border-[#FFB400]/20 pl-4">
										{build.specs.map((spec, i) => (
											<div key={i} className="flex items-center gap-2 text-[#94A3B8]">
												<div className="w-1 h-1 bg-[#FFB400] rounded-full" />
												<span className="text-[9px] font-bold tracking-widest uppercase">{spec}</span>
											</div>
										))}
									</div>

									<div className="flex items-center gap-8">
										<div>
											<p className="text-[#94A3B8] text-[8px] font-black uppercase tracking-widest mb-1 opacity-60">Starting At</p>
											<p className="text-[#F5F5F0] text-3xl font-black tracking-tighter">${build.price}</p>
										</div>
										<button className="group relative px-6 py-4 bg-[#FFB400] text-[#0A0E14] font-black text-[10px] uppercase tracking-[0.2em] overflow-hidden transition-all shadow-xl hover:shadow-[#FFB400]/20">
											<span className="relative z-10 flex items-center gap-2">
												Configure <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
											</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					))}

					{/* SOUQ OUTRO */}
					<div className="w-screen shrink-0 flex items-center justify-center px-6">
						<div className="relative text-center">
							<span className="text-[25vw] font-black text-[#F5F5F0]/5 italic leading-none uppercase">Souq</span>
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
								<p className="text-[#94A3B8] text-[10px] font-black tracking-[0.4em] uppercase">The End of Ordinary</p>
								<button className="px-8 py-4 border border-[#FFB400]/40 text-[#FFB400] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#FFB400] hover:text-[#0A0E14] transition-all">
									Start Custom Build
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
