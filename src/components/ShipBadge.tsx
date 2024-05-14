import { getTime } from "@/services/scripts";
import { useEffect, useState } from "react";

const ShipBadge = () => {
    const [time, setTime] = useState(0);

  useEffect(() => {
    const time = getTime();
    setTime(time)
  });

  return (
    <div className="my-2 flex justify-center items-center text-center">
      <span
        id="ship_date"
        className="text-[12px] py-1 px-2 rounded-full gradient text-green_"
      >
        {time >= 0 && time < 16 ? "Llega hoy (CABA)" : "Llega mañana (CABA)"}
      </span>
    </div>
  );
};

export default ShipBadge;
