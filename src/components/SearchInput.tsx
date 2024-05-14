import { searchSuggest } from "@/services/fetchData";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import React, { useState, type ChangeEvent } from "react";

interface Item {
  _id: string;
  thumbnail: string;
  provider: string;
  model: string;
  price: number;
  price_diferred: number;
  has_promotion: boolean;
  price_original: number;
  discount: number;
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
      const products = await searchSuggest(value, 10);

      //Agregar los resultados al suggeslist
      setSuggestList(products);
    }
  };

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      navigate(`/buscar?search=${inputValue}`);
    }
  };

  const onBlurHandler = () => {
    setTimeout(() => {
      setSuggestList([]);
    }, 150)
  };

  return (
    <div className="text-xs relative">
      <input
        onKeyDown={onKeyDown}
        onChange={onChangeSearch}
        onBlur={onBlurHandler}
        className="w-full sm:w-96 border-b-2 py-4 sm:border-[1px] border-primary rounded-b sm:rounded sm:py-[10px] pl-1 pr-6"
        type="text"
        placeholder="Buscar producto, marca ..."
      />
      <section className="absolute w-full z-10 bg-white mt-1 rounded max-h-[280px] overflow-y-auto">
        {suggestList?.map((item: Item) => {
          return (
            <article
              key={item._id}
              className="relative hover:bg-gray-100 rounded py-2"
            >
              {item.has_promotion && (
                <div className="absolute w-1/3 flex flex-col  justify-center items-center top-6 right-0 rounded-l gradient_violet bg-gradient-to-tr">
                  <span className="text-white text-[10px]">Ahorras</span>
                  <span className="text-white text-sm font-bold">
                    {item.price_diferred?.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              )}
              <a href={`/product/${item.model}`} className="flex rounded">
                <img
                  src={item.thumbnail}
                  alt={item.model}
                  className="max-h-16 max-w-16"
                />
                <div className="flex flex-col justify-center gap-1">
                  <h6 className="text-sm font-bold text-primary">
                    {item.model}
                  </h6>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold">
                      {item.price.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 0,
                      })}
                    </span>
                    {item.has_promotion && (
                      <span className="text-green_ text-[10px]">{item.discount}% OFF</span>
                    )}
                  </div>
                  {item.has_promotion && (
                    <p className="text-xs line-through bg-gray-200 text-gray-400 rounded-full px-2 max-w-fit">
                      {item.price_original?.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 0,
                      })}
                    </p>
                  )}
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
