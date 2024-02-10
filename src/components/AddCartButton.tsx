import type { Product } from "@/services/types";
import { addToCart, getQuantity } from "@/store/cartStore";

const AddCartButton = ({ product }: { product: Product }) => {
  const onAddCartClick = async () => {
    const quantity = getQuantity(product._id);
    const item = {
      id: product._id,
      title: product.model,
      quantity,
      unit_price: product.price,
    };
    const res = await addToCart(item);
  };

  return (
    <button
      onClick={onAddCartClick}
      className="block w-full bg-violet-100 border-2 border-violet-100 text-primary p-3 rounded-md hover:opacity-75 transition-opacity"
    >
      Agregar al carrito
    </button>
  );
};

export default AddCartButton;
