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

const TABS: { id: Tab; label: string; hash: string; Icon: any }[] = [
  { id: "info", label: "Información personal", hash: "", Icon: InfoIcon },
  { id: "addressInfo", label: "Dirección", hash: "address", Icon: Location },
  { id: "purchasesInfo", label: "Compras", hash: "purchases", Icon: Bag },
  { id: "favoritesInfo", label: "Favoritos", hash: "favorites", Icon: Favorite },
];

const ProfileIndex = ({ customer }: { customer: Customer }) => {
  const [currentTab, setCurrentTab] = useState<Tab>("info");

  const changeTab = (tab: Tab): void => {
    window.location.hash = TABS.find((t) => t.id === tab)?.hash ?? "";
    setCurrentTab(tab);
  };

  useEffect(() => {
    // La pestaña sale del hash para que se pueda compartir el link.
    const match = TABS.find(
      (t) => t.hash && window.location.hash === `#${t.hash}`,
    );
    if (match) setCurrentTab(match.id);
  }, []);

  return (
    <section className="flex flex-col gap-6 sm:flex-row sm:gap-8">
      <article className="w-full sm:max-w-72">
        <ul className="flex flex-col gap-1 rounded-2xl border border-line bg-white p-3">
          {TABS.map(({ id, label, Icon }) => {
            const active = currentTab === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => changeTab(id)}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-[52px] w-full items-center gap-3.5 rounded-xl px-4 text-left transition-colors ${
                    active
                      ? "bg-panel font-semibold text-primary"
                      : "text-ink hover:bg-panel/60"
                  }`}
                >
                  <Icon currentColor={active ? "#1E053F" : "#8a8398"} />
                  <span className="flex-1 text-sm">{label}</span>
                  <ChevronRight />
                </button>
              </li>
            );
          })}
        </ul>
      </article>

      <div className="flex w-full flex-col">
        {currentTab === "info" && <CustomerInfo customer={customer} />}
        {currentTab === "addressInfo" && <AddressInfo customer={customer} />}
        {currentTab === "purchasesInfo" && <PurchasesInfo />}
        {currentTab === "favoritesInfo" && <FavoritesInfo />}
      </div>
    </section>
  );
};

export default ProfileIndex;
