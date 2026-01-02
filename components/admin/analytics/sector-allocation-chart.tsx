"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
	{ sector: "GPU", units: 120 },
	{ sector: "CPU", units: 85 },
	{ sector: "RAM", units: 210 },
	{ sector: "STR", units: 150 },
	{ sector: "CLR", units: 45 },
];

export function SectorAllocationChart() {
	return (
		<div className="h-100 w-full bg-[#1E293B]/10 border border-white/5 p-8">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
					<XAxis dataKey="sector" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "monospace" }} />
					<Tooltip
						cursor={{ fill: "rgba(255, 180, 0, 0.05)" }}
						content={({ active, payload }) => {
							if (active && payload && payload.length) {
								return (
									<div className="bg-[#0A0E14] border border-[#FFB400]/40 p-3 rounded-none">
										<p className="text-[10px] font-black text-[#F5F5F0] uppercase tracking-tighter">{payload[0].payload.sector}_LOAD</p>
										<p className="text-[#FFB400] text-sm font-mono mt-1">{payload[0].value} UNITS</p>
									</div>
								);
							}
							return null;
						}}
					/>
					<Bar
						dataKey="units"
						radius={[0, 0, 0, 0]} // Keep it square
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={index === 2 ? "#FFB400" : "rgba(255, 255, 255, 0.05)"}
								stroke={index === 2 ? "#FFB400" : "rgba(255, 255, 255, 0.1)"}
								className="hover:opacity-80 transition-opacity cursor-crosshair"
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
