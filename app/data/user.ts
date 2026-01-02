export type VanguardRank = "VANGUARD_OPERATIVE" | "ELITE_BUILDER" | "MASTER_ARCHITECT";

export interface UserDTO {
	id: string;
	name: string;
	email: string;
	location: string;
	rank: VanguardRank;
	totalAllocation: number; // Life-time spend
	reportIntegrity: number; // Average review rating as percentage
	lastSync: Date;
	status: "ACTIVE_NODE" | "DE_SYNCED" | "SUSPENDED";
}

export const mockUsers: UserDTO[] = [
	{
		id: "USR-BBL-001",
		name: "Zaid Al-Hilli",
		email: "zaid@foundry.io",
		location: "Baghdad, IRQ",
		rank: "MASTER_ARCHITECT",
		totalAllocation: 12450.0,
		reportIntegrity: 98,
		lastSync: new Date(),
		status: "ACTIVE_NODE",
	},
	{
		id: "USR-LON-042",
		name: "Sarah Jenkins",
		email: "s.jenkins@vanguard.uk",
		location: "London, UK",
		rank: "ELITE_BUILDER",
		totalAllocation: 4200.5,
		reportIntegrity: 92,
		lastSync: new Date(Date.now() - 86400000),
		status: "ACTIVE_NODE",
	},
	// ... more mock entities
];
