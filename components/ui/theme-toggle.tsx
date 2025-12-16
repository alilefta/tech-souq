"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"} size={"icon"} title={"Theme Toggle"}>
					<Sun className="size-5 scale-100 rotate-0 transition-all lg:size-5 dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute size-5 scale-0 rotate-90 transition-all lg:size-5 dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Theme Toggle</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="flex flex-col items-start rtl:items-end">
				<DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
