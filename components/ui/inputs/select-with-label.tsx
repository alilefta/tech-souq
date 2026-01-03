"use client";

import { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { cx } from "class-variance-authority";

type DataObj = {
	label: string;
	value: string;
};

// Generic S for Schema
type Props<S extends FieldValues> = {
	fieldTitle: string;
	nameInSchema: FieldPath<S>;
	placeholder?: string;
	data: DataObj[];
	fieldState: ControllerFieldState;
	field: ControllerRenderProps<S>;
	triggerClassName?: string;
	containerClassName?: string;
};

export function SelectWithLabel<S extends FieldValues>({ fieldTitle, nameInSchema, containerClassName, triggerClassName, field, fieldState, placeholder, data }: Props<S>) {
	return (
		<Field orientation="vertical" data-invalid={fieldState.invalid} className={cx("space-y-2", containerClassName)}>
			<FieldLabel htmlFor={nameInSchema} className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-0">
				{fieldTitle}
			</FieldLabel>
			<Select name={nameInSchema} value={field.value} onValueChange={field.onChange}>
				<SelectTrigger
					id={nameInSchema}
					aria-invalid={fieldState.invalid}
					className={cx(
						// FIX 1: Use w-full to match Input
						// FIX 2: Use !h-12 to override Shadcn default data-attribute heights
						"w-full h-12! rounded-none bg-white/2 border-white/10 font-mono text-gray-500 text-xs outline-0 focus-visible:ring-0 focus:border-[#FFB400]/40! transition-all placeholder:text-gray-600!",
						triggerClassName
					)}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent position="item-aligned">
					{data.map((item, i) => (
						<SelectItem key={`${i}_${item.value}`} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs" />}
		</Field>
	);
}
