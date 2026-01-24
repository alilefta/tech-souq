"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { trackOrder } from "@/app/actions/tracking";
import { Search, Package, MapPin, CheckCircle2, Truck, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { SafeImage } from "../ui/safe-image";

export function TrackingTerminal() {
	const [query, setQuery] = useState("");
	const [result, setResult] = useState<any>(null);

	const {
		execute,
		isExecuting,
		result: actionResult,
	} = useAction(trackOrder, {
		onSuccess: ({ data }) => {
			if (data?.success) setResult(data.order);
		},
		onError: () => setResult(null), // Clear previous results on error
	});

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		execute({ orderNumber: query });
	};

	return (
		<div className="space-y-12">
			{/* 1. COMMAND INPUT */}
			<form onSubmit={handleSearch} className="relative group max-w-xl mx-auto">
				<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
					<Search className={cn("w-5 h-5 transition-colors", isExecuting ? "text-[#FFB400] animate-pulse" : "text-[#94A3B8]")} />
				</div>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="ENTER_MANIFEST_ID (e.g. BBL-HEX-4921)..."
					className="w-full h-16 bg-[#1E293B]/20 border border-white/10 pl-14 pr-32 text-sm font-mono uppercase tracking-widest text-[#F5F5F0] outline-none focus:border-[#FFB400]/40 focus:bg-[#FFB400]/5 transition-all placeholder:text-white/10"
				/>
				<button
					type="submit"
					disabled={isExecuting}
					className="absolute right-2 top-2 bottom-2 px-6 bg-[#FFB400] text-[#0A0E14] font-black text-[9px] uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 disabled:grayscale"
				>
					{isExecuting ? "PINGING..." : "LOCATE"}
				</button>

				{/* Decorative Scanline on Focus */}
				<div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFB400] transition-all group-focus-within:w-full duration-700" />
			</form>

			{/* 2. RESULTS DISPLAY */}
			<div className="min-h-[400px]">
				{isExecuting ? (
					<div className="flex flex-col items-center justify-center h-64 space-y-6 opacity-50">
						<RadarScan />
						<p className="text-[10px] font-mono text-[#FFB400] uppercase tracking-widest animate-pulse">Triangulating_Signal_Source...</p>
					</div>
				) : result ? (
					<TrackingResult order={result} />
				) : !actionResult.data ? (
					<div className="flex flex-col items-center justify-center h-64 border border-dashed border-red-500/20 bg-red-500/5">
						<AlertTriangle className="text-red-500 mb-4" size={32} />
						<h3 className="text-lg font-black text-red-500 uppercase tracking-tight">Signal_Lost</h3>
						<p className="text-[#94A3B8] font-mono text-xs uppercase mt-2">Coordinates not found in registry. Check Manifest ID.</p>
					</div>
				) : (
					// Idle State
					<div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/5 opacity-30">
						<p className="text-[8px] font-mono text-[#94A3B8] uppercase tracking-[0.4em]">Terminal_Ready // Awaiting_Input</p>
					</div>
				)}
			</div>
		</div>
	);
}

// --- SUB-COMPONENTS ---

function TrackingResult({ order }: { order: any }) {
	// Logic to map status to progress step (1-4)
	const steps = ["PENDING", "PAID", "SHIPPED", "DELIVERED"];
	const currentStepIndex = steps.indexOf(order.status);

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/5 pt-12">
			{/* LEFT: TIMELINE VISUALIZER */}
			<div className="lg:col-span-4 space-y-8">
				<h3 className="text-[10px] font-black uppercase text-[#94A3B8] tracking-[0.3em] mb-8">Signal_Path</h3>

				<div className="relative border-l border-white/10 ml-3 space-y-10 py-2">
					<TimelineStep label="Order_Initialized" date={new Date(order.createdAt).toLocaleDateString()} active={currentStepIndex >= 0} icon={Clock} />
					<TimelineStep label="Capital_Verified" date={currentStepIndex >= 1 ? "Authorized" : "Pending"} active={currentStepIndex >= 1} icon={CheckCircle2} />
					<TimelineStep label="In_Transit" date={order.carrier || "Global_Express"} active={currentStepIndex >= 2} icon={Truck} isPulse={currentStepIndex === 2} />
					<TimelineStep label="Destination_Reached" date={order.city.toUpperCase()} active={currentStepIndex >= 3} icon={MapPin} isLast />
				</div>
			</div>

			{/* RIGHT: MANIFEST DOSSIER */}
			<div className="lg:col-span-8 bg-[#1E293B]/20 border border-white/5 p-8">
				<div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
					<div>
						<span className="text-[#FFB400] text-[9px] font-black uppercase tracking-widest block mb-1">Manifest_ID</span>
						<h2 className="text-3xl font-black text-[#F5F5F0] font-mono tracking-tighter">#{order.orderNumber}</h2>
					</div>
					<div className="text-right">
						<span className="text-[#94A3B8] text-[9px] font-black uppercase tracking-widest block mb-1">Status</span>
						<span className={cn("text-lg font-bold uppercase tracking-tight", order.status === "DELIVERED" ? "text-green-500" : "text-[#FFB400]")}>{order.status}</span>
					</div>
				</div>

				<div className="space-y-4">
					{order.items.map((item: any) => (
						<div key={item.id} className="flex items-center gap-4 p-4 bg-[#0A0E14] border border-white/5 group hover:border-[#FFB400]/30 transition-all">
							<div className="w-12 h-12 relative bg-white/5 shrink-0">
								{item.product.coverImage && <SafeImage src={item.product.coverImage} alt="" fill className="object-contain p-1" />}
							</div>
							<div className="flex-1">
								<p className="text-[9px] font-black text-[#94A3B8] uppercase">{item.product.brand}</p>
								<p className="text-xs font-bold text-[#F5F5F0] uppercase tracking-tight line-clamp-1">{item.product.name}</p>
							</div>
							<div className="text-right">
								<p className="text-[9px] font-mono text-[#94A3B8]">QTY: {item.quantity}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
}

function TimelineStep({ label, date, active, icon: Icon, isLast, isPulse }: any) {
	return (
		<div className={cn("relative pl-8 group", active ? "opacity-100" : "opacity-30")}>
			{/* Dot on Line */}
			<div
				className={cn(
					"absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full border-2 transition-all",
					active ? "bg-[#0A0E14] border-[#FFB400]" : "bg-[#0A0E14] border-white/20",
					isPulse && "animate-pulse shadow-[0_0_10px_#FFB400]",
				)}
			/>

			<div className="flex items-center gap-3 mb-1">
				<h4 className={cn("text-[10px] font-black uppercase tracking-widest", active ? "text-[#F5F5F0]" : "text-[#94A3B8]")}>{label}</h4>
				{active && <Icon size={12} className="text-[#FFB400]" />}
			</div>
			<p className="text-[9px] font-mono text-[#94A3B8] uppercase">{date}</p>
		</div>
	);
}

function RadarScan() {
	return (
		<div className="w-24 h-24 border border-[#FFB400]/20 rounded-full flex items-center justify-center relative">
			<div className="absolute inset-0 border-t border-[#FFB400] rounded-full animate-spin [animation-duration:2s]" />
			<div className="w-1 h-1 bg-[#FFB400] rounded-full shadow-[0_0_15px_#FFB400]" />
		</div>
	);
}
