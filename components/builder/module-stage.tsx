// components/builder/module-stage.tsx
"use client";

import { useBuilderStore, BuildComponentType, BuildManifest } from "@/store/useBuilderStore";
import { PartModel } from "./part-model";
import { FOUNDRY_ANCHORS } from "@/lib/builder/anchor-registry";
import { CATEGORY_MODEL_MAP } from "@/lib/builder/model-map";
import { ARLabel } from "./ar-label";
import { resolveCompatibility } from "@/lib/builder/resolver";

export function ModuleStage() {
	const manifest = useBuilderStore((state) => state.manifest);
	const alerts = resolveCompatibility(manifest);

	// Helper to check if a specific part has a critical error
	const hasError = (type: string) => alerts.some((a) => a.severity === "CRITICAL" && a.message.includes(type));

	return (
		<group>
			{/* 1. THE CHASSIS: Root */}
			{manifest.CHASSIS ? (
				<PartModel modelName={CATEGORY_MODEL_MAP.CHASSIS} type="CHASSIS" position={[2, -0.5, 0]}>
					{/* 2. PSU */}
					{manifest.PSU ? (
						<PartModel modelName={CATEGORY_MODEL_MAP.PSU} type="PSU" position={FOUNDRY_ANCHORS.CHASSIS.psu_dock ?? [0, -0.4, -0.1]} />
					) : (
						/* Ghost Placeholder for PSU */
						<mesh position={FOUNDRY_ANCHORS.CHASSIS.psu_dock ?? [0, -0.4, -0.1]}>
							<boxGeometry args={[0.5, 0.5, 0.5]} />
							<meshBasicMaterial color="#94A3B8" wireframe opacity={0.1} transparent />
							<ARLabel text="PSU_SLOT_EMPTY" status="missing" position={[0, 0, 0]} />
						</mesh>
					)}

					{/* 3. MOTHERBOARD */}
					{manifest.MOTHERBOARD ? (
						<PartModel modelName={CATEGORY_MODEL_MAP.MOTHERBOARD} position={FOUNDRY_ANCHORS.CHASSIS.mb_dock ?? [0, 0.1, -0.1]} type="MOTHERBOARD">
							{/* 4. CPU */}
							{manifest.CPU ? (
								<PartModel modelName={CATEGORY_MODEL_MAP.CPU} position={FOUNDRY_ANCHORS.MOTHERBOARD.cpu_socket ?? [0, 0, 0]} type="CPU">
									{hasError("CPU") && <ARLabel text="SOCKET_CONFLICT" status="warning" position={[0, 0.6, -0.4]} />}
								</PartModel>
							) : (
								<group position={FOUNDRY_ANCHORS.MOTHERBOARD.cpu_socket ?? [0, 0.1, 0]}>
									<ARLabel text="CPU_SOCKET_OPEN" status="missing" />
								</group>
							)}

							{/* 5. COOLER */}
							{manifest.COOLER && <PartModel modelName={CATEGORY_MODEL_MAP.COOLER} type="COOLER" position={FOUNDRY_ANCHORS.MOTHERBOARD.cpu_socket ?? [0, 0.1, 0]} />}

							{/* 6. GPU */}
							{manifest.GPU && (
								<PartModel modelName={CATEGORY_MODEL_MAP.GPU} position={FOUNDRY_ANCHORS.MOTHERBOARD.gpu_slot ?? [0, -0.1, 0.1]} type="GPU">
									{hasError("GPU") && <ARLabel text="CLEARANCE_ERROR" status="warning" />}
								</PartModel>
							)}

							{/* ... RAM / Storage ... */}
							{manifest.RAM && (
								<PartModel modelName={CATEGORY_MODEL_MAP.GPU} position={FOUNDRY_ANCHORS.MOTHERBOARD.ram_slots ?? [0, -0.1, 0.1]} type="RAM">
									{hasError("RAM") && <ARLabel text="CLEARANCE_ERROR" status="warning" />}
								</PartModel>
							)}
							{manifest.STORAGE1 && (
								<PartModel modelName={CATEGORY_MODEL_MAP.STORAGE1} position={FOUNDRY_ANCHORS.MOTHERBOARD.m2_slot_1 ?? [0, -0.1, 0.1]} type="STORAGE1">
									{hasError("m2") && <ARLabel text="CLEARANCE_ERROR" status="warning" />}
								</PartModel>
							)}
							{manifest.STORAGE2 && (
								<PartModel modelName={CATEGORY_MODEL_MAP.STORAGE2} position={FOUNDRY_ANCHORS.MOTHERBOARD.storage2 ?? [0, -0.1, 0.1]} type="STORAGE2">
									{hasError("m2") && <ARLabel text="CLEARANCE_ERROR" status="warning" />}
								</PartModel>
							)}
						</PartModel>
					) : (
						/* Ghost Placeholder for Motherboard */
						<group position={FOUNDRY_ANCHORS.CHASSIS.mb_dock ?? [0, 0.1, -0.1]}>
							<ARLabel text="LOGIC_BOARD_REQUIRED" status="missing" />
						</group>
					)}
				</PartModel>
			) : (
				/* No Chassis Selected */
				<group position={[0, 0, 0]}>
					<ARLabel text="INITIALIZE_CHASSIS" status="missing" />
				</group>
			)}

			{/* THE ORPHAN RACK (Staging Zone) */}
			{/* Automatically detects any part selected but not rendered in the main hierarchy */}
			<StagingRack manifest={manifest} />
		</group>
	);
}

// Sub-component to handle floating parts
function StagingRack({ manifest }: { manifest: BuildManifest }) {
	const orphans: { type: BuildComponentType; model: string }[] = [];

	if (!manifest.CHASSIS) {
		// If no chassis, everything is an orphan
		if (manifest.MOTHERBOARD) orphans.push({ type: "MOTHERBOARD", model: CATEGORY_MODEL_MAP.MOTHERBOARD });
		if (manifest.PSU) orphans.push({ type: "PSU", model: CATEGORY_MODEL_MAP.PSU });
	}

	if (!manifest.MOTHERBOARD) {
		// If no mobo, chips/cards are orphans
		if (manifest.CPU) orphans.push({ type: "CPU", model: CATEGORY_MODEL_MAP.CPU });
		if (manifest.GPU) orphans.push({ type: "GPU", model: CATEGORY_MODEL_MAP.GPU });
		if (manifest.RAM) orphans.push({ type: "RAM", model: CATEGORY_MODEL_MAP.RAM });
	}

	return (
		<group position={[3, 0, 0]}>
			{orphans.map((item, index) => (
				<group key={item.type} position={[0, index * 0.5, 0]}>
					<PartModel modelName={item.model} type={item.type} position={[0, 0, 0]} />
					<ARLabel text={`STAGED: ${item.type}`} status="warning" />
				</group>
			))}
		</group>
	);
}
