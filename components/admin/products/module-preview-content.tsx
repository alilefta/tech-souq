import { ProductDetailsDTO } from "@/app/data/products";
import { SafeImage } from "@/components/ui/safe-image";
import { cn } from "@/lib/utils";
import { ExternalLink, Terminal, Zap, Eye, EyeOff, Calendar, Clock, ChevronRight, History, Database } from "lucide-react";
import Link from "next/link";

import { motion } from "motion/react";

export function ModulePreviewContent({ product }: { product: ProductDetailsDTO; onClose: () => void }) {
	return (
		<div className="h-full flex flex-col">
			<div className="flex-1 overflow-y-auto custom-scrollbar">
				{/* 2. VISUAL ASSET TERMINAL */}
				<div className="relative aspect-video bg-[#1E293B]/20 border-b border-white/5 group overflow-hidden">
					<SafeImage src={product.coverImage || product.images?.[0]} alt={product.name} fill className="object-contain p-8 grayscale group-hover:grayscale-0 transition-all duration-1000" />
					{/* Asset HUD */}
					<div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
						<div className="bg-black/60 backdrop-blur-md border border-white/10 p-2 space-y-1">
							<p className="text-[7px] font-mono text-[#94A3B8] uppercase">Asset_Registry</p>
							<p className="text-[9px] font-bold text-[#F5F5F0]">{product.images?.length || 1} High-Res Modules</p>
						</div>
						<div className="bg-[#FFB400] text-[#0A0E14] p-1.5">
							<Database size={14} />
						</div>
					</div>
				</div>

				{/* 3. CORE LOGIC FLAGS (New Featured/New Tags) */}
				<div className="grid grid-cols-3 gap-px bg-white/5 border-b border-white/5">
					<FlagItem label="Visibility" val={product.isActive ? "PUBLIC" : "HIDDEN"} active={product.isActive} icon={product.isActive ? <Eye size={12} /> : <EyeOff size={12} />} />
					<FlagItem label="Vanguard" val={product.isFeatured ? "PROMOTED" : "STANDARD"} active={product.isFeatured} icon={<Zap size={12} />} />
					<FlagItem label="Generation" val={product.isNew ? "NEW_GEN" : "LEGACY"} active={product.isNew} icon={<History size={12} />} />
				</div>

				{/* 4. ALLOCATION DASHBOARD */}
				<div className="p-6 space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-white/[0.02] border border-white/5 p-4 relative">
							<span className="text-[8px] font-black text-[#94A3B8] uppercase tracking-widest opacity-40">Current_Allocation</span>
							<p className="text-2xl font-black text-[#F5F5F0] tracking-tighter mt-1">
								{product.stock} <span className="text-xs font-normal opacity-30">Units</span>
							</p>
							<div className="mt-3 h-1 w-full bg-white/5">
								<div className={cn("h-full transition-all", (product.stock || 0) < 10 ? "bg-red-500" : "bg-[#FFB400]")} style={{ width: `${Math.min(product.stock || 0, 100)}%` }} />
							</div>
						</div>
						<div className="bg-white/[0.02] border border-white/5 p-4">
							<span className="text-[8px] font-black text-[#94A3B8] uppercase tracking-widest opacity-40">Foundry_Value</span>
							<p className="text-2xl font-black text-[#FFB400] tracking-tighter mt-1">${product.price?.toLocaleString()}</p>
							<p className="text-[8px] font-mono text-[#94A3B8] mt-2">MSRP: ${product.originalPrice || product.price}</p>
						</div>
					</div>

					{/* 5. SECTOR & BRAND */}
					<div className="flex gap-4">
						<div className="flex-1 bg-white/[0.01] border border-white/5 p-3 flex items-center gap-3">
							<Terminal size={14} className="text-[#94A3B8]" />
							<div>
								<p className="text-[7px] font-mono text-[#94A3B8] uppercase">Sector</p>
								<p className="text-[10px] font-bold text-[#F5F5F0] uppercase tracking-tight">{product.category?.name || "Unallocated"}</p>
							</div>
						</div>
						<div className="flex-1 bg-white/[0.01] border border-white/5 p-3 flex items-center gap-3">
							<div className="w-4 h-4 bg-[#FFB400]/10 rounded-full" />
							<div>
								<p className="text-[7px] font-mono text-[#94A3B8] uppercase">Brand_Heritage</p>
								<p className="text-[10px] font-bold text-[#F5F5F0] uppercase tracking-tight">{product.brand}</p>
							</div>
						</div>
					</div>

					{/* 6. TECHNICAL DOSSIER (Description) */}
					<div className="space-y-3">
						<h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB400]/60 flex items-center gap-2">
							<ChevronRight size={10} /> Narrative_Logic
						</h4>
						<p className="text-xs text-[#94A3B8] leading-relaxed font-medium bg-white/[0.01] p-4 border-l border-white/10">
							{product.description || "No narrative log available for this module."}
						</p>
					</div>

					{/* 7. FULL SPECIFICATION MANIFEST */}
					<div className="space-y-4">
						<h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB400]/60 flex items-center gap-2">
							<ChevronRight size={10} /> Technical_Manifest
						</h4>
						<div className="grid grid-cols-1 gap-2">
							{product.specs?.map((spec, i: number) => (
								<div key={i} className="flex justify-between items-center group/spec px-3 py-2 hover:bg-white/5 transition-colors border-b border-white/[0.03]">
									<span className="text-[9px] font-bold text-[#94A3B8] uppercase group-hover/spec:text-[#F5F5F0]">{spec.label}</span>
									<span className="text-[10px] font-mono text-[#F5F5F0]">{spec.value}</span>
								</div>
							))}
						</div>
					</div>

					{/* 8. REGISTRY TIMELINE */}
					<div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-8 opacity-40">
						<div className="flex items-center gap-3">
							<Calendar size={12} />
							<div className="flex flex-col">
								<span className="text-[7px] font-mono uppercase">Initialized</span>
								<span className="text-[9px] font-bold uppercase">{new Date(product.createdAt).toLocaleDateString()}</span>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Clock size={12} />
							<div className="flex flex-col">
								<span className="text-[7px] font-mono uppercase">Last_Sync</span>
								<span className="text-[9px] font-bold uppercase">{new Date(product.updatedAt).toLocaleDateString()}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* 9. COMMAND ACTIONS */}
			<div className="p-6 bg-[#0A0E14] border-t border-white/10 grid grid-cols-2 gap-4 shrink-0">
				<Link href={`/products/${product.slug}`} target="_blank" className="w-full">
					<button className="w-full py-4 border border-white/10 text-[#F5F5F0] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center justify-center gap-2">
						<ExternalLink size={14} /> View_Live_Dossier
					</button>
				</Link>
				<Link href={`/admin/products/${product.id}/edit`} className="w-full">
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="w-full py-4 bg-[#FFB400] text-[#0A0E14] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all"
					>
						Authorize_Reconfig
					</motion.button>
				</Link>
			</div>
		</div>
	);
}

/* HELPER COMPONENT FOR FLAGS */
function FlagItem({ label, val, active, icon }: { label: string; val: string; active: boolean; icon: React.ReactNode }) {
	return (
		<div className="bg-[#0A0E14] p-4 flex flex-col items-center gap-2 text-center group">
			<span className="text-[7px] font-mono text-[#94A3B8] uppercase tracking-widest opacity-40">{label}</span>
			<div className={cn("transition-colors", active ? "text-[#FFB400]" : "text-[#94A3B8] opacity-20")}>{icon}</div>
			<span className={cn("text-[9px] font-black tracking-tighter uppercase", active ? "text-[#F5F5F0]" : "text-[#94A3B8] opacity-20")}>{val}</span>
		</div>
	);
}
