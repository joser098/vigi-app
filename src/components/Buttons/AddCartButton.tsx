import { navigate } from "astro:transitions/client";
import type { CartItem, Product } from "@/services/types";
import { addToCart, getQuantity } from "@/store/cartStore";
import Toast from "../Toast";
import { useState } from "react";
import Loader from "../Icons/Loader";
import { getToken } from "@/services/scripts";

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

  const onAddCartClick = async () => {
    //Verify user is logged
    const token = getToken();
    if (token == "null") {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    //Verify quantity is valid
    const id = product._id || product.id;
    const quantity = getQuantity(id);
    if (!quantity) {
      setIsLoading(false);
      return;
    }

    const item = {
      id: product._id || product.id,
      picture_url: product.thumbnail || product.picture_url,
      title: product.model || product.title,
      quantity,
      unit_price: product.price || product.unit_price,
    };

    //ADD TO CART AS LOGGED IN USER
    const res = await addToCart(item);
    if (res.success) {
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
        className={`block w-full ${padding} ${buttonLabel == "Actualizar" && "text-[10px] lg:text-base"} bg-violet-100 border-2 border-violet-100 text-primary rounded-md hover:opacity-75 transition-opacity`}
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
