import type { Customer } from "@/services/types";
import ChevronRight from "../Icons/ChevronRight";
import InfoIcon from "../Icons/InfoIcon";
import Bag from "../Icons/Bag";
import Favorite from "../Icons/Favorites";
import Location from "../Icons/Location";
import { useEffect, useState } from "react";
import CustomerInfo from "./CustomerInfo";
import AddressInfo from "./AddressInfo";
import FavoritesInfo from "./FavoritesInfo";
import PurchasesInfo from "./PurchasesInfo";

type Tab = "info" | "purchasesInfo" | "favoritesInfo" | "addressInfo";

const ProfileIndex = ({ customer }: { customer: Customer }) => {
  const [currentTab, setCurrentTab] = useState<Tab>("info");

  const changeTab = (tab: Tab): void => {
    // Change the URL hash based on the selected tab
    switch (tab) {
      case "info":
        window.location.hash = "";
        break;
      case "purchasesInfo":
        window.location.hash = "purchases";
        break;
      case "favoritesInfo":
        window.location.hash = "favorites";
        break;
      case "addressInfo":
        window.location.hash = "address";
        break;
    }
    // Update the current tab
    setCurrentTab(tab);
  };

  useEffect(() => {
    // Change the current tab based on the URL hash
    if (window.location.hash === "#purchases") {
      setCurrentTab("purchasesInfo");
    }
    if (window.location.hash === "#favorites") {
      setCurrentTab("favoritesInfo");
    }
    if (window.location.hash === "#address") {
      setCurrentTab("addressInfo");
    }
    // If the URL hash is not related to tabs, keep the current tab
  }, [])

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
              <span>Información personal</span>
            </div>
            <ChevronRight />
          </li>
          <li
            className="flex gap-6 justify-between cursor-pointer"
            onClick={() => changeTab("addressInfo")}
          >
            <div className="flex gap-3 items-center">
              <Location currentColor={currentTab == "addressInfo" ? "#CDA3FF" : "#1E053F"}/>
              <span>Dirección</span>
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
        {currentTab === "purchasesInfo" && <PurchasesInfo />}
        {currentTab === "favoritesInfo" && <FavoritesInfo/>}
      </div>
    </section>
  );
};

export default ProfileIndex;
