import type { Customer } from "@/services/types";
import ChevronRight from "../Icons/ChevronRight";
import InfoIcon from "../Icons/InfoIcon";
import Bag from "../Icons/Bag";
import Favorite from "../Icons/Favorites";
import Location from "../Icons/Location";
import { useState } from "react";
import CustomerInfo from "./CustomerInfo";
import AddressInfo from "./AddressInfo";
import FavoritesInfo from "./FavoritesInfo";

type Tab = "info" | "purchasesInfo" | "favoritesInfo" | "addressInfo";

const ProfileIndex = ({ customer }: { customer: Customer }) => {
  const [currentTab, setCurrentTab] = useState<Tab>("info");

  const changeTab = (tab: Tab): void => {
    setCurrentTab(tab);
  };

  return (
    <section className="my-5 flex flex-col sm:flex-row gap-6">
      <article className="w-full max-w-80 ">
        <ul className="flex flex-col gap-5 rounded-md border p-4">
          <li
            className="flex gap-6 justify-between cursor-pointer"
            onClick={() => changeTab("info")}
          >
            <div className="flex gap-3 items-center">
              <InfoIcon currentColor={currentTab == "info" ? "#CDA3FF" : "#1E053F"}/>
              <span>Informacion personal</span>
            </div>
            <ChevronRight />
          </li>
          <li
            className="flex gap-6 justify-between cursor-pointer"
            onClick={() => changeTab("addressInfo")}
          >
            <div className="flex gap-3 items-center">
              <Location currentColor={currentTab == "addressInfo" ? "#CDA3FF" : "#1E053F"}/>
              <span>Direcciones </span>
            </div>
            <ChevronRight />
          </li>
          <li
            className="flex gap-6 justify-between cursor-pointer"
            onClick={() => changeTab("purchasesInfo")}
          >
            <div className="flex gap-3 items-center">
              <Bag currentColor={currentTab == "purchasesInfo" ? "#CDA3FF" : "#1E053F"}/>
              <span>Compras </span>
            </div>
            <ChevronRight />
          </li>
          <li
            className="flex gap-6 justify-between cursor-pointer"
            onClick={() => changeTab("favoritesInfo")}
          >
            <div className="flex gap-3 items-center">
              <Favorite currentColor={currentTab == "favoritesInfo" ? "#CDA3FF" : "#1E053F"}/>
              <span>Favoritos</span>
            </div>
            <ChevronRight />
          </li>
        </ul>
      </article>
      <div className="w-full flex flex-col justify-center">
        {currentTab === "info" && <CustomerInfo customer={customer}/>}
        {currentTab === "addressInfo" && <AddressInfo customer={customer}/>}
        {currentTab === "purchasesInfo" && <p>Compras</p>}
        {currentTab === "favoritesInfo" && <FavoritesInfo/>}
      </div>
    </section>
  );
};

export default ProfileIndex;
