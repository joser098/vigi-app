import type { Product } from "@/services/types";

const AddCartButton = ({product}: {product: Product}) => {
  const onAddCartClick = () => {
    alert("Agregado al carrito!");
  };

  return (
    <button onClick={onAddCartClick} className="block w-full bg-violet-100 border-2 border-violet-100 text-primary p-3 rounded-md hover:opacity-75 transition-opacity">
      Agregar al carrito
    </button>
  );
};

export default AddCartButton;
