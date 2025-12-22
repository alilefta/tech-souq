import { getCart } from "@/app/data/cart";
import { CartDrawer } from "@/components/cart/cart-drawer";

export async function CartWrapper() {
	const cart = await getCart();

	return <CartDrawer cart={cart} />;
}
