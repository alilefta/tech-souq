// components/products/PaginationBar.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
}

export function PaginationBar({ currentPage, totalPages }: PaginationProps) {
	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	const navigate = (page: number) => {
		if (page < 1 || page > totalPages) return;
		replace(createPageURL(page), { scroll: false });
	};

	if (totalPages <= 1) return null;

	return (
		<div className="flex flex-col items-center gap-6">
			{/* PAGE READOUT */}
			<div className="flex items-center gap-4">
				<div className="h-[1px] w-12 bg-white/5" />
				<span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-[0.3em]">
					Registry_Sector:{" "}
					<span className="text-[#F5F5F0] font-bold">
						[{currentPage.toString().padStart(2, "0")} / {totalPages.toString().padStart(2, "0")}]
					</span>
				</span>
				<div className="h-[1px] w-12 bg-white/5" />
			</div>

			{/* NAVIGATION CONTROLS */}
			<nav className="flex items-center gap-2">
				<PaginationButton onClick={() => navigate(1)} disabled={currentPage === 1} icon={<ChevronsLeft size={16} />} />
				<PaginationButton onClick={() => navigate(currentPage - 1)} disabled={currentPage === 1} icon={<ChevronLeft size={16} />} />

				{/* NUMBERED STREAM */}
				<div className="flex items-center px-4 gap-1">
					{Array.from({ length: totalPages }, (_, i) => i + 1)
						.filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
						.map((page, index, array) => (
							<div key={page} className="flex items-center">
								{index > 0 && array[index - 1] !== page - 1 && <span className="text-[#94A3B8] px-2 opacity-20">...</span>}
								<button
									onClick={() => navigate(page)}
									className={`w-10 h-10 font-mono text-xs flex items-center justify-center transition-all ${
										currentPage === page ? "text-[#0A0E14] bg-[#FFB400] font-black shadow-[0_0_20px_rgba(255,180,0,0.3)]" : "text-[#94A3B8] hover:text-[#F5F5F0] hover:bg-white/5"
									}`}
								>
									{page.toString().padStart(2, "0")}
								</button>
							</div>
						))}
				</div>

				<PaginationButton onClick={() => navigate(currentPage + 1)} disabled={currentPage === totalPages} icon={<ChevronRight size={16} />} />
				<PaginationButton onClick={() => navigate(totalPages)} disabled={currentPage === totalPages} icon={<ChevronsRight size={16} />} />
			</nav>
		</div>
	);
}

function PaginationButton({ onClick, disabled, icon }: { onClick: () => void; disabled: boolean; icon: React.ReactNode }) {
	return (
		<Button
			onClick={onClick}
			disabled={disabled}
			className={`w-10 h-10 flex items-center justify-center border border-white/5 transition-all ${
				disabled ? "opacity-20 cursor-not-allowed" : "text-[#94A3B8] hover:text-[#FFB400] hover:border-[#FFB400]/40 bg-white/[0.02]"
			}`}
		>
			{icon}
		</Button>
	);
}
