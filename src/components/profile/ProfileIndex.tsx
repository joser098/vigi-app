import type { Customer } from "@/services/types";
import ChevronRight from "../Icons/ChevronRight";
import InfoIcon from "../Icons/InfoIcon";
import Bag from "../Icons/Bag";
import Favorite from "../Icons/Favorites";
import Location from "../Icons/Location";
import { useState } from "react";
import CustomerInfo from "./CustomerInfo";

type Tab = "info" | "history" | "favorites" | "location";

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
              <InfoIcon />
              <span>Informacion personal</span>
            </div>
            <ChevronRight />
          </li>
          <li
            className="flex gap-6 justify-between cursor-pointer"
            onClick={() => changeTab("location")}
          >
            <div className="flex gap-3 items-center">
              <Location />
              <span>Direcciones </span>
            </div>
            <ChevronRight />
          </li>
          <li
            className="flex gap-6 justify-between cursor-pointer"
            onClick={() => changeTab("history")}
          >
            <div className="flex gap-3 items-center">
              <Bag />
              <span>Compras </span>
            </div>
            <ChevronRight />
          </li>
          <li
            className="flex gap-6 justify-between cursor-pointer"
            onClick={() => changeTab("favorites")}
          >
            <div className="flex gap-3 items-center">
              <Favorite />
              <span>Favoritos</span>
            </div>
            <ChevronRight />
          </li>
        </ul>
      </article>
      <div className="w-full">
        {currentTab === "info" && <CustomerInfo customer={customer}/>}
        {currentTab === "location" && <p>Direcciones</p>}
        {currentTab === "history" && <p>Compras</p>}
        {currentTab === "favorites" && <p>Favoritos</p>}
      </div>
    </section>
  );
};

export default ProfileIndex;
