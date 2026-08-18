import { searchSuggest } from "@/services/fetchData";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import React, { useState, type ChangeEvent } from "react";

interface Item {
  id: string;
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
    <div className="relative w-full text-xs">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6b6478"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        onKeyDown={onKeyDown}
        onChange={onChangeSearch}
        onBlur={onBlurHandler}
        className="h-12 w-full rounded-full border-[1.5px] border-line bg-panel pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:bg-white"
        type="search"
        placeholder="Buscá por modelo, marca o ambiente"
      />
      <section className="absolute z-20 mt-2 max-h-[340px] w-full overflow-y-auto rounded-2xl border border-line bg-white p-2 shadow-[0_16px_40px_rgba(30,5,63,0.12)] empty:hidden">
        {suggestList?.map((item: Item) => {
          return (
            <article
              key={item.id}
              className="relative rounded-xl p-2 transition-colors hover:bg-panel"
            >
              {item.has_promotion && (
                <div className="absolute w-1/3 flex flex-col  justify-center items-center top-6 right-0 rounded-l gradient_violet bg-linear-to-tr">
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
              <a href={`/product/${item.model}`} className="flex items-center gap-3">
                <img
                  src={item.thumbnail}
                  alt={item.model}
                  className="size-14 shrink-0 rounded-lg bg-panel object-contain p-1"
                  width="56"
                  height="56"
                  loading="lazy"
                  decoding="async"
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
                    <p className="max-w-fit text-xs text-gray-400 line-through">
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
