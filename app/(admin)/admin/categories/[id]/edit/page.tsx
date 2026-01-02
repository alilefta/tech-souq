// app/(admin)/admin/categories/[id]/edit/page.tsx
import { getCategoryById } from "@/app/data/category"; // Ensure you have this helper
import { SectorInitializationForm } from "@/components/admin/categories/sector-initialization-form";
import { SectorData } from "@/lib/schemas/category";
import { ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
	title: "Sector Reconfiguration | BASE 60 Admin",
};

export default async function EditSectorPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const sector = await getCategoryById(Number(id));

	if (!sector) notFound();

	// Prepare data for the form
	const initialData: SectorData = {
		name: sector.name,
		arabicName: sector.arabicName || "",
		slug: sector.slug,
		description: sector.description || "",
		gridDisplay: sector.gridDisplay as "small" | "medium" | "large" | "tall",
		imageUrl: sector.imageUrl || "",
	};

	return (
		<div className="max-w-5xl mx-auto space-y-10">
			{/* HEADER PROTOCOL */}
			<header className="flex items-center justify-between border-b border-white/5 pb-8">
				<div className="flex flex-col gap-2">
					<Link href="/admin/categories" className="flex items-center gap-2 text-[#94A3B8] text-[9px] font-black uppercase tracking-widest hover:text-[#FFB400] transition-colors group">
						<ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
						Back_To_Registry
					</Link>
					<h1 className="text-4xl font-black uppercase tracking-tighter text-[#F5F5F0]">
						Sector_<span className="text-[#FFB400]">Reconfiguration</span>
					</h1>
					<p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-[0.2em] mt-1">Adjusting_Sector_Coordinates: {sector.slug}</p>
				</div>

				<div className="flex flex-col items-end opacity-40">
					<div className="flex items-center gap-2 text-[#FFB400]">
						<Terminal size={12} />
						<span className="text-[8px] font-mono uppercase tracking-widest">Live_Edit_Active</span>
					</div>
					<span className="text-[10px] font-bold text-[#F5F5F0] tracking-tighter mt-1">[MASTER_ARCHITECT]</span>
				</div>
			</header>

			{/* 2. INJECTING FORM WITH DATA */}
			<SectorInitializationForm
				isEdit={true}
				initialData={initialData}
				sectorId={sector.id} // Pass the ID for the update action
			/>
		</div>
	);
}
