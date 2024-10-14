import { getTime, calculateShipmentArrives } from "@/services/scripts";
import { useEffect, useState } from "react";

const ShipBadge = () => {
    const [shipmentArrives, setShipmentArrives] = useState("Llega mañana (CABA)");

  // useEffect(() => {
  //   const time = getTime();
  //   const shipmentArrives = calculateShipmentArrives(time);
  //   setShipmentArrives(shipmentArrives)
  // });

  return (
    <div className="my-2 flex justify-center items-center text-center">
      <span
        id="ship_date"
        className="text-[12px] py-1 px-2 rounded-full gradient text-green_"
      >
        {shipmentArrives}
      </span>
    </div>
  );
};

export default ShipBadge;
