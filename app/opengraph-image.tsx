import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BASE 60 // Global Hardware Foundry";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image() {
	// We use standard fonts here for reliability in Edge runtime
	// In a real app, you can load your specific font files (Inter/Space Grotesk)
	return new ImageResponse(
		<div
			style={{
				background: "#0A0E14",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				padding: "60px",
				justifyContent: "space-between",
				fontFamily: "monospace", // Fallback to system mono
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* 1. BACKGROUND GRID */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
					backgroundSize: "40px 40px",
					opacity: 0.2,
				}}
			/>

			{/* 2. AMBER GLOW ACCENT */}
			<div
				style={{
					position: "absolute",
					top: "-20%",
					right: "-10%",
					width: "600px",
					height: "600px",
					background: "#FFB400",
					opacity: 0.05,
					filter: "blur(100px)",
					borderRadius: "100%",
				}}
			/>

			{/* 3. HEADER: TELEMETRY */}
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px" }}>
				<div style={{ display: "flex", gap: "20px", fontSize: 16, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
					<span>Proto: v60.4</span>
					<span>Node: Babylon_Alpha</span>
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
					<div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
					<span style={{ fontSize: 16, color: "#F5F5F0", fontWeight: "bold" }}>SYSTEM_OPTIMAL</span>
				</div>
			</div>

			{/* 4. MAIN CONTENT: BRAND */}
			<div style={{ display: "flex", flexDirection: "column", gap: "10px", zIndex: 10 }}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "15px",
						fontSize: 24,
						color: "#FFB400",
						textTransform: "uppercase",
						letterSpacing: "0.2em",
					}}
				>
					Foundry // E-Commerce
				</div>
				<div
					style={{
						fontSize: 110,
						fontWeight: 900,
						color: "#F5F5F0",
						lineHeight: 0.9,
						letterSpacing: "-0.05em",
						textTransform: "uppercase",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<span>
						BASE <span style={{ color: "#FFB400" }}>60</span>
					</span>
				</div>
				<div
					style={{
						fontSize: 32,
						color: "#94A3B8",
						maxWidth: "800px",
						marginTop: "20px",
						lineHeight: 1.4,
					}}
				>
					High-fidelity hardware configuration. Precision engineered from the cradle of Babylon.
				</div>
			</div>

			{/* 5. FOOTER: UI ELEMENTS */}
			<div style={{ display: "flex", gap: "40px", alignItems: "flex-end" }}>
				{/* Fake Button */}
				<div
					style={{
						background: "#FFB400",
						color: "#0A0E14",
						padding: "15px 40px",
						fontSize: 20,
						fontWeight: 900,
						textTransform: "uppercase",
						letterSpacing: "0.1em",
					}}
				>
					Authorize_Build
				</div>

				{/* Stats */}
				<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
					<span style={{ fontSize: 14, color: "#94A3B8", textTransform: "uppercase" }}>Modules_Available</span>
					<span style={{ fontSize: 24, color: "#F5F5F0", fontWeight: "bold" }}>12,402</span>
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
					<span style={{ fontSize: 14, color: "#94A3B8", textTransform: "uppercase" }}>Origin_Point</span>
					<span style={{ fontSize: 24, color: "#F5F5F0", fontWeight: "bold" }}>32.47° N</span>
				</div>
			</div>

			{/* Corner Decoration */}
			<div style={{ position: "absolute", bottom: 60, right: 60, width: 40, height: 40, borderRight: "4px solid #FFB400", borderBottom: "4px solid #FFB400" }} />
		</div>,
		{
			...size,
		},
	);
}
