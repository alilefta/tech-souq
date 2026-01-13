"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment, Grid, Stage } from "@react-three/drei";
import { Suspense } from "react";
import { ModuleStage } from "./module-stage"; // We will build this next
import * as THREE from "three";
export function Scene3D() {
	return (
		<div className="h-full w-full bg-[#0A0E14]">
			<Canvas
				shadows
				camera={{ position: [4, 2, 4], fov: 40 }} // Tighter FOV for "Product" look
				gl={{
					antialias: true,
					alpha: true,
					outputColorSpace: THREE.SRGBColorSpace,
					toneMapping: THREE.ACESFilmicToneMapping,
				}}
			>
				<color attach="background" args={["#0A0E14"]} />

				{/* 1. CINEMATIC ATMOSPHERE */}
				<fog attach="fog" args={["#0A0E14", 5, 20]} />
				<ambientLight intensity={0.5} />
				<spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={2} castShadow />

				{/* 2. THE WORKBENCH GRID */}
				<Grid
					renderOrder={-1}
					position={[0, -0.01, 0]} // Just below the model
					infiniteGrid
					cellSize={0.5}
					cellThickness={0.6}
					cellColor="#1E293B"
					sectionSize={2.5}
					sectionThickness={1}
					sectionColor="#FFB400"
					fadeDistance={25}
				/>

				{/* 3. AUTO-CENTERING STAGE */}
				{/* This ensures the Case is always the focal point */}
				<Suspense fallback={null}>
					<Stage environment="city" intensity={0.5} adjustCamera={false}>
						<ModuleStage />
					</Stage>
				</Suspense>

				{/* 4. GROUND REFLECTION (The "Premium" look) */}
				<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
					<planeGeometry args={[50, 50]} />
					<meshStandardMaterial color="#0A0E14" roughness={0.1} metalness={0.8} transparent opacity={0.8} />
				</mesh>

				<OrbitControls
					makeDefault
					minPolarAngle={0}
					maxPolarAngle={Math.PI / 2.1} // Prevent going under the floor
					enablePan={false}
					maxDistance={10}
				/>
			</Canvas>
		</div>
	);
}
