"use client";

import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck, ArrowRight, ChevronRight, Lock, Activity, AlertTriangle, PlusSquare, Settings2, Eye, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUILD_STEPS, BuildComponentType, isStepAuthorized, useBuilderStore } from "@/store/useBuilderStore";
import { ProductBuilderDTO } from "@/app/data/products";
import { BuilderModuleCard } from "./builder-module-card";
import { useState } from "react";
import { ModuleInspectionSheet } from "./module-inspection-sheet";
import { SystemAlertTicker } from "./system-alert-ticker";
import { ModuleSelectionSheet } from "./module-selection-sheet";
import { useBuilderLogic } from "@/hooks/useBuilderLogic";
import { STEP_LABELS } from "@/lib/builder/step-labels"; // Use the shared labels
import { ProtocolAlert } from "@/lib/builder/resolver";

export function CrucibleHUD({ allProducts, onAuthorize, isSyncing }: { allProducts: ProductBuilderDTO[]; onAuthorize: () => void; isSyncing: boolean }) {
	// 1. STATE & LOGIC HOOKS
	const { currentStep, setStep, manifest, setComponent } = useBuilderStore();

	// Unified Logic Hook (Shared with SchematicView)
	const {
		activeType,
		availableModules,
		alerts,
	}: {
		activeType: BuildComponentType;
		availableModules: ProductBuilderDTO[];
		totalPrice: number;
		alerts: ProtocolAlert[];
	} = useBuilderLogic(allProducts);

	const criticalAlert = alerts.find((a) => a.severity === "CRITICAL");

	// Local UI State
	const [mobileView, setMobileView] = useState<"CONFIG" | "VISUAL">("CONFIG");
	const [inspectedModule, setInspectedModule] = useState<ProductBuilderDTO | null>(null);
	const [isRegistryOpen, setIsRegistryOpen] = useState(false);

	const { isExploded, toggleExploded } = useBuilderStore();

	return (
		<div className="h-full w-full flex flex-col justify-between p-4 lg:p-6 pointer-events-none relative font-sans">
			{/* 1. HUD CONTROLS (Floating below Global Header) */}
			<div className="flex justify-between items-start pointer-events-auto w-full z-50 relative">
				{/* EXPLODE TOGGLE: Visible on Desktop OR Mobile Visual Mode */}
				<div className={cn("transition-opacity", mobileView === "CONFIG" ? "lg:opacity-100 opacity-0 pointer-events-none lg:pointer-events-auto" : "opacity-100")}>
					<button
						onClick={toggleExploded}
						className={cn(
							"p-3 border transition-all flex items-center gap-3 backdrop-blur-md rounded-full lg:rounded-none",
							isExploded ? "border-[#FFB400] text-[#FFB400] bg-[#FFB400]/10" : "border-white/10 bg-black/40 text-[#94A3B8]",
						)}
						title="Toggle Exploded Assembly"
					>
						<Minimize2 size={18} className={isExploded ? "rotate-45 transition-transform" : "transition-transform"} />
						<span className="hidden lg:inline text-[9px] font-black uppercase tracking-widest">{isExploded ? "Implode_View" : "Explode_View"}</span>
					</button>
				</div>

				{/* MOBILE: Visual/Config Toggle */}
				<div className="lg:hidden flex flex-col items-end gap-2 ml-auto">
					<div className="flex bg-black/80 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-2xl">
						<button
							onClick={() => setMobileView("CONFIG")}
							className={cn("p-2 rounded-full transition-all flex items-center gap-2", mobileView === "CONFIG" ? "bg-[#FFB400] text-[#0A0E14]" : "text-[#94A3B8]")}
						>
							<Settings2 size={16} />
							{mobileView === "CONFIG" && <span className="text-[9px] font-black uppercase pr-1">Edit</span>}
						</button>
						<button
							onClick={() => setMobileView("VISUAL")}
							className={cn("p-2 rounded-full transition-all flex items-center gap-2", mobileView === "VISUAL" ? "bg-[#FFB400] text-[#0A0E14]" : "text-[#94A3B8]")}
						>
							<Eye size={16} />
							{mobileView === "VISUAL" && <span className="text-[9px] font-black uppercase pr-1">Inspect</span>}
						</button>
					</div>
				</div>
			</div>

			{/* 2. DESKTOP SIDEBARS (Hidden on Mobile) */}
			<aside className="absolute left-6 top-24 bottom-22 w-64 pointer-events-auto hidden lg:flex flex-col gap-4 z-40">
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
										!isAuthorized ? "opacity-30 cursor-not-allowed" : "hover:bg-white/5",
									)}
								>
									<div className="flex items-center gap-3">
										<span className={cn("text-[9px] font-mono", isActive ? "text-[#FFB400]" : "text-[#94A3B8]")}>0{i + 1}</span>
										<span className={cn("text-[10px] font-bold uppercase tracking-tighter", isActive ? "text-[#F5F5F0]" : "text-[#94A3B8]")}>
											{STEP_LABELS[step]?.split("_")[0]}
										</span>
									</div>
									{manifest[step] ? <ShieldCheck size={12} className="text-green-500" /> : !isAuthorized && <Lock size={10} />}
									{isActive && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#FFB400]" />}
								</button>
							);
						})}
					</div>
				</div>
			</aside>

			{/* RIGHT: DIAGNOSTICS */}
			<aside className="absolute right-6 top-24 w-72 hidden lg:flex flex-col pointer-events-auto z-40">
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
											alert.severity === "CRITICAL" ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-[#FFB400]/40 bg-[#FFB400]/10 text-[#FFB400]",
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

			{/* 3. MOBILE CONFIGURATION DECK */}
			{mobileView === "CONFIG" && (
				<div className="lg:hidden absolute inset-0 z-40  bg-[#0A0E14]/95 backdrop-blur-xl pointer-events-auto overflow-y-auto custom-scrollbar p-4">
					<div className="space-y-3 pb-32 pt-16">
						<h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#94A3B8] mb-4">Assembly_Sequence</h3>
						{BUILD_STEPS.map((step, i) => (
							<div key={step} className="space-y-2">
								<button
									onClick={() => setStep(i)}
									className={cn("w-full flex justify-between items-center p-4 border transition-all", currentStep === i ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/10")}
								>
									<span className="text-xs font-bold text-[#F5F5F0]">{STEP_LABELS[step]}</span>
									{manifest[step] ? <ShieldCheck size={14} className="text-green-500" /> : <ChevronRight size={14} className="text-[#94A3B8]" />}
								</button>

								{/* INLINE MOBILE CAROUSEL */}
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

			{/* 4. BOTTOM DOCK (Desktop Only) */}
			<div className="hidden lg:flex absolute bottom-6 left-6 right-6 z-50 flex-col items-center pointer-events-none">
				{/* CAROUSEL TRAY */}
				{isStepAuthorized(currentStep, manifest) && (
					<div className="w-full max-w-4xl pointer-events-auto mb-4">
						<motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-black/65 border border-white/10 backdrop-blur-xl p-2 relative">
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
										<button
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
						className={cn("flex-1 h-12 border backdrop-blur-md flex items-center px-6 transition-colors", criticalAlert ? "bg-red-500/10 border-red-500/40" : "bg-white/2 border-white/5")}
					>
						<div className="flex items-center gap-4">
							<Activity size={14} className={cn(criticalAlert ? "text-red-500 animate-pulse" : "text-[#FFB400]")} />
							<span className={cn("text-[10px] font-mono uppercase tracking-widest truncate", criticalAlert ? "text-red-500" : "text-[#F5F5F0]")}>
								{criticalAlert
									? `CRITICAL_ERROR: ${criticalAlert.code}`
									: manifest[activeType]
										? `LOG: ${activeType}_MODULE_INITIALIZED // READY_FOR_SYNC`
										: `AWAITING_${activeType}_DATA_INPUT...`}
							</span>
						</div>
					</div>
					<button
						onClick={onAuthorize}
						disabled={isSyncing}
						className="h-12 px-10 bg-[#FFB400] text-[#0A0E14] font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:bg-white transition-all flex items-center gap-4"
					>
						{isSyncing ? "SYNCING_LOGISTICS..." : "Authorize_Build"}
						{isSyncing ? <Activity className="animate-spin" size={16} /> : <ArrowRight size={16} />}
					</button>
				</div>
			</div>

			{/* 4. MOBILE FOOTER (Flex Item) */}
			{/* <div className="lg:hidden flex-none bg-[#0A0E14] border-t border-white/10 p-4 z-50 pointer-events-auto flex flex-col gap-3 pb-safe">
				<div className="relative h-0">
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
			</div> */}

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

			{/* DESKTOP ALERT TICKER */}
			<div className="absolute bottom-4 left-4 right-4 lg:hidden pointer-events-auto z-40">
				<SystemAlertTicker alerts={alerts} />
			</div>
			{/* <div className="hidden lg:block">
				<SystemAlertTicker alerts={alerts} />
			</div> */}
		</div>
	);
}
