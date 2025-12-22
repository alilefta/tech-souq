// components/ui/tech-placeholder.tsx
import { Cpu } from "lucide-react";

export function TechPlaceholder({ name }: { name: string }) {
	return (
		<div className="relative w-full h-full bg-[#1E293B]/20 flex flex-col items-center justify-center p-8 overflow-hidden group">
			{/* Background Girih Pattern */}
			<div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
				<span className="text-[200px] font-bold select-none italic text-[#F5F5F0]">SOUQ</span>
			</div>

			{/* Pulsing Core */}
			<div className="relative z-10 flex flex-col items-center w-full">
				<div className="w-16 h-16 border border-[#FFB400]/20 rounded-sm flex items-center justify-center mb-4 relative">
					<Cpu className="text-[#FFB400]/40 group-hover:text-[#FFB400] transition-colors" size={32} strokeWidth={1} />
					{/* Diagnostic Corner Lines */}
					<div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#FFB400]" />
					<div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#FFB400]" />
				</div>

				<p className="text-[#94A3B8] text-[10px] font-mono uppercase tracking-[0.3em] text-center max-w-60 break-all">Visual_Data_Not_Found</p>
				<span className="mt-2 text-[#FFB400]/40 text-[8px] font-bold uppercase">{name.substring(0, 15)}...</span>
			</div>

			{/* Subtle Scanline */}
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-[#FFB400]/5 to-transparent h-[20%] w-full scan pointer-events-none" />
		</div>
	);
}
