"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const data = [
	{ name: "Active", value: 72 },
	{ name: "Reserve", value: 28 },
];

export function UnitSaturationChart() {
	return (
		<div className="h-[400px] w-full bg-[#1E293B]/10 border border-white/5 relative flex items-center justify-center">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie data={data} cx="50%" cy="50%" innerRadius={80} outerRadius={100} startAngle={180} endAngle={0} paddingAngle={5} dataKey="value" stroke="none">
						<Cell fill="#FFB400" className="shadow-[0_0_20px_rgba(255,180,0,0.5)]" />
						<Cell fill="rgba(255,255,255,0.05)" />
					</Pie>
				</PieChart>
			</ResponsiveContainer>

			{/* HUD READOUT */}
			<div className="absolute inset-0 flex flex-col items-center justify-center mt-10">
				<span className="text-[10px] font-mono text-[#94A3B8] uppercase">Current_Load</span>
				<span className="text-5xl font-black text-[#F5F5F0] tracking-tighter">
					72<span className="text-xl opacity-40">%</span>
				</span>
				<span className="text-[8px] font-mono text-green-500 uppercase mt-2">OPTIMAL_RANGE</span>
			</div>
		</div>
	);
}
