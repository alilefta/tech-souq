// components/home/category-section.tsx

import { CategoryCard } from "./category-card";

const categories = [
	{
		title: "Processors",
		arabicTitle: "المعالجات",
		slug: "cpus",
		image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1000",
		size: "large", // Spans 2 columns
		description: "The core of your power.",
	},
	{
		title: "Graphics",
		arabicTitle: "البطاقات الرسومية",
		slug: "gpus",
		image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000",
		size: "small",
		description: "Pure visual excellence.",
	},
	{
		title: "Custom Builds",
		arabicTitle: "تجميعات خاصة",
		slug: "prebuilts",
		image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=1000",
		size: "tall", // Spans 2 rows
		description: "Assembled by masters.",
	},
	{
		title: "Peripherals",
		arabicTitle: "الملحقات",
		slug: "peripherals",
		image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000",
		size: "small",
		description: "Tactile precision.",
	},
	{
		title: "Laptops",
		arabicTitle: "لابتوبات",
		slug: "laptops",
		image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000",
		size: "medium",
		description: "Power on the move.",
	},
];

export default function CategorySection() {
	return (
		<section className="w-full bg-[#0A0E14] py-24 px-8 flex flex-col items-center">
			<div className="max-w-7xl w-full">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
					<div className="max-w-2xl">
						<h2 className="text-[#94A3B8] text-xs font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
							<span className="w-8 h-[1px] bg-[#FFB400]" />
							The Bazaar Map
						</h2>
						<h3 className="text-[#F5F5F0] text-4xl md:text-5xl font-bold tracking-tighter leading-none">
							BROWSE BY <span className="text-[#FFB400]">COMPONENT</span> TYPE
						</h3>
					</div>
					<div className="text-right">
						<span className="text-[#94A3B8] text-sm font-medium italic">Navigate the stalls of innovation.</span>
					</div>
				</div>

				{/* The Shard Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">
					{categories.map((cat, index) => (
						<CategoryCard key={cat.slug} category={cat} index={index} />
					))}
				</div>
			</div>
		</section>
	);
}
