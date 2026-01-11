"use client";

import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck, Terminal, ArrowRight, ChevronRight, Lock, Activity, AlertTriangle, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUILD_STEPS, isStepAuthorized, useBuilderStore } from "@/store/useBuilderStore";
import { ProductBuilderDTO } from "@/app/data/products";
import { SafeImage } from "../ui/safe-image";
import { resolveCompatibility } from "@/lib/builder/resolver";
import { BuilderModuleCard } from "./builder-module-card";
import { useState } from "react";
import { ModuleInspectionSheet } from "./module-inspection-sheet";

export function CrucibleHUD({ allProducts }: { allProducts: ProductBuilderDTO[] }) {
	const { currentStep, setStep, manifest, setComponent } = useBuilderStore();
	const activeType = BUILD_STEPS[currentStep];

	const alerts = resolveCompatibility(manifest);
	const totalPrice = Object.values(manifest).reduce((acc, item) => acc + (Number(item?.price) || 0), 0);
	const criticalAlert = alerts.find((a) => a.severity === "CRITICAL");

	// Filter logic remains same...
	const availableModules = allProducts.filter((p) => p.compatibility?.type === (activeType === "STORAGE1" || activeType === "STORAGE2" ? "STORAGE" : activeType));
	const [inspectedModule, setInspectedModule] = useState<ProductBuilderDTO | null>(null);

	return (
		<div className="relative h-full w-full p-6 flex flex-col justify-between pointer-events-none">
			{/* 1. TOP HEADER (Floating) */}
			<header className="flex justify-between items-start z-50">
				<div className="pointer-events-auto flex flex-col gap-2">
					<div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/5 rounded-full w-fit">
						<Terminal size={12} className="text-[#FFB400]" />
						<span className="text-[#FFB400] text-[9px] font-black uppercase tracking-[0.3em]">Protocol v60.4</span>
					</div>
					<h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#F5F5F0] drop-shadow-2xl">
						Crucible_<span className="text-[#FFB400]">Core</span>
					</h1>
				</div>
			</header>

			{/* 2. SIDEBARS (Absolute Positioned for Max 3D Space) */}

			{/* LEFT: STEP SELECTOR */}
			<aside className="absolute left-6 top-32 bottom-32 w-64 pointer-events-auto flex flex-col gap-4 z-40">
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

									{/* Active Indicator Line */}
									{isActive && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FFB400]" />}
								</button>
							);
						})}
					</div>
				</div>
			</aside>

			{/* RIGHT: DIAGNOSTICS */}
			<aside className="absolute right-6 top-32 w-72 pointer-events-auto z-40">
				<div className="bg-black/60 border border-white/5 backdrop-blur-xl p-0 flex flex-col">
					<div className="p-4 border-b border-white/5 flex items-center gap-2">
						<Activity size={14} className={cn(criticalAlert ? "text-red-500" : "text-[#FFB400]")} />
						<h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F5F5F0]">System_Diagnostics</h3>
					</div>

					<div className="p-4 space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
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
										{/* Scanline */}
										<div className="absolute top-0 left-0 w-full h-[1px] bg-current opacity-20 animate-[shimmer_2s_infinite]" />
									</motion.div>
								))
							)}
						</AnimatePresence>
					</div>

					{/* Total_Allocation */}
					<div className="bg-[#FFB400] px-6 py-2 text-[#0A0E14] shadow-[0_0_50px_rgba(255,180,0,0.2)]">
						<p className="text-[9px] font-black uppercase tracking-widest mb-1">Total_Allocation</p>
						<div className="flex items-baseline gap-2">
							<span className="text-4xl font-black tracking-tighter">${totalPrice.toLocaleString()}</span>
							<span className="text-[10px] font-bold">USD</span>
						</div>
					</div>
				</div>
			</aside>

			{/* 3. BOTTOM DOCK (The Carousel) */}
			<div className="absolute bottom-6 left-6 right-6 z-50 flex flex-col items-center pointer-events-none">
				{/* PART CAROUSEL - Only shows if step is authorized */}
				{isStepAuthorized(currentStep, manifest) && (
					<div className="w-full max-w-4xl pointer-events-auto mb-4">
						<motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-black/80 border border-white/10 backdrop-blur-xl p-2 relative">
							{/* Category Label Tag */}
							<div className="absolute -top-3 left-4 bg-[#FFB400] text-[#0A0E14] text-[8px] font-black uppercase px-2 py-0.5 tracking-widest">Select_{activeType}</div>

							<div className="flex gap-2 overflow-x-auto pb-2 pt-2 custom-scrollbar px-2">
								{availableModules.map((product) => (
									<BuilderModuleCard
										key={product.id}
										product={product}
										isSelected={manifest[activeType]?.id === product.id}
										onSelect={() => setComponent(activeType, product)}
										// TRIGGER THE SHEET
										onInspect={() => setInspectedModule(product)}
									/>
								))}
							</div>
						</motion.div>
					</div>
				)}

				{/* SYSTEM BAR */}
				<div className="w-full max-w-6xl flex items-center gap-4 pointer-events-auto">
					<div
						className={cn("flex-1 h-12 border backdrop-blur-md flex items-center px-6 transition-colors", criticalAlert ? "bg-red-500/10 border-red-500/40" : "bg-white/2 border-white/5")}
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

					<button className="h-12 px-10 bg-[#FFB400] text-[#0A0E14] font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:bg-white transition-all flex items-center gap-4">
						Authorize_Build <ArrowRight size={16} />
					</button>
				</div>
			</div>

			{/* THE SHEET IS RENDERED HERE AT THE ROOT LEVEL */}
			<ModuleInspectionSheet product={inspectedModule} isOpen={!!inspectedModule} onClose={() => setInspectedModule(null)} onSelect={(p) => setComponent(activeType, p)} />
		</div>
	);
}
