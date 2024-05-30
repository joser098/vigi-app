import { getFavorites, updateFavorite } from "@/services/fetchData";
import { getToken } from "@/services/scripts";
import { useEffect, useState } from "react";
import type { Product } from "@/services/types";
import Loader from "../Icons/Loader";

const FavoritesInfo = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsloading(true);
      const token = getToken();
      const response = await getFavorites(token);
      setFavorites(response);
      setIsloading(false);
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (id: string) => {
    const token = getToken();
    const res = await updateFavorite(token, id, "remove");
    if (res.success) {
      const newFavorites = favorites.filter(
        (favorite: Product) => favorite._id !== id
      );
      setFavorites(newFavorites);
    }
  };
  return (
    <section>
      {favorites.length > 0 ? (
        favorites.map((favorite: Product) => {
          return (
            <article key={favorite._id} className="flex flex-col sm:flex-row sm:justify-between bg-white gap-3 max-h-80 p-2 border-b-2">
              <a href={`/product/${favorite.model}`} className="flex">
                <img
                  src={favorite.thumbnail}
                  alt={favorite.model}
                  className="object-cover max-w-16 sm:max-w-32"
                />
                <div className="p-4 flex flex-col gap-2 justify-center">
                  <h5 className="font-bold">{favorite.model}</h5>
                  <p>
                    {favorite.price.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </a>
              <button onClick={() => removeFavorite(favorite._id)} className="bg-red-400 text-white rounded p-1 sm:text-red-600 sm:bg-transparent hover:underline sm:p-5">Eliminar</button>
            </article> 
          );
        })
      ) : isLoading ? (
          <div className="flex justify-center items-center">
            <Loader/>
          </div>
        )
         : (
          <div className="flex flex-col justify-center items-center h-full">
            <span className="mb-4">
              <svg data-testid="geist-icon" height="54" strokeLinejoin="round" viewBox="0 0 16 16" width="54"><path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.75 7.75C6.30228 7.75 6.75 7.30228 6.75 6.75C6.75 6.19772 6.30228 5.75 5.75 5.75C5.19772 5.75 4.75 6.19772 4.75 6.75C4.75 7.30228 5.19772 7.75 5.75 7.75ZM11.25 6.75C11.25 7.30228 10.8023 7.75 10.25 7.75C9.69771 7.75 9.25 7.30228 9.25 6.75C9.25 6.19772 9.69771 5.75 10.25 5.75C10.8023 5.75 11.25 6.19772 11.25 6.75ZM11.5249 11.2622L11.8727 11.7814L10.8342 12.4771L10.4863 11.9578C9.94904 11.1557 9.0363 10.6298 8.00098 10.6298C6.96759 10.6298 6.05634 11.1537 5.51863 11.9533L5.16986 12.4719L4.13259 11.7744L4.48137 11.2558C5.2414 10.1256 6.53398 9.37982 8.00098 9.37982C9.47073 9.37982 10.7654 10.1284 11.5249 11.2622Z" fill="currentColor"></path></svg>
            </span>
            <h2 className="text-center text-2xl font-bold">Aún no tienes ningún artículo en tus favoritos</h2>
          </div>
      )}
    </section>
  );
};

export default FavoritesInfo;
