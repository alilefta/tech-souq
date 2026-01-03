"use client";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { foundrySettingsSchema, FoundrySettings } from "@/lib/schemas/settings";
import { InputWithLabel } from "@/components/ui/inputs/input-with-label";
import { ShieldAlert, Save, Activity, RefreshCw, Lock, Radio, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { FoundrySelect } from "@/components/ui/inputs/foundary-form-select";

export function SettingsForm() {
	const methods = useForm<FoundrySettings>({
		resolver: zodResolver(foundrySettingsSchema),
		defaultValues: {
			foundryName: "BASE 60",
			operatingStatus: "LIVE",
			baseCurrency: "USD",
			unitPrecision: 2,
			globalTransferFee: 45,
			shippingNode: "BABYLON_HUB_ALPHA",
			enableVanguardReports: true,
			securityLevel: "HIGH_ENCRYPT",
		},
	});

	const {
		control,
		handleSubmit,
		watch,
		formState: { isDirty },
	} = methods;
	const currentStatus = watch("operatingStatus");

	const onSubmit = (data: FoundrySettings) => {
		toast.success("KERNEL_UPDATED", {
			description: "SYSTEM_PARAMETERS_SYNCHRONIZED // CORE_REBOOT_NOT_REQUIRED",
		});
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				{/* LEFT: CONFIGURATION MODULES */}
				<div className="lg:col-span-8 space-y-16">
					{/* 01. CORE IDENTITY */}
					<section className="space-y-8">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">01. Core_Parameters</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Controller
								name="foundryName"
								control={control}
								render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} nameInSchema="foundryName" fieldTitle="Foundry_Identifier" />}
							/>
							<Controller
								name="shippingNode"
								control={control}
								render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} nameInSchema="shippingNode" fieldTitle="Primary_Shipping_Node" />}
							/>
						</div>
					</section>

					{/* 02. OPERATIONAL STATUS (THE TOGGLE GRID) */}
					<section className="space-y-8">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">02. Operational_Status</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{["LIVE", "MAINTENANCE", "LOCKED"].map((status) => (
								<label key={status} className="relative cursor-pointer group">
									<Controller
										name="operatingStatus"
										control={control}
										render={({ field }) => <input type="radio" className="sr-only peer" checked={field.value === status} onChange={() => field.onChange(status)} />}
									/>
									<div
										className={cn(
											"p-6 border transition-all text-center rounded-none bg-white/[0.01]",
											"peer-checked:border-[#FFB400] peer-checked:bg-[#FFB400]/5",
											"border-white/10 group-hover:border-white/20"
										)}
									>
										<p
											className={cn(
												"text-[10px] font-black uppercase tracking-widest",
												status === "LIVE" ? "text-green-500" : status === "LOCKED" ? "text-red-500" : "text-[#FFB400]"
											)}
										>
											{status}
										</p>
										<p className="text-[7px] font-mono text-[#94A3B8] mt-1 opacity-40 uppercase">{status === "LIVE" ? "Public_Access: ON" : "Restricted_Access"}</p>
									</div>
								</label>
							))}
						</div>
					</section>

					{/* 03. FINANCIAL LOGIC */}
					<section className="space-y-8">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">03. Financial_Protocols</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Controller
								name="baseCurrency"
								control={control}
								render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} nameInSchema="baseCurrency" fieldTitle="Base_ISO_Currency" />}
							/>
							<Controller
								name="globalTransferFee"
								control={control}
								render={({ field, fieldState }) => (
									<InputWithLabel type="number" field={field} fieldState={fieldState} nameInSchema="globalTransferFee" fieldTitle="Global_Transfer_Fee" />
								)}
							/>
						</div>
					</section>

					{/* 04. SIGNAL HANDSHAKE (Communications & API) */}
					<section className="space-y-8">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<span className="text-[#FFB400] font-mono text-xs">04</span>
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">Signal_Handshake</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Controller
								name="apiSecurityKey"
								control={control}
								render={({ field, fieldState }) => (
									<div className="relative">
										<InputWithLabel type="password" field={field} fieldState={fieldState} nameInSchema="apiSecurityKey" fieldTitle="Secure_API_Token" />
										<span className="absolute top-2 right-2 text-[7px] font-mono text-green-500 opacity-40 uppercase">Encrypted_AES</span>
									</div>
								)}
							/>
							{/* Select Node */}
							<FoundrySelect
								control={control}
								nameInSchema="handshakeMode"
								fieldTitle="Handshake_Protocol"
								placeholder="Select_Mode"
								options={[
									{ label: "Simulation [Sandbox]", value: "SIMULATION" },
									{ label: "Deployment [Live]", value: "DEPLOYMENT" },
								]}
							/>
						</div>
					</section>

					{/* 05. VANGUARD ACCESS POLICY */}
					<section className="space-y-8">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<span className="text-[#FFB400] font-mono text-xs">05</span>
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">Vanguard_Access_Policy</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Toggle 1 */}
							<Controller
								name="allowNewVanguard"
								control={control}
								render={({ field }) => (
									<div
										onClick={() => field.onChange(!field.value)}
										className={cn(
											"flex items-center justify-between p-5 border cursor-pointer transition-all",
											field.value ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/5 opacity-40"
										)}
									>
										<div className="flex flex-col gap-1">
											<span className="text-[10px] font-black uppercase text-[#F5F5F0]">Architect_Recruitment</span>
											<span className="text-[8px] font-mono text-[#94A3B8] uppercase">Status: {field.value ? "OPEN" : "CLOSED"}</span>
										</div>
										<Radio className={cn("size-4", field.value ? "text-[#FFB400]" : "text-[#94A3B8]")} />
									</div>
								)}
							/>
							{/* Toggle 2 */}
							<Controller
								name="autoAuthorizeIntel"
								control={control}
								render={({ field }) => (
									<div
										onClick={() => field.onChange(!field.value)}
										className={cn(
											"flex items-center justify-between p-5 border cursor-pointer transition-all",
											field.value ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/5 opacity-40"
										)}
									>
										<div className="flex flex-col gap-1">
											<span className="text-[10px] font-black uppercase text-[#F5F5F0]">Intel_Verification_Bypass</span>
											<span className="text-[8px] font-mono text-[#94A3B8] uppercase">Reports: {field.value ? "Auto-Live" : "Manual_Clearance"}</span>
										</div>
										<ShieldCheck className={cn("size-4", field.value ? "text-[#FFB400]" : "text-[#94A3B8]")} />
									</div>
								)}
							/>
						</div>
					</section>

					{/* 06. CHRONOS & LINGUA NODES */}
					<section className="space-y-8 pb-20">
						<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
							<span className="text-[#FFB400] font-mono text-xs">06</span>
							<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">Chronos_&_Lingua</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Controller
								name="timezoneNode"
								control={control}
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} nameInSchema="timezoneNode" fieldTitle="Timezone_Coordinate" placeholder="UTC+3 (Babylon)" />
								)}
							/>

							{/* Select Language */}
							<FoundrySelect
								control={control}
								fieldTitle="Foundry_Primary_Lingua"
								placeholder="Select_Language"
								nameInSchema="primaryLanguage"
								options={[
									{
										label: "English [ENG_v1]",
										value: "EN",
									},
									{
										label: "Arabic [ARB_v1]",
										value: "AR",
									},
								]}
							/>
						</div>
					</section>
				</div>

				{/* RIGHT: LIVE SYSTEM MONITOR */}
				<aside className="lg:col-span-4">
					<div className="sticky top-32 space-y-8">
						{/* STATUS MONITOR HUD */}
						<div className="bg-[#1E293B]/20 border border-white/10 p-8 space-y-8 relative overflow-hidden">
							<div className="flex items-center justify-between border-b border-white/5 pb-4">
								<h3 className="text-[10px] font-black uppercase text-[#F5F5F0] tracking-widest flex items-center gap-2">
									<Activity size={14} className="text-[#FFB400]" /> Configuration_Health
								</h3>
							</div>

							<div className="space-y-6">
								<div className="flex justify-between items-end font-mono">
									<span className="text-[8px] text-[#94A3B8] uppercase">Current_State:</span>
									<span className={cn("text-[10px] font-bold", currentStatus === "LIVE" ? "text-green-500" : "text-red-500")}>{currentStatus}_PROTOCOL</span>
								</div>

								{/* Technical Progress Bars */}
								<div className="space-y-4">
									{[
										{ label: "Kernel_Stability", val: 100 },
										{ label: "Database_Sync", val: 98 },
										{ label: "Auth_Buffer", val: 100 },
									].map((item) => (
										<div key={item.label}>
											<div className="flex justify-between text-[7px] font-black uppercase text-[#94A3B8] mb-1">
												<span>{item.label}</span>
												<span>{item.val}%</span>
											</div>
											<div className="h-0.5 w-full bg-white/5">
												<div className="h-full bg-[#FFB400]" style={{ width: `${item.val}%` }} />
											</div>
										</div>
									))}
								</div>
							</div>

							<button
								type="submit"
								disabled={!isDirty}
								className="w-full py-6 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-white transition-all disabled:opacity-20 disabled:grayscale overflow-hidden group"
							>
								<span className="relative z-10 flex items-center justify-center gap-3">
									Commit_To_Core <Save size={16} />
								</span>
								{/* Kinetic Beam */}
								<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
									<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
								</div>
							</button>

							<button
								type="button"
								className="w-full py-4 border border-white/5 text-[#94A3B8] text-[9px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2"
							>
								<RefreshCw size={12} /> Purge_System_Cache
							</button>
						</div>

						{/* SECURITY LOCKDOWN ALERT */}
						{currentStatus === "LOCKED" && (
							<div className="p-6 border border-red-500/20 bg-red-500/5 flex items-start gap-4">
								<ShieldAlert size={20} className="text-red-500 shrink-0" />
								<div>
									<p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Protocol_Alert</p>
									<p className="text-[8px] font-mono text-red-400/60 uppercase mt-1 leading-relaxed">
										System is in MAX_ISOLATION. All public transactions are suspended. Core access restricted to Babylon nodes.
									</p>
								</div>
							</div>
						)}
					</div>
				</aside>
			</form>
		</FormProvider>
	);
}
