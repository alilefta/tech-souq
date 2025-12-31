"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ time: "0800", val: 4000 },
	{ time: "1000", val: 3000 },
	{ time: "1200", val: 2000 },
	{ time: "1400", val: 2780 },
	{ time: "1600", val: 1890 },
	{ time: "1800", val: 2390 },
	{ time: "2000", val: 3490 },
];

export function RevenueTelemetry() {
	return (
		<div className="h-[350px] w-full bg-white/[0.01] border border-white/5 p-6 relative overflow-hidden">
			{/* Background technical labels */}
			<div className="absolute top-4 right-4 flex gap-4 opacity-20">
				<span className="text-[7px] font-mono uppercase tracking-widest text-[#94A3B8]">Buffer: 1024kb</span>
				<span className="text-[7px] font-mono uppercase tracking-widest text-[#94A3B8]">Sector: BBL_ALPHA</span>
			</div>

			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
					<defs>
						<linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#FFB400" stopOpacity={0.3} />
							<stop offset="95%" stopColor="#FFB400" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
					<XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "monospace" }} />
					<YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "monospace" }} />
					<Tooltip
						content={({ active, payload }) => {
							if (active && payload && payload.length) {
								return (
									<div className="bg-[#0A0E14] border border-[#FFB400]/40 p-3 rounded-none shadow-2xl">
										<p className="text-[8px] font-mono text-[#94A3B8] uppercase mb-1">Packet_Value</p>
										<p className="text-[#FFB400] text-sm font-black font-mono">${payload[0].value?.toLocaleString()}</p>
									</div>
								);
							}
							return null;
						}}
					/>
					<Area type="monotone" dataKey="val" stroke="#FFB400" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" animationDuration={2000} />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
