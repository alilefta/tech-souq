"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 300; // Lower count for cleaner look
const CORE_RADIUS = 100; // The empty void in the center

class DataParticle {
	angle: number;
	radius: number;
	speed: number;
	size: number;
	color: string;
	brightness: number;

	constructor(w: number, h: number) {
		this.angle = Math.random() * Math.PI * 2;
		// Spread particles mainly in the outer ring
		this.radius = Math.random() * (Math.max(w, h) / 1.5) + CORE_RADIUS;
		this.speed = Math.random() * 0.002 + 0.001; // Very slow rotation
		this.size = Math.random() * 1.5 + 0.5;
		// 80% Dark Grey (Dust), 20% Amber (Data)
		const isAmber = Math.random() > 0.85;
		this.color = isAmber ? "255, 180, 0" : "100, 116, 139";
		this.brightness = isAmber ? 1 : 0.3;
	}

	update(w: number, h: number) {
		this.angle += this.speed; // Rotate
		this.radius -= 0.2; // Slowly spiral inward

		// Reset if sucked into the core
		if (this.radius < CORE_RADIUS) {
			this.radius = Math.max(w, h) / 1.5;
			this.angle = Math.random() * Math.PI * 2;
		}
	}

	draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
		const cx = w / 2;
		const cy = h / 2;

		const x = cx + Math.cos(this.angle) * this.radius;
		const y = cy + Math.sin(this.angle) * this.radius;

		// Calculate trailing tail based on movement
		const tailLen = this.radius * 0.02; // Tail gets shorter near center
		const tx = cx + Math.cos(this.angle - 0.05) * (this.radius + tailLen);
		const ty = cy + Math.sin(this.angle - 0.05) * (this.radius + tailLen);

		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(tx, ty);

		ctx.strokeStyle = `rgba(${this.color}, ${this.brightness})`;
		ctx.lineWidth = this.size;
		ctx.lineCap = "round";
		ctx.stroke();
	}
}

export function SingularityBackground({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);

		const particles: DataParticle[] = [];
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			particles.push(new DataParticle(width, height));
		}

		const animate = () => {
			// Clear with heavy trail fade for smooth, liquid look
			ctx.fillStyle = "rgba(10, 14, 20, 0.15)";
			ctx.fillRect(0, 0, width, height);

			// Draw the Void (Center)
			const cx = width / 2;
			const cy = height / 2;

			// Subtle core glow pulse
			const time = Date.now() * 0.001;
			const glowRadius = CORE_RADIUS + Math.sin(time) * 10;

			const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius * 2);
			gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
			gradient.addColorStop(0.4, "rgba(0, 0, 0, 0.8)");
			gradient.addColorStop(0.5, "rgba(255, 180, 0, 0.05)"); // Faint Amber ring
			gradient.addColorStop(1, "transparent");

			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.arc(cx, cy, glowRadius * 3, 0, Math.PI * 2);
			ctx.fill();

			particles.forEach((p) => {
				p.update(width, height);
				p.draw(ctx, width, height);
			});

			requestAnimationFrame(animate);
		};

		const animationId = requestAnimationFrame(animate);

		const handleResize = () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", handleResize);
		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return <canvas ref={canvasRef} className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`} />;
}
