"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment, Grid } from "@react-three/drei";
import { Suspense } from "react";
import { ModuleStage } from "./module-stage"; // We will build this next
import * as THREE from "three";
export function Scene3D() {
	return (
		<div className="h-full w-full bg-[#0A0E14]">
			<Canvas
				shadows
				camera={{ position: [5, 2, 5], fov: 35 }}
				gl={{
					antialias: true,
					alpha: true,
					outputColorSpace: THREE.SRGBColorSpace, // Modern standard
					toneMapping: THREE.ACESFilmicToneMapping,
				}}
			>
				{/* 1. CINEMATIC LIGHTING (The Foundry Look) */}
				<color attach="background" args={["#0A0E14"]} />
				<ambientLight intensity={0.2} />
				<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
				<pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFB400" />

				{/* 2. THE TECHNICAL GRID (Babylon Mapping) */}
				<Grid
					renderOrder={-1}
					position={[0, -0.85, 0]}
					infiniteGrid
					cellSize={0.6}
					cellThickness={1}
					cellColor="#1E293B"
					sectionSize={3.3}
					sectionThickness={1.5}
					sectionColor="#FFB400"
					fadeDistance={30}
				/>

				{/* 3. HARDWARE DOCKING AREA */}
				<Suspense fallback={null}>
					<ModuleStage />
					<Environment preset="city" />
				</Suspense>

				{/* 4. CAMERA CONTROLS (Restricted for Elite feel) */}
				<OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} enableZoom={true} enablePan={false} />

				<ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} resolution={256} color="#000000" />
			</Canvas>
		</div>
	);
}
