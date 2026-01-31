import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://base60.vercel.app";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			// Hide the Admin Dashboard and Private User areas from Google
			disallow: ["/admin/", "/checkout/", "/auth/"],
		},
		sitemap: `${BASE_URL}/sitemap.xml`,
	};
}
