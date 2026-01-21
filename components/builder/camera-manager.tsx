"use client";

import { useThree } from "@react-three/fiber";
import { useBuilderStore, BUILD_STEPS } from "@/store/useBuilderStore";
import { useEffect } from "react";
import gsap from "gsap";
import { PerspectiveCamera } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type ShotConfig = {
	pos: [number, number, number];
	target: [number, number, number];
};

export function CameraManager({ active }: { active: boolean }) {
	const { camera, controls } = useThree();
	const currentStep = useBuilderStore((state) => state.currentStep);

	// CALIBRATED SHOT LIST (Left-Side Focus)
	// X must be NEGATIVE to view the open side of the case.
	// const ACTION_SHOTS: Record<string, [number, number, number]> = {
	// 	// 1. Wide Shot: Shows the full case from the front-left
	// 	CHASSIS: [-1.8, 0.8, 1.8],

	// 	// 2. Medium Shot: Focus on the motherboard tray
	// 	MOTHERBOARD: [-0.8, 0.5, 0.5],

	// 	// 3. Macro Shot: Zoom in tight on the Socket (Upper-Center)
	// 	CPU: [-0.81, 0.7, 0.15],
	// 	COOLER: [-0.81, 0.7, 0.15], // Pull back slightly for AIO tubes

	// 	// 4. Macro Shot: Focus on DIMM Slots (Right of CPU)
	// 	RAM: [-0.65, 0.7, 0.2],

	// 	// 5. Mid-Low Shot: Focus on PCIe area
	// 	GPU: [-0.5, 0.3, 0.6],

	// 	// 6. Low Angle: Focus on M.2 slots (often below CPU)
	// 	STORAGE1: [-0.3, 0.25, 0.2], // M.2 Slot
	// 	STORAGE2: [-0.8, -0.11, 0.8], // HDD Cage (Usually bottom front)

	// 	PSU: [-0.8, -0.2, 1.2], // Low angle back

	// 	// Reset Position
	// 	DEFAULT: [-1.5, 0.1, 1.5],
	// };

	const ACTION_SHOTS: Record<string, ShotConfig> = {
		CHASSIS: { pos: [-1.8, 0.8, 1.8], target: [0, 0.4, 0] },
		MOTHERBOARD: { pos: [-0.8, 0.5, 0.5], target: [0, 0.3, 0] },
		CPU: { pos: [-0.35, 0.4, 0.15], target: [0, 0.35, 0] }, // Look at socket
		COOLER: { pos: [-0.6, 0.4, 0.4], target: [0, 0.35, 0] },
		RAM: { pos: [-0.35, 0.4, 0.3], target: [0.1, 0.35, 0] }, // Look at DIMMs
		GPU: { pos: [-0.9, 0.3, 0.6], target: [0, 0.2, 0.1] },
		STORAGE1: { pos: [-0.4, 0.25, 0.2], target: [0, 0.2, 0] },
		STORAGE2: { pos: [-1.2, -0.2, 0.8], target: [0.2, -0.3, 0.2] },
		PSU: { pos: [-1.8, 0.2, 1.2], target: [-0.2, -0.1, -0.1] },
		DEFAULT: { pos: [-1.5, 0.8, 1.5], target: [0, 0.4, 0] },
	};

	// 2. STATIC "HERO" SHOT (For Passive Mode)
	// A nice 3/4 angle that fills the frame without cutting off the case
	const PASSIVE_POSITION: [number, number, number] = [-1.2, 0.65, 1.2];

	const PASSIVE_CONFIG: ShotConfig = {
		pos: [-1.3, 0.65, 1.2],
		target: [0, 0.1, 0], // Look at center of case
	};

	useEffect(() => {
		const stepName = BUILD_STEPS[currentStep];

		// Determine Target Configuration
		const config = active ? ACTION_SHOTS[stepName] || ACTION_SHOTS.DEFAULT : PASSIVE_CONFIG;

		const targetFov = active ? 45 : 30; // Zoom in for passive mode

		// Ensure we are working with a PerspectiveCamera
		const cam = camera as PerspectiveCamera;

		// ANIMATE CAMERA POSITION
		gsap.to(cam.position, {
			x: config.pos[0],
			y: config.pos[1],
			z: config.pos[2],
			duration: 1.5,
			ease: "power3.inOut",
			onUpdate: () => cam.updateProjectionMatrix(), // Important for FOV changes
		});

		// ANIMATE FOV
		gsap.to(cam, {
			fov: targetFov,
			duration: 1.5,
			ease: "power3.inOut",
			onUpdate: () => cam.updateProjectionMatrix(),
		});

		// ANIMATE CONTROLS TARGET (Where we look)
		if (controls) {
			const orbitControls = controls as unknown as OrbitControlsImpl;

			gsap.to(orbitControls.target, {
				x: config.target[0],
				y: config.target[1],
				z: config.target[2],
				duration: 1.5,
				ease: "power3.inOut",
				onUpdate: () => orbitControls.update(), // CRITICAL: Must call update() on controls
			});
		}
	}, [currentStep, active, camera, controls]);

	return null;
}
