import { Cart, CartItem, Category, Product } from "@/generated/prisma/client";
import { prisma } from "@/prisma/prisma";
import { cookies } from "next/headers";

// export interface CartWithProductsDTO  {

// }

type CartItemWithProduct = CartItem & {
	product: {
		name: string;
		id: number;
		brand: string;
		price: number;
		originalPrice: number | null;
		images: string[];
		slug: string;
		stock: number;
	} & {
		category: Category;
	};
};

export type CartWithItemsDTO = Cart & {
	items: CartItemWithProduct[];
};
export type CartItemDTO = CartItem;

export async function getCart(): Promise<CartWithItemsDTO | null> {
	const cookieStore = await cookies();
	const cartId = cookieStore.get("base60_cart_id")?.value;

	if (!cartId) return null;

	const cart = await prisma.cart.findUnique({
		where: {
			id: cartId,
		},
		include: {
			items: {
				include: {
					product: {
						include: {
							category: true,
						},
					},
				},
				orderBy: {
					productId: "asc",
				},
			},
		},
	});

	if (!cart) return null;

	return cartToDTOMapper(cart);
}

export function cartToDTOMapper(
	c: Cart & {
		items: (CartItem & {
			product: Product & {
				category: Category;
			};
		})[];
	}
): CartWithItemsDTO {
	return {
		id: c.id,
		email: c.id,
		address: c.address,
		userId: c.userId,
		createdAt: c.createdAt,
		discountId: c.discountId,
		first_name: c.first_name,
		last_name: c.last_name,
		items: c.items.map((item) => ({
			cartId: item.cartId,
			id: item.id,
			productId: item.productId,
			quantity: item.quantity,
			product: {
				brand: item.product.brand,
				category: item.product.category,
				id: item.product.id,
				images: item.product.images,
				name: item.product.name,
				originalPrice: item.product.originalPrice ? Number(item.product.originalPrice) : 0,
				price: Number(item.product.price),
				stock: item.product.stock,
				slug: item.product.slug,
			},
		})),
	};
}
