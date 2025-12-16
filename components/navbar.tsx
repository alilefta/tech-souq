"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import { Search, ShoppingBagIcon } from "lucide-react";
import { NavigationMenu } from "@/components/navigation-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function Navbar() {
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const scrollListener = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", scrollListener);
		return () => window.removeEventListener("scroll", scrollListener);
	}, []);

	const navLinks = [
		{ href: "/store?filters=components", label: "Components" },
		{ href: "/store?filters=laptops", label: "Laptops" },
		{ href: "/store?filter=peripherals", label: "Peripherals" },
		{ href: "/store?filter=deals", label: "Deals" },
		{ href: "/build-pc", label: "Build PC" },
	];

	return (
		<nav
			className={clsx("sticky inset-x-0 top-0 z-50 transition-all duration-300", {
				"border-b border-zinc-200/50 bg-white/70 py-3 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/70": isScrolled,
				"border-b border-transparent bg-transparent py-5": !isScrolled,
			})}
		>
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
				{/* LEFT: Logo / Identity */}
				<Link href="/" className="group flex items-center gap-2">
					<div className="flex flex-col">
						<h5 className="text-base leading-none font-bold tracking-tight text-zinc-900 dark:text-zinc-100">TechSouq</h5>
					</div>
				</Link>

				{/* CENTER: Search */}
				<div className="hidden md:flex  items-center gap-5">
					<div className="relative group font-sans w-64">
						<Search className="absolute inset-0 left-2 bottom-0 z-10 top-0 my-auto group-focus-within:text-foreground/70 text-foreground/40" size={16} />
						<Input placeholder="Search" className="pl-8 " />
					</div>
				</div>
				{/* RIGHT: Status & Mobile Menu */}
				<div className="flex items-center gap-2">
					<div className="hidden md:flex">
						<ThemeToggle />
					</div>
					<div>
						<Button variant={"ghost"}>
							<ShoppingBagIcon size={18} />
						</Button>
					</div>
					{/* Mobile Menu Trigger */}
					<div className=" md:hidden flex">
						<NavigationMenu />
					</div>
				</div>
			</div>

			{/* Links - Second Row that disappears on scroll */}
			<div
				className={clsx("mx-auto  max-w-7xl items-center justify-center px-6 lg:px-8  mt-5 ", {
					"hidden -translate-y-60": isScrolled,
					"hidden md:flex": !isScrolled,
				})}
			>
				<div className="flex items-center gap-4 rounded-full border border-zinc-200 dark:border-zinc-800 p-1 backdrop-blur-sm bg-zinc-50/50 dark:bg-zinc-900/50">
					{navLinks.map((link) => {
						const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

						return (
							<Link
								key={link.href}
								href={link.href}
								className={clsx("rounded-full px-4 py-1.5 font-medium transition-all duration-200 ltr:text-sm rtl:text-xs", {
									"bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900": isActive,
									"text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100": !isActive,
								})}
							>
								{link.label}
							</Link>
						);
					})}
				</div>
			</div>
		</nav>
	);
}
