import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
			},
			{
				protocol: "https",
				hostname: "c6zw3p8ws7.ufs.sh",
			},
		],
	},
};

export default nextConfig;
