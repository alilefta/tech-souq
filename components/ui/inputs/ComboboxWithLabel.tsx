"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Database, Search } from "lucide-react";
import { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../field";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

export function ComboboxWithLabel<S extends FieldValues>({ fieldTitle, nameInSchema, containerClassName, triggerClassName, field, fieldState, placeholder, data }: Props<S>) {
	const [open, setOpen] = React.useState(false);

	return (
		<Field orientation="vertical" data-invalid={fieldState.invalid} className={cx("space-y-2", containerClassName)}>
			<FieldLabel htmlFor={nameInSchema} className="text-[9px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-0">
				{fieldTitle}
			</FieldLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						role="combobox"
						type="button"
						aria-expanded={open}
						className={cn(
							"flex items-center justify-between px-4",
							"w-full h-12 rounded-none bg-white/2 border border-white/10 font-mono text-xs transition-all outline-none",
							"hover:border-white/20 text-left",
							// Dynamic focus/open state
							open ? "border-[#FFB400]/40 bg-[#FFB400]/5" : "border-white/10",
							!field.value ? "text-[#94A3B8]/40" : "text-[#F5F5F0]",
							triggerClassName
						)}
					>
						<span className="truncate uppercase tracking-tight">{field.value ? data.find((item) => item.value === field.value)?.label : placeholder}</span>
						<ChevronsUpDown className={cn("ml-2 shrink-0 transition-opacity", open ? "text-[#FFB400]" : "opacity-20")} size={14} />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-[#0A0E14] border-white/10 rounded-none shadow-2xl z-50" align="start">
					<Command className="bg-transparent font-mono">
						{/* Technical Search Bar */}
						<div className="flex items-center border-b border-white/5 px-3">
							<Search className="mr-2 h-3 w-3 shrink-0 text-[#FFB400] opacity-50" />
							<CommandInput placeholder="SEARCH_SECTOR_DATA..." className="h-10 text-[10px] uppercase tracking-widest placeholder:text-white/10" />
						</div>

						<CommandList className="custom-scrollbar">
							<CommandEmpty className="py-6 text-center text-[10px] font-mono text-[#94A3B8] uppercase opacity-40">No_Matching_Coordinates</CommandEmpty>

							<CommandGroup>
								{data.map((item, i) => (
									<CommandItem
										key={`${i}_${item.value}`}
										value={item.label} // Command component filters by value/label
										onSelect={() => {
											field.onChange(item.value); // Sync with React Hook Form
											setOpen(false);
										}}
										className="font-mono text-[10px] uppercase tracking-widest py-3 px-4 aria-selected:bg-[#FFB400] aria-selected:text-[#0A0E14] cursor-pointer rounded-none flex items-center justify-between"
									>
										{item.label}
										<Check className={cn("ml-auto h-3 w-3", field.value === item.value ? "opacity-100" : "opacity-0")} />
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>

						{/* Terminal Footer Info */}
						<div className="p-2 border-t border-white/5 bg-white/1 flex justify-between items-center">
							<span className="text-[7px] text-[#94A3B8] opacity-30 uppercase tracking-widest">Sector_Registry_v6.0</span>
							<Database size={10} className="text-[#94A3B8] opacity-20" />
						</div>
					</Command>
				</PopoverContent>
			</Popover>

			{fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs" />}
		</Field>
	);
}
