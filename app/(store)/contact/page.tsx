import { SignalForm } from "@/components/contact/signal-form";
import { NodeInfo } from "@/components/contact/node-info";
import { Radio, Activity } from "lucide-react";

export const metadata = {
	title: "Signal Uplink | BASE 60",
	description: "Establish a secure connection with the Babylon Foundry.",
};

export default function ContactPage() {
	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 lg:pt-32 pb-20 font-sans selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* 1. HEADER: SIGNAL STATUS */}
				<header className="mb-16 border-b border-white/5 pb-12 relative overflow-hidden">
					{/* Background Noise */}
					<div className="absolute top-0 right-0 opacity-[0.02] text-[#F5F5F0] pointer-events-none select-none">
						<span className="text-[15vw] font-black italic">LINK</span>
					</div>

					<div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<Radio size={14} className="text-[#FFB400] animate-pulse" />
								<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Frequency: OPEN</span>
							</div>
							<h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-[#F5F5F0]">
								Signal <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Uplink</span>
							</h1>
						</div>

						<div className="flex items-center gap-4 px-6 py-3 bg-white/2 border border-white/5">
							<Activity size={16} className="text-green-500" />
							<div className="flex flex-col">
								<span className="text-[8px] font-black text-[#94A3B8] uppercase tracking-widest">Response_Time</span>
								<span className="text-sm font-mono font-bold text-[#F5F5F0]">&lt; 04_HOURS</span>
							</div>
						</div>
					</div>
				</header>

				{/* 2. THE GRID */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
					{/* LEFT: THE TRANSMISSION FORM */}
					<div className="lg:col-span-7">
						<SignalForm />
					</div>

					{/* RIGHT: NODE COORDINATES */}
					<div className="lg:col-span-5">
						<NodeInfo />
					</div>
				</div>
			</div>
		</main>
	);
}
