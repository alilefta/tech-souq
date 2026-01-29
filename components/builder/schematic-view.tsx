"use client";

import { BUILD_STEPS, isStepAuthorized, useBuilderStore } from "@/store/useBuilderStore";
import { ProductBuilderDTO } from "@/app/data/products";
import { ShieldCheck, ChevronRight, Lock, Terminal, Info, PlusSquare, ArrowRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBuilderLogic } from "@/hooks/useBuilderLogic";
import { SafeImage } from "@/components/ui/safe-image";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ModuleInspectionSheet } from "./module-inspection-sheet";
import { ModuleSelectionSheet } from "./module-selection-sheet";
import { SystemAlertTicker } from "./system-alert-ticker";

// Re-use the label map from HUD or import it if shared
const STEP_LABELS: Record<string, string> = {
	CHASSIS: "Foundry_Chassis",
	MOTHERBOARD: "Logic_Board",
	CPU: "Central_Processor",
	RAM: "Memory_Module",
	GPU: "Graphics_Node",
	STORAGE1: "System_Drive_01",
	STORAGE2: "Mass_Storage_02",
	COOLER: "Thermal_Regulator",
	PSU: "Energy_Cell",
};

export function SchematicView({ allProducts, onAuthorize, isSyncing }: { allProducts: ProductBuilderDTO[]; onAuthorize: () => void; isSyncing: boolean }) {
	const { currentStep, setStep, manifest, setComponent } = useBuilderStore();
	const { availableModules, activeType, totalPrice, alerts } = useBuilderLogic(allProducts);

	// LOCAL STATE FOR MODALS
	const [inspectedModule, setInspectedModule] = useState<ProductBuilderDTO | null>(null);
	const [isRegistryOpen, setIsRegistryOpen] = useState(false);

	return (
		<div className="w-full max-w-3xl mx-auto p-4 lg:p-12 pb-48 font-sans relative min-h-full">
			{/* 1. SCHEMATIC HEADER */}
			<div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
				<div className="flex items-center gap-4">
					<div className="w-10 h-10 border border-[#FFB400] flex items-center justify-center text-[#FFB400] bg-[#FFB400]/10">
						<Terminal size={20} />
					</div>
					<div>
						<h2 className="text-xl font-black uppercase tracking-tighter text-[#F5F5F0]">Manual_Assembly</h2>
						<span className="text-[10px] font-mono text-[#94A3B8] bg-white/5 px-2 py-1">MODE: LOW_LATENCY // SCHEMATIC</span>
					</div>
				</div>
				<div className="text-right hidden sm:block">
					<p className="text-[9px] font-black text-[#94A3B8] uppercase tracking-widest">Manifest_Value</p>
					<p className="text-2xl font-black text-[#F5F5F0]">${totalPrice.toLocaleString()}</p>
				</div>
			</div>

			<div className="space-y-4">
				{BUILD_STEPS.map((step, i) => {
					const isAuthorized = isStepAuthorized(i, manifest);
					const isActive = currentStep === i;
					const selectedPart = manifest[step];

					return (
						<div key={step} className={cn("border transition-all bg-[#0A0E14]", isActive ? "border-[#FFB400] bg-[#FFB400]/2" : "border-white/10")}>
							{/* STEP HEADER */}
							<button
								onClick={() => isAuthorized && setStep(i)}
								disabled={!isAuthorized}
								className={cn("w-full flex items-center justify-between p-4 sm:p-6", !isAuthorized && "opacity-40 cursor-not-allowed")}
							>
								<div className="flex items-center gap-4">
									<span className={cn("text-xs font-mono", isActive ? "text-[#FFB400]" : "text-[#94A3B8]")}>0{i + 1}</span>
									<div className="text-left">
										<p className={cn("text-xs sm:text-sm font-black uppercase tracking-widest", isActive ? "text-[#F5F5F0]" : "text-[#94A3B8]")}>{STEP_LABELS[step]}</p>
										{selectedPart ? (
											<p className="text-[10px] font-mono text-[#FFB400] mt-1 flex items-center gap-2">
												<ShieldCheck size={10} /> {selectedPart.name}
											</p>
										) : (
											isActive && <p className="text-[9px] font-mono text-[#94A3B8] mt-1 animate-pulse">Awaiting_Selection...</p>
										)}
									</div>
								</div>

								{selectedPart ? (
									<div className="h-10 w-10 relative bg-white/5 border border-white/10">
										<SafeImage src={selectedPart.coverImage} fill className="object-contain p-1" alt="" />
									</div>
								) : isAuthorized ? (
									<ChevronRight size={16} className={cn("transition-transform", isActive && "rotate-90")} />
								) : (
									<Lock size={14} />
								)}
							</button>

							{/* EXPANDED SELECTION GRID */}
							<AnimatePresence>
								{isActive && (
									<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
										<div className="p-4 pt-0 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
											{(availableModules as ProductBuilderDTO[]).length > 0 ? (
												<>
													{/* LIMIT TO TOP 6 ITEMS FOR PERFORMANCE/CLEANLINESS */}
													{(availableModules as ProductBuilderDTO[]).slice(0, 6).map((product) => (
														<div
															key={product.id}
															onClick={() => setComponent(activeType, product)}
															className={cn(
																"relative flex items-center gap-3 p-3 border text-left transition-all hover:bg-white/5 group cursor-pointer",
																manifest[activeType]?.id === product.id ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/5",
															)}
														>
															<div className="h-12 w-12 relative bg-white/5 shrink-0 border border-white/5">
																<SafeImage src={product.coverImage} fill className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all" alt="" />
															</div>
															<div className="flex-1 min-w-0">
																<p className="text-[8px] font-black text-[#94A3B8] uppercase">{product.brand}</p>
																<p className="text-[10px] font-bold text-[#F5F5F0] line-clamp-1">{product.name}</p>
																<p className="text-[10px] font-mono text-[#FFB400]">${product.price}</p>
															</div>

															{/* INSPECT TRIGGER */}
															<button
																title="Inspect product"
																onClick={(e) => {
																	e.stopPropagation();
																	setInspectedModule(product);
																}}
																className="p-2 text-[#94A3B8] hover:text-[#FFB400]"
															>
																<Info size={14} />
															</button>
														</div>
													))}

													{/* "VIEW ALL" BUTTON */}
													<button
														onClick={() => setIsRegistryOpen(true)}
														className="flex items-center justify-center gap-3 p-3 border border-dashed border-white/10 hover:border-[#FFB400] hover:bg-[#FFB400]/5 text-[#94A3B8] hover:text-[#F5F5F0] transition-all group col-span-1 sm:col-span-2"
													>
														<PlusSquare size={16} />
														<span className="text-[10px] font-black uppercase tracking-widest">Access_Registry ({availableModules.length})</span>
													</button>
												</>
											) : (
												<div className="col-span-full py-8 text-center text-[#94A3B8] text-xs font-mono uppercase opacity-50">No_Compatible_Modules_Found_For_Slot</div>
											)}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</div>

			{/* FLOATING SYSTEM ALERTS (Positioned above footer) */}
			<div className="fixed bottom-0  right-0  z-50 max-w-3xl mx-auto">
				<SystemAlertTicker alerts={alerts} />
			</div>

			{/* AUTHORIZE FOOTER */}
			<div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0A0E14] border-t border-white/10 z-50">
				<div className="max-w-5xl mx-auto flex items-center gap-4">
					<div className="flex-1">
						<p className="text-[8px] font-mono text-[#94A3B8] uppercase tracking-widest">Total_Allocation</p>
						<p className="text-xl font-black text-[#F5F5F0]">${totalPrice.toLocaleString()}</p>
					</div>
					<button
						onClick={onAuthorize}
						disabled={isSyncing}
						className="h-12 px-8 bg-[#FFB400] text-[#0A0E14] font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:bg-white transition-all flex items-center gap-3"
					>
						{isSyncing ? "SYNCING_LOGISTICS..." : "Authorize_Build"}
						{isSyncing ? <Activity className="animate-spin" size={16} /> : <ArrowRight size={16} />}
					</button>
				</div>
			</div>

			{/* SHARED MODALS */}
			<ModuleInspectionSheet product={inspectedModule} isOpen={!!inspectedModule} onClose={() => setInspectedModule(null)} onSelect={(p) => setComponent(activeType, p)} />
			<ModuleSelectionSheet
				isOpen={isRegistryOpen}
				onClose={() => setIsRegistryOpen(false)}
				category={activeType}
				products={availableModules}
				currentSelectionId={manifest[activeType]?.id}
				onSelect={(p) => setComponent(activeType, p)}
			/>
		</div>
	);
}
