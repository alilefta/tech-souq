import { create } from "zustand";

export interface CartState {
	// open/close cart drawer
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;

	// addProductToCart: (productId: number) => void;
}

export const useCart = create<CartState>((set) => ({
	isOpen: false,
	setIsOpen: (val) => set((state) => ({ isOpen: val })),

	// addProductToCart: (productId) => set((state) => ({
	//     isOpen: true,
	// }))
}));
