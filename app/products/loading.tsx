import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="h-10 w-48 bg-muted rounded mb-8 animate-pulse" />

			<div className="flex gap-8">
				{/* Sidebar Skeleton */}
				<div className="hidden lg:block w-64 space-y-6">
					<Skeleton className="h-[200px] w-full" />
					<Skeleton className="h-[200px] w-full" />
				</div>

				{/* Grid Skeleton */}
				<div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{Array.from({ length: 8 }).map((_, i) => (
						<div key={i} className="space-y-4">
							<Skeleton className="aspect-square w-full rounded-xl" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
