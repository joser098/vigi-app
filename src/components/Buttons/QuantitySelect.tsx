import { useEffect, type ChangeEvent, useState } from "react";
import { quantity } from "../../services/const";
import { updateQuantity, getQuantity } from "@/store/cartStore";

const QuantitySelect = ({ id }: { id: string }) => {
  const [value, setValue] = useState(1);
  const [errors, setErrors] = useState("");

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    updateQuantity(id, parseInt(value));
    setValue(parseInt(value));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors("");
    const { value } = e.target;
    if (parseInt(value) < 0 || parseInt(value) > 20) {
      setErrors("Sin stock");
      updateQuantity(id, 0);
      return;
    }
    if(value == ""){
      setErrors("Ingresa la cantidad");
      updateQuantity(id, 0);
      return;
    }

    updateQuantity(id, parseInt(value));
  };

  useEffect(() => {
    const value = getQuantity(id);
    setValue(value);
  }, [value]);

  return (
    <>
      {value < 6 ? (
        <select
          value={value}
          onChange={onSelectChange}
          className="w-full p-3 border-primary border-2 rounded-md hover:bg-violet-100 transition-all cursor-pointer"
          name="unidades"
          id="quantity"
        >
          {quantity.map((q) => (
            <option key={q.id} value={q.value}>
              {q.descripcion}
            </option>
          ))}
        </select>
      ) : (
          <input
            type="number"
            className="w-full p-3 border-primary border-2 rounded-md hover:bg-violet-100 transition-all cursor-pointer"
            // value={value}
            onChange={onInputChange}
            name="unidades"
            id="quantity"
            placeholder="Ingresa la cantidad"
            min={0}
            required={true}
            pattern="[0-9]+"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            inputMode="numeric"
          />
      )}
      <span className="text-xs text-red-500 h-1 inline-block w-full">{errors}</span>
    </>
  );
};

export default QuantitySelect;
