// app/data/review.ts

export type VanguardRank = "ELITE_BUILDER" | "VFX_ARCHITECT" | "COMPETITIVE_PRO" | "MASTER_ARCHITECT";

export interface ReviewDTO {
	id: string;
	user: string;
	location: string;
	rank: VanguardRank;
	rating: number;
	integrity: number; // Calculated: (rating / 5) * 100
	comment: string;
	hardwareId: number;
	hardwareName: string;
	status: "PENDING" | "AUTHORIZED" | "ARCHIVED";
	createdAt: Date;
}

// MOCK DATA: Simulated Babylon Hub Database
const mockReviews: ReviewDTO[] = [
	{
		id: "LOG-001",
		user: "Zaid Al-Hilli",
		location: "Baghdad, IRQ",
		rank: "ELITE_BUILDER",
		rating: 5,
		integrity: 100,
		comment: "Thermal synchronization remains stable under 100% load. Exceptional foundry work.",
		hardwareId: 101,
		hardwareName: "RTX 5090 VANGUARD",
		status: "AUTHORIZED",
		createdAt: new Date("2025-12-15"),
	},
	{
		id: "LOG-002",
		user: "Elena Volkov",
		location: "Berlin, DEU",
		rank: "VFX_ARCHITECT",
		rating: 5,
		integrity: 100,
		comment: "Deployment to the Berlin node was flawless. Synergy with existing arrays is 1:1.",
		hardwareId: 102,
		hardwareName: "CORE I9 ARCHITECT_ED",
		status: "PENDING",
		createdAt: new Date("2025-12-28"),
	},
	{
		id: "LOG-003",
		user: "Fahad bin Rashid",
		location: "Riyadh, KSA",
		rank: "COMPETITIVE_PRO",
		rating: 4,
		integrity: 80,
		comment: "Logic processing is fast, but the cooling shroud required manual adjustment for my rack.",
		hardwareId: 103,
		hardwareName: "LIQUID_FROST_Z7",
		status: "PENDING",
		createdAt: new Date("2026-01-01"),
	},
];

// READ OPERATIONS
export async function getModuleReviews(): Promise<ReviewDTO[]> {
	// Simulate network latency from Babylon Hub
	return new Promise((resolve) => {
		setTimeout(() => resolve([...mockReviews].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())), 400);
	});
}

export async function getReviewById(id: string): Promise<ReviewDTO | undefined> {
	return mockReviews.find((r) => r.id === id);
}
