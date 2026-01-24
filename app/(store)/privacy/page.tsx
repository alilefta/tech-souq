import { Shield, Eye } from "lucide-react";

export const metadata = {
	title: "Data Governance Protocol | BASE 60",
	description: "Security standards and data retention policies for the Babylon Network.",
};

export default function PrivacyPage() {
	return (
		<main className="bg-[#0A0E14] min-h-screen pt-32 pb-20 font-sans selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-400 mx-auto px-6 lg:px-12">
				{/* HEADER */}
				<header className="mb-20 border-b border-white/5 pb-12">
					<div className="flex items-center gap-3 mb-6">
						<Shield size={16} className="text-[#FFB400]" />
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Security_Level: MAX</span>
					</div>
					<h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-[#F5F5F0]">
						Data <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Governance</span>
					</h1>
					<div className="mt-8 flex items-center gap-6 text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">
						<span>Protocol_ID: PRIV-2026-A</span>
						<span>Last_Audit: 2026.01.12</span>
					</div>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
					{/* SIDEBAR NAVIGATION */}
					<aside className="lg:col-span-3">
						<div className="sticky top-32 space-y-8">
							<p className="text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.3em] border-b border-white/5 pb-2">Index_Sections</p>
							<nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-[#F5F5F0]">
								<a href="#collection" className="hover:text-[#FFB400] transition-colors flex items-center gap-3">
									<span className="text-[#FFB400] font-mono opacity-50">01</span> Signal_Collection
								</a>
								<a href="#usage" className="hover:text-[#FFB400] transition-colors flex items-center gap-3">
									<span className="text-[#FFB400] font-mono opacity-50">02</span> Data_Processing
								</a>
								<a href="#storage" className="hover:text-[#FFB400] transition-colors flex items-center gap-3">
									<span className="text-[#FFB400] font-mono opacity-50">03</span> Cold_Storage
								</a>
								<a href="#sharing" className="hover:text-[#FFB400] transition-colors flex items-center gap-3">
									<span className="text-[#FFB400] font-mono opacity-50">04</span> Third_Party_Nodes
								</a>
							</nav>
						</div>
					</aside>

					{/* CONTENT DOSSIER */}
					<div className="lg:col-span-8 lg:col-start-5 space-y-16">
						<Section id="collection" number="01" title="Signal_Collection">
							<p>
								When you interact with the <strong>BASE 60 Foundry</strong>, we intercept specific digital signals to facilitate hardware deployment. This includes, but is not limited
								to:
							</p>
							<ul className="list-disc pl-4 space-y-2 marker:text-[#FFB400]">
								<li>Identity Coordinates (Name, Shipping Address, Billing Node).</li>
								<li>Communication Frequencies (Email Address, Phone Signal).</li>
								<li>Transaction Metadata (Payment Protocols, Purchase History).</li>
							</ul>
							<div className="p-4 border border-white/5 bg-white/2 mt-6 flex gap-4 items-center">
								<Eye className="text-[#FFB400] shrink-0" size={16} />
								<p className="text-[10px] font-mono text-[#94A3B8]">
									NOTE: We do not record biometric data or raw credit card sequences. All financial handshakes are encrypted via Stripe.
								</p>
							</div>
						</Section>

						<Section id="usage" number="02" title="Data_Processing_Logic">
							<p>Your data packets are utilized strictly for operational efficiency within the Foundry ecosystem. Specifically:</p>
							<ul className="list-disc pl-4 space-y-2 marker:text-[#FFB400]">
								<li>
									<strong>Order Fulfillment:</strong> Routing hardware from Babylon to your local node.
								</li>
								<li>
									<strong>System Optimization:</strong> Analyzing site telemetry to improve load times (LCP).
								</li>
								<li>
									<strong>Vanguard Comms:</strong> Sending critical alerts regarding stock allocation or warranty status.
								</li>
							</ul>
						</Section>

						<Section id="storage" number="03" title="Cold_Storage_&_Retention">
							<p>
								User profiles are stored in our secure <strong>PostgreSQL</strong> cluster hosted in EU-West regions. Data is encrypted at rest using <strong>AES-256</strong>{" "}
								standards.
							</p>
							<p>
								We retain &quot;Inactive&quot; accounts for a period of <strong>24 months</strong> before initiating a purge sequence. You may request a manual &quot;Data Wipe&quot; at
								any time via the Contact Terminal.
							</p>
						</Section>

						<Section id="sharing" number="04" title="Third_Party_Nodes">
							<p>BASE 60 does not sell data. However, we must establish handshakes with the following infrastructure partners to operate:</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
								<PartnerCard name="Stripe" role="Financial Gateway" />
								<PartnerCard name="Resend" role="Email Signal Relay" />
								<PartnerCard name="Vercel" role="Cloud Infrastructure" />
								<PartnerCard name="Supabase" role="Database Core" />
							</div>
						</Section>
					</div>
				</div>
			</div>
		</main>
	);
}

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

function PartnerCard({ name, role }: { name: string; role: string }) {
	return (
		<div className="flex items-center justify-between p-4 border border-white/5 bg-white/1">
			<span className="text-[#F5F5F0] font-bold uppercase">{name}</span>
			<span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest">{role}</span>
		</div>
	);
}
