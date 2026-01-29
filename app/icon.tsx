import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
	width: 32,
	height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
	return new ImageResponse(
		// ImageResponse JSX element
		<div
			style={{
				fontSize: 24,
				background: "#0A0E14",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: "0px", // Industrial Square
				position: "relative",
			}}
		>
			{/* Amber Border */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					border: "2px solid #FFB400",
					opacity: 1,
				}}
			/>

			{/* The "6" Glyph */}
			<div
				style={{
					color: "#F5F5F0",
					fontWeight: 900,
					fontFamily: "monospace",
					lineHeight: 1,
					fontSize: 18,
					marginTop: -2,
				}}
			>
				60
			</div>
		</div>,
		// ImageResponse options
		{
			...size,
		},
	);
}
