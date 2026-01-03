// components/checkout/logistics-form.tsx
"use client";

import { ArrowRight, CreditCard, Landmark, ShieldCheck, Wallet, Lock, Terminal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react"; // Added AnimatePresence
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { InputWithLabel } from "../ui/inputs/input-with-label";
import { countries } from "@/lib/data/countries";
import { ComboboxWithLabel } from "../ui/inputs/combobox-with-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldError, FieldSet } from "../ui/field";
import { ReactNode } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const CheckoutFormSchema = z.object({
	firstName: z.string().min(1, "Required"),
	lastName: z.string().min(1, "Required"),
	email: z.email(),
	phoneNumber: z
		.string()
		.min(1, "Required")
		.refine(
			(val) => {
				// We parse the number. If no country is provided, it checks global formats.
				const phoneNumber = parsePhoneNumberFromString(val);
				return phoneNumber?.isValid();
			},
			{
				message: "INVALID_SIGNAL_FORMAT // CHECK_COMM_LINE",
			}
		),
	country: z.string().min(1, "Required"),
	city: z.string().min(1, "Required"),
	address: z.string().min(1, "Required"),
	zipCode: z.preprocess<string, z.core.SomeType>(
		(val) => String(val),
		z
			.string()
			.regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format")
			.transform((v) => {
				const n = Number(v);
				if (n < 1) throw new Error("Zip/Post Code is required");
				return n;
			})
	),

	// Payment fields are optional based on method in a real app,
	// but for MVP we keep them simple.
	// In a pro app, use .refine() to make them required only if payment_method === 'card'
	cardNumber: z.string().optional(),
	expireDate: z.string().optional(),
	cvv: z.string().optional(),

	payment_method: z.enum(["card", "paypal", "wire"]),
});

type PaymentMethod = {
	label: string;
	value: "card" | "paypal" | "wire";
	icon: ReactNode;
	subtitle: string;
};

const paymentMethods: PaymentMethod[] = [
	{
		label: "Card_Gateway",
		value: "card",
		subtitle: "Visa // Mastercard",
		icon: <CreditCard size={20} className="text-[#94A3B8] group-hover:text-[#FFB400] transition-colors" />,
	},
	{
		label: "PayPal_Node",
		value: "paypal",
		subtitle: "Global_Wallet_Sync",
		icon: <Wallet size={20} className="text-[#94A3B8] group-hover:text-[#FFB400] transition-colors" />,
	},
	{
		label: "Wire_Transfer",
		value: "wire",
		subtitle: "Babylon_Direct_Log",
		icon: <Landmark size={20} className="text-[#94A3B8] group-hover:text-[#FFB400] transition-colors" />,
	},
];

type CheckoutFormSchemaType = z.infer<typeof CheckoutFormSchema>;

export function LogisticsForm() {
	const { handleSubmit, control, watch, formState } = useForm<CheckoutFormSchemaType>({
		resolver: zodResolver(CheckoutFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			city: "",
			country: "",
			address: "",
			phoneNumber: "",
			zipCode: 12345,
			cardNumber: "",
			cvv: "",
			expireDate: "",
			payment_method: "card",
		},
		mode: "onBlur",
	});

	const selectedMethod = watch("payment_method");

	function onSubmit(data: CheckoutFormSchemaType) {
		// In real app: createOrder(data)
		toast.success("PAYLOAD_ENCRYPTED", {
			description: "Transmitting manifest to secure node...",
			icon: <Lock className="text-[#FFB400]" size={16} />,
		});
		console.log(data);
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
							render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} nameInSchema="firstName" fieldTitle="first_name" placeholder="REQUIRED" />}
						/>
						<Controller
							name="lastName"
							control={control}
							render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} nameInSchema="lastName" fieldTitle="last_name" placeholder="REQUIRED" />}
						/>
						<Controller
							name="email"
							control={control}
							render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} nameInSchema="email" fieldTitle="contact_email" placeholder="SIGNAL_ADDRESS" />}
						/>
						<Controller
							name="phoneNumber"
							control={control}
							render={({ field, fieldState }) => (
								<InputWithLabel field={field} fieldState={fieldState} nameInSchema="phoneNumber" fieldTitle="Comm_Line (Phone)" placeholder="+000 000 000" />
							)}
						/>
					</div>
				</div>

				{/* 02. GEOSPATIAL COORDINATES */}
				<div className="space-y-8">
					<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
						<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">02. Destination_Node</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-6 gap-6">
						<Controller
							name="country"
							control={control}
							render={({ field, fieldState }) => (
								<ComboboxWithLabel
									field={field}
									data={countries}
									fieldState={fieldState}
									nameInSchema="country"
									fieldTitle="Global_Sector (Country)"
									containerClassName="md:col-span-3 space-y-2"
									placeholder="SELECT_COUNTRY"
								/>
							)}
						/>
						<Controller
							name="city"
							control={control}
							render={({ field, fieldState }) => (
								<InputWithLabel
									field={field}
									fieldState={fieldState}
									nameInSchema="city"
									fieldTitle="Hub_Destination (City)"
									containerClassName="md:col-span-3 space-y-2"
									placeholder="ENTER_CITY"
								/>
							)}
						/>
						<Controller
							name="address"
							control={control}
							render={({ field, fieldState }) => (
								<InputWithLabel
									field={field}
									fieldState={fieldState}
									nameInSchema="address"
									fieldTitle="Coordinate_String (Address)"
									containerClassName="md:col-span-4 space-y-2"
									placeholder="STREET_NAME_AND_UNIT"
								/>
							)}
						/>
						<Controller
							name="zipCode"
							control={control}
							render={({ field, fieldState }) => (
								<InputWithLabel
									field={field}
									fieldState={fieldState}
									onChange={(e) => {
										const v = e.currentTarget.value;
										field.onChange(Number(v));
									}}
									nameInSchema="zipCode"
									fieldTitle="Routing_Index (Zip)"
									containerClassName="md:col-span-2"
									placeholder="000000"
									type="number"
								/>
							)}
						/>
					</div>
				</div>

				{/* 03. TRANSFER PROTOCOL */}
				<div className="space-y-8">
					<div className="flex items-center gap-4 border-l-2 border-[#FFB400] pl-4">
						<h3 className="text-[#F5F5F0] text-xl font-black uppercase tracking-tighter">03. Transfer_Protocol</h3>
					</div>

					<Controller
						name="payment_method"
						control={control}
						render={({ field, fieldState }) => (
							<FieldSet>
								<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{paymentMethods.map((method) => (
										<label
											key={method.value}
											className={`relative group cursor-pointer h-full p-6 border bg-white/2 transition-all hover:border-white/20 ${
												field.value === method.value ? "border-[#FFB400] bg-[#FFB400]/5" : "border-white/10"
											}`}
										>
											<RadioGroupItem value={method.value} id={`pg_${method.value}`} className="sr-only" />
											<div className="flex flex-col gap-4">
												<div className="flex justify-between items-start">
													{method.icon}
													{/* Selection Dot */}
													<div
														className={`w-1.5 h-1.5 rounded-full bg-[#FFB400] shadow-[0_0_8px_#FFB400] transition-opacity ${
															field.value === method.value ? "opacity-100" : "opacity-0"
														}`}
													/>
												</div>
												<div>
													<p className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-widest">{method.label}</p>
													<p className="text-[#94A3B8] text-[8px] font-mono mt-1 opacity-50">{method.subtitle}</p>
												</div>
											</div>
										</label>
									))}
								</RadioGroup>
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</FieldSet>
						)}
					/>

					{/* DYNAMIC VIEWPORT BASED ON SELECTION */}
					<div className="relative mt-8">
						<AnimatePresence mode="wait">
							{selectedMethod === "card" ? (
								<motion.div
									key="card-fields"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className="p-8 border border-white/5 bg-white/1 relative overflow-hidden"
								>
									{/* Grid Background */}
									<div className="absolute inset-0 opacity-[0.1] pointer-events-none grid-bg" />

									<div className="relative z-10 space-y-6">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-1 h-1 bg-[#FFB400] rounded-full animate-pulse" />
											<span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest">Secure_Gateway_Initialized</span>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
											<Controller
												name="cardNumber"
												control={control}
												render={({ field, fieldState }) => (
													<InputWithLabel<CheckoutFormSchemaType>
														field={field}
														fieldState={fieldState}
														nameInSchema="cardNumber"
														fieldTitle="Card_Sequence"
														placeholder="0000 0000 0000 0000"
														containerClassName="md:col-span-4"
													/>
												)}
											/>
											<Controller
												name="expireDate"
												control={control}
												render={({ field, fieldState }) => (
													<InputWithLabel<CheckoutFormSchemaType>
														field={field}
														fieldState={fieldState}
														nameInSchema="expireDate"
														fieldTitle="Expiry_Data"
														placeholder="MM / YY"
														containerClassName="md:col-span-2"
													/>
												)}
											/>
											<Controller
												name="cvv"
												control={control}
												render={({ field, fieldState }) => (
													<InputWithLabel<CheckoutFormSchemaType>
														field={field}
														fieldState={fieldState}
														nameInSchema="cvv"
														fieldTitle="Security_Bit"
														placeholder="***"
														containerClassName="md:col-span-2"
													/>
												)}
											/>
										</div>
									</div>
								</motion.div>
							) : (
								<motion.div
									key="other-fields"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className="p-12 border border-white/5 bg-white/1 flex flex-col items-center justify-center text-center gap-4"
								>
									<Terminal size={32} className="text-[#94A3B8] opacity-20" />
									<div>
										<p className="text-[#F5F5F0] text-xs font-black uppercase tracking-widest">Protocol_Pending</p>
										<p className="text-[#94A3B8] text-[10px] font-mono mt-2 opacity-50">
											The {selectedMethod.toUpperCase()} node is currently undergoing synchronization. <br />
											Please select Card_Gateway for immediate authorization.
										</p>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
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
						disabled={formState.isSubmitting}
						className="group relative w-full bg-[#FFB400] text-[#0A0E14] font-black text-sm uppercase tracking-[0.4em] py-8 flex items-center justify-center gap-4 overflow-hidden transition-all shadow-[0_0_50px_rgba(255,180,0,0.1)] hover:shadow-[0_0_80px_rgba(255,180,0,0.3)] disabled:opacity-50 disabled:grayscale"
					>
						<span className="relative z-10 flex items-center gap-4">
							{formState.isSubmitting ? "TRANSMITTING..." : "DEPLOY ORDER MANIFEST"}
							{!formState.isSubmitting && <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />}
						</span>
						<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
							<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
						</div>
					</motion.button>
				</div>
			</div>
		</form>
	);
}
