import type { CartItem, Product } from "@/services/types";
import { addToCart, getQuantity } from "@/store/cartStore";
import Toast from "./Toast";
import { useState } from "react";

const AddCartButton = ({ product }: { product: Product }) => {
  const [showToast, setShowToast] = useState(false);
  const [item, setitem] = useState<CartItem>({} as CartItem);

  const onAddCartClick = async () => {
    const quantity = getQuantity(product._id);
    const item = {
      id: product._id,
      title: product.model,
      quantity,
      unit_price: product.price,
    };
    const res = await addToCart(item);
    if(res.success){
      setitem(item)
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };

  return (
    <>
      <button
        onClick={onAddCartClick}
        className="block w-full bg-violet-100 border-2 border-violet-100 text-primary p-3 rounded-md hover:opacity-75 transition-opacity"
      >
        Agregar al carrito
      </button>
      {showToast && <Toast title="Producto Agregado!" message={`Se ha agregado ${item.quantity} ${item.quantity == 1 ? "unidad" : "unidades"} de ${item.title} al carrito`} />}
    </>
  );
};

export default AddCartButton;
