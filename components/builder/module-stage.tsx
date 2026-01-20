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
				<PartModel modelName={CATEGORY_MODEL_MAP.CHASSIS} type="CHASSIS" position={[0, 0, 0]}>
					{/* 2. PSU */}
					{manifest.PSU ? (
						<PartModel modelName={CATEGORY_MODEL_MAP.PSU} type="PSU" position={FOUNDRY_ANCHORS.CHASSIS.psu_dock ?? [0, -0.4, -0.1]} />
					) : (
						/* Ghost Placeholder for PSU */
						<mesh position={FOUNDRY_ANCHORS.CHASSIS.psu_dock ?? [0, -0.4, -0.1]}>
							<boxGeometry args={[0.1, 0.1, 0.1]} />
							<meshBasicMaterial color="#94A3B8" wireframe opacity={0.1} transparent />
							<ARLabel text="PSU_SLOT_EMPTY" status="missing" position={[-0.04, 0.2, -0.02]} scale={0.2} />
						</mesh>
					)}

					{/* 3. MOTHERBOARD */}
					{manifest.MOTHERBOARD ? (
						<PartModel modelName={CATEGORY_MODEL_MAP.MOTHERBOARD} position={FOUNDRY_ANCHORS.CHASSIS.mb_dock ?? [0, 0.1, -0.1]} type="MOTHERBOARD">
							{/* 4. CPU */}
							{manifest.CPU ? (
								<PartModel modelName={CATEGORY_MODEL_MAP.CPU} position={FOUNDRY_ANCHORS.MOTHERBOARD.cpu_socket ?? [0, 0, 0]} type="CPU">
									{hasError("CPU") && <ARLabel text="SOCKET_CONFLICT" status="warning" position={[0, 0.18, 0]} />}
								</PartModel>
							) : (
								<group position={FOUNDRY_ANCHORS.MOTHERBOARD.cpu_socket ?? [0, 0, 0]}>
									<ARLabel text="CPU_SOCKET_OPEN" status="missing" position={[0, 0.2, 0]} scale={0.3} />
								</group>
							)}

							{/* 5. COOLER */}
							{manifest.COOLER && <PartModel modelName={CATEGORY_MODEL_MAP.COOLER} type="COOLER" position={FOUNDRY_ANCHORS.MOTHERBOARD.cooling_fan ?? [0, 0.1, 0]} />}

							{/* 6. GPU */}
							{manifest.GPU && (
								<PartModel modelName={CATEGORY_MODEL_MAP.GPU} position={FOUNDRY_ANCHORS.MOTHERBOARD.gpu_slot ?? [0, -0.1, 0.1]} type="GPU">
									{hasError("GPU") && <ARLabel text="CLEARANCE_ERROR" status="warning" />}
								</PartModel>
							)}

							{/* ... RAM / Storage ... */}
							{manifest.RAM && (
								<>
									{/* We always render into Slot 2 (Index 1) and Slot 4 (Index 3) for optimal aesthetics */}
									{[1, 3].map((slotIndex, i) => (
										<PartModel
											key={`ram-${i}`}
											modelName={CATEGORY_MODEL_MAP.RAM}
											type="RAM"
											// Access the specific slot coordinates from the registry
											position={(FOUNDRY_ANCHORS.MOTHERBOARD.ram_slots as [x: number, y: number, z: number][])[slotIndex] ?? [0, 0, 0]}
											// Stagger the animation: First stick lands, then 100ms later, second stick lands
											delay={i * 0.1}
										>
											{/* Only attach the error label to the first stick to reduce UI clutter */}
											{hasError("RAM") && i === 0 && <ARLabel text="MEMORY_PROTOCOL_MISMATCH" status="warning" />}
										</PartModel>
									))}
								</>
							)}
							{manifest.STORAGE1 && (
								<PartModel modelName={CATEGORY_MODEL_MAP.STORAGE1} position={FOUNDRY_ANCHORS.MOTHERBOARD.m2_slot_1 ?? [0, -0.1, 0.1]} type="STORAGE1">
									{hasError("m2") && <ARLabel text="CLEARANCE_ERROR" status="warning" />}
								</PartModel>
							)}
						</PartModel>
					) : (
						/* Ghost Placeholder for Motherboard */
						<group position={[0.05, 0.5, 0]}>
							<ARLabel text="LOGIC_BOARD_REQUIRED" status="missing" scale={0.2} />
						</group>
					)}

					{manifest.STORAGE2 && (
						<PartModel modelName={CATEGORY_MODEL_MAP.STORAGE2} position={FOUNDRY_ANCHORS.CHASSIS.storage2 ?? [0.15, -0.35, 0.15]} type="STORAGE2">
							{hasError("m2") && <ARLabel text="CLEARANCE_ERROR" status="warning" />}
						</PartModel>
					)}
				</PartModel>
			) : (
				/* No Chassis Selected */
				<group position={[0, 0, 0]}>
					<ARLabel text="INITIALIZE_CHASSIS" status="missing" position={[0, 0, 0]} />
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

		if (manifest.STORAGE1) orphans.push({ type: "STORAGE1", model: CATEGORY_MODEL_MAP.STORAGE1 });
		if (manifest.STORAGE2) orphans.push({ type: "STORAGE2", model: CATEGORY_MODEL_MAP.STORAGE2 });
	}

	return (
		<group position={[1, 0, 0]}>
			{orphans.map((item, index) => (
				<group key={item.type} position={[0, index * 0.5, 0]}>
					<PartModel modelName={item.model} type={item.type} position={[0, 0, 0]} />
					<ARLabel text={`STAGED: ${item.type}`} status="warning" />
				</group>
			))}
		</group>
	);
}
