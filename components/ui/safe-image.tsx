// components/ui/safe-image.tsx
"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { TechPlaceholder } from "./tech-placeholder";

interface SafeImageProps extends Omit<ImageProps, "src" | "onError"> {
	src: string | null | undefined; // Allow database nulls
	fallbackName?: string;
}

export function SafeImage({ src, alt, fallbackName, fill, sizes, preload, ...props }: SafeImageProps) {
	const [error, setError] = useState(false);
	const [prevSrc, setPrevSrc] = useState(src);

	// 1. RENDER-PHASE RESET
	if (src !== prevSrc) {
		setPrevSrc(src);
		setError(false);
	}

	// 2. THE "ABS-ZERO" GUARD
	if (!src || src === "" || error) {
		return <TechPlaceholder name={fallbackName || (alt as string) || "Hardware_Module"} />;
	}

	// 3. SMART SIZES DEFAULT
	// If 'fill' is used but no 'sizes' provided, default to:
	// "Full width on mobile, 50% width on tablet, 33% on desktop"
	// This covers 90% of use cases (Cards, Gallery, Lists)
	const computedSizes = sizes || (fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined);

	return (
		<Image
			{...props}
			src={src}
			alt={alt}
			fill={fill}
			sizes={computedSizes}
			preload={preload} // Pass priority through explicitly
			onError={() => setError(true)}
		/>
	);
}
