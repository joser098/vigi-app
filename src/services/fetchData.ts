const BASE_URL = import.meta.env.PUBLIC_API_URL;
import { type CartModel} from "@/services/types";

export const fetchData = async (query: string) => {
  try {
    const queryFormated = query.replace("+", "%2B");
    const response = await fetch(`${BASE_URL}/api/search/${queryFormated}`);
    
    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export const saveCartData = async (cart: CartModel) => {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/add`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    const res = await response.json();

    return res;
  } catch (error) {
    return error;
  }
};

