// app/icon.tsx
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
	width: 32,
	height: 32,
};
export const contentType = "image/png";

// THE BASE 60 LOGO GENERATOR
export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "transparent",
			}}
		>
			{/* THE OUTER FOUNDRY SHELL */}
			<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				{/* Hexagonal Frame (Amber Stroke) */}
				<path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="#FFB400" strokeWidth="3" fill="#0A0E14" strokeLinejoin="round" />

				{/* The Silicon Core (Amber Fill) */}
				<rect x="13" y="11" width="6" height="10" fill="#FFB400" />
				<rect x="11" y="13" width="10" height="6" fill="#FFB400" />
			</svg>
		</div>,
		{
			...size,
		},
	);
}
