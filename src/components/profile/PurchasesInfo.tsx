import { getCustomerOrders } from "@/services/fetchData";
import { formatDate, getToken } from "@/services/scripts";
import { useEffect, useState } from "react";
import Loader from "../Icons/Loader";

const PurchasesInfo = () => {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      setIsloading(true);
      const token = getToken();
      const response = await getCustomerOrders(token);
      setPurchases(response);
      setIsloading(false);
    };
    fetchPurchases();
  }, []);

  return (
    <section>
        {purchases.length > 0 ? (
          <ul>
            {purchases.map((purchase: any) => (
              <li className="border-2 p-3 my-2 rounded-sm" key={purchase._id}>
                <span className="block border-b-[1.5px] border-b-gray-200">{formatDate(purchase.date)}</span>
                <article className="flex flex-col gap-2 sm:flex-row justify-center items-center my-3"> 
                  <div className="w-full">
                    {/* IMAGEN */}
                    <div>
                      <span className="text-sm text-gray-500 block">
                        Nro de Orden {purchase.payment_id}
                      </span>
                      <span className="text-sm">{purchase.items.length}{purchase.items.length == 1 ? " Articulo" : " Articulos"}</span>
                    </div>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center">
                    <span
                    className={purchase.status == "Entregado" ? "text-green-700" : "text-orange-400"}
                    >{purchase.status}</span>
                    <span>Llega el X </span>
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <a href={`/compra/${purchase.payment_id}`} className="block w-full bg-primary border-2 border-primary text-white p-2 rounded-md hover:opacity-75 transition-opacity text-center">Ver compra</a>
                    {/* <a href="#" className="block w-full bg-violet-100 border-2 border-violet-100 text-primary p-2 rounded-md hover:opacity-75 transition-opacity text-center">Volver a comprar</a> */}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ): isLoading ?(
            <div className="flex justify-center items-center">
                <Loader />
            </div>
        ) : (
            <div className="flex flex-col justify-center items-center h-full">
            <span className="mb-4">
              <svg data-testid="geist-icon" height="54" stroke-linejoin="round" viewBox="0 0 16 16" width="54"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.75 7.75C6.30228 7.75 6.75 7.30228 6.75 6.75C6.75 6.19772 6.30228 5.75 5.75 5.75C5.19772 5.75 4.75 6.19772 4.75 6.75C4.75 7.30228 5.19772 7.75 5.75 7.75ZM11.25 6.75C11.25 7.30228 10.8023 7.75 10.25 7.75C9.69771 7.75 9.25 7.30228 9.25 6.75C9.25 6.19772 9.69771 5.75 10.25 5.75C10.8023 5.75 11.25 6.19772 11.25 6.75ZM11.5249 11.2622L11.8727 11.7814L10.8342 12.4771L10.4863 11.9578C9.94904 11.1557 9.0363 10.6298 8.00098 10.6298C6.96759 10.6298 6.05634 11.1537 5.51863 11.9533L5.16986 12.4719L4.13259 11.7744L4.48137 11.2558C5.2414 10.1256 6.53398 9.37982 8.00098 9.37982C9.47073 9.37982 10.7654 10.1284 11.5249 11.2622Z" fill="currentColor"></path></svg>
            </span>
            <h2 className="text-center sm:text-2xl font-bold">No has realizado compras aun</h2>
            <a href="/" className="hover:underline my-2 text-primary">Ir a comprar</a>
          </div>
        )
        }
    </section>
  )
};

export default PurchasesInfo;
