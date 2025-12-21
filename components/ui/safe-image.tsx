"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { TechPlaceholder } from "./tech-placeholder";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
	fallbackName?: string;
}

export function SafeImage({ src, alt, fallbackName, ...props }: SafeImageProps) {
	const [error, setError] = useState(false);

	// 1. SYSTEM SYNC: Track the previous source to detect changes
	const [prevSrc, setPrevSrc] = useState(src);

	// 2. RENDER-PHASE RESET:
	// If the source has changed since the last render,
	// reset the error state immediately before the browser paints.
	if (src !== prevSrc) {
		setPrevSrc(src);
		setError(false);
	}

	// 3. FALLBACK CHECK
	if (!src || error) {
		return <TechPlaceholder name={fallbackName || (alt as string) || "Hardware"} />;
	}

	return (
		<Image
			{...props}
			src={src}
			alt={alt}
			// If the image fails to load, trigger the diagnostic fallback
			onError={() => setError(true)}
		/>
	);
}
