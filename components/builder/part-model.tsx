"use client";

import { useGLTF, Center } from "@react-three/drei";
import { useEffect, useRef, ReactNode, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { MODEL_CALIBRATION } from "@/lib/builder/model-config";
import { BuildComponentType } from "@/store/useBuilderStore";
import { SkeletonUtils } from "three-stdlib";
// Add Draco decoder URL for your compressed files
const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

interface PartModelProps {
	modelName: string;
	type?: BuildComponentType; // Pass the type to look up defaults
	position: [number, number, number];
	children?: ReactNode;
}

export function PartModel({ modelName, type, position, children }: PartModelProps) {
	const groupRef = useRef<THREE.Group>(null);

	// 1. Load Compressed Model
	const { scene } = useGLTF(`/assets/models/${modelName}.glb`, DRACO_URL);
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

	// 2. Get Calibration Data
	// Check specific model name first, then fallback to category type
	const config = MODEL_CALIBRATION[modelName] || (type ? MODEL_CALIBRATION[type] : { scale: [1, 1, 1], rotation: [0, 0, 0], centered: true });

	useEffect(() => {
		// Material Optimization Protocol
		clone.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				const mesh = child as THREE.Mesh;
				mesh.castShadow = true;
				mesh.receiveShadow = true;
				if (mesh.material) {
					// Fix "dark models" by boosting environment reflection
					(mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 1.8;
					(mesh.material as THREE.MeshStandardMaterial).roughness = 0.5;
				}
			}
		});

		// Intro Animation
		if (groupRef.current) {
			groupRef.current.scale.set(0, 0, 0);
			gsap.to(groupRef.current.scale, {
				x: 1,
				y: 1,
				z: 1,
				duration: 0.8,
				ease: "back.out(1.2)",
			});
		}
	}, [clone]);

	return (
		<group ref={groupRef} position={position}>
			{/* 3. THE NORMALIZATION WRAPPER */}
			<group scale={config.scale} rotation={new THREE.Euler(...config.rotation)}>
				{config.centered ? (
					<Center top>
						{" "}
						{/* <Center> recalculates the pivot to the middle of geometry */}
						<primitive object={clone} />
					</Center>
				) : (
					<primitive object={clone} />
				)}
			</group>

			{children}
		</group>
	);
}
