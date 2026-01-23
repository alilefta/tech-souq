import { BLOG_POSTS } from "@/app/data/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { Terminal, Search, Rss } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
	title: "Intelligence Feed | BASE 60",
	description: "Engineering logs, hardware analysis, and foundry updates.",
};

export default function BlogPage() {
	const featured = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
	const gridPosts = BLOG_POSTS.filter((p) => p.id !== featured.id);

	return (
		<main className="bg-[#0A0E14] min-h-screen pt-24 lg:pt-32 pb-20 font-sans selection:bg-[#FFB400] selection:text-[#0A0E14]">
			<div className="max-w-[1600px] mx-auto px-6 lg:px-12">
				{/* 1. HEADER */}
				<header className="mb-16 border-b border-white/5 pb-12 relative overflow-hidden">
					<div className="absolute top-0 right-0 opacity-[0.02] text-[#F5F5F0] pointer-events-none select-none">
						<span className="text-[15vw] font-black italic">INTEL</span>
					</div>
					<div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<Terminal size={14} className="text-[#FFB400]" />
								<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.4em]">Foundry_Signal: Online</span>
							</div>
							<h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-[#F5F5F0]">
								Intelligence <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Feed</span>
							</h1>
						</div>

						{/* NEWSLETTER MINI-FORM */}
						<div className="w-full md:w-auto flex flex-col items-end gap-2">
							<span className="text-[8px] font-mono text-[#94A3B8] uppercase tracking-widest">Establish_Signal_Uplink</span>
							<div className="flex w-full md:w-80 h-10 border border-white/10 bg-white/[0.02]">
								<input
									type="email"
									placeholder="ENTER_COMM_ADDRESS..."
									className="flex-1 bg-transparent px-4 text-[10px] font-mono uppercase text-[#F5F5F0] outline-none placeholder:text-[#94A3B8]/30"
								/>
								<button className="px-4 hover:bg-[#FFB400] hover:text-[#0A0E14] transition-colors text-[#FFB400]">
									<Rss size={14} />
								</button>
							</div>
						</div>
					</div>
				</header>

				{/* 2. HERO LOG (Featured) */}
				<Link href={`/blog/${featured.slug}`} className="group block mb-24 relative overflow-hidden border border-white/5 bg-[#0A0E14]">
					<div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
						<div className="lg:col-span-7 relative h-64 lg:h-full overflow-hidden">
							<SafeImage
								src={featured.image}
								alt={featured.title}
								fill
								className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-linear-to-r from-[#0A0E14] via-transparent to-transparent opacity-80" />
						</div>
						<div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/5 bg-[#0A0E14]">
							<span className="text-[#FFB400] text-[9px] font-black uppercase tracking-[0.3em] mb-6 block">Priority_Broadcast</span>
							<h2 className="text-3xl md:text-5xl font-bold text-[#F5F5F0] uppercase tracking-tighter leading-[0.9] mb-6 group-hover:text-[#FFB400] transition-colors">
								{featured.title}
							</h2>
							<p className="text-[#94A3B8] text-lg leading-relaxed mb-8 border-l-2 border-[#FFB400]/20 pl-6">{featured.excerpt}</p>
							<div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">
								<span>Auth: {featured.author}</span>
								<span>{featured.date}</span>
							</div>
						</div>
					</div>
				</Link>

				{/* 3. COMMAND FILTER BAR */}
				<div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/5 border border-white/5 p-px h-14 mb-12">
					<div className="md:col-span-8 bg-[#0A0E14] flex items-center px-6 gap-4">
						<Search size={16} className="text-[#94A3B8] opacity-30" />
						<input
							type="text"
							placeholder="QUERY_LOG_ARCHIVES..."
							className="w-full bg-transparent border-none text-[10px] font-mono uppercase tracking-widest outline-none text-[#F5F5F0]"
						/>
					</div>
					<div className="md:col-span-4 bg-[#0A0E14] border-l border-white/5 px-4 flex items-center">
						<select className="w-full bg-transparent border-none text-[10px] font-mono uppercase text-[#94A3B8] outline-none appearance-none cursor-pointer">
							<option>Filter: ALL_CHANNELS</option>
							<option>Hardware_Analysis</option>
							<option>Engineering_Guide</option>
						</select>
					</div>
				</div>

				{/* 4. THE LOG GRID */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{gridPosts.map((post, index) => (
						<BlogCard key={post.id} post={post} index={index} />
					))}
				</div>
			</div>
		</main>
	);
}
