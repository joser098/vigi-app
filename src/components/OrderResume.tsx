import type { CartModel } from "@/services/types";
import PayCartButton from "./PayCartButton";
import { useEffect, useState, type ChangeEvent } from "react";
import { getShippingCost } from "@/services/fetchData";
import { getToken } from "@/services/scripts";

const OrderResume = ({ cart }: { cart: CartModel }) => {
  const [shipments, setShipments] = useState({
    local_pickup: false,
    cost: 0,
    free_shipping: false,
    receiver_address: {
      street_name: "",
    }
  });

  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [codeResult, setCodeResult] = useState("");
  const [disablePay, setDisablePay] = useState(true);

  // const [install, setInstall] = useState(0);
  const [total, setTotal] = useState(cart.amount_to_pay);

  const calulateCost = async () => {
    setDisablePay(true);
    const token = getToken();
    const shipping = await getShippingCost(token);
    setShipments({
      ...shipments,
      local_pickup: false,
      cost: shipping.shippingCost,
      receiver_address: {
        street_name: shipping.address
      }
    });
    setDisablePay(false);
  };

  const onShipTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    
    if (value == "local_pickup") setShipments({
      ...shipments,
      local_pickup: true,
      cost: 0,
      free_shipping: false,
    });
    if (value == "shipping" && total > 0) calulateCost();
  };

  const calculateDiscount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const code = "MIDESCUENTO"; //Hardcode cupon 
    const discount_percentaje = 0.1; //Hardcode descuento

    if (discountCode === code) {
      setDiscount(cart.amount_to_pay * discount_percentaje);
      setDiscountCode("");
      setCodeResult("El descuento fue agregado con éxito!");
      setTimeout(() => {
        setCodeResult("");
      }, 3000);
    } else {
      setCodeResult("Cupón invalido");
      setTimeout(() => {
        setCodeResult("");
      }, 3000);
    }
  };

  useEffect(() => {
    if(total > 1){
      calulateCost();
    }
  }, []);

  useEffect(() => {
    setTotal(cart.amount_to_pay + shipments.cost - discount);
  }, [discount, shipments.cost]);

  return (
    <article className="w-full md:max-w-sm bg-gray-200 px-10 py-5 rounded-tl-md rounded-tr-md">
      <div className="w-full mb-8">
        <h5 className="my-2 font-semibold text-lg">Entrega</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <span className="text-xs">
            Conoce las opciones de envío, incluyendo plazos y costos
          </span>
          <select
            onChange={onShipTypeChange}
            className="max-h-11 bg-primary border-2 border-primary text-white p-2 rounded-md hover:opacity-70 transition-opacity"
          >
            {/* <option className="text-xs">Selecciona uno</option> */}
            <option className="text-xs" value="shipping">
              Envío a domicilio
            </option>
            <option className="text-xs" value="local_pickup">
              Retiro en oficina
            </option>
          </select>
        </div>
        <div className="my-2">
          {shipments.local_pickup ? (
            <span className="text-xs">
              Retiro en <strong>Figueroa 973, CABA</strong>
            </span>
          ) : (
            total > 0 && <span className="text-xs">
              Envío a: {
                shipments.receiver_address.street_name 
                ? <strong>{shipments.receiver_address.street_name}</strong>
                : <strong className=" text-orange-500">cargando dirección. . .</strong>
              }
            </span>
          )}
        </div>
      </div>
      {/* <div className="w-full mb-8">
        <h5 className="my-2 font-semibold text-lg">Instalación</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <span className="text-xs">
            Si necesitas a un profesional para tu instalación, ¡lo tenemos!
          </span>
          <button className="w-full max-h-11 bg-primary border-2 border-primary text-white p-2 rounded-md hover:opacity-70 transition-opacity">
            Calcular
          </button>
        </div>
      </div> */}
      <div className="mb-12">
        <h5 className="my-2 font-semibold text-lg">¿Tienes un cupón?</h5>
        <form>
          <label className="text-xs"> Código del cupón</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              onChange={(e) => setDiscountCode(e.target.value)}
              value={discountCode}
              placeholder="XXXX XXXX"
              type="text"
              className="bg-gray-200 border-b-2 border-gray-300 focus:border-none"
            />
            <button
              onClick={calculateDiscount}
              className="w-full max-h-11 bg-primary border-2 border-primary text-white p-2 rounded-md hover:opacity-70 transition-opacity"
            >
              Agregar
            </button>
          </div>
          <div className="w-full h-1">
            {codeResult && (
              <span
                className={`text-xs ${
                  codeResult.includes("invalido")
                    ? "text-red-500 "
                    : "text-green-500"
                } `}
              >
                {codeResult}
              </span>
            )}
          </div>
        </form>
      </div>
      <div>
        <h5 className="my-2 text-lg text-center">Resumen de la compra</h5>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            {cart.amount_to_pay.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Descuento</span>
          <span className={`${discount > 0 && "text-red-500"}`}>
            -{" "}
            {discount.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Envío</span>
          <span className={`${shipments.cost == 0 && "text-green-500 font-bold"}`}>
            {shipments.cost == 0
              ? "GRATIS"
              : shipments.cost.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 0,
                })}
          </span>
        </div>
        <div className="flex justify-between my-6">
          <span className="font-bold">Total:</span>
          <span className="font-bold">
            {total.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
      </div>
      <PayCartButton disablePay={disablePay} cart={cart} finalTotal={total} shipments={shipments} method="nv"/>
      <PayCartButton disablePay={disablePay} cart={cart} finalTotal={total} shipments={shipments} method="mp"/>
    </article>
  );
};

export default OrderResume;
