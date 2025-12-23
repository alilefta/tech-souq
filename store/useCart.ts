import { CartWithItemsDTO } from "@/app/data/cart";
import { ProductCardDTO } from "@/app/data/products";
import { create } from "zustand";

type CartItem = CartWithItemsDTO["items"][0];
export interface CartState {
	isOpen: boolean;
	items: CartItem[]; // The main state array

	// Actions
	setIsOpen: (val: boolean) => void;

	// 1. SYNC: The Server tells us the "Real Truth"
	syncCart: (items: CartItem[]) => void; //down stream sync, server -> client only!

	// 2. OPTIMISTIC ADD: We predict the future
	addItem: (product: ProductCardDTO) => void;

	// 3. OPTIMISTIC REMOVE/UPDATE (For +/- buttons)
	updateQuantity: (productId: number, quantity: number) => void;
	removeItem: (productId: number) => void;
}

export const useCart = create<CartState>((set) => ({
	isOpen: false,
	items: [],
	setIsOpen: (val) => set({ isOpen: val }),
	addItem: (product) =>
		set((state) => {
			const existingItem = state.items.find((i) => i.productId === product.id);

			if (existingItem) {
				return {
					items: state.items.map((i) => (i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i)),
					isOpen: true,
				};
			}

			// C. If new, create a "Mock" CartItem
			// We fill missing fields (like category ID) with dummy data
			// The Server Sync will replace this with real data milliseconds later.
			const newItem: CartItem = {
				id: Math.random(),
				cartId: "optimistic",
				productId: product.id,
				quantity: 1,
				product: {
					id: product.id,
					brand: "base 60",
					images: product.images,
					name: product.name,
					price: product.price,
					slug: product.slug,
					stock: 100,
					originalPrice: product.originalPrice ?? null,
					category: {
						id: product.category.id,
						arabicName: null,
						name: product.category.name,
						slug: product.category.slug,
						gridDisplay: "small",
						createdAt: new Date(),
						updatedAt: new Date(),
						description: null,
						imageUrl: null,
					},
				},
			};

			return {
				items: [...state.items, newItem],
				isOpen: true,
			};
		}),
	removeItem: (productId) => {
		set((state) => ({
			items: state.items.filter((i) => i.productId !== productId),
		}));
	},
	syncCart: (serverItems) => set({ items: serverItems }),
	updateQuantity: (productId, quantity) => {
		set((state) => ({
			items: state.items.map((i) =>
				i.productId === productId
					? {
							...i,
							quantity,
					  }
					: i
			),
		}));
	},
}));
