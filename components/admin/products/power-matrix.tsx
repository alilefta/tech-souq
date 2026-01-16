"use client";

import { useFormContext } from "react-hook-form";
import { Plus, Minus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface PowerMatrixProps {
	name: string; // "compatibility.cpuPowerConnectors"
	label: string;
	options: string[];
}

export function PowerMatrix({ name, label, options }: PowerMatrixProps) {
	const { watch, setValue } = useFormContext();
	const currentCables = watch(name) || [];

	const addCable = (type: string) => {
		setValue(name, [...currentCables, type]);
	};

	const removeCable = (type: string) => {
		// Remove only the first instance of this type
		const index = currentCables.indexOf(type);
		if (index > -1) {
			const newCables = [...currentCables];
			newCables.splice(index, 1);
			setValue(name, newCables);
		}
	};

	return (
		<div className="space-y-3">
			<label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8] flex items-center gap-2">
				<Zap size={10} className="text-[#FFB400]" /> {label}
			</label>

			<div className="grid grid-cols-2 md:grid-cols-1 gap-2">
				{options.map((type) => {
					const count = currentCables.filter((c: string) => c === type).length;
					return (
						<div key={type} className="flex items-center justify-between p-2 bg-white/2 border border-white/10 hover:border-[#FFB400]/20 transition-all group">
							<span className="text-[10px] font-mono font-bold text-[#F5F5F0] ">{type}</span>

							<div className="flex items-center gap-2">
								<button
									title="Remove Cable"
									type="button"
									onClick={() => removeCable(type)}
									disabled={count === 0}
									className="w-5 h-5 flex items-center justify-center border border-white/10 text-[#94A3B8] hover:bg-white/5 disabled:opacity-20 transition-all"
								>
									<Minus size={10} />
								</button>
								<span className="text-[12px] font-mono text-[#FFB400] w-4 text-center">{count}</span>
								<button
									title="Add Cable"
									type="button"
									onClick={() => addCable(type)}
									className="w-5 h-5 flex items-center justify-center border border-white/10 text-[#94A3B8] hover:bg-white/5 hover:text-[#FFB400] transition-all"
								>
									<Plus size={10} />
								</button>
							</div>
						</div>
					);
				})}
			</div>

			{/* Visualizer of Active Cables */}
			<div className="flex flex-wrap gap-1 min-h-5">
				{currentCables.map((cable: string, i: number) => (
					<div key={i} className="px-1.5 py-0.5 bg-[#FFB400]/10 border border-[#FFB400]/30 text-[9px] font-mono text-[#FFB400] uppercase">
						{cable}
					</div>
				))}
			</div>
		</div>
	);
}
