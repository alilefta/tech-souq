import { prisma } from "@/prisma/prisma";

async function main() {
	await prisma.orderItem.deleteMany();
	await prisma.cartItem.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();

	// Create 4 categories
	const electronics = await prisma.category.create({
		data: {
			name: "Electronics",
			arabicName: "إلكترونيات",
			slug: "electronics",
			description: "Gadgets and gear",
			gridDisplay: "large",
		},
	});

	const home = await prisma.category.create({
		data: {
			name: "Home Appliances",
			arabicName: "أجهزة منزلية",
			slug: "home-appliances",
			description: "Appliances and smart home devices",
			gridDisplay: "medium",
		},
	});

	const accessories = await prisma.category.create({
		data: {
			name: "Accessories",
			arabicName: "الملحقات",
			slug: "accessories",
			description: "Bags, sleeves and small add-ons",
			gridDisplay: "small",
		},
	});

	const storage = await prisma.category.create({
		data: {
			name: "Storage Solutions",
			arabicName: "حلول التخزين",
			slug: "storage-solutions",
			description: "SSDs, HDDs, and storage devices",
			gridDisplay: "tall",
		},
	});

	// Create 8 products across the categories
	await prisma.product.create({
		data: {
			name: "Pro Developer Keyboard",
			brand: "MechMaster",
			slug: "pro-keyboard",
			sku: "KBD-001",
			description: "Mechanical keyboard for fast typing.",
			price: 149.99,
			originalPrice: 199.99,
			images: [
				"https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
				"https://images.unsplash.com/photo-1587829191301-4b46b0dd5866?w=800",
				"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800",
				"https://images.unsplash.com/photo-1526374965328-7f5ae4e8be11?w=800",
			],
			categoryId: electronics.id,
			stock: 50,
			isFeatured: true,
			isNew: true,
			averageRating: 4.8,
			reviewCount: 342,
			specs: {
				create: [
					{ label: "Switch Type", value: "Cherry MX Blue" },
					{ label: "Layout", value: "Full Size" },
					{ label: "Connection", value: "USB-C Wired" },
				],
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "Wireless Precision Mouse",
			brand: "LogiPro",
			slug: "wireless-precision-mouse",
			sku: "MSE-002",
			description: "Ergonomic wireless mouse with high precision sensor.",
			price: 59.5,
			originalPrice: 79.99,
			images: ["https://images.unsplash.com/photo-1587825140608-5b7b9b3a1f9f?w=800"],
			categoryId: electronics.id,
			stock: 120,
			isFeatured: true,
			averageRating: 4.6,
			reviewCount: 218,
			specs: {
				create: [
					{ label: "DPI", value: "16000" },
					{ label: "Battery Life", value: "24 months" },
					{ label: "Connection", value: "2.4GHz Wireless" },
				],
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "Noise Cancelling Headphones",
			brand: "AudioMax",
			slug: "noise-cancelling-headphones",
			sku: "HPH-003",
			description: "Over-ear headphones with active noise cancellation.",
			price: 199.99,
			images: [
				"https://images.unsplash.com/photo-1518444021041-45a6a9f2b7b7?w=800",
				"https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800",
				"https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
				"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
			],
			categoryId: electronics.id,
			stock: 35,
			isNew: true,
			averageRating: 4.9,
			reviewCount: 567,
			specs: {
				create: [
					{ label: "ANC Type", value: "Active Noise Cancellation" },
					{ label: "Battery", value: "30-hour battery life" },
					{ label: "Driver", value: "40mm dynamic driver" },
				],
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "Smart LED Bulb (2-pack)",
			brand: "SmartHome Pro",
			slug: "smart-led-bulb-2pack",
			sku: "BLB-004",
			description: "Color-changing smart bulbs controllable via app.",
			price: 29.99,
			originalPrice: 39.99,
			images: ["https://images.unsplash.com/photo-1505672678657-cc7037095e6f?w=800"],
			categoryId: home.id,
			stock: 200,
			isFeatured: true,
			averageRating: 4.5,
			reviewCount: 145,
			specs: {
				create: [
					{ label: "Colors", value: "16 Million RGB" },
					{ label: "Brightness", value: "810 Lumens" },
					{ label: "Lifespan", value: "25000 hours" },
				],
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "Compact Coffee Maker",
			brand: "BrewMaster",
			slug: "compact-coffee-maker",
			sku: "COF-005",
			description: "Single-serve compact coffee maker for home or office.",
			price: 89.0,
			originalPrice: 119.99,
			images: ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"],
			categoryId: home.id,
			stock: 40,
			averageRating: 4.4,
			reviewCount: 87,
			specs: {
				create: [
					{ label: "Capacity", value: "0.6L" },
					{ label: "Brew Time", value: "2-3 minutes" },
					{ label: "Power", value: "900W" },
				],
			},
		},
	});

	await prisma.product.create({
		data: {
			name: 'Laptop Sleeve 13"',
			brand: "ProtectGear",
			slug: "laptop-sleeve-13",
			sku: "ACC-006",
			description: "Protective slim laptop sleeve with zipper.",
			price: 24.5,
			originalPrice: 34.99,
			images: ["https://images.unsplash.com/photo-1585386959984-a415522e8b1c?w=800"],
			categoryId: accessories.id,
			stock: 150,
			averageRating: 4.3,
			reviewCount: 156,
			specs: {
				create: [
					{ label: "Size", value: "13 inch" },
					{ label: "Material", value: "Neoprene" },
					{ label: "Padding", value: "Thick 5mm foam" },
				],
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "NVMe SSD 1TB",
			brand: "DataSpeed",
			slug: "nvme-ssd-1tb",
			sku: "SSD-007",
			description: "Ultra-fast NVMe M.2 SSD for gaming and content creation.",
			price: 129.99,
			originalPrice: 159.99,
			images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800"],
			categoryId: storage.id,
			stock: 75,
			isFeatured: true,
			isNew: true,
			averageRating: 4.7,
			reviewCount: 423,
			specs: {
				create: [
					{ label: "Capacity", value: "1TB" },
					{ label: "Speed", value: "7,100 MB/s read" },
					{ label: "Interface", value: "PCIe 4.0 NVMe M.2" },
				],
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "External USB-C Hard Drive 2TB",
			brand: "StorageMax",
			slug: "external-hdd-2tb",
			sku: "HDD-008",
			description: "Portable external hard drive with USB-C for fast transfers.",
			price: 79.99,
			originalPrice: 99.99,
			images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800"],
			categoryId: storage.id,
			stock: 90,
			averageRating: 4.5,
			reviewCount: 312,
			specs: {
				create: [
					{ label: "Capacity", value: "2TB" },
					{ label: "Speed", value: "130 MB/s" },
					{ label: "Connection", value: "USB-C 3.1" },
				],
			},
		},
	});

	console.log("✅ Database seeded with 4 categories and 8 products!");
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
