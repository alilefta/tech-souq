// app/(admin)/admin/reviews/page.tsx
import { getModuleReviews } from "@/app/data/review"; // Create this server action
import { IntelHeader } from "@/components/admin/reviews/intel-header";
import { Search } from "lucide-react";
import { ReviewRegistryClient } from "@/components/admin/reviews/review-registry-client";
import { FilterReviews } from "@/components/admin/reviews/filter-reviews";
import z from "zod";
import { IntelSearch } from "@/components/admin/reviews/intel-search";

const reviewsParamSchema = z.object({
	query: z.string().optional(),
	integrity: z.string().optional(),
});

interface PageParams {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ReviewIntelPage({ searchParams }: PageParams) {
	const p = await searchParams;

	const { query, integrity } = reviewsParamSchema.parse(p);

	const reviews = await getModuleReviews();

	return (
		<div className="space-y-10 max-w-400 mx-auto">
			<IntelHeader totalReports={reviews.length} />

			{/* COMMAND CONTROLS */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/5 border border-white/5 p-px h-12">
				<div className="md:col-span-6 bg-[#0A0E14] flex items-center ">
					<IntelSearch />
				</div>
				<div className="md:col-span-3 bg-[#0A0E14] flex items-center border-l border-white/5">
					<FilterReviews />
				</div>
				<button className="md:col-span-3 bg-[#1E293B] hover:bg-[#FFB400] hover:text-[#0A0E14] text-[10px] font-black uppercase tracking-[0.2em] transition-all">Re-Sync_Logs</button>
			</div>

			{/* THE INTERACTIVE REGISTRY */}
			<ReviewRegistryClient initialReviews={reviews} />
		</div>
	);
}
