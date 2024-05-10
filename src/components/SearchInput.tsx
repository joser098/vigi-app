import { searchSuggest } from "@/services/fetchData";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import React, { useState, type ChangeEvent } from "react";

interface Item {
  _id: string;
  thumbnail: string;
  provider: string;
  model: string;
  price: number;
}

const SearchInput = () => {
  const [suggestList, setSuggestList] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState("");

  const onChangeSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);

    if (!value) {
      setSuggestList([]);
      return;
    }
    if (value.length > 1) {
      //Hacer request para suggest
      const products = await searchSuggest(value, 6);

      //Agregar los resultados al suggeslist
      setSuggestList(products);
    }
  };

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == "Enter"){
      navigate(`/buscar?search=${inputValue}`)
    }
  };

  return (
    <div className="text-xs relative">
      <input
      onKeyDown={onKeyDown}
        onChange={onChangeSearch}
        className="hidden w-96 sm:inline border-[1px] border-primary rounded py-[10px] pl-1 pr-6"
        type="text"
        placeholder="Buscar producto, marca ..."
      />
      <section className="absolute w-full bg-white mt-1 rounded">
        {suggestList?.map((item: Item) => {
          return (
            <article key={item._id}>
              <a href={`/product/${item.model}`} className="flex hover:bg-violet-100 rounded">
                <img
                  src={item.thumbnail}
                  alt={item.model}
                  className="max-h-16 max-w-16"
                />
                <div className="flex flex-col justify-center gap-1">
                  <h6 className="text-lg font-bold text-primary">
                    {item.model}
                  </h6>
                  <span>
                    {item.price.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default SearchInput;
