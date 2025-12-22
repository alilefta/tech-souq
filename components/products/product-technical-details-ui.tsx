import { ProductDetailsDTO } from "@/app/data/products";
import { Zap, Terminal } from "lucide-react";

export function ProductTechnicalDetailsUI({ product }: { product: ProductDetailsDTO }) {
	return (
		<div className="mt-16 lg:mt-32 border-t border-white/5 bg-[#0D1219]">
			<div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-24">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
					{/* LEFT: THE ARCHITECT'S NARRATIVE */}
					<div className="lg:col-span-7 order-2 lg:order-1">
						<h2 className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em] mb-6 lg:mb-8 flex items-center gap-2">
							<Terminal size={12} />
							Foundry_Narrative
						</h2>

						<div className="prose prose-invert max-w-none prose-p:text-[#94A3B8] prose-p:text-sm lg:prose-p:text-lg prose-p:leading-relaxed prose-headings:text-[#F5F5F0] prose-headings:tracking-tighter">
							<h3 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6 uppercase">Engineered in the Cradle of Innovation</h3>
							<p className="mb-8">{product.description}</p>

							{/* Origin Notes: Stacked on mobile, Grid on desktop */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-10 p-6 lg:p-8 border border-white/5 bg-white/[0.01] rounded-none italic text-xs lg:text-sm text-[#94A3B8]">
								<div className="flex flex-col gap-2">
									<span className="text-[#FFB400] font-black uppercase tracking-widest text-[9px]">Origin_Note</span>
									&quot;Component synchronized for 48 hours at Babylon Hub to ensure global stability.&quot;
								</div>
								<div className="flex flex-col gap-2 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
									<span className="text-[#FFB400] font-black uppercase tracking-widest text-[9px]">Logic_Log</span>
									&quot;Thermal optimization verified for high-performance workstation environments.&quot;
								</div>
							</div>
						</div>
					</div>

					{/* RIGHT: SYSTEM SUMMARY (Now acts as a dashboard on mobile) */}
					<div className="lg:col-span-5 order-1 lg:order-2">
						<div className="bg-[#1E293B]/20 border border-white/10 lg:border-white/5 p-6 lg:p-8 rounded-none lg:sticky lg:top-32 shadow-2xl">
							<div className="flex items-center justify-between mb-8">
								<div>
									<p className="text-[#94A3B8] text-[9px] font-black uppercase tracking-widest mb-1">Brand_Heritage</p>
									<h4 className="text-xl lg:text-2xl font-bold uppercase tracking-tighter text-[#F5F5F0]">{product.brand}</h4>
								</div>
								<div className="text-right">
									<p className="text-[#94A3B8] text-[9px] font-black uppercase tracking-widest mb-1">Trust_Index</p>
									<div className="flex items-center gap-2 text-xl lg:text-2xl font-black text-[#FFB400]">
										{product.averageRating} <span className="text-xs text-[#94A3B8]/40">/ 5.0</span>
									</div>
								</div>
							</div>

							{/* METRIC BARS */}
							<div className="space-y-5 mb-10">
								{[
									{ label: "Performance", val: 98 },
									{ label: "Build Quality", val: 95 },
									{ label: "Thermal Logic", val: 92 },
								].map((stat) => (
									<div key={stat.label}>
										<div className="flex justify-between text-[9px] font-bold uppercase text-[#94A3B8] mb-2 tracking-widest">
											<span>{stat.label}</span>
											<span className="font-mono text-[#FFB400]">{stat.val}%</span>
										</div>
										<div className="h-[2px] w-full bg-white/5">
											<div className="h-full bg-[#FFB400] shadow-[0_0_8px_rgba(255,180,0,0.5)]" style={{ width: `${stat.val}%` }} />
										</div>
									</div>
								))}
							</div>

							<p className="text-[#94A3B8] text-[10px] leading-relaxed italic mb-8 border-l border-[#FFB400]/20 pl-4">
								Based on {product.reviewCount} verified telemetry reports from the global vanguard.
							</p>

							<button className="w-full py-4 bg-[#FFB400] text-[#0A0E14] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-[#0A0E14] transition-all">
								View_Full_Telemetry
							</button>
						</div>
					</div>
				</div>

				{/* SECTION 3: TECHNICAL SPECIFICATION GRID */}
				<div className="mt-20 lg:mt-32">
					<div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 lg:mb-12">
						<h3 className="text-[#F5F5F0] text-2xl lg:text-3xl font-bold tracking-tighter uppercase">Technical Specifications</h3>
						<div className="hidden md:block flex-1 h-px bg-white/5" />
						<span className="text-[9px] font-mono text-[#94A3B8] opacity-40 uppercase tracking-[0.3em]">Manifest_v6.0</span>
					</div>

					{/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 shadow-2xl">
						{product.specs.map((spec) => (
							<div key={spec.id} className="bg-[#0A0E14] p-6 lg:p-8 flex flex-col gap-2 hover:bg-white/[0.02] transition-colors group">
								<span className="text-[#FFB400] text-[8px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">{spec.label}</span>
								<span className="text-[#F5F5F0] text-base lg:text-lg font-bold tracking-tight">{spec.value}</span>
							</div>
						))}

						{/* STATIC FOUNDRY TAGS */}
						<div className="bg-[#0A0E14] p-6 lg:p-8 flex flex-col gap-2 border-t sm:border-t-0 border-white/5">
							<span className="text-[#FFB400] text-[8px] font-black uppercase tracking-[0.3em] opacity-40">System_Status</span>
							<div className="flex items-center gap-2">
								<Zap size={14} className="text-[#FFB400]" />
								<span className="text-[#F5F5F0] text-base lg:text-lg font-bold tracking-tight uppercase">Architect_Certified</span>
							</div>
						</div>
						<div className="bg-[#0A0E14] p-6 lg:p-8 flex flex-col gap-2 border-t lg:border-t-0 border-white/5">
							<span className="text-[#FFB400] text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Foundry_Node</span>
							<span className="text-[#F5F5F0] text-base lg:text-lg font-bold tracking-tight uppercase">Babylon_Hub_Alpha</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
