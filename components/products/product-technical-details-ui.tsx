import { ProductDetailsDTO } from "@/app/data/products";

export function ProductTechnicalDetailsUI({ product }: { product: ProductDetailsDTO }) {
	return (
		<div className="mt-32 border-t border-white/5 bg-[#0D1219]">
			<div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
					{/* LEFT: LONG FORM NARRATIVE (SEO RICH CONTENT) */}
					<div className="lg:col-span-7">
						<h2 className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em] mb-8">The Architect&apos;s Narrative</h2>
						<div className="prose prose-invert max-w-none prose-p:text-[#94A3B8] prose-p:leading-relaxed prose-headings:text-[#F5F5F0] prose-headings:tracking-tighter">
							<h3 className="text-4xl font-bold mb-6">Engineered in the Cradle of Innovation</h3>
							<p className="text-lg mb-8">
								{/* This would be your 'content' or long description from the database */}
								{product.description}
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 p-8 border border-white/5 bg-white/[0.01] rounded-sm italic text-sm text-[#94A3B8]">
								<div className="flex flex-col gap-2">
									<span className="text-[#FFB400] font-black uppercase tracking-widest text-[9px]">Origin Note</span>
									&quot;This component has undergone 48 hours of stress-testing at our Babylon Hub to ensure global stability.&quot;
								</div>
								<div className="flex flex-col gap-2 border-l border-white/5 pl-8">
									<span className="text-[#FFB400] font-black uppercase tracking-widest text-[9px]">Engineering Log</span>
									&quot;Thermal optimization verified for desert climates and high-performance workstation environments.&quot;
								</div>
							</div>
						</div>
					</div>

					{/* RIGHT: SYSTEM VERIFICATION (RATINGS & BRAND) */}
					<div className="lg:col-span-5">
						<div className="bg-[#1E293B]/20 border border-white/5 p-8 rounded-sm sticky top-32">
							<div className="flex items-center justify-between mb-8">
								<div>
									<p className="text-[#94A3B8] text-[9px] font-black uppercase tracking-widest mb-1">Brand_Heritage</p>
									<h4 className="text-[#F5F5F0] text-2xl font-bold uppercase tracking-tighter">{product.brand}</h4>
								</div>
								<div className="text-right">
									<p className="text-[#94A3B8] text-[9px] font-black uppercase tracking-widest mb-1">Trust_Index</p>
									<div className="flex items-center gap-2 text-2xl font-black text-[#FFB400]">
										{product.averageRating} <span className="text-xs text-[#94A3B8]/40">/ 5.0</span>
									</div>
								</div>
							</div>

							{/* MINI RATING BARS (The "Amazon Style" but TechSouq) */}
							<div className="space-y-4 mb-10">
								{[
									{ label: "Performance", val: 98 },
									{ label: "Build Quality", val: 95 },
									{ label: "Thermal Logic", val: 92 },
								].map((stat) => (
									<div key={stat.label}>
										<div className="flex justify-between text-[10px] font-bold uppercase text-[#94A3B8] mb-1">
											<span>{stat.label}</span>
											<span>{stat.val}%</span>
										</div>
										<div className="h-1 w-full bg-white/5">
											<div className="h-full bg-[#FFB400]" style={{ width: `${stat.val}%` }} />
										</div>
									</div>
								))}
							</div>

							<p className="text-[#94A3B8] text-xs leading-relaxed italic mb-8">Based on {product.reviewCount} verified reports from our global vanguard.</p>

							<button className="w-full py-4 border border-[#FFB400]/20 text-[#FFB400] font-black text-[10px] uppercase tracking-widest hover:bg-[#FFB400] hover:text-[#0A0E14] transition-all">
								Read Global Reports
							</button>
						</div>
					</div>
				</div>

				{/* SECTION 3: THE MASTER SPECIFICATION TERMINAL (Amazon-style but Cyberpunk) */}
				<div className="mt-32">
					<div className="flex items-center gap-4 mb-12">
						<h3 className="text-[#F5F5F0] text-3xl font-bold tracking-tighter uppercase">Technical Specifications</h3>
						<div className="flex-1 h-[1px] bg-white/5" />
						<span className="text-[9px] font-mono text-[#94A3B8] opacity-40 uppercase tracking-[0.3em]">Full_Manifest_v2.5</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
						{/* 
                    MAP THROUGH ALL SPECS 
                    We use 'gap-px' with 'bg-white/5' to create 1px grid lines 
                */}
						{product.specs.map((spec: ProductDetailsDTO["specs"][0]) => (
							<div key={spec.id} className="bg-[#0A0E14] p-8 flex flex-col gap-2 hover:bg-white/[0.02] transition-colors group">
								<span className="text-[#FFB400] text-[8px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">{spec.label}</span>
								<span className="text-[#F5F5F0] text-lg font-bold tracking-tight">{spec.value}</span>
							</div>
						))}

						{/* TECHNICAL ADD-ONS (If static for all tech products) */}
						<div className="bg-[#0A0E14] p-8 flex flex-col gap-2 hover:bg-white/[0.02] transition-colors border-t md:border-t-0 border-white/5">
							<span className="text-[#FFB400] text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Verification</span>
							<span className="text-[#F5F5F0] text-lg font-bold tracking-tight">Architect_Certified</span>
						</div>
						<div className="bg-[#0A0E14] p-8 flex flex-col gap-2 hover:bg-white/[0.02] transition-colors border-t lg:border-t-0 border-white/5">
							<span className="text-[#FFB400] text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Service_Node</span>
							<span className="text-[#F5F5F0] text-lg font-bold tracking-tight">Babylon_Hub_Alpha</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
