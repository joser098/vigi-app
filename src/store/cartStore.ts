import { map } from "nanostores";
import { type CartItem, type ItemsQuantity } from "@/services/types";
import { formatItems, calulateTotals } from "@/services/scripts";
import { saveCartData } from "@/services/fetchData";

//STATE TO STORE THE QUANTITY OF ITEMS BEFORE ADDING TO CART

export const ItemsQuantityStore = map<Record<string, ItemsQuantity>>({});

export function updateQuantity(id: string, quantity: number) {
  const existingItem = ItemsQuantityStore.get()[id];

  if (existingItem) {
    ItemsQuantityStore.setKey(id, { ...existingItem, quantity });
  } else {
    ItemsQuantityStore.setKey(id, { id, quantity });
  }
}

export function getQuantity(id: string) {
  const existingItem = ItemsQuantityStore.get()[id];
  return existingItem ? existingItem.quantity : 1;
}

// STATE TO STORE THE ITEMS IN THE CART
export const Cart = map<Record<string, CartItem>>({});

export function addToCart(item: CartItem) {
  const existingItem = Cart.get()[item.id];

  if (existingItem) {
    Cart.setKey(item.id, { ...existingItem, quantity: item.quantity });
  } else {
    Cart.setKey(item.id, item);
  }

  const itemsFormated = formatItems(Cart.get());
  const totals = calulateTotals(itemsFormated);

  const cartModel = {
    cart_id: "65c6dd175597d7d8dfea0375", // Hardcoded cart id
    products: itemsFormated,
    ...totals,
  };

  const res = saveCartData(cartModel);
  return res;
}
