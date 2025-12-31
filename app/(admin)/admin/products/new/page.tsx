// app/(admin)/admin/products/new/page.tsx
import { getCategoriesForFilters } from "@/app/data/category";
import { ModuleDeploymentForm } from "@/components/admin/products/module-deployment-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Module Deployment Protocol | BASE 60 Admin",
};

export default async function NewModulePage() {
	// 1. Fetching Sectors (Categories) from Server
	const categories = await getCategoriesForFilters();

	return (
		<div className="max-w-6xl mx-auto space-y-10">
			{/* HEADER PROTOCOL */}
			<div className="flex items-center justify-between border-b border-white/5 pb-8">
				<div className="flex flex-col gap-2">
					<Link href="/admin/products" className="flex items-center gap-2 text-[#94A3B8] text-[9px] font-black uppercase tracking-widest hover:text-[#FFB400] transition-colors group">
						<ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
						Back_To_Registry
					</Link>
					<h1 className="text-4xl font-black uppercase tracking-tighter text-[#F5F5F0]">
						Module_<span className="text-[#FFB400]">Deployment</span>
					</h1>
				</div>

				<div className="hidden md:flex flex-col items-end opacity-40">
					<span className="text-[8px] font-mono uppercase tracking-widest text-[#94A3B8]">Auth_Level</span>
					<span className="text-[10px] font-bold text-[#F5F5F0] tracking-tighter">[MASTER_ARCHITECT]</span>
				</div>
			</div>

			{/* 2. INJECTING CLIENT FORM */}
			<ModuleDeploymentForm rawCategories={categories} />
		</div>
	);
}
