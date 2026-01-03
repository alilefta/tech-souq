"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Database, ArrowRight, Loader2 } from "lucide-react";
import { searchFoundryRegistry } from "@/app/actions/admin-search";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export function HeaderSearch() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const debouncedQuery = useDebounce({ value: query, delay: 300 });
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	// 1. KEYBOARD SHORTCUT PROTOCOL (CMD+K)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				inputRef.current?.focus();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// 2. REGISTRY SCAN EXECUTION
	useEffect(() => {
		if (debouncedQuery.length >= 2) {
			const scan = async () => {
				setIsSearching(true);
				const res = await searchFoundryRegistry(debouncedQuery);
				if (res.success) setResults(res.results || []);
				setIsSearching(false);
				setIsOpen(true);
			};
			scan();
		} else {
			setResults([]);
			setIsOpen(false);
		}
	}, [debouncedQuery]);

	return (
		<div className="relative group w-full max-w-xl">
			<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#FFB400] opacity-40 group-focus-within:opacity-100 transition-opacity">
				{isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
			</div>

			<input
				ref={inputRef}
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay for click selection
				placeholder="QUICK_REGISTRY_LOOKUP (CMD+K)"
				className="w-full bg-white/2 border border-white/10 rounded-none h-10 pl-10 pr-4 text-[10px] font-mono uppercase tracking-widest placeholder:text-white/10 focus:outline-none focus:border-[#FFB400]/40 transition-all text-[#F5F5F0]"
			/>

			{/* 3. RESULTS PORTAL */}
			<AnimatePresence>
				{isOpen && results.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						className="absolute top-full left-0 w-full mt-2 bg-[#0A0E14] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
					>
						<div className="p-2 border-b border-white/5 bg-white/[0.01]">
							<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.3em]">Query_Results: [{results.length}]</span>
						</div>

						<div className="max-h-80 overflow-y-auto custom-scrollbar">
							{results.map((res, i) => (
								<button
									key={i}
									onClick={() => {
										router.push(res.path);
										setQuery("");
									}}
									className="w-full p-4 flex items-center justify-between hover:bg-[#FFB400]/5 group/item transition-colors border-b border-white/[0.02] text-left"
								>
									<div className="flex items-center gap-4">
										<div className="text-[8px] font-black px-1.5 py-0.5 border border-white/10 text-[#94A3B8] group-hover/item:text-[#FFB400] group-hover/item:border-[#FFB400]/40 transition-colors">
											{res.type}
										</div>
										<div>
											<p className="text-[11px] font-bold text-[#F5F5F0] uppercase tracking-tight">{res.label}</p>
											<p className="text-[8px] font-mono text-[#94A3B8] opacity-40 uppercase">{res.sub}</p>
										</div>
									</div>
									<ArrowRight size={14} className="text-[#94A3B8] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
								</button>
							))}
						</div>

						<div className="p-3 bg-white/2 flex justify-between items-center">
							<span className="text-[7px] font-mono text-[#94A3B8] opacity-30">ENCRYPTION: AES-256_ACTIVE</span>
							<Database size={10} className="text-[#94A3B8] opacity-20" />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
