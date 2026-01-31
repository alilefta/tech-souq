import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "BASE 60 // Global Hardware Foundry",
		short_name: "BASE 60",
		description: "Precision-engineered hardware dispatched from Babylon. The official registry for elite computing modules.",
		start_url: "/",
		display: "standalone",
		background_color: "#0A0E14", // Deep Midnight
		theme_color: "#FFB400", // Electric Amber
		icons: [
			{
				src: "/icon",
				sizes: "any",
				type: "image/png",
			},
			{
				src: "/apple-icon",
				sizes: "any",
				type: "image/png",
			},
		],
	};
}
