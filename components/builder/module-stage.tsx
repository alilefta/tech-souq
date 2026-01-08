// components/builder/module-stage.tsx
"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { PartModel } from "./part-model";
import { FOUNDRY_ANCHORS } from "@/lib/builder/anchor-registry";
import { CATEGORY_MODEL_MAP } from "@/lib/builder/model-map";

export function ModuleStage() {
	const manifest = useBuilderStore((state) => state.manifest);

	return (
		<group>
			{/* 1. THE CHASSIS: The Root Container */}
			{manifest.CHASSIS && (
				<PartModel modelName={CATEGORY_MODEL_MAP.CHASSIS} position={[0, 0, 0]}>
					{/* 2. THE PSU: Docks into Case */}
					{manifest.PSU && <PartModel modelName={CATEGORY_MODEL_MAP.PSU} position={FOUNDRY_ANCHORS.CHASSIS.psu_dock ?? [0, 0, 0]} />}

					{/* 3. THE MOTHERBOARD: Docks into Case */}
					{manifest.MOTHERBOARD && (
						<PartModel modelName={CATEGORY_MODEL_MAP.MOTHERBOARD} position={FOUNDRY_ANCHORS.CHASSIS.mb_dock ?? [0, 0, 0]}>
							{/* 4. THE CPU: Docks into Motherboard */}
							{manifest.CPU && <PartModel modelName={CATEGORY_MODEL_MAP.CPU} position={FOUNDRY_ANCHORS.MOTHERBOARD.cpu_socket ?? [0, 0, 0]} />}

							{/* 5. THE COOLER: Docks on top of CPU */}
							{manifest.COOLER && (
								<PartModel
									modelName={CATEGORY_MODEL_MAP.COOLER}
									position={FOUNDRY_ANCHORS.MOTHERBOARD.cpu_socket ?? [0, 0, 0]} // Sits in same spot, model height handles offset
								/>
							)}

							{/* 6. THE GPU: Docks into PCIe */}
							{manifest.GPU && <PartModel modelName={CATEGORY_MODEL_MAP.GPU} position={FOUNDRY_ANCHORS.MOTHERBOARD.gpu_slot ?? [0, 0, 0]} />}
						</PartModel>
					)}
				</PartModel>
			)}

			{/* STAGING ZONE: If user picked a GPU but has no Motherboard yet */}
			{!manifest.MOTHERBOARD && manifest.GPU && (
				<group position={[2, 0, 0]}>
					{/* Float it to the right */}
					<PartModel modelName="gpu" position={[0, 0, 0]} />
					{/* Add a technical "Staging" label in 3D */}
				</group>
			)}
		</group>
	);
}
