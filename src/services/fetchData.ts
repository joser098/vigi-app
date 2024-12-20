const BASE_URL = import.meta.env.PUBLIC_API_URL;
import type { CartModel, IFormForgotPass, IFormNewPass } from "@/services/types";
import { getToken } from "./scripts";

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

export const saveCartData = async (cart: CartModel, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/add`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
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

export const getCartData = async (token_: string = "null") => {
  try {
    let token;

    if (token_ != null && token_ != "null") {
      token = token_;
    } else {
      token = getToken();
    }

    const response = await fetch(`${BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteItem = async (id: string, product_id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id }),
    });

    const res = await response.json();

    return res;
  } catch (error) {
    return error;
  }
};

export const createPaymentOrder = async (cart: CartModel, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/payment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cart),
    });

    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
};

export const getPayment = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/payment/${id}`);

    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export const login = async (data: any) => {
  try {
    const response = await fetch(`${BASE_URL}/api/customer/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    return res;
  } catch (error) {
    return error;
  }
};

export const registerCustomer = async (data: any) => {
  try {
    const response = await fetch(`${BASE_URL}/api/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    return res;
  } catch (error) {
    return error;
  }
};

export const updateCustomerData = async (data: any, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/customer`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    return res;
  } catch (error) {
    return error;
  }
};

export const getShippingCost = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/logistic/cost`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getCustomerData = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/customer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export const uploadFile = async (token: string, file: any) => {
  try {
    const response = await fetch(`${BASE_URL}/api/customer/image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: file,
    });

    const res = await response.json();

    return res;
  } catch (error) {
    return error;
  }
};

export const getProvincesForDropdown = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/search/provinces`);

    const res = await response.json();

    return res.data[0].provinces;
  } catch (error) {
    return error;
  }
};

export const updateFavorite = async (token: string, product_id: string, action: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/customer/favorite`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id, action }),
    });

    const res = await response.json();

    return res;
  } catch (error) {
    return error;
  }
}

export const getFavorites = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/customer/favorite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getCustomerOrders = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/order/customer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
}

export const forgotPassword = async (data: IFormForgotPass) => {
  try {
    const response = await fetch(`${BASE_URL}/api/customer/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const res = await response.json();

    return res;
  } catch (error) {
    return error;
  }
};
export const newPassword = async (hash: string, data: IFormNewPass) => {
  try {
    const response = await fetch(`${BASE_URL}/api/customer/new-password/${hash}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const res = await response.json();

    return res;
  } catch (error) {
    return error;
  }
};

export const validateHash = async (hash: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/search/validate-hash/${hash}`);

    const res = await response.json();

    return res;
  } catch (error) {
    return error;
  }
};

export const searchSuggest = async (keyword: string, limit: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/search/suggest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword, limit })
    })
    
    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export const searchProducts = async (keyword: string, limit: number | null = null) => {
  try {
    const response = await fetch(`${BASE_URL}/api/search/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword, limit })
    })
    
    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export const emptyCart = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/empty`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    const res = await response.json();

    return res;
  } catch (error) {
    return error;
  }
}

export const getCarruselImages = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/search/carrusel`);

    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getProductsByCategory = async (category: string, order: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/search/getProducts?category=${category}&order=${order}`);

    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};