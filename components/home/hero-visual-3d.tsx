"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, PresentationControls, Environment, ContactShadows, PerspectiveCamera, Html, AdaptiveDpr } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Loader2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { ARLabel } from "../builder/ar-label";

const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

function HeroModel() {
	const { scene } = useGLTF("/assets/models/hero/rtx-5090.glb", DRACO_URL);
	const meshRef = useRef<THREE.Group>(null);
	const { viewport } = useThree();

	// RESPONSIVE LOGIC:
	// If viewport width is small (mobile), reduce scale slightly to fit better.
	// Desktop users requested scale 4.

	console.log("Current Viewport:", viewport.width);
	const isMobile = viewport.width < 3;

	const scale = isMobile ? 3 : 4;
	const arScale = isMobile ? 0.1 : 0.2;
	const arPos: [x: number, y: number, z: number] = isMobile ? [0.3, 0.28, 0.5] : [0.3, 0.38, 0.5];

	useFrame((state) => {
		if (meshRef.current) {
			meshRef.current.rotation.y = -0.5 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
		}
	});

	return (
		<group ref={meshRef}>
			<primitive object={scene} scale={scale} rotation={[0.2, 2.5, 0.1]} position={[0, -0.45, 0]} />

			<ARLabel
				text="Foundry_Analysis::01"
				variant="scientific"
				// Adjusted label position to stick closer to the smaller mobile model if needed
				position={arPos}
				scale={arScale}
				lineHeight={50}
				lineWidth={30}
			/>
		</group>
	);
}

export default function HeroVisual3D() {
	return (
		// FIX: Removed p-4 on mobile to allow full width, added md:p-4 for desktop framing
		<motion.div className="relative w-full aspect-square md:p-4 " initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}>
			{/* HUD BRACKETS */}
			<div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FFB400]/40" />
			<div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FFB400]/40" />
			<div className="absolute inset-0 bg-[#FFB400]/5 rounded-full blur-[80px] animate-pulse" />

			{/* FIXED HUD TEXT */}
			<div className="absolute top-0 right-0 z-30 flex flex-col items-end gap-1">
				<div className="flex items-center gap-2 px-3 py-1 mr-1 bg-[#FFB400] text-[#0A0E14] shadow-[0_0_20px_rgba(255,180,0,0.4)]">
					<ShieldCheck size={12} strokeWidth={3} />
					<span className="text-[9px] font-black uppercase tracking-widest">Foundry_Authorized</span>
				</div>
				{/* <div className="relative right-0 w-1 h-8 border-r border-[#FFB400]/50 lg:mr-4 mr-0" /> */}
			</div>

			{/* CONTAINER */}
			<motion.div className="relative z-10 w-full h-full bg-[#1E293B]/20 border border-white/5 rounded-sm overflow-hidden shadow-2xl transition-all duration-500">
				<div className="absolute inset-0 z-0">
					<Canvas
						gl={{ antialias: true, alpha: true }}
						// PERFORMANCE: Cap DPR at 1.5 to save mobile battery/heat
						dpr={[1, 1.5]}
					>
						{/* PERFORMANCE: Automatically scales down resolution on slow devices */}
						<AdaptiveDpr pixelated />

						<PerspectiveCamera makeDefault position={[0, 0, 4]} fov={30} />

						<ambientLight intensity={0.5} />
						<spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />
						<pointLight position={[-5, 0, -5]} intensity={2} color="#FFB400" />
						<pointLight position={[5, -2, 5]} intensity={1} color="#4f46e5" />

						<Suspense fallback={<HeroLoader />}>
							<PresentationControls global rotation={[0, 0, 0]} polar={[-Math.PI / 4, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
								<HeroModel />
							</PresentationControls>
							<Environment preset="city" />
							<ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#000000" />
						</Suspense>
					</Canvas>
				</div>

				<div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
					<div className="absolute top-0 left-0 w-full h-px bg-[#FFB400] shadow-[0_0_15px_#FFB400] animate-scan" />
				</div>
				<div className="absolute inset-0 bg-linear-to-t from-[#0A0E14] via-transparent to-transparent opacity-60 pointer-events-none" />

				{/* DATA BADGE - Increased padding for mobile breathability */}
				<div className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 p-5 md:p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-none z-20">
					<div className="flex justify-between items-center">
						<div>
							<p className="text-[#FFB400] text-[7px] md:text-[8px] font-black uppercase tracking-widest mb-1.5">Spotlight_Module</p>
							<p className="text-[#F5F5F0] font-bold text-[10px] md:text-sm tracking-tighter uppercase">RTX 5090 Founders_Ed</p>
						</div>
						<div className="text-right">
							<p className="text-[#94A3B8] text-[8px] font-mono">VAL://</p>
							<p className="text-[#FFB400] font-black  text-base md:text-lg tracking-tighter leading-none">$1,999</p>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

function HeroLoader() {
	return (
		<Html center>
			<div className="flex flex-col items-center gap-4">
				<div className="relative">
					<div className="w-16 h-16 border-2 border-[#FFB400]/20 rounded-full animate-spin-slow" />
					<div className="absolute inset-0 flex items-center justify-center">
						<Loader2 className="text-[#FFB400] animate-spin" size={24} />
					</div>
				</div>
				<p className="text-[10px] font-black text-[#F5F5F0] uppercase tracking-[0.3em]">Initializing_Asset</p>
			</div>
		</Html>
	);
}
