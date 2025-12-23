// components/checkout/logistics-form.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CreditCard, Landmark, ShieldCheck, Wallet } from "lucide-react";
import { motion } from "motion/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v4";
import { toast } from "sonner";
import { InputWithLabel } from "../ui/inputs/InputWithLabel";
import { countries } from "@/lib/data/countries";
import { ComboboxWithLabel } from "../ui/inputs/ComboboxWithLabel";

const CheckoutFormSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	phoneNumber: z.string(),
	country: z.string(),
	city: z.string(),
	address: z.string(),
	zipCode: z.number("Zip/Post Code is required."),
	cardNumber: z.string(),
	expireDate: z.date(),
	cvv: z.string(),
});

type CheckoutFormSchemaType = z.infer<typeof CheckoutFormSchema>;

export function LogisticsForm() {
	const { handleSubmit, control } = useForm<CheckoutFormSchemaType>({
		resolver: zodResolver(CheckoutFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			city: "",
			country: "",
			address: "",
			phoneNumber: "",
			zipCode: 0,
			cardNumber: "",
			cvv: "",
			expireDate: new Date(),
		},
		mode: "onBlur",
	});

	function onSubmit(data: CheckoutFormSchemaType) {
		toast("You submitted the following values:", {
			description: (
				<pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
			position: "bottom-right",
			classNames: {
				content: "flex flex-col gap-2",
			},
			style: {
				"--border-radius": "calc(var(--radius)  + 4px)",
			} as React.CSSProperties,
		});
	}

	return (
		<form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-16">
				{/* 01. PERSONAL IDENTIFICATION */}
				<div className="space-y-8">
					<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
						<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">01. Recipient_ID</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Controller
							name="firstName"
							control={control}
							render={({ field, fieldState }) => (
								<InputWithLabel<CheckoutFormSchemaType> field={field} fieldState={fieldState} nameInSchema="firstName" fieldTitle={"first_name"} placeholder={"REQUIRED"} />
							)}
						/>
						<Controller
							name="lastName"
							control={control}
							render={({ field, fieldState }) => (
								<InputWithLabel<CheckoutFormSchemaType> field={field} fieldState={fieldState} nameInSchema="lastName" fieldTitle={"last_name"} placeholder={"REQUIRED"} />
							)}
						/>
						<Controller
							name="email"
							control={control}
							render={({ field, fieldState }) => (
								<InputWithLabel<CheckoutFormSchemaType> field={field} fieldState={fieldState} nameInSchema="email" fieldTitle={"contact_email"} placeholder={"SIGNAL_ADDRESS"} />
							)}
						/>
						<Controller
							name="phoneNumber"
							control={control}
							render={({ field, fieldState }) => (
								<InputWithLabel<CheckoutFormSchemaType>
									field={field}
									fieldState={fieldState}
									nameInSchema="phoneNumber"
									fieldTitle={"Comm_Line (Phone)"}
									placeholder={"+000 000 000"}
								/>
							)}
						/>
					</div>
				</div>

				{/* 02. GEOSPATIAL COORDINATES (Address) */}
				<div className="space-y-8">
					<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
						<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">02. Destination_Node</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-6 gap-6">
						{/* Country - Spans full width on mobile, half on desktop */}
						<Controller
							name="country"
							control={control}
							render={({ field, fieldState }) => (
								<ComboboxWithLabel<CheckoutFormSchemaType>
									field={field}
									data={countries}
									fieldState={fieldState}
									nameInSchema="country"
									fieldTitle={"Global_Sector (Country)"}
									containerClassName="md:col-span-3 space-y-2"
									placeholder={"SELECT_COUNTRY"}
								/>
							)}
						/>

						{/* City */}
						<Controller
							name="city"
							control={control}
							render={({ field, fieldState }) => (
								<InputWithLabel<CheckoutFormSchemaType>
									field={field}
									fieldState={fieldState}
									nameInSchema="city"
									fieldTitle={"Hub_Destination (City)"}
									containerClassName="md:col-span-3 space-y-2"
									placeholder={"ENTER_CITY"}
								/>
							)}
						/>

						{/* Street Address */}
						<Controller
							name="address"
							control={control}
							render={({ field, fieldState }) => (
								<InputWithLabel<CheckoutFormSchemaType>
									field={field}
									fieldState={fieldState}
									nameInSchema="address"
									fieldTitle={"Coordinate_String (Address)"}
									containerClassName="md:col-span-4 space-y-2"
									placeholder={"STREET_NAME_AND_UNIT"}
								/>
							)}
						/>

						{/* Zip Code */}
						<Controller
							name="zipCode"
							control={control}
							render={({ field, fieldState }) => (
								<InputWithLabel<CheckoutFormSchemaType>
									field={field}
									fieldState={fieldState}
									nameInSchema="zipCode"
									fieldTitle={"Routing_Index (Zip)"}
									containerClassName="md:col-span-2"
									placeholder={"000000"}
								/>
							)}
						/>
					</div>
				</div>

				{/* 03. TRANSFER PROTOCOL (Payment Selection) */}
				<div className="space-y-8">
					<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
						<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">03. Transfer_Protocol</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* OPTION A: CREDIT/DEBIT CARD */}
						<label className="relative group cursor-pointer">
							<input type="radio" name="payment" className="sr-only peer" defaultChecked />
							<div className="h-full p-6 border border-white/10 bg-white/2 transition-all peer-checked:border-[#FFB400] peer-checked:bg-[#FFB400]/5 group-hover:border-white/20">
								<div className="flex flex-col gap-4">
									<div className="flex justify-between items-start">
										<CreditCard size={20} className="text-[#94A3B8] group-hover:text-[#FFB400] transition-colors" />
										<div className="flex gap-1">
											<div className="w-6 h-4 bg-white/10 rounded-[2px]" /> {/* Mini Visa Icon Placeholder */}
											<div className="w-6 h-4 bg-white/10 rounded-[2px]" /> {/* Mini MC Icon Placeholder */}
										</div>
									</div>
									<div>
										<p className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-widest">Card_Gateway</p>
										<p className="text-[#94A3B8] text-[8px] font-mono mt-1 opacity-50 underline">Visa // Mastercard</p>
									</div>
								</div>
								{/* Selection Indicator */}
								<div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FFB400] opacity-0 peer-checked:opacity-100 shadow-[0_0_8px_#FFB400]" />
							</div>
						</label>

						{/* OPTION B: PAYPAL */}
						<label className="relative group cursor-pointer">
							<input type="radio" name="payment" className="sr-only peer" />
							<div className="h-full p-6 border border-white/10 bg-white/2 transition-all peer-checked:border-[#FFB400] peer-checked:bg-[#FFB400]/5 group-hover:border-white/20">
								<div className="flex flex-col gap-4">
									<div className="flex justify-between items-start">
										<Wallet size={20} className="text-[#94A3B8] group-hover:text-[#FFB400] transition-colors" />
										<div className="w-6 h-4 bg-white/10 rounded-[2px]" /> {/* Mini PayPal Icon Placeholder */}
									</div>
									<div>
										<p className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-widest">PayPal_Node</p>
										<p className="text-[#94A3B8] text-[8px] font-mono mt-1 opacity-50">Global_Wallet_Sync</p>
									</div>
								</div>
								<div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FFB400] opacity-0 peer-checked:opacity-100 shadow-[0_0_8px_#FFB400]" />
							</div>
						</label>

						{/* OPTION C: BANK TRANSFER (Elite/Professional Option) */}
						<label className="relative group cursor-pointer">
							<input type="radio" name="payment" className="sr-only peer" />
							<div className="h-full p-6 border border-white/10 bg-white/[0.02] transition-all peer-checked:border-[#FFB400] peer-checked:bg-[#FFB400]/5 group-hover:border-white/20">
								<div className="flex flex-col gap-4">
									<div className="flex justify-between items-start">
										<Landmark size={20} className="text-[#94A3B8] group-hover:text-[#FFB400] transition-colors" />
										<span className="text-[8px] font-mono text-[#FFB400]">PRO_ONLY</span>
									</div>
									<div>
										<p className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-widest">Wire_Transfer</p>
										<p className="text-[#94A3B8] text-[8px] font-mono mt-1 opacity-50">Babylon_Direct_Log</p>
									</div>
								</div>
								<div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FFB400] opacity-0 peer-checked:opacity-100 shadow-[0_0_8px_#FFB400]" />
							</div>
						</label>
					</div>

					{/* DYNAMIC CARD INPUT AREA (Appears when Card Gateway is selected) */}
					<div className="p-8 border border-white/5 bg-white/[0.01] relative overflow-hidden">
						{/* Technical Grid Background */}
						<div
							className="absolute inset-0 opacity-[0.02] pointer-events-none"
							style={{ backgroundImage: "radial-gradient(#FFB400 0.5px, transparent 0.5px)", backgroundSize: "10px 10px" }}
						/>

						<div className="relative z-10 space-y-6">
							<div className="flex items-center gap-2 mb-4">
								<div className="w-1 h-1 bg-[#FFB400] rounded-full animate-pulse" />
								<span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest">Secure_Gateway_Initialized</span>
							</div>

							{/* 
                PRO TIP: In a real app, you would render 
                Stripe CardElement or your payment fields here 
            */}
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<div className="md:col-span-4 space-y-2">
									<Label className="text-[8px] font-black uppercase text-[#94A3B8] tracking-widest">Card_Number_Sequence</Label>
									<Input className="rounded-none bg-[#0A0E14] border-white/10 h-10 font-mono text-xs" placeholder="0000 0000 0000 0000" />
								</div>
								<div className="md:col-span-2 space-y-2">
									<Label className="text-[8px] font-black uppercase text-[#94A3B8] tracking-widest">Expiry_Data</Label>
									<Input className="rounded-none bg-[#0A0E14] border-white/10 h-10 font-mono text-xs" placeholder="MM / YY" />
								</div>
								<div className="md:col-span-2 space-y-2">
									<Label className="text-[8px] font-black uppercase text-[#94A3B8] tracking-widest">Security_Bit (CVV)</Label>
									<Input className="rounded-none bg-[#0A0E14] border-white/10 h-10 font-mono text-xs" placeholder="***" />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 04. FINAL AUTHORIZATION */}
				<div className="pt-12 border-t border-white/5">
					<div className="flex items-center gap-3 mb-8 opacity-40">
						<ShieldCheck size={14} className="text-[#FFB400]" />
						<span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#94A3B8]">Verified_Encrypted_Transaction</span>
					</div>

					<motion.button
						whileHover={{ scale: 1.01 }}
						whileTap={{ scale: 0.99 }}
						type="submit"
						form="checkout-form"
						className="group relative w-full bg-[#FFB400] text-[#0A0E14] font-black text-sm uppercase tracking-[0.4em] py-8 flex items-center justify-center gap-4 overflow-hidden transition-all shadow-[0_0_50px_rgba(255,180,0,0.1)] hover:shadow-[0_0_80px_rgba(255,180,0,0.3)]"
					>
						<span className="relative z-10 flex items-center gap-4">
							Deploy Order Manifest <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
						</span>

						{/* The Signature Kinetic Beam */}
						<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
							<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
						</div>
					</motion.button>
				</div>
			</div>
		</form>
	);
}
