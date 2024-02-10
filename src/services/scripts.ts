import { type Cart, type CartItem } from "@/services/types";

export const formatItems = (items: Cart) => {
    const arr = Object.entries(items);
    let itemsArr = [];

    for (let i = 0; i < arr.length; i++) {
        itemsArr.push(arr[i][1]);
    }

    return itemsArr;
};

export const calulateTotals = (products: CartItem[]) => {
    let products_total = 0;
    let amount_to_pay = 0;
    
    products.map(p => {
        const totalAmount = p.quantity * p.unit_price;
        products_total += p.quantity;
        amount_to_pay += totalAmount
    });

    return {
        products_total,
        amount_to_pay
    }
};

export const formatStoreItems = (items: CartItem[]) => {
    let itemsObj: Cart = {};

    for(let i of items){
        itemsObj[i.id] = i;
    }

    return itemsObj;
};