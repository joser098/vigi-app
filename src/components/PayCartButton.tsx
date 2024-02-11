import { createPaymentOrder } from "@/services/fetchData";
import type { CartModel } from "@/services/types";

const PayCartButton = ({ cart }: {cart: CartModel}) => {
  const onPayCartClick = async () => {
    const cartModel = {
      _id: cart._id,
      customer_id: cart.customer_id,
      items: cart.items,
      products_total:cart.products_total,
      amount_to_pay: cart.products_total,
    }

    const res = await createPaymentOrder(cartModel);
    if(res.success){
      window.location.href = res.data.init_point;
    }
  };

  return (
    <button onClick={onPayCartClick} className="w-full bg-primary border-2 border-primary text-white p-3 rounded-md hover:opacity-70 transition-opacity my-3">
      Pagar
    </button>
  );
};

export default PayCartButton;
