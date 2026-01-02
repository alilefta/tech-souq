import { SectorInitializationForm } from "@/components/admin/categories/sector-initialization-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Sector Initialization Protocol | BASE 60 Admin",
};

export default function NewSectorPage() {
	return (
		<div className="max-w-5xl mx-auto space-y-10">
			{/* HUD HEADER */}
			<header className="flex items-center justify-between border-b border-white/5 pb-8">
				<div className="flex flex-col gap-2">
					<Link href="/admin/categories" className="flex items-center gap-2 text-[#94A3B8] text-[9px] font-black uppercase tracking-widest hover:text-[#FFB400] transition-all group">
						<ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
						Back_To_Registry
					</Link>
					<h1 className="text-4xl font-black uppercase tracking-tighter text-[#F5F5F0]">
						Sector_<span className="text-[#FFB400]">Initialization</span>
					</h1>
				</div>

				<div className="hidden md:flex flex-col items-end opacity-40">
					<span className="text-[8px] font-mono uppercase tracking-widest text-[#94A3B8]">Protocol_Type</span>
					<span className="text-[10px] font-bold text-[#F5F5F0] tracking-tighter">TOPOGRAPHICAL_MAPPING</span>
				</div>
			</header>

			<SectorInitializationForm isEdit={false} />
		</div>
	);
}
