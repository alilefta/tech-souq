"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputWithLabel } from "@/components/ui/inputs/input-with-label";
import { Terminal, ShieldCheck, Lock, Activity, Eye, EyeOff, ArrowRight, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { loginAdmin } from "@/app/actions/auth";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SingularityBackground } from "@/components/ui/singularity-background";

const schema = z.object({
	email: z.email("INVALID_ID"),
	password: z.string().min(1, "KEY_REQUIRED"),
});

type LoginData = z.infer<typeof schema>;

export default function LoginPage() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

	const { control, handleSubmit } = useForm<LoginData>({
		resolver: zodResolver(schema),
		defaultValues: { email: "", password: "" },
	});

	const { executeAsync, isExecuting } = useAction(loginAdmin, {
		onSuccess: () => {
			toast.success("IDENTITY_VERIFIED", {
				description: "ESTABLISHING_SECURE_LINK_TO_FOUNDRY...",
				icon: <ShieldCheck className="text-[#FFB400]" size={16} />,
			});
			setTimeout(() => router.push("/admin"), 1500);
		},
		onError: ({ error }) => {
			toast.error("ACCESS_DENIED", {
				description: error.serverError || "INVALID_HANDSHAKE_PROTOCOL",
				icon: <ShieldAlert className="text-red-500" size={16} />,
			});
		},
	});

	const onSubmit = async (data: LoginData) => {
		await executeAsync(data);
	};

	return (
		<main className="min-h-[100dvh] w-full bg-[#0A0E14] flex flex-col items-center justify-between p-6 relative font-sans selection:bg-[#FFB400] selection:text-[#0A0E14] overflow-hidden md:overflow-auto">
			{/* 1. BACKGROUND LAYERS */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				{/* The new calm background */}
				<SingularityBackground />

				{/* Static Watermark */}
				<div className="absolute inset-0 opacity-[0.02] flex items-center justify-center">
					<span className="text-[40vw] font-black text-[#F5F5F0] leading-none select-none tracking-tighter">60</span>
				</div>

				{/* Vignette to darken edges */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0A0E14_100%)]" />
			</div>

			{/* 2. THE SECURITY CARD */}
			<div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 py-12">
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: 20 }}
					animate={{
						opacity: 1,
						scale: 1,
						y: 0,
					}}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
					className="w-full max-w-md bg-[#0A0E14]/60 backdrop-blur-2xl border border-white/10 relative group z-20 shadow-2xl"
				>
					{/* HUD CORNERS */}
					<div className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-[#FFB400] opacity-50" />
					<div className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-[#FFB400] opacity-50" />

					{/* HEADER */}
					<div className="p-8 border-b border-white/5 text-center">
						<div className="flex justify-center mb-6">
							<div className="w-16 h-16 bg-[#FFB400]/10 border border-[#FFB400]/20 flex items-center justify-center rounded-full relative">
								<Lock size={24} className="text-[#FFB400]" />
								{isExecuting && <div className="absolute inset-0 border-t-2 border-[#FFB400] rounded-full animate-spin" />}
							</div>
						</div>
						<h1 className="text-2xl font-black uppercase tracking-tighter text-[#F5F5F0]">
							Foundry <span className="text-[#FFB400]">Access</span>
						</h1>
						<p className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-[0.3em] mt-2">Restricted_Node: Authorized_Personnel_Only</p>
					</div>

					{/* FORM */}
					<form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
						<div className="space-y-6">
							<Controller
								name="email"
								control={control}
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} nameInSchema="email" fieldTitle="Operative_ID (Email)" placeholder="ENTER_IDENTITY_STRING" />
								)}
							/>

							<div className="relative">
								<Controller
									name="password"
									control={control}
									render={({ field, fieldState }) => (
										<InputWithLabel
											field={field}
											fieldState={fieldState}
											nameInSchema="password"
											fieldTitle="Security_Key"
											placeholder="ENTER_TOKEN"
											type={showPassword ? "text" : "password"}
										/>
									)}
								/>
								<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-[#94A3B8] hover:text-[#FFB400] transition-colors">
									{showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
								</button>
							</div>
						</div>

						<div className="space-y-4">
							<button
								type="submit"
								disabled={isExecuting}
								className="group relative w-full bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.3em] py-5 flex items-center justify-center gap-3 overflow-hidden transition-all shadow-[0_0_30px_rgba(255,180,0,0.1)] hover:shadow-[0_0_50px_rgba(255,180,0,0.3)] disabled:opacity-50 disabled:grayscale"
							>
								<span className="relative z-10 flex items-center gap-3">
									{isExecuting ? "Verifying_Credentials..." : "Initialize_Session"}
									{isExecuting ? <Activity className="animate-spin" size={16} /> : <ArrowRight size={16} />}
								</span>
								{/* Kinetic Beam */}
								{!isExecuting && (
									<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
										<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-white/40 -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
									</div>
								)}
							</button>

							<div className="flex justify-between items-center text-[8px] font-mono text-[#94A3B8] uppercase tracking-widest opacity-50">
								<span>Encyption: AES-256</span>
								<span>Node: Babylon_Alpha</span>
							</div>
						</div>
					</form>

					{/* SCANLINE OVERLAY */}
					<div className="absolute inset-0 pointer-events-none z-20 opacity-20">
						<div className="absolute top-0 left-0 w-full h-px bg-[#FFB400] shadow-[0_0_10px_#FFB400] animate-[scan_4s_linear_infinite]" />
					</div>
				</motion.div>
			</div>
			{/* FOOTER WARNING */}
			<div className="relative z-10 w-full text-center space-y-2 opacity-30 pb-safe">
				<Terminal size={16} className="mx-auto text-[#FFB400]" />
				<p className="text-[9px] font-black text-[#F5F5F0] uppercase tracking-[0.2em]">Unauthorized Access Attempts Will Be Logged</p>
				<p className="text-[8px] font-mono text-[#94A3B8]">IP_ADDRESS_MONITORED</p>
			</div>
		</main>
	);
}
