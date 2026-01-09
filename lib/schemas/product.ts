import z from "zod";

// 1. Define specific shapes
export const CpuSchema = z.object({
	type: z.literal("CPU"),

	// ── Motherboard compatibility ─────────────────────
	socket: z.string().min(1), // Must match Motherboard.socket
	chipsetSupport: z.array(z.string()).optional(), // Used later to validate compatible chipsets

	// ── Memory compatibility ──────────────────────────
	supportedMemoryType: z.enum(["DDR4", "DDR5"]), // Must match Motherboard.memoryType
	maxMemorySpeed: z.coerce.number(), // MHz (RAM speed above this may downclock)

	// ── Power & thermals ──────────────────────────────
	tdp: z.coerce.number().min(0), // Used to validate PSU wattage & Cooler capacity

	// ── Graphics ──────────────────────────────────────
	integratedGraphics: z.boolean().default(false), // If false, GPU is required for display
});

export const MotherboardSchema = z.object({
	type: z.literal("MOTHERBOARD"),

	// ── CPU compatibility ──────────────────────────────
	socket: z.string().min(1), // Must match CPU.socket
	chipset: z.string().min(1), // Used later to validate CPU generation & features

	// ── Physical constraints ───────────────────────────
	formFactor: z.enum(["ATX", "mATX", "ITX", "E-ATX"]), // Must be supported by Case.formFactor

	// ── Memory compatibility ──────────────────────────
	memoryType: z.enum(["DDR4", "DDR5"]), // Must match RAM.memoryType
	memorySlots: z.coerce.number().min(2), // Limits how many RAM modules can be installed
	maxMemoryCapacity: z.coerce.number().min(1), // GB (RAM.capacity must not exceed this)
	supportedMemorySpeeds: z.array(z.coerce.number()).min(1), // MHz (Used for RAM speed warnings)

	// ── GPU / PCIe compatibility ──────────────────────
	pcieVersion: z.enum(["PCIE_3", "PCIE_4", "PCIE_5"]), // Used to warn if GPU runs at lower PCIe speed
	pcieX16Slots: z.coerce.number().min(0), // At least 1 required to install a GPU

	// ── Storage compatibility ─────────────────────────
	sataPorts: z.coerce.number().min(0), // Number of SATA drives cannot exceed this
	m2Slots: z.array(
		z.object({
			interface: z.enum(["PCIE_3", "PCIE_4", "PCIE_5"]), // Must support NVMe drive PCIe version
			size: z.enum(["2242", "2260", "2280", "22110"]), // Must fit NVMe physical size
		})
	), // Used to validate NVMe drive compatibility

	// ── Power compatibility ───────────────────────────
	cpuPowerConnectors: z.array(z.enum(["4-pin", "8-pin"])), // PSU must provide all required CPU power connectors
});

export const GpuSchema = z.object({
	type: z.literal("GPU"),

	// ── PCIe compatibility ────────────────────────────
	interface: z.literal("PCIe"), // Must match motherboard PCIe slot type
	pcieVersion: z.enum(["PCIE_3", "PCIE_4", "PCIE_5"]), // May downscale to motherboard PCIe version

	// ── Physical constraints ──────────────────────────
	length: z.coerce.number().min(100), // mm (Must fit inside Case.maxGpuLength)
	slots: z.coerce.number().min(1), // Thickness (Must fit Case.maxGpuSlots)

	// ── Power requirements ────────────────────────────
	tdp: z.coerce.number().min(0), // Wattage used for PSU sizing
	powerConnectors: z.array(z.enum(["6-pin", "8-pin", "12VHPWR"])), // PSU must provide all required connectors
});

