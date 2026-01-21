"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, CornerDownLeft, Terminal, Activity, Box, Layers } from "lucide-react";
import { searchStorefront } from "@/app/actions/store-search";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { SafeImage } from "../ui/safe-image";
import { cn } from "@/lib/utils";

interface FoundrySearchProps {
	isOpen: boolean;
	onClose: () => void;
}

export function FoundrySearch({ isOpen, onClose }: FoundrySearchProps) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<{ products: any[]; categories: any[] } | null>(null);
	const [isSearching, setIsSearching] = useState(false);
	const debouncedQuery = useDebounce({ value: query, delay: 300 });
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	// 1. FOCUS TRAP & SHORTCUTS
	useEffect(() => {
		if (isOpen) {
			setTimeout(() => inputRef.current?.focus(), 100);
			document.body.style.overflow = "hidden"; // Lock scroll
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	// 2. SEARCH EXECUTION
	useEffect(() => {
		if (debouncedQuery.length >= 2) {
			const scan = async () => {
				setIsSearching(true);
				const res = await searchStorefront(debouncedQuery);
				if (res.success && res.data) setResults(res.data);
				setIsSearching(false);
			};
			scan();
		} else {
			setResults(null);
		}
	}, [debouncedQuery]);

	const handleNavigate = (path: string) => {
		router.push(path);
		onClose();
		setQuery("");
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
					{/* BACKDROP BLUR */}
					<div className="absolute inset-0 bg-[#0A0E14]/80 backdrop-blur-xl" onClick={onClose} />

					{/* THE TERMINAL WINDOW */}
					<motion.div
						initial={{ y: -20, scale: 0.95 }}
						animate={{ y: 0, scale: 1 }}
						exit={{ y: -20, scale: 0.95 }}
						className="relative w-full max-w-2xl bg-[#0A0E14] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden font-sans"
					>
						{/* HEADER / INPUT */}
						<div className="relative border-b border-white/5 bg-white/1">
							<div className="absolute top-0 left-0 w-1 h-full bg-[#FFB400]" />
							<div className="flex items-center px-6 h-16 gap-4">
								<Search className={cn("w-5 h-5", isSearching ? "text-[#FFB400] animate-pulse" : "text-[#94A3B8]")} />
								<input
									ref={inputRef}
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="INITIALIZE_SEARCH_PROTOCOL..."
									className="flex-1 bg-transparent border-none outline-none text-sm font-mono uppercase tracking-widest text-[#F5F5F0] placeholder:text-white/20"
								/>
								<button onClick={onClose} className="p-1 text-[#94A3B8] hover:text-red-500 transition-colors">
									<span className="sr-only">Close</span>
									<div className="text-[9px] font-black border border-current px-1.5 py-0.5 uppercase tracking-widest">ESC</div>
								</button>
							</div>
							{/* Scanning Bar Animation */}
							{isSearching && <div className="absolute bottom-0 left-0 h-[1px] bg-[#FFB400] w-full animate-[shimmer_1.5s_infinite]" />}
						</div>

						{/* RESULTS AREA */}
						<div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
							{!results && !query && (
								<div className="p-12 text-center opacity-40">
									<Terminal size={48} className="mx-auto text-[#94A3B8] mb-4" />
									<p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F5F5F0]">Terminal_Ready</p>
									<p className="text-[9px] font-mono text-[#94A3B8] mt-2">Awaiting input for global registry scan...</p>
								</div>
							)}

							{results && (
								<div className="p-2 space-y-6">
									{/* SECTORS (Categories) */}
									{results.categories.length > 0 && (
										<div>
											<p className="px-4 py-2 text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.2em] flex items-center gap-2">
												<Layers size={12} /> Related_Sectors
											</p>
											{results.categories.map((cat) => (
												<button
													key={cat.id}
													onClick={() => handleNavigate(`/categories/${cat.slug}`)}
													className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 group transition-colors border-l-2 border-transparent hover:border-[#FFB400]"
												>
													<span className="text-xs font-bold text-[#F5F5F0] uppercase tracking-wider group-hover:translate-x-1 transition-transform">{cat.name}</span>
													<ArrowRight size={14} className="text-[#94A3B8] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
												</button>
											))}
										</div>
									)}

									{/* MODULES (Products) */}
									{results.products.length > 0 ? (
										<div>
											<p className="px-4 py-2 text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.2em] flex items-center gap-2">
												<Box size={12} /> Detected_Modules
											</p>
											{results.products.map((product) => (
												<button
													key={product.id}
													onClick={() => handleNavigate(`/products/${product.slug}`)}
													className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/5 group transition-colors"
												>
													<div className="relative w-12 h-12 bg-white/[0.02] border border-white/10 shrink-0">
														<SafeImage src={product.images[0]} alt="" fill className="object-contain p-1 grayscale group-hover:grayscale-0 transition-all" />
													</div>
													<div className="flex-1 text-left">
														<div className="flex items-center gap-2">
															<span className="text-[8px] font-black text-[#FFB400] bg-[#FFB400]/10 px-1">{product.brand}</span>
															<span className="text-[10px] font-bold text-[#F5F5F0] uppercase line-clamp-1 group-hover:text-[#FFB400] transition-colors">
																{product.name}
															</span>
														</div>
														<div className="flex items-center gap-2 mt-1">
															<span className="text-[9px] font-mono text-[#94A3B8] uppercase">{product.category.name}</span>
															<span className="text-[#94A3B8] text-[8px]">•</span>
															<span className="text-[10px] font-mono text-[#F5F5F0]">${product.price}</span>
														</div>
													</div>
													<CornerDownLeft size={14} className="text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity" />
												</button>
											))}
										</div>
									) : (
										query.length > 2 && (
											<div className="px-4 py-8 text-center border border-dashed border-white/10 mx-4">
												<Activity size={24} className="mx-auto text-red-500 mb-2 opacity-50" />
												<p className="text-[10px] font-black uppercase text-[#F5F5F0]">Signal_Lost</p>
												<p className="text-[9px] text-[#94A3B8] mt-1 font-mono">No matching artifacts found in registry.</p>
											</div>
										)
									)}
								</div>
							)}
						</div>

						{/* FOOTER */}
						<div className="bg-[#0A0E14] border-t border-white/5 p-2 flex justify-between items-center px-4">
							<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-[0.2em]">Search_Protocol_v2</span>
							<div className="flex gap-4">
								<span className="text-[9px] font-mono text-[#94A3B8] uppercase">
									Use <span className="text-[#F5F5F0]">↑↓</span> to Navigate
								</span>
								<span className="text-[9px] font-mono text-[#94A3B8] uppercase">
									<span className="text-[#F5F5F0]">ENTER</span> to Select
								</span>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
