// components/ui/inputs/foundry-select.tsx
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldPath, FieldValues, Controller, Control } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface Option {
	label: string;
	value: string;
}

interface FoundrySelectProps<S extends FieldValues> {
	control: Control<S>;
	nameInSchema: FieldPath<S>;
	fieldTitle: string;
	options: Option[];
	placeholder?: string;
}

export function FoundrySelect<S extends FieldValues>({ control, nameInSchema, fieldTitle, options, placeholder }: FoundrySelectProps<S>) {
	return (
		<Field className="space-y-2">
			<FieldLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-0">{fieldTitle}</FieldLabel>

			<Controller
				control={control}
				name={nameInSchema}
				render={({ field, fieldState }) => (
					<Select onValueChange={field.onChange} value={field.value}>
						<SelectTrigger className="w-full h-12 bg-white/2 border-white/10 rounded-none font-mono text-[10px] uppercase tracking-widest text-[#F5F5F0] focus:ring-0 focus:border-[#FFB400]/40 transition-all">
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>

						{/* THIS IS THE PART THAT WAS WHITE - NOW TOTALLY CUSTOMIZED */}
						<SelectContent className="bg-[#0A0E14] border-white/10 rounded-none shadow-2xl z-50">
							{options.map((opt) => (
								<SelectItem
									key={opt.value}
									value={opt.value}
									className="font-mono text-[10px] uppercase tracking-widest py-3 focus:bg-[#FFB400] focus:text-[#0A0E14] cursor-pointer rounded-none"
								>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
						{fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
					</Select>
				)}
			/>
		</Field>
	);
}
