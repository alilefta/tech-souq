"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment, Grid } from "@react-three/drei";
import { Suspense } from "react";
import { ModuleStage } from "./module-stage";
import * as THREE from "three";

export function Scene3D() {
	return (
		<div className="h-full w-full bg-[#0A0E14]">
			<Canvas
				shadows
				// 1. ELITE CAMERA POSITION
				// Position: [X, Y, Z] -> [1.2, 0.8, 1.8]
				// This places the "lens" about 1.5 meters away and slightly above.
				// FOV: 45 is a standard "Human Eye" lens (35mm-50mm equivalent).
				camera={{ position: [1.2, 0.8, 1.8], fov: 45 }}
				gl={{
					antialias: true,
					alpha: true,
					outputColorSpace: THREE.SRGBColorSpace,
					toneMapping: THREE.ACESFilmicToneMapping,
				}}
			>
				<color attach="background" args={["#0A0E14"]} />

				<fog attach="fog" args={["#0A0E14", 2, 10]} />
				<ambientLight intensity={0.5} />
				<spotLight position={[5, 8, 5]} angle={0.25} penumbra={1} intensity={3} castShadow shadow-mapSize={[2048, 2048]} />

				<pointLight position={[-2, 1, -2]} intensity={2} color="#FFB400" distance={5} />
				<pointLight position={[3, 2, 3]} intensity={1} color="#4f46e5" distance={5} />

				{/* 2. SCALE-RELATIVITY GRID 
                   By shrinking the grid cells, the object sitting on them looks bigger.
                   cellSize: 0.1 = 10cm squares.
                */}
				<Grid
					renderOrder={-1}
					position={[0, -0.01, 0]}
					infiniteGrid
					cellSize={0.1}
					cellThickness={0.5}
					cellColor="#334155"
					sectionSize={0.5}
					sectionThickness={1}
					sectionColor="#FFB400"
					fadeDistance={20}
				/>

				<Suspense fallback={null}>
					<group position={[0, 0, 0]}>
						<ModuleStage />
					</group>
					<Environment preset="city" />
				</Suspense>

				{/* 4. GROUND REFLECTION */}
				<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
					<planeGeometry args={[20, 20]} />
					<meshStandardMaterial color="#0A0E14" roughness={0.2} metalness={0.8} transparent opacity={0.6} />
				</mesh>

				<OrbitControls
					makeDefault
					// Look at the "Heart" of the PC (roughly 30cm up from the floor)
					target={[0, 0.1, 0]}
					minPolarAngle={0}
					maxPolarAngle={Math.PI / 2.1}
					enablePan={false}
					// Prevent user from zooming out too far into the void
					minDistance={0.5}
					maxDistance={4}
				/>

				{/* Tighter shadows for smaller scale */}
				<ContactShadows opacity={0.7} scale={5} blur={1.5} far={1.5} resolution={512} color="#000000" />
			</Canvas>
		</div>
	);
}