export const ChassisSchema = z.object({
	type: z.literal("CHASSIS"),
	// ── Motherboard compatibility ─────────────────────
	formFactor: z.enum(["ATX", "mATX", "ITX", "E-ATX"]), // Must support Motherboard.formFactor

	// ── GPU compatibility ─────────────────────────────
	maxGpuLength: z.coerce.number(), // mm (GPU.length must not exceed this)
	maxGpuSlots: z.coerce.number().optional(), // GPU.slots must not exceed this (thickness clearance)

	// ── CPU cooler compatibility ──────────────────────
	maxCpuCoolerHeight: z.coerce.number(), // mm (Cooler.height must not exceed this)

	// ── Liquid cooling compatibility ──────────────────
	radiatorSupport: z.array(z.enum(["120", "240", "280", "360"])), // Radiator size must be supported by case
	maxRadiatorSupport: z.coerce.number(), // 120, 240, 360mm

	// ── PSU compatibility ─────────────────────────────
	psuFormFactor: z.array(z.enum(["ATX", "SFX", "SFX-L"])), // PSU physical size compatibility
});

export const PsuSchema = z.object({
	type: z.literal("PSU"),

	// ── Power delivery ─────────────────────────────────
	wattage: z.coerce.number(), // Must cover total system power + headroom
	rating: z.string().optional(), // 80+ Bronze / Gold / Platinum (informational)

	// ── Physical compatibility ────────────────────────
	formFactor: z.enum(["ATX", "SFX", "SFX-L"]), // Must be supported by Case.psuFormFactor

	// ── Connector availability ────────────────────────
	cpuPowerConnectors: z.array(z.enum(["4-pin", "8-pin"])), // Must satisfy Motherboard.cpuPowerConnectors

	gpuPowerConnectors: z.array(z.enum(["6-pin", "8-pin", "12VHPWR"])), // Must satisfy GPU.powerConnectors
});

export const RamSchema = z.object({
	type: z.literal("RAM"),

	// ── Motherboard / CPU compatibility ───────────────
	memoryType: z.enum(["DDR4", "DDR5"]), // Must match Motherboard.memoryType & CPU.supportedMemoryType
	speed: z.coerce.number(), // MHz (May downclock based on CPU/Motherboard limits)

	// ── Capacity & layout ─────────────────────────────
	capacity: z.coerce.number(), // Total GB (Must be <= Motherboard.maxMemoryCapacity)
	modules: z.coerce.number(), // Number of sticks (Must be <= Motherboard.memorySlots)

	// ── Optional tuning metadata ──────────────────────
	xmpExpo: z.boolean().optional(), // Indicates XMP/EXPO usage (used for warnings, not blocking)
});

// Storage Module Logic
export const StorageSchema = z.object({
	type: z.literal("STORAGE"),

	// ── Storage classification ────────────────────────
	storageType: z.enum(["SSD", "HDD", "NVME"]), // Determines interface & slot usage
	formFactor: z.enum(["2.5", "3.5", "M.2"]), // Must be supported by Case & Motherboard
	capacity: z.coerce.number().min(1), // GB (No compatibility restriction)

	// ── Interface compatibility ───────────────────────
	interface: z.enum(["SATA", "PCIE_3", "PCIE_4", "PCIE_5"]), // Must be supported by motherboard slot
});

// Thermal Regulator Logic (Coolers)
export const CoolerSchema = z.object({
	type: z.literal("COOLER"),

	// ── CPU compatibility ──────────────────────────────
	socket: z.array(z.string()), // CPU.socket must be included here
	maxTdp: z.coerce.number().min(0), // Must be >= CPU.tdp

	// ── Physical constraints ──────────────────────────
	coolerType: z.enum(["AIR", "LIQUID"]), // Determines which case rules apply
	height: z.coerce.number().min(0), // mm (Must be <= Case.maxCpuCoolerHeight)

	// ── Liquid cooling only ───────────────────────────
	radiatorSize: z.enum(["120", "240", "280", "360"]).optional(), // Must be supported by Case.radiatorSupport
});

// 2. The Master Union
export const CompatibilitySchema = z.discriminatedUnion("type", [CpuSchema, MotherboardSchema, GpuSchema, ChassisSchema, PsuSchema, RamSchema, StorageSchema, CoolerSchema]);

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

	compatibility: z.custom<z.infer<typeof CompatibilitySchema>>().optional().nullable(),
});

export const editProductSchema = addProductSchema.extend({
	id: z.string(),
});

export const deleteSchema = z.object({ id: z.number() });

export type AddProductSchemaType = z.infer<typeof addProductSchema>;
export type CompatibilitySchemaType = z.infer<typeof CompatibilitySchema>;
