import { createPaymentOrder } from "@/services/fetchData";
import { getToken } from "@/services/scripts";
import type { CartModel } from "@/services/types";
import { useEffect, useState } from "react";

const PayCartButton = ({ cart }: {cart: CartModel}) => {
   const [isEnable, setIsEnable] = useState(true);

  const onPayCartClick = async () => {
    if(cart.items.length > 0){
      const cartModel = {
        items: cart.items,
        products_total:cart.products_total,
        amount_to_pay: cart.products_total,
      }
  
      const token = getToken()
      const res = await createPaymentOrder(cartModel, token);
      if(res.success){
        window.location.href = res.data.init_point;
      }
    }
  };

  useEffect(() => {
    if(cart.items.length > 0){
      setIsEnable(false)
    }
  }, [])

  return (
    <button onClick={onPayCartClick} disabled={isEnable} className="w-full bg-primary border-2 border-primary text-white p-3 rounded-md hover:opacity-70 transition-opacity my-3">
      Pagar
    </button>
  );
};

export default PayCartButton;
