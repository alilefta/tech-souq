"use client";

import { X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AnnouncementBanner() {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	return (
		<div className="relative bg-primary text-primary-foreground">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-center gap-3 py-3 text-sm font-medium">
					<Sparkles className="h-4 w-4" />
					<p className="text-center">
						<span className="font-bold">Black Friday Sale:</span> Up to 50% off on selected items!{" "}
						<Link href="/deals" className="underline underline-offset-4 hover:no-underline">
							Shop Now
						</Link>
					</p>
					<Button variant="ghost" size="icon" className="absolute right-4 h-6 w-6 hover:bg-primary-foreground/10" onClick={() => setIsVisible(false)}>
						<X className="h-4 w-4" />
						<span className="sr-only">Close banner</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
