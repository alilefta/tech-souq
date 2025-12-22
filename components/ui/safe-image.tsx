"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { TechPlaceholder } from "./tech-placeholder";

interface SafeImageProps extends Omit<ImageProps, "src" | "onError"> {
	src: string | null | undefined; // Allow database nulls
	fallbackName?: string;
}

export function SafeImage({ src, alt, fallbackName, ...props }: SafeImageProps) {
	const [error, setError] = useState(false);
	const [prevSrc, setPrevSrc] = useState(src);

	if (src !== prevSrc) {
		setPrevSrc(src);
		setError(false);
	}

	// 3. THE "ABS-ZERO" GUARD:
	// If src is null, undefined, an empty string, or has triggered an error
	// we bail out immediately and return the technical diagnostic placeholder.
	if (!src || src === "" || error) {
		return <TechPlaceholder name={fallbackName || (alt as string) || "Hardware_Module"} />;
	}

	return <Image {...props} src={src} alt={alt} onError={() => setError(true)} />;
}
