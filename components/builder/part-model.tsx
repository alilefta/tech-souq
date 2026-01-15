"use client";

import { useGLTF, Center } from "@react-three/drei";
import { useEffect, useRef, ReactNode, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { MODEL_CALIBRATION } from "@/lib/builder/model-config";
import { BuildComponentType } from "@/store/useBuilderStore";
import { SkeletonUtils } from "three-stdlib";

const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

interface PartModelProps {
	modelName: string;
	type?: BuildComponentType;
	position: [number, number, number];
	children?: ReactNode;
	disableCenter?: boolean;
}

export function PartModel({ modelName, type, position, children, disableCenter = false }: PartModelProps) {
	const groupRef = useRef<THREE.Group>(null);
	const { scene } = useGLTF(`/assets/models/${modelName}.glb`, DRACO_URL);
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

	const config = MODEL_CALIBRATION[modelName] || (type ? MODEL_CALIBRATION[type] : { scale: [1, 1, 1], rotation: [0, 0, 0], centered: true });

	// Convert Euler rotation to Quaternion for gimbal-free rotation
	const quaternion = useMemo(() => {
		const euler = new THREE.Euler(config.rotation[0], config.rotation[1], config.rotation[2], "XYZ");
		return new THREE.Quaternion().setFromEuler(euler);
	}, [config.rotation]);

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
