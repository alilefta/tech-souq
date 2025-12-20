// components/home/testimonial-section.tsx
import { TestimonialCard } from "@/components/home/testimonial-card";

const testimonials = [
	{
		id: 1,
		name: "Omar Al-Farsi",
		role: "Senior VFX Artist",
		location: "Dubai, UAE",
		quote: "The Mirage build didn't just meet my expectations; it obliterated them. Rendering 8K scenes is now a silent breeze. TechSouq is the new gold standard.",
		hardware: "The Mirage / RT-Tier",
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
		trustScore: "99.8",
	},
	{
		id: 2,
		name: "Sarah Chen",
		role: "Competitive Gamer",
		location: "Riyadh, KSA",
		quote: "Finding components in the GCC used to be a gamble. TechSouq curates only the best. My frame times have never been more consistent.",
		hardware: "RTX 4090 Phantom",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
		trustScore: "100",
	},
	{
		id: 3,
		name: "Marcus Thorne",
		role: "Full-Stack Developer",
		location: "Global Resident",
		quote: "A tech boutique that understands the 'Souq' soul. The blend of high-end Silicon Valley hardware with local warmth is unmatched. Truly elite.",
		hardware: "Custom Ryzen Build",
		image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
		trustScore: "99.2",
	},
];

export default function TestimonialSection() {
	return (
		<section className="w-full bg-[#0A0E14] py-32 px-8 relative overflow-hidden">
			{/* 1. CULTURAL WATERMARK */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
				<span className="text-[30vw] font-bold text-[#F5F5F0] select-none">الثقة</span>
			</div>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center mb-24">
					<h2 className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.5em] mb-4">Curator Intelligence</h2>
					<h3 className="text-[#F5F5F0] text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
						Voices of the <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB400] to-[#FF8C00]">Vanguard</span>
					</h3>
				</div>

				{/* Testimonial Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{testimonials.map((t, index) => (
						<TestimonialCard key={t.id} data={t} index={index} />
					))}
				</div>

				{/* Bottom Trust Bar */}
				<div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
					<p className="text-[#F5F5F0] font-black tracking-widest text-[10px] uppercase">Verified_Partner_NVIDIA</p>
					<p className="text-[#F5F5F0] font-black tracking-widest text-[10px] uppercase">Authorized_Intel_Reseller</p>
					<p className="text-[#F5F5F0] font-black tracking-widest text-[10px] uppercase">Global_Express_Logistics</p>
				</div>
			</div>
		</section>
	);
}
