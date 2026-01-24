import { Terminal, AlertTriangle } from "lucide-react";

export const metadata = {
	title: "Operational Directives | BASE 60",
	description: "Terms of service and assembly protocols for Foundry hardware.",
};

export default function TermsPage() {
	return (
		<main className="bg-[#0A0E14] min-h-screen pts-32 pb-20 font-sans selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-400 mx-auto px-6 lg:px-12">
				{/* HEADER */}
				<header className="mb-20 border-b border-white/5 pb-12">
					<div className="flex items-center gap-3 mb-6">
						<Terminal size={16} className="text-[#FFB400]" />
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Protocol: Directives_v2</span>
					</div>
					<h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-[#F5F5F0]">
						Operational <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Directives</span>
					</h1>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
					{/* SIDEBAR */}
					<aside className="lg:col-span-3">
						<div className="sticky top-32 space-y-8">
							<p className="text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.3em] border-b border-white/5 pb-2">Table_Of_Directives</p>
							<nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-[#F5F5F0]">
								<a href="#acceptance" className="hover:text-[#FFB400] transition-colors flex items-center gap-3">
									<span className="text-[#FFB400] font-mono opacity-50">01</span> Protocol_Acceptance
								</a>
								<a href="#usage" className="hover:text-[#FFB400] transition-colors flex items-center gap-3">
									<span className="text-[#FFB400] font-mono opacity-50">02</span> Acceptable_Usage
								</a>
								<a href="#warranty" className="hover:text-[#FFB400] transition-colors flex items-center gap-3">
									<span className="text-[#FFB400] font-mono opacity-50">03</span> Warranty_Voiding
								</a>
								<a href="#liability" className="hover:text-[#FFB400] transition-colors flex items-center gap-3">
									<span className="text-[#FFB400] font-mono opacity-50">04</span> Liability_Limits
								</a>
							</nav>
						</div>
					</aside>

					{/* CONTENT */}
					<div className="lg:col-span-8 lg:col-start-5 space-y-16">
						<Section id="acceptance" number="01" title="Protocol_Acceptance">
							<p>
								By accessing the BASE 60 Registry or initializing a hardware order (&quot;Deployment&quot;), you acknowledge and agree to be bound by these Operational Directives. If
								you do not agree to these terms, you must terminate your session immediately.
							</p>
						</Section>

						<Section id="usage" number="02" title="Acceptable_Usage">
							<p>The hardware provided by the Foundry is engineered for computing, rendering, and simulation tasks. It is strictly prohibited to utilize BASE 60 infrastructure for:</p>
							<ul className="list-disc pl-4 space-y-2 marker:text-[#FFB400]">
								<li>Any illegal cyber-activity or network intrusion.</li>
								<li>Unauthorized resale of limited-allocation modules (Scalping).</li>
								<li>Reverse-engineering of the Foundry&apos;s proprietary 3D visualization code.</li>
							</ul>
						</Section>

						<Section id="warranty" number="03" title="Warranty_Void_Conditions">
							<div className="p-6 bg-red-500/5 border border-red-500/20 mb-6 flex gap-4">
								<AlertTriangle className="text-red-500 shrink-0" size={20} />
								<div>
									<h4 className="text-xs font-black uppercase text-red-500 tracking-widest mb-1">Critical_Warning</h4>
									<p className="text-[10px] font-mono text-red-400 opacity-80 leading-relaxed">
										Modifying the thermal compound, de-lidding CPUs, or shunt-modding GPUs immediately terminates all warranty protocols.
									</p>
								</div>
							</div>
							<p>Standard coverage applies for 24 months. However, the Foundry is not liable for damages caused by:</p>
							<ul className="list-disc pl-4 space-y-2 marker:text-[#FFB400]">
								<li>Incorrect installation by non-certified personnel.</li>
								<li>Electrical surges caused by unrated Energy Cells (PSUs).</li>
								<li>Fluid intrusion in non-waterproof modules.</li>
							</ul>
						</Section>

						<Section id="liability" number="04" title="Limitation_Of_Liability">
							<p>
								In no event shall <strong>BASE 60</strong> or its Architects be liable for any indirect, incidental, or consequential damages (including loss of data profit) arising
								from the use of our hardware modules.
							</p>
							<p>Total liability for any claim shall not exceed the amount paid by you for the specific module in question.</p>
						</Section>
					</div>
				</div>
			</div>
		</main>
	);
}

// Reuse the Section component from Privacy Page
function Section({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
	return (
		<section id={id} className="scroll-mt-32">
			<div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
				<span className="text-xl font-mono text-[#FFB400] opacity-40">{number}</span>
				<h2 className="text-2xl font-bold text-[#F5F5F0] uppercase tracking-tight">{title}</h2>
			</div>
			<div className="text-[#94A3B8] leading-relaxed text-sm md:text-base space-y-4 font-medium">{children}</div>
		</section>
	);
}
