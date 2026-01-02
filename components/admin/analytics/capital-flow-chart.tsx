"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ date: "01.12", flow: 45000 },
	{ date: "05.12", flow: 52000 },
	{ date: "10.12", flow: 48000 },
	{ date: "15.12", flow: 61000 },
	{ date: "20.12", flow: 55000 },
	{ date: "25.12", flow: 67000 },
	{ date: "30.12", flow: 72000 },
];

export function CapitalFlowChart() {
	return (
		<div className="h-100 w-full bg-[#1E293B]/10 border border-white/5 p-8 relative">
			{/* Technical Background Lines */}
			<div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#F5F5F0 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />

			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
					<defs>
						<linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#FFB400" stopOpacity={0.3} />
							<stop offset="95%" stopColor="#FFB400" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
					<XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "monospace" }} />
					<YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "monospace" }} />
					<Tooltip
						content={({ active, payload }) => {
							if (active && payload && payload.length) {
								return (
									<div className="bg-[#0A0E14] border border-[#FFB400]/40 p-4 rounded-none shadow-2xl">
										<p className="text-[8px] font-mono text-[#94A3B8] uppercase mb-2">Stream_Capture</p>
										<p className="text-[#FFB400] text-lg font-black font-mono">VAL: ${payload[0].value?.toLocaleString()}</p>
										<p className="text-[7px] text-[#94A3B8] mt-1 uppercase">Node_Babylon_Alpha</p>
									</div>
								);
							}
							return null;
						}}
					/>
					<Area
						type="linear" // Sharp angles, no curves
						dataKey="flow"
						stroke="#FFB400"
						strokeWidth={2}
						fillOpacity={1}
						fill="url(#flowGradient)"
						animationDuration={2500}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
