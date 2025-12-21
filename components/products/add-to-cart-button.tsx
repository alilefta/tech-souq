"use client";

import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";

export function AddToCartButton({ product }: { product: any }) {
	const handleAdd = () => {
		console.log(`Adding ${product.name} to Babylonian cart...`);
		// Your cart state logic here
	};

	return (
		<motion.button
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onClick={handleAdd}
			className="flex-1 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] py-5 flex items-center justify-center gap-3"
		>
			Initialize Order <ShoppingBag size={18} strokeWidth={2.5} />
		</motion.button>
	);
}
