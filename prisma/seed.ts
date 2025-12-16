import { prisma } from "@/prisma/prisma";

async function main() {
	await prisma.orderItem.deleteMany();
	await prisma.cartItem.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();

	// Create 3 categories
	const electronics = await prisma.category.create({
		data: {
			name: "Electronics",
			slug: "electronics",
			description: "Gadgets and gear",
		},
	});

	const home = await prisma.category.create({
		data: {
			name: "Home Appliances",
			slug: "home-appliances",
			description: "Appliances and smart home devices",
		},
	});

	const accessories = await prisma.category.create({
		data: {
			name: "Accessories",
			slug: "accessories",
			description: "Bags, sleeves and small add-ons",
		},
	});

	// Create 6 products across the categories
	await prisma.product.create({
		data: {
			name: "Pro Developer Keyboard",
			slug: "pro-keyboard",
			description: "Mechanical keyboard for fast typing.",
			price: 149.99,
			images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=800"],
			categoryId: electronics.id,
			stock: 50,
		},
	});

	await prisma.product.create({
		data: {
			name: "Wireless Precision Mouse",
			slug: "wireless-precision-mouse",
			description: "Ergonomic wireless mouse with high precision sensor.",
			price: 59.5,
			images: ["https://images.unsplash.com/photo-1587825140608-5b7b9b3a1f9f?w=800"],
			categoryId: electronics.id,
			stock: 120,
		},
	});

	await prisma.product.create({
		data: {
			name: "Noise Cancelling Headphones",
			slug: "noise-cancelling-headphones",
			description: "Over-ear headphones with active noise cancellation.",
			price: 199.99,
			images: ["https://images.unsplash.com/photo-1518444021041-45a6a9f2b7b7?w=800"],
			categoryId: electronics.id,
			stock: 35,
		},
	});

	await prisma.product.create({
		data: {
			name: "Smart LED Bulb (2-pack)",
			slug: "smart-led-bulb-2pack",
			description: "Color-changing smart bulbs controllable via app.",
			price: 29.99,
			images: ["https://images.unsplash.com/photo-1505672678657-cc7037095e6f?w=800"],
			categoryId: home.id,
			stock: 200,
		},
	});

	await prisma.product.create({
		data: {
			name: "Compact Coffee Maker",
			slug: "compact-coffee-maker",
			description: "Single-serve compact coffee maker for home or office.",
			price: 89.0,
			images: ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"],
			categoryId: home.id,
			stock: 40,
		},
	});

	await prisma.product.create({
		data: {
			name: 'Laptop Sleeve 13"',
			slug: "laptop-sleeve-13",
			description: "Protective slim laptop sleeve with zipper.",
			price: 24.5,
			images: ["https://images.unsplash.com/photo-1585386959984-a415522e8b1c?w=800"],
			categoryId: accessories.id,
			stock: 150,
		},
	});

	console.log("✅ Database seeded!");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (err) => {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
		process.exit(1);
	});
