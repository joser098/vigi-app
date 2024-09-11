import { navigate } from "astro:transitions/client";
import { createPaymentOrder } from "@/services/fetchData";
import { getToken } from "@/services/scripts";
import type { CartModel } from "@/services/types";
import { useEffect, useState } from "react";
import Loader from "./Icons/Loader";

interface Shipments {
  local_pickup: boolean,
  cost: number,
  free_shipping: boolean,
  receiver_address: {
    street_name: string,
  }
}

const PayCartButton = ({ cart, finalTotal, shipments, method }: {cart: CartModel, finalTotal: number, shipments: Shipments, method: string}) => {
   const [isEnable, setIsEnable] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

  const onPayCartClick = async () => {
    setIsLoading(true)
    if(cart.items.length > 0){
      const cartModel = {
        items: cart.items,
        products_total:cart.products_total,
        amount_to_pay: finalTotal,
        shipments: shipments,
        method
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
    <button onClick={onPayCartClick} disabled={isEnable} className={`w-full flex items-center justify-center text-white p-3 rounded-md hover:opacity-70 transition-opacity my-3 ${method == "mp" ? "bg-[#00B1EA]" : "bg-primary border-2 border-primary"}`}>
      {
        isLoading ? <Loader/> : method === 'mp' ? 'Pagar con mercadopago' : 'Pagar con promociones'
      }
    </button>
  );
};

export default PayCartButton;
