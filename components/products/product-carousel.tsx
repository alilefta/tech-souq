// components/products/product-carousel.tsx
"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { ProductCard } from "@/components/product-card-v2";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCardDTO } from "@/app/data/products";
import { Button } from "../ui/button";

export function ProductCarousel({ products }: { products: ProductCardDTO[] }) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const { scrollLeft, clientWidth } = scrollRef.current;
			const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
			scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
		}
	};

	return (
		<div className="group relative">
			{/* 1. CUSTOM BABYLONIAN NAVIGATION */}
			<div className="absolute -top-16 right-0 flex gap-4 z-20">
				<Button
					onClick={() => scroll("left")}
					className="w-12 h-12 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:border-[#FFB400] hover:text-[#FFB400] transition-all bg-[#0A0E14] relative overflow-hidden"
					aria-label="Previous Module"
				>
					<ChevronLeft size={20} />
					{/* Babylonian corner detail */}
					<div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFB400]/40 opacity-0 group-hover:opacity-100" />
				</Button>

				<Button
					onClick={() => scroll("right")}
					className="w-12 h-12 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:border-[#FFB400] hover:text-[#FFB400] transition-all bg-[#0A0E14] relative"
					aria-label="Next Module"
				>
					<ChevronRight size={20} />
					<div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFB400]/40 opacity-0 group-hover:opacity-100" />
				</Button>
			</div>

			{/* 2. THE SCROLLABLE TRACK */}
			<div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-12 scroll-smooth">
				{products &&
					products.length > 0 &&
					products.map((product, index) => (
						<div key={product.id} className="w-70 md:w-[320px] shrink-0 snap-start">
							{/* We reuse the ProductCard we designed earlier */}
							<ProductCard product={product} />

							{/* Added Synergy Detail for Related Section */}
							<div className="mt-4 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
								<div className="flex items-center gap-2">
									<div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
									<span className="text-[8px] font-mono text-[#94A3B8] uppercase">Compatibility_High</span>
								</div>
								<span className="text-[9px] font-bold text-[#FFB400]">99.8%</span>
							</div>
						</div>
					))}

				{/* End Placeholder to maintain spacing */}
				<div className="w-20 shrink-0" />
			</div>

			{/* 3. VISUAL PROGRESS BAR (Interactive) */}
			<div className="w-full h-px bg-white/5 relative mt-4">
				<motion.div
					className="absolute top-0 left-0 h-full bg-[#FFB400]/40 w-1/4"
					animate={{ x: "0%" }} // In a full implementation, tie this to scrollLeft %
				/>
			</div>
		</div>
	);
}
