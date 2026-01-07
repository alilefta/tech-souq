// components/builder/part-model.tsx
"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export function PartModel({ path, position }: { path: string; position: [number, number, number] }) {
	const groupRef = useRef<THREE.Group>(null);
	const fullPath = `/assets/models/${path}.glb`;

	// 1. ASSET HANDSHAKE
	const { scene } = useGLTF(fullPath);

	// 2. INITIALIZATION PROTOCOL (Animation)
	useEffect(() => {
		if (groupRef.current) {
			// Set initial "Uninitialized" state
			groupRef.current.scale.set(0, 0, 0);
			groupRef.current.rotation.y = Math.PI / 4;

			// Trigger "Foundry Ingest" Animation
			gsap.to(groupRef.current.scale, {
				x: 1,
				y: 1,
				z: 1,
				duration: 1.2,
				ease: "elastic.out(1, 0.75)",
			});

			gsap.to(groupRef.current.rotation, {
				y: 0,
				duration: 1.5,
				ease: "power4.out",
			});
		}
	}, [path]); // Re-run when the hardware model changes

	return (
		<group ref={groupRef} position={position}>
			<primitive object={scene.clone()} />
		</group>
	);
}
