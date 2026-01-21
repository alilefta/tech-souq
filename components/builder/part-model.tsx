"use client";

import { useGLTF, Center } from "@react-three/drei";
import { useEffect, useRef, ReactNode, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { MODEL_CALIBRATION } from "@/lib/builder/model-config";
import { BuildComponentType, useBuilderStore } from "@/store/useBuilderStore";
import { SkeletonUtils } from "three-stdlib";

const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

interface PartModelProps {
	modelName: string;
	type?: BuildComponentType;
	position: [number, number, number];
	children?: ReactNode;
	disableCenter?: boolean;
	delay?: number; // New prop
}

// ELITE OFFSET REGISTRY
// [X, Y, Z] additive movement when exploded
const EXPLOSION_OFFSETS: Partial<Record<BuildComponentType, [number, number, number]>> = {
	CHASSIS: [0, 0, 0], // Anchor stays put
	MOTHERBOARD: [-0.5, 0, 0], // Slides LEFT out of the case
	PSU: [-0.3, 0, 0.3], // Slides LEFT and BACK
	GPU: [0, -0.1, 0.2], // Slides DOWN and OUT away from board
	CPU: [0, 0, 0.15], // Floats OFF the socket
	COOLER: [0, 0, 0.3], // Floats OFF the CPU
	RAM: [0, 0.05, 0.1], // Floats UP and OUT
	STORAGE1: [0, 0, 0.1], // M.2 floats OFF
	STORAGE2: [-0.2, 0, 0], // HDD slides OUT
};

export function PartModel({ modelName, type, position, children, disableCenter = false, delay = 0 }: PartModelProps) {
	const groupRef = useRef<THREE.Group>(null);
	const { scene } = useGLTF(`/assets/models/${modelName}.glb`, DRACO_URL);
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

	const config = MODEL_CALIBRATION[modelName] || (type ? MODEL_CALIBRATION[type] : { scale: [1, 1, 1], rotation: [0, 0, 0], centered: true });
	// console.log("Current Model:", modelName, "Config", config, "Type", type);

	// Convert Euler rotation to Quaternion for gimbal-free rotation
	const quaternion = useMemo(() => {
		const euler = new THREE.Euler(config.rotation[0], config.rotation[1], config.rotation[2], "XYZ");
		return new THREE.Quaternion().setFromEuler(euler);
	}, [config.rotation]);

	const isExploded = useBuilderStore((s) => s.isExploded);

	useEffect(() => {
		if (groupRef.current) {
			// 1. GET OFFSET VECTOR
			// Default to 0 if type not found
			const offset = (type && EXPLOSION_OFFSETS[type]) || [0, 0, 0];

			// 2. CALCULATE TARGET
			// Additive math: Original Position + (Exploded ? Offset : 0)
			const targetX = position[0] + (isExploded ? offset[0] : 0);
			const targetY = position[1] + (isExploded ? offset[1] : 0);
			const targetZ = position[2] + (isExploded ? offset[2] : 0);

			gsap.to(groupRef.current.position, {
				x: targetX,
				y: targetY,
				z: targetZ,
				duration: 0.8, // Slower, more cinematic expansion
				ease: "power3.inOut",
			});
		}
	}, [isExploded, position, type]);

	useEffect(() => {
		clone.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				const mesh = child as THREE.Mesh;
				mesh.castShadow = true;
				mesh.receiveShadow = true;
				if (mesh.material) {
					(mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 1.8;
					(mesh.material as THREE.MeshStandardMaterial).roughness = 0.5;
				}
			}
		});

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

	useEffect(() => {
		if (groupRef.current) {
			groupRef.current.scale.set(0, 0, 0);

			// Pass the delay to GSAP
			gsap.to(groupRef.current.scale, {
				x: 1,
				y: 1,
				z: 1,
				duration: 0.6,
				delay: delay, // Wait before popping in
				ease: "back.out(1.2)",
			});
		}
	}, [modelName]);

	const ModelContent = <primitive object={clone} scale={config.scale} quaternion={quaternion} />;

	return (
		<group ref={groupRef} position={position}>
			<group scale={config.scale} quaternion={quaternion}>
				{config.centered && !disableCenter ? <Center top>{ModelContent}</Center> : ModelContent}
			</group>
			{children}
		</group>
	);
}
