import * as AlertDialog from "@radix-ui/react-dialog";
import type { CartModel, Product } from "@/services/types";
import { getQuantity } from "@/store/cartStore";
import { createPaymentOrder } from "@/services/fetchData";
import { useState } from "react";

const BuyButton = ({ product }:{ product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  const onBuyClick = async () => {
    const quantity = getQuantity(product._id);

    const cartModel = {
      _id: "65c6dd175597d7d8dfea0375", // Hardcoded cart id
      customer_id: "65c6dd165597d7d8dfea0374", // Hardcoded customer id
      items: [
        {
          id: product._id,
          title: product.model,
          picture_url: product.thumbnail,
          quantity,
          unit_price: product.price,
        },
      ],
        products_total:quantity,
        amount_to_pay: product.price * quantity,
    };

    const res = await createPaymentOrder(cartModel);
    if(res.success){
      window.location.href = res.data.init_point;
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button onClick={() => setQuantity(getQuantity(product._id))} className="block w-full bg-primary border-2 border-primary text-white p-3 rounded-md hover:opacity-75 transition-opacity">
          Comprar
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="backdrop-blur-sm inset-0 fixed flex justify-center items-center p-4">
            <AlertDialog.Content className=" bg-white rounded p-4 flex flex-col gap-5 shadow-lg sm:min-w-[500px]">
                <AlertDialog.Title className="text-primary font-semibold text-xl">Verifica tu compra</AlertDialog.Title>
                <AlertDialog.Description className="flex flex-col justify-center">
                    <table className="min-w-5">
                        <tr>
                            <th className="text-start px-4 pt-4 bg-gray-200 rounded-tl-md">Producto</th>
                            <th className="text-start px-4 pt-4 bg-gray-200">Cantidad</th>
                            <th className="text-start px-4 pt-4 bg-gray-200 rounded-tr-md">P / U</th>
                        </tr>
                        <tr>
                            <td className="px-4 pt-4">{product.model}</td>
                            <td className="px-4 pt-4">{quantity}</td>
                            <td className="px-4 pt-4">{(product.price).toLocaleString("es-AR",{
                                style: "currency",
                                currency: "ARS",
                                minimumFractionDigits: 0
                            })}</td>
                        </tr>
                        <tr>
                            <td className="font-bold px-4 pt-4">Total</td>
                            <td className="px-4 pt-4"></td>
                            <td className="px-4 pt-4 font-bold">{(product.price * quantity).toLocaleString("es-AR", {
                                style: "currency",
                                currency: "ARS",
                                minimumFractionDigits: 0
                            })}</td>
                        </tr>
                    </table>
                    <span className="text-[10px] px-4 mt-10">*Una vez confirmes tu compra, serás redirigido de forma segura al pago.</span>
                </AlertDialog.Description>
                <div className="flex justify-end gap-4">
                    <AlertDialog.Close asChild>
                        <button className="bg-gray-200 p-3 rounded hover:opacity-75 transition-opacity">Cancelar</button>
                    </AlertDialog.Close>
                    <AlertDialog.Close asChild>
                     <button onClick={onBuyClick} className="bg-primary text-white p-3 rounded-md hover:opacity-75 transition-opacity">
                        Confirmar
                     </button>
                    </AlertDialog.Close>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default BuyButton;