import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sanitizeNumber(input: string | number | null | undefined): number | null {
	if (typeof input === "number") {
		return input;
	}

	if (typeof input === "string") {
		const numericValue = Number(input.trim());
		if (!isNaN(numericValue)) {
			return numericValue;
		}
	}

	return null;
}
