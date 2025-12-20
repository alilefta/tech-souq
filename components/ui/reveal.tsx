// components/Reveal.tsx
"use client";

import { motion } from "motion/react";

export const Reveal = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}>
			{children}
		</motion.div>
	);
};
