"use client";

import { cn } from "@/lib/utils";
import { Truck, Globe, ArrowUpRight, Ban, CheckCircle2, Clock, CreditCard, LucideIcon } from "lucide-react";
import { useState } from "react";
import { DispatchAuthorization } from "@/components/admin/orders/dispatch-authorization";
import { OrderDTO } from "@/app/data/orders";
import { OrderStatus } from "@/generated/prisma/enums";

const getAgingMetric = (createdAt: Date) => {
	const hours = Math.floor((new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60));
	if (hours < 1) return "< 1H";
	return `${hours.toString().padStart(2, "0")}H`;
};

export function DispatchRow({ order }: { order: OrderDTO }) {
	const [isAuthorizing, setIsAuthorizing] = useState(false);

	const aging = getAgingMetric(order.createdAt);
	const isOverdue = parseInt(aging) > 24 && order.status === "PENDING";

	// 1. ELITE STATUS MAPPING
	const statusRegistry: { [key in OrderStatus]: { color: string; icon: LucideIcon; label: string } } = {
		PENDING: {
			color: "text-[#FFB400] bg-[#FFB400]/5 border-[#FFB400]/20",
			icon: Clock,
			label: "Awaiting_Clearance",
		},
		PAID: {
			color: "text-cyan-400 bg-cyan-400/5 border-cyan-400/20",
			icon: CreditCard,
			label: "Capital_Verified",
		},
		SHIPPED: {
			color: "text-blue-500 bg-blue-500/5 border-blue-500/20",
			icon: Truck,
			label: "Global_Transfer",
		},
		DELIVERED: {
			color: "text-green-500 bg-green-500/5 border-green-500/20",
			icon: CheckCircle2,
			label: "Node_Synchronized",
		},
		CANCELLED: {
			color: "text-red-500 bg-red-500/5 border-red-500/20",
			icon: Ban,
			label: "Protocol_Halt",
		},
	};

	const currentStatus = statusRegistry[order.status];
	const StatusIcon = currentStatus.icon;

	return (
		<>
			<tr className="border-b border-white/5 hover:bg-white/2 transition-all group cursor-pointer" onClick={() => setIsAuthorizing(true)}>
				{/* 1. MANIFEST ID */}
				<td className="p-5 text-[#FFB400] opacity-60 font-mono text-[10px] tracking-widest uppercase">#{order.orderNumber}</td>

				{/* NEW: RECIPIENT ENTITY */}
				<td className="p-5">
					<div className="flex flex-col">
						<span className="text-[#F5F5F0] font-bold tracking-tight">
							{order.firstName} {order.lastName}
						</span>
						<span className="text-[8px] font-mono text-[#94A3B8] opacity-40 lowercase">{order.email}</span>
					</div>
				</td>

				{/* 2. DESTINATION NODE */}
				<td className="p-5">
					<div className="flex items-center gap-3">
						<Globe size={14} className="text-[#94A3B8] opacity-20" />
						<div className="flex flex-col">
							<span className="text-[#F5F5F0] tracking-tight">{order.city}</span>
							<span className="text-[7px] font-mono uppercase text-[#94A3B8] opacity-40">Sector: {order.country}</span>
						</div>
					</div>
				</td>

				{/* NEW: UNIT LOAD */}
				<td className="p-5 text-[#94A3B8] font-mono text-[10px]">{order.items.length.toString().padStart(2, "0")}_Units</td>

				{/* NEW: AGING METRIC */}
				<td className="p-5">
					<div className="flex items-center gap-2">
						<span className={cn("text-[10px] font-mono font-bold", isOverdue ? "text-red-500 animate-pulse" : "text-[#F5F5F0] opacity-40")}>{aging}</span>
						{isOverdue && <div className="w-1 h-1 rounded-full bg-red-500" />}
					</div>
				</td>

				{/* 3. PAYLOAD VALUE */}
				<td className="p-5 font-black tracking-tighter text-[#F5F5F0]">
					<span className="text-[#FFB400] opacity-40 mr-1">$</span>
					{Number(order.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}
				</td>

				{/* 4. TRANSFER PROTOCOL */}
				<td className="p-5">
					<div className="inline-flex items-center gap-2 px-2 py-1 bg-white/2 border border-white/10 text-[8px] font-black uppercase tracking-widest text-[#94A3B8]">
						<Truck size={10} className="text-[#FFB400] opacity-50" />
						{order.carrier || "Global_Express"}
					</div>
				</td>

				{/* 5. LOGISTICS STATUS (THE REFINED BADGE) */}
				<td className="p-5">
					<div className={cn("inline-flex items-center gap-2 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.15em] border", currentStatus.color)}>
						<StatusIcon size={10} strokeWidth={3} />
						{currentStatus.label}
					</div>
				</td>

				{/* 6. SYSTEM ACCESS */}
				<td className="p-5 text-right">
					<button title="Access" className="p-2 text-[#94A3B8] hover:text-[#FFB400] transition-colors group-hover:translate-x-1 duration-300">
						<ArrowUpRight size={16} />
					</button>
				</td>
			</tr>

			<DispatchAuthorization order={order} isOpen={isAuthorizing} onClose={() => setIsAuthorizing(false)} />
		</>
	);
}
