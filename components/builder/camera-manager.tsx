"use client";

import { useThree } from "@react-three/fiber";
import { useBuilderStore, BUILD_STEPS } from "@/store/useBuilderStore";
import { useEffect } from "react";
import gsap from "gsap";
import { PerspectiveCamera } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Helper type for position + target
type ShotConfig = {
	pos: [number, number, number];
	target: [number, number, number];
};

export function CameraManager({ active }: { active: boolean }) {
	const { camera, controls } = useThree();
	const currentStep = useBuilderStore((state) => state.currentStep);

	// CALIBRATED SHOT LIST (Based on your FOUNDRY_ANCHORS)
	const ACTION_SHOTS: Record<string, ShotConfig> = {
		// Wide shot remains the same
		CHASSIS: { pos: [-1.8, 0.8, 1.8], target: [0, 0.4, 0] },

		// Medium shot
		MOTHERBOARD: { pos: [-0.8, 0.5, 0.5], target: [0, 0.3, 0] },

		// Macro: Matches your cpu_socket [0.072, 0.345, -0.03]
		CPU: { pos: [-0.35, 0.5, 0.15], target: [0, 0.35, 0] },
		COOLER: { pos: [-0.6, 0.5, 0.4], target: [0, 0.35, 0] },

		// Macro: Matches your ram_slots Y=0.36
		RAM: { pos: [-0.35, 0.5, 0.3], target: [0.1, 0.36, 0] },

		// Mid-Low: Matches gpu_slot Y=0
		GPU: { pos: [-0.9, 0.3, 0.6], target: [0, 0.1, 0.1] },

		// M.2: Matches m2_slot_1 Y=0.19
		STORAGE1: { pos: [-0.4, 0.3, 0.3], target: [0, 0.2, 0] },

		// ---------------------------------------------------------
		// FIXED COORDINATES FOR BOTTOM COMPONENTS
		// ---------------------------------------------------------

		// HDD/SATA: Matches storage2 [0, 0.135, 0.005]
		// Fix: Lifted camera Y to 0.4, Target Y to 0.15 (Drive Cage area)
		// Moved Z to 0.8 to see the front-bottom of the case
		STORAGE2: { pos: [-0.9, 0.4, 1.0], target: [0, 0.15, 0.2] },

		// PSU: Matches psu_dock [0.008, 0.03, -0.118]
		// Fix: Lifted camera Y to 0.3 (Floor level view)
		// Target Y set to 0.05 (PSU Shroud level)
		PSU: { pos: [-1.2, 0.3, 0.5], target: [0, 0.05, 0] },

		// Reset Position
		DEFAULT: { pos: [-1.5, 0.8, 1.5], target: [0, 0.4, 0] },
	};

	const PASSIVE_CONFIG: ShotConfig = {
		pos: [-1.2, 0.65, 1.2],
		target: [0, 0.3, 0],
	};

	useEffect(() => {
		const stepName = BUILD_STEPS[currentStep];

		const config = active ? ACTION_SHOTS[stepName] || ACTION_SHOTS.DEFAULT : PASSIVE_CONFIG;

		const targetFov = active ? 45 : 30;

		const cam = camera as PerspectiveCamera;

		gsap.to(cam.position, {
			x: config.pos[0],
			y: config.pos[1],
			z: config.pos[2],
			duration: 1.5,
			ease: "power3.inOut",
			onUpdate: () => cam.updateProjectionMatrix(),
		});

		gsap.to(cam, {
			fov: targetFov,
			duration: 1.5,
			ease: "power3.inOut",
			onUpdate: () => cam.updateProjectionMatrix(),
		});

		if (controls) {
			const orbitControls = controls as unknown as OrbitControlsImpl;
			gsap.to(orbitControls.target, {
				x: config.target[0],
				y: config.target[1],
				z: config.target[2],
				duration: 1.5,
				ease: "power3.inOut",
				onUpdate: () => orbitControls.update(),
			});
		}
	}, [currentStep, active, camera, controls]);

	return null;
}
