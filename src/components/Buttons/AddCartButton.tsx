import type { CartItem, Product } from "@/services/types";
import { addToCart, getQuantity } from "@/store/cartStore";
import Toast from "../Toast";
import { useState } from "react";
import Loader from "../Icons/Loader";
import { getToken } from "@/services/scripts";

const AddCartButton = ({
  product,
  buttonLabel,
}: {
  product: Product;
  buttonLabel: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [item, setitem] = useState<CartItem>({} as CartItem);

  const onAddCartClick = async () => {
    setIsLoading(true);

    //Verify user is logged
    const token = getToken();
    if (token == "null") {
      window.location.href = "/login";
    }

    //Verify quantity is valid
    const quantity = getQuantity(product._id);
    if (!quantity) {
      setIsLoading(false);
      return;
    }

    const item = {
      id: product._id,
      picture_url: product.thumbnail,
      title: product.model,
      quantity,
      unit_price: product.price,
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
      window.location.href = "/";
    }
  };

  return (
    <>
      <button
        onClick={onAddCartClick}
        className="block w-full bg-violet-100 border-2 border-violet-100 text-primary p-3 rounded-md hover:opacity-75 transition-opacity"
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
