import { map } from "nanostores";

//STATE TO STORE THE QUANTITY OF ITEMS BEFORE ADDING TO CART
interface ItemsQuantity {
  id: string;
  quantity: number;
}
export const ItemsQuantity = map<Record<string, ItemsQuantity>>({});

export function updateQuantity(id: string, quantity: number){
  const existingItem = ItemsQuantity.get()[id];
  
  if(existingItem){
    ItemsQuantity.setKey(id, { ...existingItem, quantity });
  } else {
    ItemsQuantity.setKey(id, { id, quantity });
  }
  console.log(ItemsQuantity.get());
};

export function getQuantity(id: string){
  const existingItem = ItemsQuantity.get()[id];
  console.log(existingItem);
  return existingItem ? existingItem.quantity : 1;
}
