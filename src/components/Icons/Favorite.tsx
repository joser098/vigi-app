import { getCustomerData, updateFavorite } from "@/services/fetchData";
import { getToken } from "@/services/scripts";
import type { Product } from "@/services/types";
import { customer_id } from "@/store/cartStore";
import { useStore } from '@nanostores/react';
import { useEffect, useState } from "react";

const Favorite = ({ product }: { product: Product }) => {
  const [status, setStatus] = useState(false);
  const $customer_id = useStore(customer_id)

  const handleFavClick = async () => {
    const token = getToken();
    if(token === "null") return (window.location.href = "/login");
    if (status) {
      const res = await updateFavorite (token, product._id, "remove");

      res.success && setStatus(false);
    } else {
      const res = await updateFavorite(token, product._id!, "add");
      res.success && setStatus(true);
    }
  };

  useEffect(() => {
    const setInitianState = async () => {
      if($customer_id){
        const isFavorite = product.favorites.includes($customer_id);
        setStatus(isFavorite);
      } else {
        const token = getToken();
        if(token === "null") return;

        const customer = await getCustomerData(token);
        const $$customer_id = customer._id;
        const isFavorite = product.favorites.includes($$customer_id);
        setStatus(isFavorite);
        customer_id.set($$customer_id);
      }
    };
    setInitianState();
  }, [])


  return (
    <>
      <svg
      onClick={handleFavClick}
        id="favorite"
        data-id={product._id}
        data-testid="geist-icon"
        height="24"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="24"
      >
        <path
          id="path"
          fillRule={status ? "nonzero" : "evenodd"}
          d="M7.06463 3.20474C5.79164 1.93175 3.72772 1.93175 2.45474 3.20474C1.18175 4.47773 1.18175 6.54166 2.45474 7.81465L8 13.3599L13.5453 7.81465C14.8182 6.54166 14.8182 4.47773 13.5453 3.20474C12.2723 1.93175 10.2084 1.93175 8.93537 3.20474L8.53033 3.60979L8 4.14012L7.46967 3.60979L7.06463 3.20474ZM8 2.02321C6.13348 0.286219 3.21165 0.326509 1.39408 2.14408C-0.464694 4.00286 -0.464691 7.01653 1.39408 8.87531L7.46967 14.9509L8 15.4812L8.53033 14.9509L14.6059 8.87531C16.4647 7.01653 16.4647 4.00286 14.6059 2.14408C12.7884 0.326509 9.86653 0.286221 8 2.02321Z"
          fill="#1E053F"
        ></path>
      </svg>
    </>
  );
};

export default Favorite;