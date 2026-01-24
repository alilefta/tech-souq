import { TrackingTerminal } from "@/components/tracking/tracking-terminal";
import { Radar, Satellite, Activity } from "lucide-react";

export const metadata = {
	title: "Tracking Node | BASE 60",
	description: "Real-time geospatial monitoring of deployed hardware.",
};

export default function TrackingPage() {
	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 lg:pt-32 pb-20 font-sans selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-4xl mx-auto px-6 lg:px-8">
				{/* 1. HEADER: SATELLITE LINK */}
				<header className="mb-16 text-center space-y-6">
					<div className="inline-flex items-center gap-3 px-4 py-2 border border-white/5 bg-white/1">
						<Satellite size={14} className="text-[#FFB400] animate-pulse" />
						<span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#94A3B8]">Uplink_Established: Node_Alpha</span>
					</div>

					<h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-[#F5F5F0]">
						Tracking <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Node</span>
					</h1>

					<p className="text-[#94A3B8] text-sm md:text-base font-medium max-w-lg mx-auto">
						Enter your unique <span className="text-[#FFB400] font-mono">Manifest_ID</span> to triangulate the geospatial position of your hardware shipment.
					</p>
				</header>

				{/* 2. THE INTERACTIVE TERMINAL */}
				<TrackingTerminal />
			</div>
		</main>
	);
}
