// app/apple-icon.tsx
import { ImageResponse } from "next/og";

export const size = {
	width: 180,
	height: 180,
};
export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "#0A0E14", // Midnight Background
			}}
		>
			<svg width="120" height="120" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				{/* Hexagon Filled */}
				<path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="#FFB400" />

				{/* Core Cutout (Midnight) */}
				<path d="M16 8L24 13V20L16 24L8 20V13L16 8Z" fill="#0A0E14" />
			</svg>
		</div>,
		{
			...size,
		},
	);
}
