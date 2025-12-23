"use client";

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: "group toast group-[.toaster]:bg-[#0A0E14] group-[.toaster]:text-[#F5F5F0] group-[.toaster]:border-white/10 group-[.toaster]:rounded-none group-[.toaster]:shadow-2xl group-[.toaster]:font-sans",
					description: "group-[.toast]:text-[#94A3B8] group-[.toast]:font-mono group-[.toast]:text-[10px] uppercase tracking-widest",
					actionButton: "group-[.toast]:bg-[#FFB400] group-[.toast]:text-[#0A0E14] group-[.toast]:font-black group-[.toast]:uppercase group-[.toast]:text-[10px] group-[.toast]:rounded-none",
					cancelButton: "group-[.toast]:bg-white/5 group-[.toast]:text-[#94A3B8] group-[.toast]:rounded-none",
					// SPECIFIC VARIANTS
					success: "group-[.toaster]:border-[#FFB400]/40 group-[.toaster]:bg-[#0A0E14]",
					error: "group-[.toaster]:border-red-500/40 group-[.toaster]:bg-[#0A0E14]",
				},
			}}
			icons={{
				success: <CircleCheckIcon className="size-4" />,
				info: <InfoIcon className="size-4" />,
				warning: <TriangleAlertIcon className="size-4" />,
				error: <OctagonXIcon className="size-4" />,
				loading: <Loader2Icon className="size-4 animate-spin" />,
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "var(--radius)",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
