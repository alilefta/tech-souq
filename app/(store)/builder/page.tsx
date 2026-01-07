// app/(store)/builder/page.tsx
import { CrucibleHUD } from "@/components/builder/crucible-hud";
import { Scene3D } from "@/components/builder/scene-3d";
// import { Scene3D } from "@/components/builder/scene-3d"; // Client component

export default function BuilderPage() {
	return (
		<main className="relative h-screen w-full bg-[#0A0E14] overflow-hidden selection:bg-[#FFB400] selection:text-[#0A0E14]">
			{/* 1. THE 3D FOUNDRY FLOOR (Background) */}
			<div className="absolute inset-0 z-0">
				<Scene3D />
			</div>

			{/* 2. THE ARCHITECT HUD (Foreground UI) */}
			<div className="relative z-10 h-full pointer-events-none">
				<CrucibleHUD />
			</div>
		</main>
	);
}
