// components/builder/part-model.tsx
"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, ReactNode } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface PartModelProps {
	modelName: string; // e.g., "cpu", "motherboard"
	position: [number, number, number];
	children?: ReactNode;
}

export function PartModel({ modelName, position, children }: PartModelProps) {
	const groupRef = useRef<THREE.Group>(null);

	// Load using your specific filenames
	const { scene } = useGLTF(`/assets/models/${modelName}.glb`);

	useEffect(() => {
		if (groupRef.current) {
			// INITIALIZE: Scale from 0 for the "Foundry Ingest" effect
			groupRef.current.scale.set(0, 0, 0);

			gsap.to(groupRef.current.scale, {
				x: 1,
				y: 1,
				z: 1,
				duration: 0.6,
				ease: "back.out(1.2)",
			});
		}
	}, [modelName]); // Re-animate if the archetype changes

	return (
		<group ref={groupRef} position={position}>
			{/* Use a clone to allow multiple instances like RAM/Storage */}
			<primitive object={scene.clone()} />
			{children}
		</group>
	);
}
