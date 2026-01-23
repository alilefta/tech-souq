"use client";

import { motion, useTransform, useScroll } from "motion/react";
import { useRef } from "react";
import { MoveRight } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";

const builds = [
	{
		id: "build-1",
		tier: "01 / The Mirage",
		title: "Silent Creator",
		price: "2,499",
		specs: ["RTX 4080 Super", "Core i9-14900K", "64GB DDR5"],
		image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200",
	},
	{
		id: "build-2",
		tier: "02 / The Onyx",
		title: "Pro Vanguard",
		price: "3,850",
		specs: ["RTX 4090", "Ryzen 9 7950X3D", "96GB DDR5"],
		image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1200",
	},
	{
		id: "build-3",
		tier: "03 / The Sandstorm",
		title: "Extreme Rig",
		price: "1,950",
		specs: ["RTX 4070 Ti", "Core i7-14700K", "32GB DDR5"],
		image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1200",
	},
];

export function AssemblyScroller() {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const x = useTransform(scrollYProgress, [0, 0.95], ["0%", "-75%"]);

	return (
		<motion.section style={{ position: "relative" }} ref={containerRef} className="relative h-[600vh] bg-[#0A0E14]">
			{/* STICKY VIEWPORT */}
			<div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
				{/* HUD SIDEBAR (Desktop Only) */}
				<div className="absolute top-0 left-0 bottom-0 z-40 w-[30vw] pointer-events-none hidden lg:flex flex-col justify-center px-16">
					<div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-[#0A0E14] via-[#0A0E14]/80 to-transparent backdrop-blur-sm" />
					<div className="relative">
						<h2 className="text-[#94A3B8] text-[9px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
							<span className="w-6 h-[1px] bg-[#FFB400]" />
							Assembly Floor
						</h2>
						<h3 className="text-[#F5F5F0] text-6xl font-bold tracking-tighter leading-[0.85] uppercase">
							Architect <br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Builds</span>
						</h3>
					</div>
				</div>

				{/* MOBILE HUD HEADER */}
				<div className="absolute top-0 left-0 w-full p-8 z-40 lg:hidden pointer-events-none">
					<h2 className="text-[#FFB400] text-[8px] font-black uppercase tracking-[0.3em] mb-2">Assembly_Floor</h2>
					<h3 className="text-[#F5F5F0] text-3xl font-black uppercase tracking-tighter">Architect_Builds</h3>
				</div>

				{/* HORIZONTAL TRACK */}
				<motion.div style={{ x, willChange: "transform" }} className="flex items-center h-full">
					{builds.map((build) => (
						<div key={build.id} className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 lg:pl-[35vw] lg:pr-12">
							<div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
								{/* 1. IMAGE CONTAINER (Active Viewport Logic) */}
								<motion.div
									// Initial State: Cold, inactive
									initial={{ filter: "grayscale(100%)", opacity: 0.4, scale: 0.95 }}
									// Active State: Full color, bright, slight zoom
									whileInView={{ filter: "grayscale(0%)", opacity: 1, scale: 1 }}
									// Trigger: When 50% of card is in view
									viewport={{ amount: 0.5, once: false }}
									transition={{ duration: 0.8, ease: "easeOut" }}
									className="relative aspect-[3/4] md:aspect-[4/3] lg:aspect-square w-full max-h-[60vh] lg:max-h-none overflow-hidden border border-white/5 rounded-sm bg-[#1E293B]/20"
								>
									<SafeImage src={build.image} alt={build.title} loading="eager" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />

									{/* Gradient Overlay for Text Readability */}
									<div className="absolute inset-0 bg-linear-to-t from-[#0A0E14] via-transparent to-transparent opacity-80" />

									{/* Mobile: Show Title Inside Image */}
									<div className="absolute bottom-8 left-8 lg:hidden">
										<h4 className="text-[#F5F5F0] text-4xl font-black uppercase tracking-tighter leading-none mb-2">{build.title}</h4>
										<p className="text-[#FFB400] font-mono text-sm tracking-widest">{build.tier.split("/")[0]}</p>
									</div>
								</motion.div>

								{/* 2. BUILD SPECS (Desktop Only) */}
								<div className="hidden lg:flex flex-col items-start">
									<span className="text-[#FFB400] font-mono text-[10px] tracking-[0.3em] uppercase mb-2">{build.tier}</span>
									<h4 className="text-[#F5F5F0] text-5xl font-bold tracking-tighter mb-4 leading-none uppercase">{build.title}</h4>

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
										<Link href="/builder">
											<button className="group relative px-6 py-4 bg-[#FFB400] text-[#0A0E14] font-black text-[10px] uppercase tracking-[0.2em] overflow-hidden transition-all shadow-xl hover:shadow-[#FFB400]/20">
												<span className="relative z-10 flex items-center gap-2">
													Configure <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
												</span>
											</button>
										</Link>
									</div>
								</div>

								{/* MOBILE ACTION BUTTON (Below Image) */}
								<div className="lg:hidden w-full flex justify-between items-center border-t border-white/10 pt-6">
									<div className="flex flex-col">
										<span className="text-[8px] font-black uppercase text-[#94A3B8]">Starting_At</span>
										<span className="text-2xl font-black text-[#F5F5F0]">${build.price}</span>
									</div>
									<Link href="/builder">
										<button className="px-6 py-3 bg-[#FFB400] text-[#0A0E14] font-black text-[10px] uppercase tracking-[0.2em]">Configure</button>
									</Link>
								</div>
							</div>
						</div>
					))}

					{/* SOUQ OUTRO */}
					<div className="w-screen shrink-0 flex items-center justify-center px-6">
						<div className="relative text-center">
							<span className="text-[20vw] lg:text-[25vw] font-black text-[#F5F5F0]/5 italic leading-none uppercase select-none">Souq</span>
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
								<p className="text-[#94A3B8] text-[10px] font-black tracking-[0.4em] uppercase">The End of Ordinary</p>
								<Link href="/builder">
									<button className="px-8 py-4 border border-[#FFB400]/40 text-[#FFB400] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#FFB400] hover:text-[#0A0E14] transition-all">
										Start Custom Build
									</button>
								</Link>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
}
