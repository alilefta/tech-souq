import { MetadataRoute } from "next";
import { prisma } from "@/prisma/prisma";
import { BLOG_POSTS } from "@/app/data/blog"; // Or fetch from DB if you moved blog there

// BASE URL CONSTANT
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://base60.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// 1. FETCH REGISTRY DATA
	const products = await prisma.product.findMany({
		select: { slug: true, updatedAt: true },
	});

	const categories = await prisma.category.findMany({
		select: { slug: true, updatedAt: true },
	});

	// 2. STATIC ROUTES (The Core Infrastructure)
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: `${BASE_URL}`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${BASE_URL}/builder`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/products`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: `${BASE_URL}/contact`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		},
	];

	// 3. DYNAMIC PRODUCT ROUTES
	const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
		url: `${BASE_URL}/products/${product.slug}`,
		lastModified: product.updatedAt,
		changeFrequency: "weekly",
		priority: 0.8,
	}));

	// 4. DYNAMIC SECTOR ROUTES
	const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
		url: `${BASE_URL}/categories/${category.slug}`,
		lastModified: category.updatedAt,
		changeFrequency: "weekly",
		priority: 0.7,
	}));

	// 5. BLOG ROUTES
	const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
		url: `${BASE_URL}/blog/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: "monthly",
		priority: 0.6,
	}));

	// MERGE ALL SIGNALS
	return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...blogRoutes];
}
