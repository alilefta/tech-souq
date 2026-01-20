"use client";

import { useMemo } from "react";
import { BUILD_STEPS, useBuilderStore } from "@/store/useBuilderStore";
import { ProductBuilderDTO } from "@/app/data/products";
import { StorageSchema } from "@/lib/schemas/product";
import { z } from "zod";
import { resolveCompatibility } from "@/lib/builder/resolver"; // Import Resolver

export function useBuilderLogic(allProducts: ProductBuilderDTO[]) {
	const { currentStep, manifest } = useBuilderStore();
	const activeType = BUILD_STEPS[currentStep];

	const availableModules = useMemo(() => {
		// 1. Base Filter
		let pool = allProducts.filter((p) => {
			const type = p.compatibility?.type;
			if (activeType === "STORAGE1" || activeType === "STORAGE2") return type === "STORAGE";
			return type === activeType;
		});

		// 2. Storage Bifurcation Logic
		if (activeType === "STORAGE1" || activeType === "STORAGE2") {
			pool = pool.sort((a, b) => {
				const logicA = a.compatibility as z.infer<typeof StorageSchema>;
				const logicB = b.compatibility as z.infer<typeof StorageSchema>;
				const score = (type: string) => (type === "NVME" ? 2 : type === "SSD" ? 1 : 0);

				if (activeType === "STORAGE1") return score(logicB.storageType) - score(logicA.storageType);
				else return score(logicA.storageType) - score(logicB.storageType);
			});
		}
		return pool;
	}, [allProducts, activeType]);

	// 3. TELEMETRY MATH
	const totalPrice = Object.values(manifest).reduce((acc, item) => acc + (Number(item?.price) || 0), 0);
	const alerts = resolveCompatibility(manifest); // Centralized Alerts

	return { activeType, availableModules, totalPrice, alerts };
}
