import { atom, map } from "nanostores";
import { type CartItem, type ItemsQuantity } from "@/services/types";
import { formatItems, calulateTotals, formatStoreItems, getToken } from "@/services/scripts";
import { getCartData, saveCartData } from "@/services/fetchData";

const initialItems = await getCartData();
let initialItemsFormated;
if(initialItems?.items){
  initialItemsFormated = formatStoreItems(initialItems.items);
}

//SET TOKEN FROM LOCALSTORAGE
export const check = atom("null");
export const customer_id = atom("");
export const totalItems = atom(initialItems.products_total);

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
export const Cart = map<Record<string, CartItem>>(initialItemsFormated);

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
    items: itemsFormated,
    ...totals,
  };

  const token = getToken();
  const res = saveCartData(cartModel, token);
  totalItems.set(cartModel.products_total);
  return res;
}

export const removeItemCart = (product_id: string) => {
  const itemsFormated = formatItems(Cart.get());
  const filteredItems = itemsFormated.filter((item) => item.id !== product_id);
  const totals = calulateTotals(filteredItems);

  const cartModel = {
    items: filteredItems,
    ...totals,
  };

  const token = getToken();
  const res = saveCartData(cartModel, token);
  return res;
};