import z from "zod";

// 1. Define specific shapes
export const CpuSchema = z.object({
	type: z.literal("CPU"),
	socket: z.string().min(1),
	tdp: z.coerce.number().min(0), // Wattage demand
	integratedGraphics: z.boolean().default(false),
});

export const MotherboardSchema = z.object({
	type: z.literal("MOTHERBOARD"),
	socket: z.string().min(1),
	formFactor: z.enum(["ATX", "mATX", "ITX", "E-ATX"]),
	memoryType: z.enum(["DDR4", "DDR5"]),
	memorySlots: z.coerce.number().min(2),
	m2Slots: z.coerce.number().min(0),
});

export const GpuSchema = z.object({
	type: z.literal("GPU"),
	length: z.coerce.number().min(100), // mm
	slots: z.coerce.number().min(1),
	tdp: z.coerce.number().min(0),
});

export const CaseSchema = z.object({
	type: z.literal("CASE"),
	formFactor: z.enum(["ATX", "mATX", "ITX", "E-ATX"]), // Max supported
	maxGpuLength: z.coerce.number(),
});

export const PsuSchema = z.object({
	type: z.literal("PSU"),
	wattage: z.coerce.number(),
	rating: z.string().optional(), // "80+ Gold"
});

export const RamSchema = z.object({
	type: z.literal("RAM"),
	memoryType: z.enum(["DDR4", "DDR5"]),
	capacity: z.coerce.number(), // Total GB
	modules: z.coerce.number(), // 2x16GB = 2
});

// Storage Module Logic
export const StorageSchema = z.object({
	type: z.literal("STORAGE"),
	storageType: z.enum(["SSD", "HDD", "NVME"]),
	formFactor: z.enum(["2.5", "3.5", "M.2"]),
	capacity: z.coerce.number().min(1), // GB
	interface: z.enum(["SATA", "PCIE_3", "PCIE_4", "PCIE_5"]),
});

// Thermal Regulator Logic (Coolers)
export const CoolerSchema = z.object({
	type: z.literal("COOLER"),
	coolerType: z.enum(["AIR", "LIQUID"]),
	socket: z.string().min(1), // Socket compatibility string
	height: z.coerce.number().min(0), // mm (Crucial for case clearance)
	radiatorSize: z.coerce.number().optional(), // 120, 240, 360mm
});

// 2. The Master Union
export const CompatibilitySchema = z.discriminatedUnion("type", [CpuSchema, MotherboardSchema, GpuSchema, CaseSchema, PsuSchema, RamSchema, StorageSchema, CoolerSchema]);

export const productSpecSchema = z.object({
	label: z.string().min(1, "Required"),
	value: z.string().min(1, "Required"),
});

export const addProductSchema = z.object({
	name: z.string().min(3, "IDENT_TOO_SHORT"),
	brand: z.string().min(1, "BRAND_REQUIRED"),
	sku: z.string().min(3, "SKU_REQUIRED"),
	categoryId: z.string().min(1, "SECTOR_REQUIRED"),
	price: z.number().min(1),
	originalPrice: z.number().optional(),
	stock: z.number().min(0),
	description: z.string().min(10, "NARRATIVE_TOO_SHORT"),
	images: z
		.array(
			z.object({
				url: z.url("Must be a valid URL"),
			})
		)
		.min(1, "VISUAL_REQUIRED"),
	specs: z.array(productSpecSchema),
	isActive: z.boolean(),
	isFeatured: z.boolean(),
	isNew: z.boolean(),

	compatibility: z.custom<z.infer<typeof CompatibilitySchema>>().optional(),
});

export const editProductSchema = addProductSchema.extend({
	id: z.string(),
});

export const deleteSchema = z.object({ id: z.number() });

export type AddProductSchemaType = z.infer<typeof addProductSchema>;
export type CompatibilitySchemaType = z.infer<typeof CompatibilitySchema>;
