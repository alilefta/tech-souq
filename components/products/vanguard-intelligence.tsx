// components/products/vanguard-intelligence.tsx
import { Star, MessageSquare, Terminal, ShieldCheck } from "lucide-react";
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
		<section className="w-full bg-[#0A0E14] py-32 border-t border-white/5 relative overflow-hidden">
			{/* Background Technical Watermark */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.01]">
				<span className="text-[25vw] font-black italic select-none">REPORTS</span>
			</div>

			<div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
				{/* Header Terminal */}
				<div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
					<div className="max-w-2xl">
						<h2 className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
							<Terminal size={14} />
							Vanguard_Intelligence_Feed
						</h2>
						<h3 className="text-[#F5F5F0] text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.9]">
							System <br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Verification</span> Logs
						</h3>
					</div>

					<div className="flex flex-col items-end gap-4">
						<div className="flex items-center gap-6">
							<div className="text-right">
								<p className="text-[#94A3B8] text-[9px] font-black uppercase tracking-widest mb-1">Global_Avg_Integrity</p>
								<p className="text-[#FFB400] text-3xl font-black tracking-tighter">98.4%</p>
							</div>
							<button className="px-8 py-4 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,180,0,0.3)] transition-all flex items-center gap-3">
								Submit_Report <MessageSquare size={16} />
							</button>
						</div>
					</div>
				</div>

				{/* Reviews Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
					{reviews.map((review) => (
						<ReviewCard key={review.id} review={review} />
					))}
				</div>
			</div>
		</section>
	);
}
