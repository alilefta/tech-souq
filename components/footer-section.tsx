// components/home/footer-section.tsx
import { FinalCTA } from "@/components/final-cta";
import { TerminalStatus } from "@/components/terminal-status";
import { Globe, Github, Instagram, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/logo"; // Import our new logo
import Link from "next/link";

export default function FooterSection() {
	return (
		<footer className="w-full bg-[#0A0E14] pt-20 pb-10 px-8 relative overflow-hidden border-t border-white/5 selection:bg-[#FFB400] selection:text-[#0A0E14]">
			{/* BACKGROUND DECORATION: Subtle Mathematical Grid */}
			<div className="absolute top-0 right-0 w-125 h-125 bg-[#FFB400] opacity-[0.02] blur-[150px] rounded-full" />

			<div className="max-w-7xl mx-auto relative z-10">
				{/* PART A: THE FINAL CTA */}
				<FinalCTA />

				{/* PART B: THE FOUNDRY TERMINAL */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
					{/* Brand Info (4 Columns) */}
					<div className="lg:col-span-4 flex flex-col items-start">
						<Link href="/" className="flex items-center gap-3 mb-6 group">
							<Logo />
							<span className="text-[#F5F5F0] font-black text-2xl tracking-tighter uppercase leading-none">
								BASE <span className="text-[#FFB400]">60</span>
							</span>
						</Link>
						<p className="text-[#94A3B8] text-sm leading-relaxed mb-8 max-w-xs font-medium">
							The original source of calculation, engineered for modern performance. We deploy elite hardware modules from our Babylon Foundry to global workstations.
						</p>
						<div className="flex gap-4">
							{[Instagram, Twitter, Github].map((Icon, i) => (
								<Link
									key={i}
									href="#"
									className="w-10 h-10 border border-white/5 flex items-center justify-center text-[#94A3B8] hover:border-[#FFB400] hover:text-[#FFB400] transition-all bg-white/2"
								>
									<Icon size={18} />
								</Link>
							))}
						</div>
					</div>

					{/* Registry Links (2 Columns) */}
					<div className="lg:col-span-2">
						<h4 className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-2">Registry</h4>
						<ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
							<li>
								<Link href="/components" className="hover:text-[#FFB400] transition-colors">
									Components
								</Link>
							</li>
							<li>
								<Link href="/builds" className="hover:text-[#FFB400] transition-colors">
									Assembled_Modules
								</Link>
							</li>
							<li>
								<Link href="/peripherals" className="hover:text-[#FFB400] transition-colors">
									Peripherals
								</Link>
							</li>
							<li>
								<Link href="/support" className="hover:text-[#FFB400] transition-colors">
									Technical_Support
								</Link>
							</li>
						</ul>
					</div>

					{/* Transfers Links (2 Columns) */}
					<div className="lg:col-span-2">
						<h4 className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-2">Transfers</h4>
						<ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									Global_Express
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									Tracking_Node
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									Warranty_Auth
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-[#FFB400] transition-colors">
									Return_Logistics
								</Link>
							</li>
						</ul>
					</div>

					{/* Live System Status (4 Columns) */}
					<div className="lg:col-span-4 bg-white/1 border border-white/5 p-6 rounded-sm relative overflow-hidden">
						{/* Subtle Corner Detail */}
						<div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#FFB400]/20" />

						<h4 className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
							<Globe size={14} className="text-[#FFB400]" />
							Foundry_Status_Feed
						</h4>
						<TerminalStatus />
					</div>
				</div>

				{/* BOTTOM BAR: PROTOCOLS */}
				<div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex items-center gap-6 text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest opacity-40">
						<span>© 2025 BASE_60_FOUNDRY</span>
						<span className="hidden sm:inline">ORIGIN: BABYLON_IRQ_NODE_01</span>
						<span className="hidden sm:inline">SEC_PROTOCOL: AES_60_ENCRYPTED</span>
					</div>
					<div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-[#94A3B8]">
						<Link href="#" className="hover:text-[#F5F5F0]">
							Privacy_Policy
						</Link>
						<Link href="#" className="hover:text-[#F5F5F0]">
							Terms_Of_Assembly
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
