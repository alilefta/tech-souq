"use client";

import Link from "next/link";
import { Drawer, DrawerFooter, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function NavigationMenu() {
	return (
		<Drawer defaultOpen={false} direction={"bottom"} autoFocus={true} repositionInputs={false}>
			<DrawerTrigger asChild>
				{/* To be replaced with word menu */}
				<Button variant={"ghost"}>
					<Menu className="size-4" absoluteStrokeWidth={false} />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="max-h-dvh min-h-dvh overflow-y-hidden">
				<DrawerHeader className="flex items-center">
					<DrawerTitle className="sr-only">Navigation</DrawerTitle>
					<DrawerDescription className="sr-only">NavigationMenu</DrawerDescription>
					<DrawerClose asChild className="mx-0 mr-auto">
						<Button variant={"ghost"} size={"icon"}>
							<X className="text-foreground/80 size-6" />
						</Button>
					</DrawerClose>
				</DrawerHeader>
				<div className="font-inter rtl:font-alexandria flex w-full flex-col items-center space-y-6 px-5 py-5">
					<div className="w-full flex-col items-center space-y-1">
						<h5 className="text-foreground/80 w-full text-lg font-light tracking-tight rtl:text-xs">Quick Links</h5>
						<div className="flex w-full flex-col gap-y-5 pt-2 *:font-normal">
							<Link href={"/"} className="text-2xl rtl:text-base">
								Home
							</Link>
							<Link href={"/store"} className="text-2xl rtl:text-base">
								Store
							</Link>
							{/* <Link href={"/categories"} className="text-2xl rtl:text-base">
								Categories
							</Link> */}
						</div>
					</div>

					<div className="mt-8 flex w-full flex-col space-y-1">
						<h5 className="text-foreground/80 w-full text-lg font-light tracking-tight rtl:text-xs">Settings</h5>

						<div className="flex items-center gap-x-2 py-2">
							<ThemeToggle />
						</div>
					</div>
				</div>
				<DrawerFooter>
					<p className="font-alexandria text-[10px] tracking-tight">
						<span className="font-light">Tech</span> <span className="font-black tracking-wider">Souq</span>
					</p>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
