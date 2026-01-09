"use client";

import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck, Terminal, ArrowRight, ChevronRight, Lock, AlertTriangle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUILD_STEPS, isStepAuthorized, useBuilderStore } from "@/store/useBuilderStore";
import { ProductBuilderDTO } from "@/app/data/products";
import { SafeImage } from "../ui/safe-image";
import { resolveCompatibility } from "@/lib/builder/resolver";

export function CrucibleHUD({ allProducts }: { allProducts: ProductBuilderDTO[] }) {
	const { currentStep, setStep, manifest, setComponent } = useBuilderStore();
	const activeType = BUILD_STEPS[currentStep];

	const alerts = resolveCompatibility(manifest);
	const totalPrice = Object.values(manifest).reduce((acc, item) => acc + (Number(item?.price) || 0), 0);
	const criticalAlert = alerts.find((a) => a.severity === "CRITICAL");
	// const warningAlert = alerts.find((a) => a.severity === "WARNING");

	const availableModules = allProducts.filter((p) => p.compatibility?.type === (activeType === "STORAGE1" || activeType === "STORAGE2" ? "STORAGE" : activeType));

	return (
		<div className="h-full w-full flex flex-col justify-between p-6">
			{/* TOP: SYSTEM IDENTIFIER */}
			<div className="flex justify-between items-start pointer-events-auto">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-3">
						<Terminal size={14} className="text-[#FFB400]" />
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.5em]">Architect_Protocol: v60.4</span>
					</div>
					<h1 className="text-4xl font-black uppercase tracking-tighter text-[#F5F5F0]">
						Crucible_<span className="text-[#FFB400]">Assembly</span>
					</h1>
				</div>

				<div className="flex items-center gap-4 bg-white/2 border border-white/5 p-4 backdrop-blur-md">
					<div className="flex flex-col items-end">
						<span className="text-[8px] font-mono text-[#94A3B8] uppercase">Authorization_Level</span>
						<span className="text-[10px] font-bold text-[#F5F5F0]">VANGUARD_ARCHITECT</span>
					</div>
					<div className="w-1 h-8 bg-[#FFB400]" />
				</div>
			</div>

			{/* MIDDLE: THE DUAL SIDEBARS */}
			<div className="flex-1 flex justify-between items-stretch my-8 overflow-hidden">
				{/* LEFT: STEP SELECTOR (Sector Status) */}
				<aside className="w-64 h-full pointer-events-auto bg-black/60 border border-white/5 backdrop-blur-xl p-4 flex flex-col">
					<h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#94A3B8] mb-6 px-2">Assembly_Chain</h2>
					<div className="space-y-1 flex-1 overflow-y-auto custom-scrollbar">
						{BUILD_STEPS.map((step, i) => {
							const isAuthorized = isStepAuthorized(i, manifest);
							const isActive = currentStep === i;

							return (
								<button
									key={step}
									disabled={!isAuthorized} // Force the lock
									onClick={() => setStep(i)}
									className={cn(
										"w-full text-left p-3 border transition-all flex items-center justify-between group",
										isActive ? "bg-[#FFB400]/10 border-[#FFB400]/40" : "bg-transparent border-transparent",
										!isAuthorized ? "opacity-20 cursor-not-allowed" : "hover:bg-white/5"
									)}
								>
									<div className="flex items-center gap-3">
										{/* Show a Lock icon if not authorized */}
										{isAuthorized ? (
											<span className={cn("text-[9px] font-mono", isActive ? "text-[#FFB400]" : "text-[#94A3B8] opacity-40")}>0{i + 1}</span>
										) : (
											<Lock size={10} className="text-[#94A3B8]" />
										)}
										<span className={cn("text-[10px] font-bold uppercase tracking-tighter", isActive ? "text-[#F5F5F0]" : "text-[#94A3B8]")}>{step.split("1")[0]}</span>
									</div>
									{manifest[step] && <ShieldCheck size={12} className="text-green-500" />}
								</button>
							);
						})}
					</div>
				</aside>

				{/* CENTER: MODULE SELECTION (The Part Scroller) */}
				<div className="flex-1 flex flex-col justify-end items-center px-12 pb-12">
					<div className="w-full max-w-4xl pointer-events-auto">
						<div className="flex items-center gap-4 mb-4">
							<span className="text-[10px] font-black uppercase text-[#FFB400] tracking-widest">Compatible_Modules_Detected: [{availableModules.length}]</span>
							<div className="h-px flex-1 bg-[#FFB400]/20" />
						</div>

						{/* HORIZONTAL HARDWARE CAROUSEL */}
						<div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
							<AnimatePresence mode="popLayout">
								{availableModules.map((product) => (
									<motion.button
										key={product.id}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										onClick={() => setComponent(activeType, product)}
										className={cn(
											"shrink-0 w-48 p-4 border transition-all text-left group snap-start bg-[#0A0E14]/80 backdrop-blur-md",
											manifest[activeType]?.id === product.id ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/10 hover:border-white/30"
										)}
									>
										<div className="aspect-square relative mb-4 bg-white/5 flex items-center justify-center">
											<SafeImage src={product.coverImage} className="w-full h-full object-contain p-4 grayscale group-hover:grayscale-0 transition-all" alt="" fill />
										</div>
										<p className="text-[8px] font-black text-[#FFB400] uppercase tracking-widest mb-1">{product.brand}</p>
										<h4 className="text-[11px] font-bold text-[#F5F5F0] leading-tight uppercase mb-3 line-clamp-2 h-8">{product.name}</h4>
										<div className="flex justify-between items-center border-t border-white/5 pt-2">
											<span className="text-[10px] font-black text-[#F5F5F0]">${product.price}</span>
											<ChevronRight size={14} className="text-[#94A3B8] group-hover:text-[#FFB400]" />
										</div>
									</motion.button>
								))}
							</AnimatePresence>
						</div>
					</div>
				</div>

				{/* RIGHT: THE TELEMETRY HUB */}
				<aside className="w-80 h-3/4 pointer-events-auto flex flex-col gap-4">
					<div className="bg-black/60 border border-white/5 backdrop-blur-xl p-6 flex-1 flex flex-col">
						<h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F5F5F0] mb-6 border-b border-white/5 pb-2">Diagnostic_Reports</h3>

						<div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
							<AnimatePresence>
								{alerts.length === 0 ? (
									<p className="text-[9px] font-mono text-[#94A3B8] opacity-40 uppercase">No_Conflicts_Detected</p>
								) : (
									alerts.map((alert) => (
										<motion.div
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											key={alert.code}
											className={cn(
												"p-3 border text-[10px] uppercase leading-tight",
												alert.severity === "CRITICAL" ? "border-red-500/40 bg-red-500/5 text-red-500" : "border-[#FFB400]/40 bg-[#FFB400]/5 text-[#FFB400]"
											)}
										>
											<div className="flex items-center gap-2 mb-1">
												<AlertTriangle size={10} />
												<span className="font-black">{alert.code}</span>
											</div>
											<p className="opacity-80 font-medium">{alert.message}</p>
										</motion.div>
									))
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* ALLOCATION VALUE */}
					<div className="bg-[#FFB400] p-6 text-[#0A0E14] shadow-[0_0_50px_rgba(255,180,0,0.2)]">
						<p className="text-[9px] font-black uppercase tracking-widest mb-1">Total_Allocation</p>
						<div className="flex items-baseline gap-2">
							<span className="text-4xl font-black tracking-tighter">${totalPrice.toLocaleString()}</span>
							<span className="text-[10px] font-bold">USD</span>
						</div>
					</div>
				</aside>
			</div>

			{/* BOTTOM: THE DEPLOYMENT BAR */}
			<div className="flex items-center gap-6 pointer-events-auto">
				<div className={cn("flex-1 h-12 border backdrop-blur-md flex items-center px-6 transition-colors", criticalAlert ? "bg-red-500/10 border-red-500/40" : "bg-white/2 border-white/5")}>
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
	);
}

// function TelemetryBar({ label, current, max, unit, color }: { label: string; current: number; max: number; unit: string; color: string }) {
// 	const percent = (current / max) * 100;
// 	return (
// 		<div className="space-y-2">
// 			<div className="flex justify-between items-end">
// 				<span className="text-[8px] font-black uppercase text-[#94A3B8] tracking-widest">{label}</span>
// 				<span className={cn("text-xs font-mono font-bold", color)}>
// 					{current}
// 					{unit}
// 				</span>
// 			</div>
// 			<div className="h-0.5 w-full bg-white/5">
// 				<div className={cn("h-full transition-all duration-1000 bg-current", color)} style={{ width: `${percent}%` }} />
// 			</div>
// 		</div>
// 	);
// }
