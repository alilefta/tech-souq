"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputWithLabel } from "@/components/ui/inputs/input-with-label";
import { TextareaWithLabel } from "@/components/ui/inputs/textarea-with-label"; // Ensure you have this or standard textarea
import { Activity, Send, Terminal } from "lucide-react";
import { toast } from "sonner";
import { FoundrySelect } from "@/components/ui/inputs/foundry-select";

const signalSchema = z.object({
	name: z.string().min(2, "IDENT_REQUIRED"),
	email: z.string().email("INVALID_SIGNAL"),
	channel: z.string().min(1, "CHANNEL_REQUIRED"),
	message: z.string().min(10, "PAYLOAD_TOO_SHORT"),
});

type SignalData = z.infer<typeof signalSchema>;

export function SignalForm() {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = useForm<SignalData>({
		resolver: zodResolver(signalSchema),
		defaultValues: {
			name: "",
			email: "",
			channel: "SUPPORT",
			message: "",
		},
	});

	const onSubmit = async (data: SignalData) => {
		// Simulate Network Request
		await new Promise((resolve) => setTimeout(resolve, 2000));

		toast.success("TRANSMISSION_SENT", {
			description: `PACKET_ID: ${Math.random().toString(36).substring(2, 6).toUpperCase()} // AWAITING_ACK`,
			icon: <Terminal className="text-[#FFB400]" size={14} />,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
			<div className="space-y-2 border-l-2 border-[#FFB400] pl-6">
				<h3 className="text-xl font-black text-[#F5F5F0] uppercase tracking-tighter">Initialize_Transmission</h3>
				<p className="text-sm text-[#94A3B8] font-medium leading-relaxed max-w-md">Secure channel for hardware inquiries, partnership protocols, and technical support logs.</p>
			</div>

			<div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Controller
						name="name"
						control={control}
						render={({ field, fieldState }) => (
							<InputWithLabel field={field} fieldState={fieldState} nameInSchema="name" fieldTitle="Operative_ID (Name)" placeholder="IDENTIFY_YOURSELF..." />
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field, fieldState }) => (
							<InputWithLabel field={field} fieldState={fieldState} nameInSchema="email" fieldTitle="Return_Signal (Email)" placeholder="RELAY_ADDRESS..." />
						)}
					/>
				</div>

				<div className="space-y-2">
					{/* Using Standalone FoundrySelect for cleaner logic in non-complex forms, 
                        or use Controller + FoundrySelect if you want strict form tie-in */}
					<Controller
						name="channel"
						control={control}
						render={({ field }) => (
							<FoundrySelect
								label="Comms_Channel"
								value={field.value}
								onValueChange={field.onChange}
								placeholder="SELECT_FREQUENCY"
								options={[
									{ label: "Technical_Support", value: "SUPPORT" },
									{ label: "Order_Logistics", value: "ORDERS" },
									{ label: "Foundry_Partnership", value: "B2B" },
								]}
							/>
						)}
					/>
				</div>

				<Controller
					name="message"
					control={control}
					render={({ field, fieldState }) => (
						<div className="space-y-2">
							<TextareaWithLabel
								field={field}
								className="resize-none"
								fieldState={fieldState}
								nameInSchema="message"
								fieldTitle="Data_Payload (Message)"
								placeholder="ENCRYPTED_TEXT_STREAM..."
							/>
						</div>
					)}
				/>
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="group relative w-full md:w-auto px-12 py-5 bg-[#FFB400] text-[#0A0E14] font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,180,0,0.2)] hover:shadow-[0_0_50px_rgba(255,180,0,0.4)] transition-all disabled:opacity-50 disabled:grayscale overflow-hidden"
			>
				<span className="relative z-10 flex items-center justify-center gap-3">
					{isSubmitting ? "TRANSMITTING..." : "Broadcast_Signal"}
					{isSubmitting ? <Activity className="animate-spin" size={16} /> : <Send size={16} />}
				</span>
				{/* Kinetic Beam */}
				{!isSubmitting && (
					<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
						<div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-30 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
					</div>
				)}
			</button>
		</form>
	);
}
