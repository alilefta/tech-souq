"use client";

import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ day: "MON", received: 45, dispatched: 38 },
	{ day: "TUE", received: 52, dispatched: 48 },
	{ day: "WED", received: 61, dispatched: 60 },
	{ day: "THU", received: 58, dispatched: 45 },
	{ day: "FRI", received: 72, dispatched: 68 },
];

export function DispatchVelocityChart() {
	return (
		<div className="h-[400px] w-full bg-[#1E293B]/10 border border-white/5 p-8">
			<ResponsiveContainer width="100%" height="100%">
				<ComposedChart data={data} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
					<XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "monospace" }} />
					<YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "monospace" }} />
					<Tooltip
						contentStyle={{ backgroundColor: "#0A0E14", border: "1px solid rgba(255,180,0,0.4)", borderRadius: "0px" }}
						itemStyle={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase" }}
					/>
					<Bar dataKey="received" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
					<Line type="stepAfter" dataKey="dispatched" stroke="#FFB400" strokeWidth={2} dot={{ fill: "#FFB400", r: 3 }} />
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}
