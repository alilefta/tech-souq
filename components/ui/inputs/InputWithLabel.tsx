"use client";

import { ControllerFieldState, ControllerRenderProps, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cx } from "class-variance-authority";
import { cn } from "@/lib/utils";
// Generic S for Schema
type Props<S extends FieldValues> = {
	fieldTitle: string;
	nameInSchema: keyof S & string;
	containerClassName?: string;
	inputClassName?: string;
	fieldState: ControllerFieldState;
	field: ControllerRenderProps<S>;
	placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabel<S extends FieldValues>({ fieldTitle, nameInSchema, inputClassName, containerClassName, fieldState, field, placeholder, ...props }: Props<S>) {
	const { type } = props;
	return (
		<Field data-invalid={fieldState.invalid} className={cx("space-y-2", containerClassName)}>
			<FieldLabel htmlFor={nameInSchema} className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-0">
				{fieldTitle}
			</FieldLabel>
			<Input
				type={type || "text"}
				{...field}
				{...props}
				id={nameInSchema}
				aria-invalid={fieldState.invalid}
				placeholder={placeholder}
				inputMode={type === "number" ? "numeric" : undefined}
				className={cn(
					"rounded-none bg-white/2 border-white/10 h-12 font-mono text-xs! outline-0 focus-visible:border-[#FFB400]/40! focus-visible:ring-0 mb-0 placeholder:text-gray-500",
					type === "number" && "no-spinner",
					inputClassName
				)}
			/>
			{fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs" />}
		</Field>
	);
}
