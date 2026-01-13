"use client";

import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck, Terminal, ArrowRight, ChevronRight, Lock, Activity, AlertTriangle, List, Box, PlusSquare, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUILD_STEPS, isStepAuthorized, useBuilderStore } from "@/store/useBuilderStore";
import { ProductBuilderDTO } from "@/app/data/products";
import { resolveCompatibility } from "@/lib/builder/resolver";
import { BuilderModuleCard } from "./builder-module-card";
import { useMemo, useState } from "react";
import { ModuleInspectionSheet } from "./module-inspection-sheet";
import { toast } from "sonner";
import { useCart } from "@/store/useCart";
import { SystemAlertTicker } from "./system-alert-ticker";
import { ModuleSelectionSheet } from "./module-selection-sheet";

export function CrucibleHUD({ allProducts }: { allProducts: ProductBuilderDTO[] }) {
	const { currentStep, setStep, manifest, setComponent, resetFoundry } = useBuilderStore();
	const { addItem } = useCart(); // Access Cart Logic

	// LOGIC: Filter products based on current step
	const activeType = BUILD_STEPS[currentStep];
	// 1. PERFORMANCE: Memoize expensive filters
	// This prevents the array from being rebuilt on every single render
	const availableModules = useMemo(() => {
		return allProducts.filter((p) => p.compatibility?.type === (activeType === "STORAGE1" || activeType === "STORAGE2" ? "STORAGE" : activeType));
	}, [allProducts, activeType]);
	// LOGIC: Telemetry
	const alerts = resolveCompatibility(manifest);
	const totalPrice = Object.values(manifest).reduce((acc, item) => acc + (Number(item?.price) || 0), 0);
	const criticalAlert = alerts.find((a) => a.severity === "CRITICAL");

	// STATE: UI Modes
	const [mobileView, setMobileView] = useState<"CONFIG" | "VISUAL">("CONFIG");
	const [inspectedModule, setInspectedModule] = useState<ProductBuilderDTO | null>(null);
	const [isRegistryOpen, setIsRegistryOpen] = useState(false);

	// ACTION: Authorize Build (Add all parts to cart)
	const handleAuthorize = () => {
		const parts = Object.values(manifest).filter((p) => p !== null);
		if (parts.length === 0) {
			toast.error("PROTOCOL_ERROR", { description: "MANIFEST_EMPTY // CANNOT_AUTHORIZE" });
			return;
		}

		// Add each part to the main cart
		// In a real app, you might create a "Bundle" product instead
		parts.forEach((part) => addItem(part, 1)); // Cast if DTOs align

		toast.success("BUILD_AUTHORIZED", { description: "SYSTEM_CONFIG_TRANSFERRED_TO_LOGISTICS" });
	};

	return (
		<div className="h-dvh w-full flex flex-col pointer-events-none font-sans overflow-hidden">
			{/* 1. TOP HEADER (Responsive) */}
			<header className="flex-none p-4 lg:p-6 flex justify-between items-start z-50 pointer-events-auto bg-linear-to-b from-black/80 to-transparent lg:bg-none">
				<div className="flex flex-col gap-1 lg:gap-2">
					<div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/5 rounded-full w-fit">
						<Terminal size={12} className="text-[#FFB400]" />
						<span className="text-[#FFB400] text-[9px] font-black uppercase tracking-[0.3em]">Protocol v60.4</span>
					</div>
					<h1 className="text-2xl lg:text-5xl font-black uppercase tracking-tighter text-[#F5F5F0] drop-shadow-2xl">
						Crucible_<span className="text-[#FFB400]">Core</span>
					</h1>
				</div>

				<div className="flex items-center gap-4">
					{/* RESET BUTTON (New Feature) */}
					<button
						onClick={resetFoundry}
						className="p-2 border border-white/10 bg-black/40 backdrop-blur-md text-[#94A3B8] hover:text-red-500 hover:border-red-500/40 transition-all rounded-full lg:rounded-none"
						title="Reset Build"
					>
						<RotateCcw size={16} />
					</button>

					{/* MOBILE TOGGLE */}
					<div className="lg:hidden flex bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1 pointer-events-auto">
						<button
							title="Show Config"
							onClick={() => setMobileView("CONFIG")}
							className={cn("p-2 rounded-full transition-all", mobileView === "CONFIG" ? "bg-[#FFB400] text-[#0A0E14]" : "text-[#94A3B8]")}
						>
							<List size={16} />
						</button>
						<button
							title="Show 3D View"
							onClick={() => setMobileView("VISUAL")}
							className={cn("p-2 rounded-full transition-all", mobileView === "VISUAL" ? "bg-[#FFB400] text-[#0A0E14]" : "text-[#94A3B8]")}
						>
							<Box size={16} />
						</button>
					</div>

					{/* DESKTOP TOTAL */}
					<div className="hidden lg:block bg-[#FFB400] px-6 py-2 text-[#0A0E14] shadow-[0_0_50px_rgba(255,180,0,0.2)] pointer-events-auto">
						<p className="text-[9px] font-black uppercase tracking-widest mb-1">Total_Allocation</p>
						<div className="flex items-baseline gap-2">
							<span className="text-4xl font-black tracking-tighter">${totalPrice.toLocaleString()}</span>
							<span className="text-[10px] font-bold">USD</span>
						</div>
					</div>
				</div>
			</header>
			<div className="flex-1 relative min-h-0">
				{/* 2. DESKTOP SIDEBARS (Hidden on Mobile) */}
				<aside className="absolute left-6 top-0 bottom-6 w-64 pointer-events-auto hidden lg:flex flex-col gap-4 z-40">
					<div className="bg-black/60 border border-white/5 backdrop-blur-xl flex-1 overflow-hidden flex flex-col rounded-none">
						<div className="p-4 border-b border-white/5 flex justify-between items-center">
							<h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#94A3B8]">Assembly_Chain</h2>
							<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
						</div>
						<div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
							{BUILD_STEPS.map((step, i) => {
								const isAuthorized = isStepAuthorized(i, manifest);
								const isActive = currentStep === i;
								return (
									<button
										key={step}
										disabled={!isAuthorized}
										onClick={() => setStep(i)}
										className={cn(
											"w-full text-left p-3 border transition-all flex items-center justify-between group relative",
											isActive ? "bg-[#FFB400]/10 border-[#FFB400]/40" : "bg-transparent border-transparent",
											!isAuthorized ? "opacity-30 cursor-not-allowed" : "hover:bg-white/5"
										)}
									>
										<div className="flex items-center gap-3">
											<span className={cn("text-[9px] font-mono", isActive ? "text-[#FFB400]" : "text-[#94A3B8]")}>0{i + 1}</span>
											<span className={cn("text-[10px] font-bold uppercase tracking-tighter", isActive ? "text-[#F5F5F0]" : "text-[#94A3B8]")}>{step.split("1")[0]}</span>
										</div>
										{manifest[step] ? <ShieldCheck size={12} className="text-green-500" /> : !isAuthorized && <Lock size={10} />}
										{isActive && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#FFB400]" />}
									</button>
								);
							})}
						</div>
					</div>
				</aside>
				<aside className="absolute right-6 top-0 w-72 hidden lg:flex flex-col pointer-events-auto z-40">
					<div className="bg-black/60 border border-white/5 backdrop-blur-xl p-0 flex flex-col">
						<div className="p-4 border-b border-white/5 flex items-center gap-2">
							<Activity size={14} className={cn(criticalAlert ? "text-red-500" : "text-[#FFB400]")} />
							<h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F5F5F0]">System_Diagnostics</h3>
						</div>
						<div className="p-4 space-y-2 max-h-75 overflow-y-auto custom-scrollbar">
							<AnimatePresence mode="popLayout">
								{alerts.length === 0 ? (
									<div className="text-center py-8 opacity-40">
										<ShieldCheck size={24} className="mx-auto text-[#94A3B8] mb-2" />
										<p className="text-[8px] font-mono uppercase text-[#94A3B8]">Systems_Nominal</p>
									</div>
								) : (
									alerts.map((alert) => (
										<motion.div
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, scale: 0.9 }}
											key={alert.code}
											className={cn(
												"p-3 border text-[9px] uppercase leading-tight relative overflow-hidden",
												alert.severity === "CRITICAL" ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-[#FFB400]/40 bg-[#FFB400]/10 text-[#FFB400]"
											)}
										>
											<div className="flex items-center gap-2 mb-1 font-black">
												<AlertTriangle size={10} /> {alert.code}
											</div>
											<p className="opacity-80 font-medium normal-case">{alert.message}</p>
										</motion.div>
									))
								)}
							</AnimatePresence>
						</div>
					</div>
				</aside>

				{/* 3. MOBILE CONFIGURATION DECK (The Mobile Sidebar Replacement) */}
				{mobileView === "CONFIG" && (
					<div className="lg:hidden absolute inset-0 z-40 bg-[#0A0E14]/95 backdrop-blur-xl pointer-events-auto overflow-y-auto custom-scrollbar p-4 border-y border-white/10">
						<div className="space-y-3 pb-8">
							<h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#94A3B8] mb-4">Assembly_Sequence</h3>
							{BUILD_STEPS.map((step, i) => (
								<div key={step} className="space-y-2">
									<button
										title="Move to next step"
										type="button"
										onClick={() => setStep(i)}
										className={cn("w-full flex justify-between items-center p-4 border transition-all", currentStep === i ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/10")}
									>
										<span className="text-xs font-bold text-[#F5F5F0]">{step.split("1")[0]}</span>
										{manifest[step] ? <ShieldCheck size={14} className="text-green-500" /> : <ChevronRight size={14} className="text-[#94A3B8]" />}
									</button>
									{/* INLINE CAROUSEL (Mobile Only) */}
									{currentStep === i && (
										<div className="flex gap-2 overflow-x-auto py-2 pl-4 border-l border-[#FFB400]/20">
											{availableModules.length > 0 ? (
												<>
													{availableModules.slice(0, 8).map((p) => (
														<BuilderModuleCard
															key={p.id}
															product={p}
															isSelected={manifest[activeType]?.id === p.id}
															onSelect={() => setComponent(activeType, p)}
															onInspect={() => setInspectedModule(p)}
														/>
													))}
													{/* View All Card for Mobile */}
													<button
														onClick={() => setIsRegistryOpen(true)}
														className="shrink-0 w-32 p-2 border border-white/5 border-dashed bg-white/1 flex flex-col items-center justify-center gap-2"
													>
														<PlusSquare size={24} className="text-[#94A3B8]" />
														<span className="text-[8px] font-black uppercase text-[#94A3B8]">View All</span>
													</button>
												</>
											) : (
												<span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest">No_{activeType}_Available</span>
											)}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{/* Desktop Lower Dock - (Carousel + Log)  */}
				<div className="hidden lg:flex absolute bottom-0 left-6 right-6 z-50 flex-col items-center pointer-events-none">
					{/* CAROUSEL TRAY */}
					{isStepAuthorized(currentStep, manifest) && (
						<div className="w-full max-w-4xl pointer-events-auto mb-4">
							<motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-black/80 border border-white/10 backdrop-blur-xl p-2 relative">
								<div className="absolute -top-3 left-4 bg-[#FFB400] text-[#0A0E14] text-[8px] font-black uppercase px-2 py-0.5 tracking-widest">Select_{activeType}</div>
								<div className="flex gap-2 overflow-x-auto pb-2 pt-2 custom-scrollbar px-2">
									{availableModules.length > 0 ? (
										<>
											{availableModules.slice(0, 10).map((p) => (
												<BuilderModuleCard
													key={p.id}
													product={p}
													isSelected={manifest[activeType]?.id === p.id}
													onSelect={() => setComponent(activeType, p)}
													onInspect={() => setInspectedModule(p)}
												/>
											))}

											{/* 2. "VIEW ALL" CARD */}
											<button
												title="View All Modules"
												type="button"
												onClick={() => setIsRegistryOpen(true)}
												className="shrink-0 w-32 p-2 border border-white/5 border-dashed bg-white/1 hover:bg-white/5 hover:border-[#FFB400] transition-all group flex flex-col items-center justify-center gap-2"
											>
												<PlusSquare size={24} className="text-[#94A3B8] group-hover:text-[#FFB400]" />
												<span className="text-[8px] font-black uppercase tracking-widest text-[#94A3B8] group-hover:text-[#F5F5F0]">Access_Registry</span>
												<span className="text-[7px] font-mono text-[#94A3B8] opacity-50">View All {availableModules.length}</span>
											</button>
										</>
									) : (
										<div className="shrink-0 w-32 p-2 border border-white/5 flex flex-col items-center justify-center">
											<span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest">No_{activeType}_Available</span>
										</div>
									)}
								</div>
							</motion.div>
						</div>
					)}

					{/* SYSTEM LOG BAR */}
					<div className="w-full max-w-6xl flex items-center gap-4 pointer-events-auto">
						<div
							className={cn(
								"flex-1 h-12 border backdrop-blur-md flex items-center px-6 transition-colors",
								criticalAlert ? "bg-red-500/10 border-red-500/40" : "bg-white/2 border-white/5"
							)}
						>
							<div className="flex items-center gap-4">
								<Activity size={14} className={cn(criticalAlert ? "text-red-500 animate-pulse" : "text-[#FFB400]")} />
								<span className={cn("text-[10px] font-mono uppercase tracking-widest", criticalAlert ? "text-red-500" : "text-[#F5F5F0]")}>
									{criticalAlert
										? `CRITICAL_ERROR: ${criticalAlert.code}`
										: manifest[activeType]
										? `LOG: ${activeType}_MODULE_INITIALIZED // READY_FOR_SYNC`
										: `AWAITING_${activeType}_DATA_INPUT...`}
								</span>
							</div>
						</div>
						<button
							onClick={handleAuthorize}
							className="h-12 px-10 bg-[#FFB400] text-[#0A0E14] font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:bg-white transition-all flex items-center gap-4"
						>
							Authorize_Build <ArrowRight size={16} />
						</button>
					</div>
				</div>
			</div>

			{/* --- LAYER 3: MOBILE FOOTER (Flex Item) --- */}
			<div className="lg:hidden flex-none bg-[#0A0E14] border-t border-white/10 p-4 z-50 pointer-events-auto flex flex-col gap-3 pb-safe">
				{/* SYSTEM ALERT TICKER (Mobile Position) */}
				<div className="relative h-0">
					{/* Zero height container to float upwards */}
					<div className="absolute bottom-4 left-0 right-0">
						<SystemAlertTicker alerts={alerts} />
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest">Total_Allocation</span>
					<span className="text-xl font-black text-[#F5F5F0]">${totalPrice.toLocaleString()}</span>
				</div>
				<button onClick={handleAuthorize} className="w-full h-12 bg-[#FFB400] text-[#0A0E14] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg">
					Authorize <ArrowRight size={16} />
				</button>
			</div>
			{/* MODALS */}
			<ModuleInspectionSheet product={inspectedModule} isOpen={!!inspectedModule} onClose={() => setInspectedModule(null)} onSelect={(p) => setComponent(activeType, p)} />
			<ModuleSelectionSheet
				isOpen={isRegistryOpen}
				onClose={() => setIsRegistryOpen(false)}
				category={activeType}
				products={availableModules}
				currentSelectionId={manifest[activeType]?.id}
				onSelect={(p) => setComponent(activeType, p)}
			/>

			{/* Desktop Alert Ticker (Positioned differently) */}
			<div className="hidden lg:block">
				<SystemAlertTicker alerts={alerts} />
			</div>
		</div>
	);
}
