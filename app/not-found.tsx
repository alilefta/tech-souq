// app/not-found.tsx (Server Component)
import NotFoundUI from "@/components/ui/not-found-ui";

export const metadata = {
	title: "404 - Signal Lost | TechSouq",
	description: "The requested coordinates have been lost in the digital sands of Babylon.",
};

export default function NotFound() {
	return (
		<main className="relative min-h-screen w-full bg-[#0A0E14] overflow-hidden pt-16 flex flex-col items-center justify-center font-sans">
			{/* 1. BACKGROUND WATERMARK (Static Server Render) */}
			<div className="absolute inset-0 z-0 pointer-events-none opacity-10 flex items-center justify-center">
				<span className="text-[40vw] font-black text-[#F5F5F0] select-none italic blur-[2px]">السراب</span>
			</div>

			{/* 2. SCANLINE OVERLAY (Static) */}
			<div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

			{/* 3. INTERACTIVE CLIENT UI */}
			<NotFoundUI />

			{/* 4. DECORATIVE FRAME (Static) */}
			<div className="absolute top-8 left-8 bottom-8 right-8 border border-white/5 pointer-events-none" />
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-[#FFB400] to-transparent" />
		</main>
	);
}
