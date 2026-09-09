import { navigate } from "astro:transitions/client";
import type { CartItem, Product } from "@/services/types";
import { addToCart, getQuantity } from "@/store/cartStore";
import Toast from "../Toast";
import { useState } from "react";
import Loader from "../Icons/Loader";
import { MONEDA, trackPixel } from "@/services/pixel";

const AddCartButton = ({
  product,
  buttonLabel,
  padding
}: {
  product: any;
  buttonLabel: string;
  padding: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [item, setitem] = useState<CartItem>({} as CartItem);

  // Sin sesión el ítem va al carrito del navegador. Antes esto mandaba a
  // /login: el visitante no podía ni llenar el carrito sin crear una cuenta de
  // 16 campos, que para tráfico frío es donde se perdía la venta.
  const onAddCartClick = async () => {
    setIsLoading(true);
    //Verify quantity is valid
    const id = product.id;
    const quantity = getQuantity(id);
    if (!quantity) {
      setIsLoading(false);
      return;
    }

    const item = {
      id: product.id,
      picture_url: product.thumbnail || product.picture_url,
      title: product.model || product.title,
      quantity,
      unit_price: product.price || product.unit_price,
      price_original: product.price_original ?? null,
    };

    const res = await addToCart(item);
    if (res.success) {
      // Después de que el carrito lo aceptó, no antes: un AddToCart que se
      // dispara y después falla le enseña a Meta una señal que no existió.
      trackPixel("AddToCart", {
        content_ids: [item.id],
        content_name: item.title,
        content_type: "product",
        contents: [
          { id: item.id, quantity: item.quantity, item_price: item.unit_price },
        ],
        value: item.unit_price * item.quantity,
        currency: MONEDA,
      });

      setIsLoading(false);
      setitem(item);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }

    if (buttonLabel.includes("Elegir")) {
      navigate("/")
    }
    if (buttonLabel.includes("Actualizar")) {
      navigate("/cart")
    }
  };

  return (
    <>
      <button
        onClick={onAddCartClick}
        className={`flex w-full items-center justify-center rounded-full border-[1.5px] border-gray-300 bg-white text-[15px] font-semibold text-primary transition-colors hover:border-primary ${padding.includes("p-1") ? "h-9 text-xs" : "h-13"} ${buttonLabel == "Actualizar" && "text-[10px] lg:text-sm"}`}
      >
        {isLoading ? (
          <span className="flex justify-center">
            <Loader />
          </span>
        ) : (
          `${buttonLabel}`
        )}
      </button>
      {showToast && (
        <Toast
          title="Producto Agregado!"
          message={`Se ha agregado ${item.quantity} ${
            item.quantity == 1 ? "unidad" : "unidades"
          } de ${item.title} al carrito`}
        />
      )}
    </>
  );
};

export default AddCartButton;
