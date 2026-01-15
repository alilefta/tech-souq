"use client";

import { useControls, folder, button } from "leva";
import { TransformControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface CalibrationRigProps {
	id: string;
	children: React.ReactNode;
	active?: boolean;
}

export function CalibrationRig({ id, children, active = true }: CalibrationRigProps) {
	const groupRef = useRef<THREE.Group | null>(null);
	const transformRef = useRef<any>(null);

	const values = useControls(id, {
		Transform: folder({
			posX: { value: 0, step: 0.01 },
			posY: { value: 0, step: 0.01 },
			posZ: { value: 0, step: 0.01 },
		}),
		Rotation: folder({
			rotX: { value: 0, step: 0.1, min: -Math.PI * 2, max: Math.PI * 2 },
			rotY: { value: 0, step: 0.1, min: -Math.PI * 2, max: Math.PI * 2 },
			rotZ: { value: 0, step: 0.1, min: -Math.PI * 2, max: Math.PI * 2 },
			rotationOrder: {
				value: "XYZ",
				options: ["XYZ", "YXZ", "ZXY", "ZYX", "YZX", "XZY"],
			},
		}),
		Scale: folder({
			scale: { value: 1, step: 0.001 },
		}),
		Debug: folder({
			copyConfig: button(() => {
				const output = `// CONFIG FOR: ${id}
{
  scale: [${values.scale}, ${values.scale}, ${values.scale}],
  rotation: [${values.rotX.toFixed(3)}, ${values.rotY.toFixed(3)}, ${values.rotZ.toFixed(3)}],
  rotationOrder: "${values.rotationOrder}",
  centered: true
}`;
				navigator.clipboard.writeText(output);
				console.log("✅ Config copied to clipboard!");
				console.log(output);
			}),
		}),
	});

	// Connect TransformControls to the group when both are ready
	useEffect(() => {
		if (transformRef.current && groupRef.current) {
			transformRef.current.attach(groupRef.current);
		}
	}, []);

	// Apply rotation using the selected rotation order
	useEffect(() => {
		if (!active || !groupRef.current) return;

		const euler = new THREE.Euler(values.rotX, values.rotY, values.rotZ, values.rotationOrder as THREE.EulerOrder);
		groupRef.current.rotation.copy(euler);
	}, [values.rotX, values.rotY, values.rotZ, values.rotationOrder, active]);

	if (!active) return <>{children}</>;

	return (
		<>
			<primitive object={new THREE.AxesHelper(1)} />

			<GizmoHelper alignment="bottom-right" margin={[80, 80]}>
				<GizmoViewport axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]} labelColor="white" />
			</GizmoHelper>

			<TransformControls ref={transformRef} mode="rotate" />

			<group ref={groupRef} position={[values.posX, values.posY, values.posZ]} scale={[values.scale, values.scale, values.scale]}>
				{children}
			</group>
		</>
	);
}
