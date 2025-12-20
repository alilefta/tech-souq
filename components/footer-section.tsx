// components/home/footer-section.tsx
import { FinalCTA } from "@/components/final-cta";
import { TerminalStatus } from "@/components/terminal-status";
import { Cpu, Globe, Ship, Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function FooterSection() {
	return (
		<footer className="w-full bg-[#0A0E14] pt-20 pb-10 px-8 relative overflow-hidden border-t border-white/5">
			{/* BACKGROUND DECORATION: Babylonian Technical Grid */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFB400] opacity-[0.02] blur-[150px] rounded-full" />

			<div className="max-w-7xl mx-auto relative z-10">
				{/* PART A: THE FINAL CTA */}
				<FinalCTA />

				{/* PART B: THE LOGISTICS TERMINAL (FOOTER LINKS) */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
					{/* Brand Info (4 Columns) */}
					<div className="lg:col-span-4 flex flex-col items-start">
						<div className="flex items-center gap-2 mb-6">
							<div className="w-8 h-8 bg-[#FFB400] rounded-sm flex items-center justify-center">
								<Cpu size={20} className="text-[#0A0E14]" />
							</div>
							<span className="text-[#F5F5F0] font-bold text-2xl tracking-tighter uppercase italic">
								TECH<span className="text-[#FFB400]">SOUQ</span>
							</span>
						</div>
						<p className="text-[#94A3B8] text-sm leading-relaxed mb-8 max-w-xs">
							Born in Babylon, built for the world. We curate elite hardware from the cradle of innovation to your doorstep.
						</p>
						<div className="flex gap-4">
							<Link
								href="#"
								className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#F5F5F0] hover:border-[#FFB400] hover:text-[#FFB400] transition-all"
							>
								<Instagram size={18} />
							</Link>
							<Link
								href="#"
								className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#F5F5F0] hover:border-[#FFB400] hover:text-[#FFB400] transition-all"
							>
								<Twitter size={18} />
							</Link>
							<Link
								href="#"
								className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#F5F5F0] hover:border-[#FFB400] hover:text-[#FFB400] transition-all"
							>
								<Github size={18} />
							</Link>
						</div>
					</div>

					{/* Navigation (2 Columns) */}
					<div className="lg:col-span-2">
						<h4 className="text-[#F5F5F0] text-xs font-black uppercase tracking-[0.3em] mb-8">Navigation</h4>
						<ul className="space-y-4 text-sm text-[#94A3B8]">
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									Components
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									Custom Builds
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									The Bazaar
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									Support
								</Link>
							</li>
						</ul>
					</div>

					{/* Logistics (2 Columns) */}
					<div className="lg:col-span-2">
						<h4 className="text-[#F5F5F0] text-xs font-black uppercase tracking-[0.3em] mb-8">Logistics</h4>
						<ul className="space-y-4 text-sm text-[#94A3B8]">
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									Global Shipping
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									Tracking
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									Warranty
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									Returns
								</Link>
							</li>
						</ul>
					</div>

					{/* Live System Status (4 Columns) */}
					<div className="lg:col-span-4 bg-white/[0.02] border border-white/5 p-6 rounded-sm">
						<h4 className="text-[#F5F5F0] text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
							<Globe size={14} className="text-[#FFB400]" />
							System Status
						</h4>
						<TerminalStatus />
					</div>
				</div>

				{/* BOTTOM BAR: COPYRIGHT & LEGAL */}
				<div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex items-center gap-6 text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest opacity-40">
						<span>© 2025 TechSouq_INTL</span>
						<span>Origin: Babylon_IRQ</span>
						<span>Security_Protocol: AES-256</span>
					</div>
					<div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">
						<Link href="#" className="hover:text-[#F5F5F0]">
							Privacy Policy
						</Link>
						<Link href="#" className="hover:text-[#F5F5F0]">
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
