"use client";

import { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

type Props<S extends FieldValues> = {
	fieldTitle: string;
	nameInSchema: FieldPath<S>;
	containerClassName?: string;
	inputClassName?: string;
	fieldState: ControllerFieldState;
	field: ControllerRenderProps<S>;
	placeholder?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;

export function TextareaWithLabel<S extends FieldValues>({ fieldTitle, nameInSchema, fieldState, field, placeholder }: Props<S>) {
	return (
		<Field data-invalid={fieldState.invalid} className="space-y-2">
			<FieldLabel htmlFor={nameInSchema} className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">
				{fieldTitle}
			</FieldLabel>
			<textarea
				{...field}
				id={nameInSchema}
				placeholder={placeholder}
				className={cn(
					"w-full min-h-[150px] bg-white/[0.02] border border-white/10 p-4 font-mono text-xs text-[#F5F5F0] outline-none transition-all focus:border-[#FFB400]/40 placeholder:text-white/10 resize-none",
					fieldState.invalid && "border-red-500/50"
				)}
			/>
			{fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs" />}
		</Field>
	);
}
