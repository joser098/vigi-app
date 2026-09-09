import { navigate } from "astro:transitions/client";
import { createPaymentOrder } from "@/services/fetchData";
import { getToken } from "@/services/scripts";
import type { CartModel } from "@/services/types";
import { useEffect, useState } from "react";
import Loader from "./Icons/Loader";
import { MONEDA, contenidos, trackPixel } from "@/services/pixel";

interface Shipments {
  local_pickup: boolean,
  cost: number,
  free_shipping: boolean,
  receiver_address: {
    street_name: string,
  }
}

const PayCartButton = ({ cart, finalTotal, shipments, method, disablePay }: {cart: CartModel, finalTotal: number, shipments: Shipments, method: string, disablePay: boolean}) => {
   const [isEnable, setIsEnable] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

  const onPayCartClick = async () => {
    if(disablePay) return;
    setIsLoading(true)
    if(cart.items.length > 0){
      // El único lugar donde se dispara InitiateCheckout. El invitado pasa
      // antes por /datos y el registrado no, así que medirlo en las dos
      // pantallas contaría a unos una vez y a otros dos. Este clic lo dan los
      // dos, y es el último paso antes de irse a la pasarela.
      trackPixel("InitiateCheckout", {
        content_type: "product",
        contents: contenidos(cart.items),
        num_items: cart.products_total,
        value: finalTotal,
        currency: MONEDA,
      });

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
    <button
      onClick={onPayCartClick}
      disabled={isEnable}
      className={`flex h-14 w-full items-center justify-center rounded-full text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 ${
        method == "mp" ? "bg-[#00B1EA]" : "bg-primary"
      }`}
    >
      {isLoading ? (
        <Loader />
      ) : method === "mp" ? (
        "Pagar con Mercado Pago"
      ) : (
        "Pagar con Nave"
      )}
    </button>
  );
};

export default PayCartButton;
