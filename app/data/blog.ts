// app/data/blog.ts

export interface BlogPostDTO {
	id: string;
	title: string;
	excerpt: string;
	category: string;
	author: string;
	readTime: string;
	date: string;
	image: string;
	slug: string;
	featured?: boolean;
}

export const BLOG_POSTS: BlogPostDTO[] = [
	{
		id: "LOG-062",
		title: "Architecture Analysis: RTX 5090 Blackwell Core",
		excerpt: "Deep diving into the thermal density and CUDA core efficiency of the new Blackwell architecture. Is the power draw justified?",
		category: "Hardware_Analysis",
		author: "Ali Mohsin",
		readTime: "08_MIN",
		date: "2026.01.15",
		image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000",
		slug: "rtx-5090-analysis",
		featured: true,
	},
	{
		id: "LOG-061",
		title: "Thermal Dynamics: Optimizing Airflow in SFF Chassis",
		excerpt: "Managing positive pressure in sub-15L cases. How to prevent heat soak without sacrificing acoustic performance.",
		category: "Engineering_Guide",
		author: "Sarah Jenkins",
		readTime: "12_MIN",
		date: "2026.01.10",
		image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1000",
		slug: "sff-thermal-guide",
	},
	{
		id: "LOG-060",
		title: "DDR5 Latency: The CL30 vs CL40 Debate",
		excerpt: "Telemetry data from 500 workstations confirms: lower latency yields 15% higher 1% lows in competitive rendering.",
		category: "Benchmark_Data",
		author: "Foundry_Core",
		readTime: "05_MIN",
		date: "2026.01.05",
		image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=1000",
		slug: "ddr5-latency-study",
	},
	{
		id: "LOG-059",
		title: "Hydro-Logic: Custom Loop Maintenance Protocols",
		excerpt: "Preventing galvanic corrosion in mixed-metal loops. Why BASE 60 mandates nickel-plated copper blocks.",
		category: "Maintenance",
		author: "Zaid Al-Hilli",
		readTime: "15_MIN",
		date: "2025.12.28",
		image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000",
		slug: "custom-loop-maintenance",
	},
	{
		id: "LOG-058",
		title: "Cable Management: Reducing Signal Impedance",
		excerpt: "It's not just about aesthetics. Proper cable routing improves airflow velocity by 40% in mid-tower chassis.",
		category: "Assembly_Protocol",
		author: "Foundry_Core",
		readTime: "06_MIN",
		date: "2025.12.20",
		image: "https://images.unsplash.com/photo-1582954820640-42c30eeabe35?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		slug: "cable-management-science",
	},
	{
		id: "LOG-057",
		title: "The Silicon Shortage: 2026 Supply Chain Report",
		excerpt: "Analyzing global wafer allocations. How Babylon Node secured priority stock for the Q1 Vanguard release.",
		category: "Market_Intel",
		author: "Sarah Jenkins",
		readTime: "09_MIN",
		date: "2025.12.12",
		image: "https://images.unsplash.com/photo-1593955654387-9dcbc8ef8071?q=80&w=2710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		slug: "supply-chain-2026",
	},
];
