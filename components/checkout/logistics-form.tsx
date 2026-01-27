// components/checkout/logistics-form.tsx
"use client";

import { ArrowRight, CreditCard, Landmark, ShieldCheck, Wallet, Terminal, Activity, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react"; // Added AnimatePresence
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { InputWithLabel } from "../ui/inputs/input-with-label";
import { countries } from "@/lib/data/countries";
import { ComboboxWithLabel } from "../ui/inputs/combobox-with-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldError, FieldSet } from "../ui/field";
import { ReactNode, useEffect, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useAction } from "next-safe-action/hooks";
import { initializePaymentFlow } from "@/app/actions/order";
import { StripePaymentWrapper } from "./stripe-form-wrapper";
import { StripePaymentForm } from "./stripe-payment-form";
import { useRouter, useSearchParams } from "next/navigation";

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
			},
		),
	country: z.string().min(1, "Required"),
	city: z.string().min(1, "Required"),
	address: z.string().min(1, "Required"),
	zipCode: z
		.string()
		.trim()
		.min(1, "Zip/Post Code is required")
		.regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),

	payment_method: z.enum(["stripe", "paypal", "wire"]),
	discountCode: z.string().optional(),
});

type PaymentMethod = {
	label: string;
	value: "stripe" | "paypal" | "wire";
	icon: ReactNode;
	subtitle: string;
};

const paymentMethods: PaymentMethod[] = [
	{
		label: "Card_Gateway",
		value: "stripe",
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
	const [clientSecret, setClientSecret] = useState<string | null>(null);
	const [orderNumber, setOrderNumber] = useState<string | null>(null);

	const searchParams = useSearchParams();
	const router = useRouter();

	const { handleSubmit, control, watch, formState, getValues } = useForm<CheckoutFormSchemaType>({
		resolver: zodResolver(CheckoutFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			city: "",
			country: "",
			address: "",
			phoneNumber: "",
			zipCode: "",
			payment_method: "stripe",
			discountCode: undefined,
		},
		mode: "onChange",
	});

	useEffect(() => {
		if (searchParams.get("error") === "payment_failed") {
			toast.error("AUTHORIZATION_REJECTED", {
				description: "The banking node declined the transfer. Please retry.",
				icon: <AlertCircle className="text-red-500" />,
				duration: 8000,
			});

			// Clean the URL so a refresh doesn't show the error again
			router.replace("/checkout");
		}
	}, [searchParams]);

	//const router = useRouter();

	// 1. INITIALIZE ACTION HOOK
	const { executeAsync: executeInit, isExecuting } = useAction(initializePaymentFlow, {
		onSuccess: ({ data }) => {
			if (data?.success && data.clientSecret) {
				toast.success("LOGISTICS_LOCKED", {
					description: "SECURE_GATEWAY_ESTABLISHED",
					icon: <ShieldCheck className="text-[#FFB400]" size={16} />,
				});
				// SAVE KEYS & TRIGGER REVEAL
				setClientSecret(data.clientSecret);
				setOrderNumber(data.orderNumber);
			}
		},
		onError: ({ error }) => {
			toast.error("DEPLOYMENT_HALTED", {
				description: error.serverError || "SYSTEM_LOGIC_CONFLICT",
				icon: <Activity className="text-red-500" size={16} />,
			});
		},
	});

	const selectedMethod = useWatch({
		control,
		name: "payment_method",
	});

	async function onSubmit(data: CheckoutFormSchemaType) {
		if (!clientSecret) {
			await executeInit(data);
		}
	}

	return (
		<div className="space-y-16">
			{/* Stage 1: Basic info */}
			<form id="logistics-form" onSubmit={handleSubmit(onSubmit)} className={clientSecret ? "opacity-50 pointer-events-none grayscale" : ""}>
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
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} nameInSchema="email" fieldTitle="contact_email" placeholder="SIGNAL_ADDRESS" />
								)}
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
										nameInSchema="zipCode"
										fieldTitle="Routing_Index (Zip)"
										containerClassName="md:col-span-2"
										placeholder="00000"
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
								{selectedMethod === "stripe" ? (
									<motion.div
										key="stripe-info"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										className="p-6 border border-dashed border-[#FFB400]/30 bg-[#FFB400]/5 flex items-center gap-4"
									>
										<div className="w-10 h-10 bg-[#FFB400]/10 flex items-center justify-center rounded-sm">
											<CreditCard size={20} className="text-[#FFB400]" />
										</div>
										<div>
											<p className="text-[#F5F5F0] text-xs font-bold uppercase tracking-widest">Card_Gateway_Selected</p>
											<p className="text-[#94A3B8] text-[10px] font-mono mt-1 opacity-70">Secure interface will initialize upon deployment.</p>
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
						{!clientSecret && (
							<motion.button
								whileHover={{ scale: 1.01 }}
								whileTap={{ scale: 0.99 }}
								type="submit"
								disabled={isExecuting || !formState.isValid}
								className="group relative w-full bg-[#FFB400] text-[#0A0E14] font-black text-sm uppercase tracking-[0.4em] py-8 flex items-center justify-center gap-4 overflow-hidden transition-all shadow-[0_0_50px_rgba(255,180,0,0.1)] hover:shadow-[0_0_80px_rgba(255,180,0,0.3)] disabled:opacity-20 disabled:grayscale"
							>
								<span className="relative z-10 flex items-center gap-4">
									{isExecuting ? (
										<>
											INITIALIZING_DISPATCH... <Activity size={18} className="animate-spin" />
										</>
									) : (
										<>
											Deploy Order Manifest <ArrowRight size={20} strokeWidth={3} />
										</>
									)}
								</span>

								{/* Kinetic Beam (Hidden during execution for visual focus) */}
								{!isExecuting && (
									<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
										<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
									</div>
								)}
							</motion.button>
						)}
					</div>
				</div>
			</form>

			{/* STAGE 2: THE SECURE PAYMENT TERMINAL (REVEALED) */}

			{clientSecret && orderNumber && (
				<div className="animate-in fade-in slide-in-from-bottom-8 duration-700 border-t-2 border-[#FFB400] pt-12">
					<div className="flex items-center gap-4 mb-8">
						<div className="w-10 h-10 bg-[#FFB400]/10 flex items-center justify-center text-[#FFB400] border border-[#FFB400]/20">
							<ShieldCheck size={20} />
						</div>
						<div>
							<h3 className="text-xl font-black text-[#F5F5F0] uppercase tracking-tighter">Secure_Transfer_Uplink</h3>
							<p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">Target: Order #{orderNumber}</p>
						</div>
					</div>

					<StripePaymentWrapper clientSecret={clientSecret}>
						<StripePaymentForm
							customerAddress={{
								city: getValues("city"),
								country: getValues("country"),
								line1: getValues("address"),
								postalCode: getValues("zipCode"),
							}}
							customerEmail={getValues("email")}
						/>
					</StripePaymentWrapper>
				</div>
			)}
		</div>
	);
}
