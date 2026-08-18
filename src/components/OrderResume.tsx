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
  const [shipmentError, setShipmentError] = useState("");
  // Sin esto no se puede distinguir "envío gratis" de "todavía no lo
  // calculamos": ambos dejaban cost en 0 y la fila decía GRATIS.
  const [costLoaded, setCostLoaded] = useState(false);

  // const [install, setInstall] = useState(0);
  const [total, setTotal] = useState(cart.amount_to_pay);

  // Si la cotización falla (sesión vencida, Andreani caído), el costo se deja
  // en 0 y el pago deshabilitado. Antes guardaba undefined y el render moría en
  // toLocaleString, desmontando toda la pantalla de compra.
  const calulateCost = async () => {
    setDisablePay(true);
    setShipmentError("");
    setCostLoaded(false);
    const token = getToken();
    const shipping = await getShippingCost(token);

    if (typeof shipping?.shippingCost !== "number") {
      setShipmentError("No pudimos calcular el costo de envío. Intentá de nuevo.");
      return;
    }

    setShipments({
      ...shipments,
      local_pickup: false,
      cost: shipping.shippingCost,
      receiver_address: {
        street_name: shipping.address
      }
    });
    setCostLoaded(true);
    setDisablePay(false);
  };

  const onShipTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    
    if (value == "local_pickup") {
      setShipments({
        ...shipments,
        local_pickup: true,
        cost: 0,
        free_shipping: true,
      });
      setCostLoaded(true);
      setDisablePay(false);
    }
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
    <article className="h-fit w-full rounded-2xl border border-line bg-white p-6 shadow-[0_14px_34px_rgba(30,5,63,0.06)] md:max-w-sm md:sticky md:top-4">
      <div className="w-full mb-8">
        <h5 className="mb-3 text-lg font-bold text-primary">Entrega</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <span className="text-xs">
            Conoce las opciones de envío, incluyendo plazos y costos
          </span>
          <select
            onChange={onShipTypeChange}
            className="h-11 rounded-xl border-[1.5px] border-line bg-white px-3 text-sm text-ink"
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
      <div className="mt-7 border-t border-line pt-6">
        <h5 className="mb-3 text-base font-semibold text-primary">¿Tenés un cupón?</h5>
        <form>
          <label className="text-xs"> Código del cupón</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              onChange={(e) => setDiscountCode(e.target.value)}
              value={discountCode}
              placeholder="XXXX XXXX"
              type="text"
              className="h-11 rounded-xl border-[1.5px] border-line bg-panel px-4 text-sm text-ink placeholder:text-gray-400"
            />
            <button
              onClick={calculateDiscount}
              className="h-11 w-full rounded-full border-[1.5px] border-gray-300 bg-white text-sm font-semibold text-primary transition-colors hover:border-primary"
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
      <div className="mt-7 border-t border-line pt-6">
        <h5 className="mb-4 text-lg font-bold text-primary">
          Resumen de la compra
        </h5>
        <div className="flex justify-between py-1.5 text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="text-ink">
            {cart.amount_to_pay.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
        <div className="flex justify-between py-1.5 text-sm">
          <span className="text-muted">Descuento</span>
          <span className={discount > 0 ? "font-semibold text-green_" : "text-ink"}>
            -{" "}
            {discount.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
        <div className="flex justify-between py-1.5 text-sm">
          <span className="text-muted">Envío</span>
          <span className={costLoaded && !shipments.cost ? "font-bold text-green_" : "text-ink"}>
            {shipmentError
              ? "—"
              : !costLoaded
              ? "A calcular"
              : !shipments.cost
              ? "GRATIS"
              : shipments.cost.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 0,
                })}
          </span>
        </div>
        {shipmentError && (
          <p className="text-xs text-red-500">{shipmentError}</p>
        )}
        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <span className="text-base font-semibold text-primary">Total</span>
          <span className="text-3xl font-bold tracking-tight text-ink">
            {total.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
      </div>

      <div className="mt-7 border-t border-line pt-6">
        <h5 className="mb-1 text-base font-semibold text-primary">
          Elegí cómo pagar
        </h5>
        <p className="mb-4 text-xs text-muted">
          Cada botón te lleva al checkout de su procesador. No guardamos los
          datos de tu tarjeta.
        </p>
        <div className="flex flex-col gap-5">
          <div>
            <PayCartButton
              disablePay={disablePay}
              cart={cart}
              finalTotal={total}
              shipments={shipments}
              method="nv"
            />
            {/* Las promociones las pone el banco a través de Nave, no nosotros:
                por eso se atribuyen y no se prometen. */}
            <p className="mt-2 text-center text-xs text-muted">
              Promociones bancarias de Nave, según tu tarjeta.
            </p>
          </div>
          <div>
            <PayCartButton
              disablePay={disablePay}
              cart={cart}
              finalTotal={total}
              shipments={shipments}
              method="mp"
            />
            <p className="mt-2 text-center text-xs text-muted">
              Dinero en cuenta, crédito o débito.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OrderResume;
