// components/products/vanguard-intelligence.tsx
import { Star, MessageSquare, Terminal, ShieldCheck, Activity } from "lucide-react";
import { ReviewCard } from "@/components/products/review-card";

const reviews = [
	{
		id: "LOG-001",
		user: "Zaid Al-Hilli",
		location: "Baghdad, IRQ",
		rank: "Elite Builder",
		rating: 5,
		date: "2025.12.15",
		comment: "The thermal management on this unit is surgical. Even in 45°C ambient, the clock speeds remained locked. A true testament to the Babylon Hub optimization.",
		tags: ["Extreme_Stability", "Premium_Finish"],
		integrity: 99.8,
	},
	{
		id: "LOG-002",
		user: "Elena Volkov",
		location: "Berlin, DEU",
		rank: "VFX Architect",
		rating: 5,
		date: "2025.12.18",
		comment: "Ordered from the Berlin node. Delivery was a 'Global Express' miracle—3 days from Babylon. The hardware synergy with my existing rendering rack is 1:1.",
		tags: ["Fast_Transit", "Plug_And_Play"],
		integrity: 100,
	},
	{
		id: "LOG-003",
		user: "Fahad bin Rashid",
		location: "Riyadh, KSA",
		rank: "Competitive Pro",
		rating: 4,
		date: "2025.12.20",
		comment: "Packaging was overkill (in a good way). The unboxing felt like opening a piece of history. One small firmware update was needed for my specific BIOS, but now it's a beast.",
		tags: ["Hardware_Vault", "High_FPS"],
		integrity: 94.5,
	},
];

export default function VanguardIntelligence() {
	return (
		<section className="w-full bg-[#0A0E14] py-16 lg:py-32 border-t border-white/5 relative overflow-hidden">
			{/* Background Technical Watermark - Scaled for Mobile */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.01] select-none">
				<span className="text-[40vw] lg:text-[25vw] font-black italic">REPORTS</span>
			</div>

			<div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
				{/* 1. HEADER TERMINAL: Responsive Layout */}
				<div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 lg:mb-20 gap-8">
					{/* Title Module */}
					<div className="max-w-2xl">
						<h2 className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
							<Terminal size={12} />
							Vanguard_Log_Feed
						</h2>
						<h3 className="text-[#F5F5F0] text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.9]">
							System <br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Verification</span> Logs
						</h3>
					</div>

					{/* 2. SYSTEM STATUS BAR (Mobile optimized) */}
					<div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-6 lg:gap-10 p-6 lg:p-0 bg-white/2 lg:bg-transparent border border-white/5 lg:border-none">
						<div className="flex items-center justify-between sm:flex-col sm:items-start gap-1">
							<div className="flex items-center gap-2">
								<Activity size={10} className="text-[#FFB400] opacity-50" />
								<p className="text-[#94A3B8] text-[8px] lg:text-[9px] font-black uppercase tracking-widest opacity-50">Global_Avg_Integrity</p>
							</div>
							<p className="text-[#FFB400] text-2xl lg:text-3xl font-black tracking-tighter font-mono">98.4%</p>
						</div>

						<button className="flex-1 lg:flex-none px-8 py-4 bg-[#FFB400] text-[#0A0E14] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,180,0,0.1)]">
							Submit_Report <MessageSquare size={14} />
						</button>
					</div>
				</div>

				{/* 3. LOGS GRID: Dynamic Column Scaling */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 shadow-2xl">
					{reviews.map((review) => (
						<ReviewCard key={review.id} review={review} />
					))}
				</div>

				{/* Footer Meta (Mobile only detail) */}
				<div className="mt-8 flex items-center justify-between lg:hidden opacity-30">
					<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.3em]">End_Of_Feed</span>
					<div className="flex gap-1">
						{[1, 2, 3].map((i) => (
							<div key={i} className="w-1 h-1 bg-white/20 rounded-full" />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
