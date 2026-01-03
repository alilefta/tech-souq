"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Option {
	label: string;
	value: string;
}

interface FoundrySelectProps {
	label?: string;
	options: Option[];
	value?: string;
	onValueChange: (value: string) => void;
	placeholder?: string;
	className?: string; // For the trigger
	containerClassName?: string;
}

export function FoundrySelect({ label, options, value, onValueChange, placeholder = "SELECT_PROTOCOL...", className, containerClassName }: FoundrySelectProps) {
	return (
		<div className={cn("space-y-2 flex flex-col", containerClassName)}>
			{label && <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8] ml-1">{label}</Label>}

			<Select value={value} onValueChange={onValueChange}>
				<SelectTrigger
					className={cn(
						"w-full h-12 bg-white/2 border-white/10 rounded-none font-mono text-[10px] uppercase tracking-widest text-[#F5F5F0] outline-none transition-all",
						"hover:bg-white/4 hover:border-white/20 focus:ring-0 focus:border-[#FFB400]/40 data-[state=open]:border-[#FFB400]/40",
						className
					)}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>

				{/* THE REFINED MIDNIGHT DROPDOWN */}
				<SelectContent position="popper" sideOffset={4} className="bg-[#0A0E14] border-white/10 rounded-none shadow-2xl z-50 min-w-(--radix-select-trigger-width)">
					{options.map((opt) => (
						<SelectItem
							key={opt.value}
							value={opt.value}
							className="font-mono text-[10px] uppercase tracking-widest py-3 focus:bg-[#FFB400] focus:text-[#0A0E14] cursor-pointer rounded-none transition-colors border-b border-white/2 last:border-none"
						>
							{opt.label.replace(/ /g, "_")}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
