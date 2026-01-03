export default function Loading() {
	return (
		<div className="bg-[#0A0E14] min-h-screen pt-24 lg:pt-32 pb-20 overflow-hidden">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* 1. BREADCRUMBS SKELETON */}
				<div className="w-32 h-3 bg-white/5 rounded-full mb-12 animate-pulse" />

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
					{/* 2. LEFT COLUMN: IMAGE SKELETON (Sticky) */}
					<div className="lg:col-span-6 lg:sticky lg:top-32 h-fit">
						<div className="relative aspect-square bg-white/[0.03] border border-white/5 rounded-sm overflow-hidden">
							{/* Decorative Scanline Animation */}
							<div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFB400]/5 to-transparent h-1/2 w-full animate-[scan_3s_linear_infinite]" />

							{/* Corner Brackets (Static even in loading) */}
							<div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/10" />
							<div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/10" />

							{/* Central Logo Placeholder */}
							<div className="absolute inset-0 flex items-center justify-center opacity-10">
								<div className="w-20 h-20 border-2 border-dashed border-[#FFB400] rounded-full spin-slow" />
							</div>
						</div>
					</div>

					{/* 3. RIGHT COLUMN: CONTENT SKELETON */}
					<div className="lg:col-span-6 flex flex-col">
						<div className="border-b border-white/5 pb-8 mb-8">
							{/* Category & Status */}
							<div className="flex items-center gap-3 mb-6">
								<div className="w-20 h-2 bg-[#FFB400]/20 rounded-full animate-pulse" />
								<div className="h-[1px] w-6 bg-white/10" />
								<div className="w-16 h-2 bg-white/5 rounded-full animate-pulse" />
							</div>

							{/* Title (Massive) */}
							<div className="space-y-4 mb-8">
								<div className="w-1/3 h-6 bg-white/10 rounded-full animate-pulse" />
								<div className="w-full h-16 bg-white/5 rounded-sm animate-pulse" />
								<div className="w-2/3 h-16 bg-white/5 rounded-sm animate-pulse" />
							</div>

							{/* Price */}
							<div className="flex items-end gap-6">
								<div className="w-40 h-12 bg-[#FFB400]/10 rounded-sm animate-pulse" />
								<div className="w-24 h-4 bg-white/5 rounded-full animate-pulse mb-2" />
							</div>
						</div>

						{/* Description Paragraphs */}
						<div className="space-y-3 mb-12">
							<div className="w-full h-3 bg-white/5 rounded-full animate-pulse" />
							<div className="w-full h-3 bg-white/5 rounded-full animate-pulse" />
							<div className="w-4/5 h-3 bg-white/5 rounded-full animate-pulse" />
						</div>

						{/* Specs Grid Skeleton */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
							{[1, 2, 3, 4].map((i) => (
								<div key={i} className="p-4 border border-white/5 bg-white/[0.01] rounded-sm h-20 animate-pulse" />
							))}
						</div>

						{/* Buttons Skeleton */}
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="w-full sm:w-32 h-14 bg-white/5 border border-white/10 rounded-sm animate-pulse" />
							<div className="flex-1 h-14 bg-[#FFB400]/10 rounded-sm animate-pulse" />
						</div>
					</div>
				</div>

				{/* 4. LOWER DATA TERMINAL SKELETON */}
				<div className="mt-32 pt-24 border-t border-white/5">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
						<div className="lg:col-span-7 space-y-6">
							<div className="w-32 h-2 bg-[#FFB400]/20 rounded-full mb-8" />
							<div className="w-full h-40 bg-white/[0.01] rounded-sm animate-pulse" />
						</div>
						<div className="lg:col-span-5">
							<div className="w-full h-80 bg-white/2 border border-white/5 rounded-sm animate-pulse" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
