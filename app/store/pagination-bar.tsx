"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
}

export function PaginationBar({ totalPages, currentPage }: PaginationProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(pathname + "?" + params.toString());
	};

	if (totalPages <= 1) return null;

	return (
		<div className="flex items-center justify-center gap-2 mt-8">
			<Button variant="outline" size="icon" disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)}>
				<ChevronLeft className="h-4 w-4" />
			</Button>

			<span className="text-sm font-medium mx-2">
				Page {currentPage} of {totalPages}
			</span>

			<Button variant="outline" size="icon" disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)}>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
}
