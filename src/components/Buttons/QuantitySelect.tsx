import { useEffect, type ChangeEvent, useState } from "react";
import { quantity } from "../../services/const";
import { updateQuantity, getQuantity } from "@/store/cartStore";

const QuantitySelect = ({ id }: { id: string }) => {
  const [value, setValue] = useState(1);

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    updateQuantity(id, parseInt(value));
    setValue(parseInt(value));
  };

  useEffect(() => {
   const value = getQuantity(id) 
   setValue(value);
  }, [value]);

  return (
    <select
     value={value}
      onChange={onSelectChange}
      className="w-full p-3 border-primary border-2 rounded-md hover:bg-violet-100 transition-all cursor-pointer"
      name="unidades"
      id="quantity"
    >
      {quantity.map((q) => (
        <option key={q.id} value={q.value}>{q.descripcion}</option>
      ))}
    </select>
  );
};

export default QuantitySelect;
