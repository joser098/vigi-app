import { navigate } from "astro:transitions/client";
import { createPaymentOrder } from "@/services/fetchData";
import { getToken } from "@/services/scripts";
import type { CartModel } from "@/services/types";
import { useEffect, useState } from "react";

interface Shipments {
  local_pickup: boolean,
  cost: number,
  free_shipping: boolean,
  receiver_address: {
    street_name: string,
  }
}

const PayCartButton = ({ cart, finalTotal, shipments }: {cart: CartModel, finalTotal: number, shipments: Shipments}) => {
   const [isEnable, setIsEnable] = useState(true);

  const onPayCartClick = async () => {
    if(cart.items.length > 0){
      const cartModel = {
        items: cart.items,
        products_total:cart.products_total,
        amount_to_pay: finalTotal,
        shipments: shipments
      }
      
      const token = getToken()
      const res = await createPaymentOrder(cartModel, token);
      if(res.success){
        navigate(res.data.init_point)
      } else {
        navigate('/login')
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
      Finalizar compra
    </button>
  );
};

export default PayCartButton;
