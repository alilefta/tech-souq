"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { ModuleStage } from "./module-stage"; // We will build this next
import * as THREE from "three";

export function Scene3D() {
	return (
		<div className="h-full w-full bg-[#0A0E14]">
			<Canvas
				shadows
				camera={{ position: [4, 3, 4], fov: 40 }}
				gl={{
					antialias: true,
					alpha: true,
					outputColorSpace: THREE.SRGBColorSpace,
					toneMapping: THREE.ACESFilmicToneMapping,
				}}
			>
				<color attach="background" args={["#0A0E14"]} />

				{/* 1. CINEMATIC LIGHTING (Now Critical since Stage is gone) */}
				<fog attach="fog" args={["#0A0E14", 5, 20]} />
				<ambientLight intensity={0.4} />
				<spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
				{/* Accent Light for the "Foundry" amber glow */}
				<pointLight position={[-5, 2, -5]} intensity={1.5} color="#FFB400" distance={10} />
				<pointLight position={[5, 2, 5]} intensity={0.5} color="#4f46e5" distance={10} />

				{/* 2. THE WORKBENCH GRID */}
				<Grid
					renderOrder={-1}
					position={[0, -0.01, 0]}
					infiniteGrid
					cellSize={0.5}
					cellThickness={0.6}
					cellColor="#1E293B"
					sectionSize={2.5}
					sectionThickness={1}
					sectionColor="#FFB400"
					fadeDistance={25}
				/>

				{/* 3. MANUAL STAGE (No Auto-Centering) */}
				<Suspense fallback={null}>
					{/* 
                       We lift the ModuleStage slightly if your models have pivot points 
                       at their center instead of their feet. 
                       Adjust the 'y' here (e.g., 0.5) if the case spawns underground.
                    */}
					<group position={[0, 0, 0]}>
						<ModuleStage />
					</group>

					{/* Reflections */}
					<Environment preset="city" />
				</Suspense>

				{/* 4. GROUND REFLECTION */}
				<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
					<planeGeometry args={[50, 50]} />
					<meshStandardMaterial color="#0A0E14" roughness={0.1} metalness={0.8} transparent opacity={0.8} />
				</mesh>

				<OrbitControls
					makeDefault
					target={[0, 0.5, 0]} // Look slightly up at the case center
					minPolarAngle={0}
					maxPolarAngle={Math.PI / 2.1}
					enablePan={false} // Keep the user focused on the build
					maxDistance={10}
				/>

				<ContactShadows opacity={0.6} scale={20} blur={2} far={4.5} resolution={512} color="#000000" />
			</Canvas>
		</div>
	);
}
