// config/navigation.ts

export type NavItem = {
	title: string;
	href: string;
	disabled?: boolean;
	description?: string; // For tooltips or mega-menus
};

export const siteConfig = {
	name: "BASE 60",
	description: "Global Hardware Foundry",

	// PUBLIC ROUTES (Storefront)
	mainNav: [
		{
			title: "Registry", // /products
			href: "/products",
			description: "Full hardware module inventory",
		},
		{
			title: "Sectors", // /categories
			href: "/categories",
			description: "Browse by hardware type",
		},
		{
			title: "Crucible", // /builder
			href: "/builder",
			description: "3D Assembly Architect",
		},
	] satisfies NavItem[],

	// ADMIN ROUTES (Overseer)
	adminNav: [
		{ title: "Overview", href: "/admin" },
		{ title: "Modules", href: "/admin/products" },
		{ title: "Sectors", href: "/admin/categories" },
		{ title: "Dispatches", href: "/admin/orders" },
		{ title: "Analytics", href: "/admin/analytics" },
		{ title: "Intel", href: "/admin/reviews" },
		{ title: "Users", href: "/admin/users" },
		{ title: "Settings", href: "/admin/settings" },
	] satisfies NavItem[],
};
