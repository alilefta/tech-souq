import { CartWithItemsDTO } from "@/app/data/cart";
import { ProductCardDTO } from "@/app/data/products";
import { create } from "zustand";

type CartItem = CartWithItemsDTO["items"][0];
export interface CartState {
	isOpen: boolean;
	items: CartItem[]; // The main state array

	setIsOpen: (val: boolean) => void;

	// 1. SYNC: The Server tells us the "Real Truth"
	syncCart: (items: CartItem[]) => void; //down stream sync, server -> client only!

	// 2. OPTIMISTIC ADD: We predict the future
	addItem: (product: ProductCardDTO, quantity?: number, isReplace?: boolean) => void;
	// 3. OPTIMISTIC REMOVE/UPDATE (For +/- buttons)
	updateQuantity: (productId: number, quantity: number) => void;
	removeItem: (productId: number) => void;
}

export const useCart = create<CartState>((set) => ({
	isOpen: false,
	items: [],
	setIsOpen: (val) => set({ isOpen: val }),
	addItem: (product, quantity = 1, isReplace = false) =>
		set((state) => {
			const existingItem = state.items.find((i) => i.productId === product.id);

			if (existingItem) {
				return {
					items: state.items.map((i) =>
						i.productId === product.id
							? {
									...i,
									quantity: isReplace ? quantity : i.quantity + quantity,
								}
							: i,
					),
					isOpen: true,
				};
			}

			// Optimistic ID using timestamp to avoid collisions
			// We use negative numbers for optimistic items so we can identify them later if needed
			// Date.now() ensures time-sort, Random ensures loop-safety

			const optimisticId = -1 * (Date.now() + Math.floor(Math.random() * 9999));

			const newItem: CartItem = {
				id: optimisticId,
				cartId: "optimistic_session",
				productId: product.id,
				quantity: quantity,
				product: {
					...product, // Spreading the DTO keeps it clean
					brand: "BASE_60", // Hardcoded or from DTO
					stock: 100,
					category: {
						...product.category,
						arabicName: null,
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
					: i,
			),
		}));
	},
}));
