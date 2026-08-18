import * as AlertDialog from "@radix-ui/react-dialog";
import { navigate } from "astro:transitions/client";
import type { Product } from "@/services/types";
import { getQuantity } from "@/store/cartStore";
import { useState } from "react";
import OrderResume from "../OrderResume";
import AddCartButton from "./AddCartButton";
import { getToken } from "@/services/scripts";

const BuyButton = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  // El resumen de compra cotiza el envío contra un endpoint autenticado, así
  // que abrirlo sin sesión no tiene sentido: se manda a login como hace
  // "Agregar al carrito".
  const onBuyClick = () => {
    if (getToken() === "null") {
      navigate("/login");
      return;
    }

    setQuantity(getQuantity(product.id));
    setOpen(true);
  };

  const cartModel = {
    items: [
      {
        id: product.id,
        title: product.model,
        picture_url: product.thumbnail,
        quantity,
        unit_price: product.price,
      },
    ],
    products_total: quantity,
    amount_to_pay: product.price * quantity,
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <button
        onClick={onBuyClick}
        className="block w-full bg-primary border-2 border-primary text-white p-3 rounded-md hover:opacity-75 transition-opacity"
      >
        Comprar
      </button>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="backdrop-blur-xs inset-0 fixed flex justify-center items-center p-4">
          <AlertDialog.Content aria-describedby={undefined} className=" bg-white rounded-sm p-4 flex flex-col gap-5 shadow-lg sm:min-w-[500px] max-h-screen overflow-y-scroll">
            <AlertDialog.Title className="text-primary font-semibold text-xl">
              Verifica tu compra
            </AlertDialog.Title>
            {/* Un div y no AlertDialog.Description: esa renderiza un <p>, y un
                <p> no puede contener <table> ni <div>. */}
            <div className="flex flex-col justify-center items-center">
              <table className="w-full sm:max-w-sm">
                <tbody>
                <tr>
                  <th className="text-start px-4 pt-4 bg-gray-200 rounded-tl-md">
                    Producto
                  </th>
                  <th className="text-start px-4 pt-4 bg-gray-200">Cantidad</th>
                  <th className="text-start px-4 pt-4 bg-gray-200 rounded-tr-md">
                    P / U
                  </th>
                </tr>
                <tr>
                  <td className="px-4 pt-4">{product.model}</td>
                  <td className="px-4 pt-4">{quantity}</td>
                  <td className="px-4 pt-4">
                    {product.price.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 0,
                    })}
                  </td>
                </tr>
                </tbody>
              </table>
              {quantity > 0 && quantity < 21 && <OrderResume cart={cartModel} />}
              <div className="w-full px-10 max-w-sm bg-gray-200 py-3">
                <AddCartButton
                  product={product}
                  buttonLabel="Elegir mas productos"
                  padding="p-3"
                />
              <AlertDialog.Close asChild>
                <button className="bg-red-400 text-white p-3 rounded-sm hover:opacity-75 transition-opacity my-3 w-full">
                  Cancelar
                </button>
              </AlertDialog.Close>
              </div>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default BuyButton;
