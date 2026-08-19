import type { CartModel } from "@/services/types";
import PayCartButton from "./PayCartButton";
import { useEffect, useState, type ChangeEvent } from "react";
import {
  applyCoupon,
  getShippingCost,
  removeCoupon,
  setDelivery,
} from "@/services/fetchData";
import { getToken } from "@/services/scripts";

/**
 * Lo que devuelve /api/logistic/cost. Es la única fuente de la verdad del
 * resumen: subtotal, descuento del cupón, envío y total salen de ahí, para que
 * este componente no vuelva a calcular por su cuenta nada de lo que después se
 * cobra. `shippingCost` conserva el nombre viejo del campo.
 */
interface ShippingQuote {
  address: string;
  shippingCost: number;
  free: boolean;
  reason: "caba" | "min_purchase" | "local_pickup" | null;
  local_pickup: boolean;
  subtotal: number;
  discount: number;
  coupon: {
    code: string;
    description: string | null;
    kind: "percentage" | "fixed";
    value: number;
    discount: number;
  } | null;
  coupon_error: string | null;
  amount_to_pay: number;
  free_shipping_min: number;
  missing_for_free: number;
}

const money = (n: number) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });

const OrderResume = ({ cart }: { cart: CartModel }) => {
  const [quote, setQuote] = useState<ShippingQuote | null>(null);
  const [localPickup, setLocalPickup] = useState(false);

  const [discountCode, setDiscountCode] = useState("");
  const [codeResult, setCodeResult] = useState("");
  const [codeOk, setCodeOk] = useState(false);
  const [applying, setApplying] = useState(false);

  const [disablePay, setDisablePay] = useState(true);
  const [shipmentError, setShipmentError] = useState("");

  // Todo el resumen sale del servidor, incluido el retiro en oficina: es él
  // quien decide el total que se cobra, así que la pantalla no puede tener su
  // propia versión de la cuenta.
  const subtotal = quote?.subtotal ?? cart.amount_to_pay;
  const discount = quote?.discount ?? 0;
  const shippingCost = quote?.shippingCost ?? 0;
  const total = quote?.amount_to_pay ?? subtotal;

  // Si la cotización falla (sesión vencida, Andreani caído), el pago queda
  // deshabilitado en vez de mostrar un total inventado.
  const refreshQuote = async () => {
    setDisablePay(true);
    setShipmentError("");

    const data = await getShippingCost(getToken());

    if (typeof data?.shippingCost !== "number") {
      setQuote(null);
      setShipmentError("No pudimos calcular el costo de envío. Intentá de nuevo.");
      return;
    }

    setQuote(data as ShippingQuote);
    // El carrito recuerda la forma de entrega entre visitas: el select tiene
    // que reflejarla, no volver siempre a "envío a domicilio".
    setLocalPickup(Boolean(data.local_pickup));
    setDisablePay(false);
  };

  const onShipTypeChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const pickup = e.target.value === "local_pickup";

    setLocalPickup(pickup);
    setDisablePay(true);
    await setDelivery(getToken(), pickup);
    await refreshQuote();
  };

  const onApplyCoupon = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!discountCode.trim() || applying) return;

    setApplying(true);
    const res = await applyCoupon(getToken(), discountCode.trim());

    setCodeOk(Boolean(res?.success));
    setCodeResult(res?.message ?? "No pudimos validar el cupón.");

    if (res?.success) {
      setDiscountCode("");
      // El cupón puede cruzar el mínimo de envío gratis para abajo, así que el
      // envío se vuelve a pedir entero en vez de restar el descuento acá.
      await refreshQuote();
    }

    setApplying(false);
    setTimeout(() => setCodeResult(""), 4000);
  };

  const onRemoveCoupon = async () => {
    if (applying) return;

    setApplying(true);
    await removeCoupon(getToken());
    await refreshQuote();
    setApplying(false);
  };

  useEffect(() => {
    if (cart.amount_to_pay > 0) refreshQuote();
  }, []);

  const cuponPuesto = quote?.coupon ?? null;
  const faltaParaGratis = quote?.missing_for_free ?? 0;

  return (
    <article className="h-fit w-full rounded-2xl border border-line bg-white p-6 shadow-[0_14px_34px_rgba(30,5,63,0.06)] md:max-w-sm md:sticky md:top-4">
      <div className="w-full mb-8">
        <h5 className="mb-3 text-lg font-bold text-primary">Entrega</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <span className="text-xs">
            Conoce las opciones de envío, incluyendo plazos y costos
          </span>
          <select
            value={localPickup ? "local_pickup" : "shipping"}
            onChange={onShipTypeChange}
            className="h-11 rounded-xl border-[1.5px] border-line bg-white px-3 text-sm text-ink"
          >
            <option className="text-xs" value="shipping">
              Envío a domicilio
            </option>
            <option className="text-xs" value="local_pickup">
              Retiro en oficina
            </option>
          </select>
        </div>
        <div className="my-2">
          {localPickup ? (
            <span className="text-xs">
              Retiro en <strong>Figueroa 973, CABA</strong>
            </span>
          ) : (
            cart.amount_to_pay > 0 && (
              <span className="text-xs">
                Envío a:{" "}
                {quote?.address ? (
                  <strong>{quote.address}</strong>
                ) : (
                  <strong className="text-orange-500">
                    cargando dirección. . .
                  </strong>
                )}
              </span>
            )
          )}
        </div>

        {/* Lo que falta para el envío gratis. Solo aparece cuando falta algo:
            si ya está gratis, la fila de envío del resumen lo dice sola. */}
        {faltaParaGratis > 0 && (
          <div className="mt-3 rounded-xl border border-[#c6ecd5] bg-green-soft px-4 py-3">
            <p className="text-xs font-semibold text-green-ink">
              Te faltan {money(faltaParaGratis)} para el envío gratis.
            </p>
          </div>
        )}
      </div>

      <div className="mt-7 border-t border-line pt-6">
        <h5 className="mb-3 text-base font-semibold text-primary">
          ¿Tenés un cupón?
        </h5>

        {cuponPuesto ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-[#c6ecd5] bg-green-soft px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-bold text-green-ink">
                {cuponPuesto.code}
              </p>
              <p className="text-xs text-green-ink">
                {cuponPuesto.kind === "percentage"
                  ? `${cuponPuesto.value}% de descuento`
                  : `${money(cuponPuesto.value)} de descuento`}
              </p>
            </div>
            <button
              type="button"
              onClick={onRemoveCoupon}
              disabled={applying}
              className="shrink-0 text-xs font-semibold text-green-ink underline disabled:opacity-50"
            >
              Quitar
            </button>
          </div>
        ) : (
          <form>
            <label className="text-xs" htmlFor="coupon_code">
              Código del cupón
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                id="coupon_code"
                onChange={(e) => setDiscountCode(e.target.value)}
                value={discountCode}
                placeholder="XXXX XXXX"
                type="text"
                autoCapitalize="characters"
                className="h-11 rounded-xl border-[1.5px] border-line bg-panel px-4 text-sm uppercase text-ink placeholder:text-gray-400"
              />
              <button
                onClick={onApplyCoupon}
                disabled={applying || !discountCode.trim()}
                className="h-11 w-full rounded-full border-[1.5px] border-gray-300 bg-white text-sm font-semibold text-primary transition-colors hover:border-primary disabled:opacity-50"
              >
                {applying ? "Validando…" : "Agregar"}
              </button>
            </div>
          </form>
        )}

        <div className="min-h-4 pt-1">
          {codeResult && (
            <span
              className={`text-xs ${codeOk ? "text-green-500" : "text-red-500"}`}
            >
              {codeResult}
            </span>
          )}
          {/* El cupón dejó de aplicar entre que se puso y ahora: se le avisa,
              porque el total ya no lo incluye. */}
          {!codeResult && quote?.coupon_error && (
            <span className="text-xs text-red-500">{quote.coupon_error}</span>
          )}
        </div>
      </div>

      <div className="mt-7 border-t border-line pt-6">
        <h5 className="mb-4 text-lg font-bold text-primary">
          Resumen de la compra
        </h5>
        <div className="flex justify-between py-1.5 text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="text-ink">{money(cart.amount_to_pay)}</span>
        </div>
        <div className="flex justify-between py-1.5 text-sm">
          <span className="text-muted">Descuento</span>
          <span className={discount > 0 ? "font-semibold text-green_" : "text-ink"}>
            - {money(discount)}
          </span>
        </div>
        <div className="flex justify-between py-1.5 text-sm">
          <span className="text-muted">Envío</span>
          <span
            className={
              !shipmentError && quote?.free ? "font-bold text-green_" : "text-ink"
            }
          >
            {shipmentError
              ? "—"
              : !quote
              ? "A calcular"
              : quote.free
              ? "GRATIS"
              : money(quote.shippingCost)}
          </span>
        </div>
        {/* Por qué salió gratis. Un "GRATIS" sin explicación se lee como un
            error de la página tanto como un beneficio. */}
        {!shipmentError && quote?.free && (
          <p className="text-xs text-muted">
            {quote.reason === "local_pickup"
              ? "Retirás en nuestra oficina."
              : quote.reason === "caba"
              ? "Envío bonificado en CABA."
              : `Tu compra supera ${money(quote.free_shipping_min)}.`}
          </p>
        )}
        {shipmentError && <p className="text-xs text-red-500">{shipmentError}</p>}
        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <span className="text-base font-semibold text-primary">Total</span>
          <span className="text-3xl font-bold tracking-tight text-ink">
            {money(total)}
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
              shipments={{
                local_pickup: localPickup,
                cost: shippingCost,
                free_shipping: Boolean(quote?.free),
                receiver_address: { street_name: quote?.address ?? "" },
              }}
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
              shipments={{
                local_pickup: localPickup,
                cost: shippingCost,
                free_shipping: Boolean(quote?.free),
                receiver_address: { street_name: quote?.address ?? "" },
              }}
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
