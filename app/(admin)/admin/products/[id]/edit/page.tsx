import { getFlatCategories } from "@/app/data/category";
import { getProductById } from "@/app/data/products"; // Create this helper
import { ModuleDeploymentForm } from "@/components/admin/products/module-deployment-form";
import { editProductSchema } from "@/lib/schemas/product";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import z from "zod";

export default async function EditModulePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const [product, categories] = await Promise.all([getProductById(Number(id)), getFlatCategories()]);

	if (!product) notFound();

	// Map DB structure to Form structure
	const initialData: z.infer<typeof editProductSchema> = {
		...product,
		categoryId: String(product.category.id),
		images: product.images.map((url) => ({ url })),
		originalPrice: product.originalPrice ?? 0,
		stock: product.stock ?? 0,
		id: String(product.id),
	};

	return (
		<div className="max-w-6xl mx-auto space-y-10">
			<header className="border-b border-white/5 pb-8">
				<Link href="/admin/products" className="flex items-center gap-2 mb-2 text-[#94A3B8] text-[9px] font-black uppercase tracking-widest hover:text-[#FFB400] transition-colors group">
					<ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
					Back_To_Registry
				</Link>
				<h1 className="text-4xl font-black uppercase tracking-tighter text-[#F5F5F0]">
					Module_<span className="text-[#FFB400]">Reconfiguration</span>
				</h1>
				<p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-[0.2em] mt-2">Adjusting_Logic_ID: {product.sku}</p>
			</header>

			<ModuleDeploymentForm
				rawCategories={categories}
				isEdit={true}
				initialData={initialData} // Cast specifically to DeploymentData
			/>
		</div>
	);
}
