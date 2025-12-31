"use client";

import { addToCartAction } from "@/app/actions/cart";
import { ProductCardDTO, ProductDetailsDTO } from "@/app/data/products";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { QuantitySelector } from "@/components/products/quantity-selector";
import { useCart } from "@/store/useCart";
import { Activity, ShieldCheck, Terminal, RotateCcw } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

export function AddToCartWithQTY({ productDetails }: { productDetails: ProductDetailsDTO }) {
	// 1. DATA HUB CONNECTIONS
	const items = useCart((state) => state.items);
	const addItemOptimistically = useCart((state) => state.addItem);
	const removeItemOptimistically = useCart((state) => state.removeItem);

	// 2. FIND EXISTING ALLOCATION
	// We check if this specific module is already in the manifest
	const existingItem = items.find((item) => item.productId === productDetails.id);
	const cartQuantity = existingItem?.quantity || 1;

	// 3. RENDER-PHASE STATE SYNC
	// This ensures that if the store updates (or on refresh),
	// the local selector matches the manifest immediately.
	const [quantity, setQuantity] = useState(cartQuantity);
	const [prevCartQty, setPrevCartQty] = useState(cartQuantity);

	if (cartQuantity !== prevCartQty) {
		setQuantity(cartQuantity);
		setPrevCartQty(cartQuantity);
	}

	const isAlreadyInCart = !!existingItem;

	// 4. SERVER ACTION
	const { executeAsync: executeAddToCart, isPending } = useAction(addToCartAction, {
		onError({ error }) {
			toast.error("SIGNAL_INTERRUPT: SYNC_FAILED", {
				description: `NODE: BBL_ALPHA // DATA_STREAM_TIMEOUT`,
				icon: <Activity className="text-red-500" size={16} />,
			});
			removeItemOptimistically(productDetails.id);
		},
		onSuccess() {
			toast.success(isAlreadyInCart ? "MANIFEST_UPDATED" : "PROTOCOL: DEPLOYMENT_SUCCESS", {
				description: `MODULE: ${productDetails.name.toUpperCase()} // ${quantity} UNITS SECURED`,
				icon: <ShieldCheck className="text-[#FFB400]" size={16} />,
			});
		},
	});

	const handleIncrement = () => {
		const maxStock = productDetails.stock ?? 99;
		if (quantity < maxStock) setQuantity((p) => p + 1);
		else {
			toast.error("STOCK_THRESHOLD_REACHED", {
				description: `MAX_ALLOCATION_REACHED [${maxStock} UNITS]`,
				icon: <Terminal className="text-[#FFB400]" size={14} />,
			});
		}
	};

	const handleDecrement = () => {
		if (quantity > 1) setQuantity((p) => p - 1);
	};

	const handleAddToCart = async () => {
		// Prepare the DTO for the store
		const product: ProductCardDTO = {
			id: productDetails.id,
			category: productDetails.category,
			coverImage: productDetails.coverImage,
			images: productDetails.images,
			name: productDetails.name,
			price: productDetails.price,
			rating: productDetails.averageRating,
			slug: productDetails.slug,
			specs: productDetails.specs,
			brand: productDetails.brand,
			originalPrice: productDetails.originalPrice ?? productDetails.price,
			reviews: productDetails.reviewCount,
		};

		// UPDATE MANIFEST:
		// Note: Your Zustand 'addItem' logic should handle "Set" rather than "Add"
		// if you want absolute sync, or you can use an 'updateItem' function.
		addItemOptimistically(product, quantity, true);

		await executeAddToCart({ productId: product.id, quantity: quantity });
	};

	return (
		<div className="space-y-4 mb-12">
			{/* HUD Status Label */}
			{isAlreadyInCart && (
				<div className="flex items-center gap-2 opacity-50 px-1">
					<RotateCcw size={10} className="text-[#FFB400]" />
					<span className="text-[8px] font-mono uppercase tracking-widest text-[#94A3B8]">Active_Allocation_Detected: {cartQuantity.toString().padStart(2, "0")} units</span>
				</div>
			)}

			<div className="flex flex-col sm:flex-row gap-4">
				<QuantitySelector qty={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} isLoading={isPending} />
				<AddToCartButton
					onAddToCart={handleAddToCart}
					isLoading={isPending}
					// NEW: Contextual label
					label={isAlreadyInCart ? "Update Manifest" : "Initialize Order"}
				/>
			</div>
		</div>
	);
}
