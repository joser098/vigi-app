import { type Cart, type CartItem, type RegisterIForm } from "@/services/types";

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

  products.map((p) => {
    const totalAmount = p.quantity * p.unit_price;
    products_total += p.quantity;
    amount_to_pay += totalAmount;
  });

  return {
    products_total,
    amount_to_pay,
  };
};

export const formatStoreItems = (items: CartItem[]) => {
  if (!Array.isArray(items)) return {};

  let itemsObj: Cart = {};

  for (let i of items) {
    itemsObj[i.id] = i;
  }

  return itemsObj;
};

export const formatUserRegister = (data: RegisterIForm) => {
  const {
    name,
    last_name,
    cod,
    phone,
    province,
    location,
    address,
    address_number,
    department,
    zip_code,
    username,
    email,
    password,
    conditions,
  } = data;

  const dataFormated = {
    username,
    email,
    password,
    name,
    last_name,
    phone: `${cod}-${phone}`,
    address: {
      province,
      location,
      address_name: address,
      address_number,
      department,
      zip_code,
    },
    conditions_accepted: conditions,
    //DNI
  };

  return dataFormated;
};

export const getToken = (): string => {
  const token = window.localStorage.getItem("check");

  if(token != null){
    return token
  }

  return 'null'
};


export const addCartAsInvited = (item: any, price:number) => {
  const cart = window.localStorage.getItem("IC_LOCAL");
  
  const invitedCart = {
    _id: null,
    customer_id: null,
    items: [item],
    products_total: price,
    amount_to_pay: price,
  };
  
  if (cart == null) {
    window.localStorage.setItem("IC_LOCAL", JSON.stringify(invitedCart));
  } else {
    const cartObj = JSON.parse(cart);
    const itemFound = cartObj.items.findIndex((i:any) => i.id == item.id);
    console.log(itemFound)

    if(itemFound > -1){
      cartObj.items[itemFound].quantity = item.quantity;
    } else {
      cartObj.items.push(item);
    }

    const totals = calulateTotals(cartObj.items);

    const model = {
      ...cartObj,
      ...totals,
    }

    window.localStorage.setItem("IC_LOCAL", JSON.stringify(model));
  }
};