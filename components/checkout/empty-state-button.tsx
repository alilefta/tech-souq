"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export function EmptyStateButton() {
	const router = useRouter();

	return (
		<motion.button
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onClick={() => router.push("/products")}
			className="group relative px-10 py-5 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,180,0,0.1)] hover:shadow-[0_0_50px_rgba(255,180,0,0.3)] overflow-hidden transition-all"
		>
			<span className="relative z-10 flex items-center gap-3">
				<ArrowLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
				Return_To_Registry
			</span>

			{/* Kinetic Beam */}
			<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
				<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-[30deg] bg-white/40 -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
			</div>
		</motion.button>
	);
}
