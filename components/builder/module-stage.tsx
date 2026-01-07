// components/builder/module-stage.tsx
"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { PartModel } from "./part-model"; // We will build this next

export function ModuleStage() {
	const manifest = useBuilderStore((state) => state.manifest);

	return (
		<group>
			{/* RENDER CHASSIS (The Root Container) */}
			{manifest.CHASSIS && <PartModel path={manifest.CHASSIS.slug} position={[0, 0, 0]} />}

			{/* RENDER MOTHERBOARD (Parented to Case slots) */}
			{manifest.MOTHERBOARD && (
				<PartModel
					path={manifest.MOTHERBOARD.slug}
					position={[0, 0.2, -0.1]} // Approximate offset
				/>
			)}

			{/* RENDER GPU */}
			{manifest.GPU && <PartModel path={manifest.GPU.slug} position={[0, 0.1, 0.2]} />}
		</group>
	);
}
