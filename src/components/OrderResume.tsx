import type { CartModel } from "@/services/types";
import PayCartButton from "./PayCartButton";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  applyCoupon,
  getAgencies,
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
interface DeliveryOption {
  price: number;
  // Lo que cotizó Correo, cuando el retiro sale gratis: para mostrarlo tachado.
  list_price?: number;
  days_min: number | null;
  days_max: number | null;
}

interface Agency {
  code: string;
  name: string;
  address: string;
  locality: string | null;
  province: string | null;
  // Correo la marca como cercana al CP del cliente.
  near?: boolean;
}

type DeliveryType = "D" | "S" | "A";

interface ShippingQuote {
  address: string;
  // null cuando Correo no cotizó lo elegido: no se puede pagar así, pero sí
  // eligiendo "acordar envío".
  shippingCost: number | null;
  free: boolean;
  reason: "caba" | "min_purchase" | null;
  // "D" Correo a domicilio, "S" Correo retiro en sucursal, "A" acordar envío.
  delivery_type: DeliveryType;
  // null cuando Correo no pudo cotizar; `quote_error` dice por qué.
  options: { D: DeliveryOption | null; S: DeliveryOption | null } | null;
  quote_error: string | null;
  agency: Agency | null;
  // "caba": domicilio y sucursal gratis. "min_purchase": solo sucursal.
  free_reason: "caba" | "min_purchase" | null;
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

const plazo = (o: DeliveryOption) =>
  o.days_min && o.days_max ? `${o.days_min} a ${o.days_max} días hábiles` : "";

const OrderResume = ({ cart }: { cart: CartModel }) => {
  const [quote, setQuote] = useState<ShippingQuote | null>(null);

  const [discountCode, setDiscountCode] = useState("");
  const [codeResult, setCodeResult] = useState("");
  const [codeOk, setCodeOk] = useState(false);
  const [applying, setApplying] = useState(false);

  const [disablePay, setDisablePay] = useState(true);
  const [shipmentError, setShipmentError] = useState("");

  // Forma de entrega marcada en pantalla. Coincide con la del servidor salvo
  // al marcar "sucursal": eso no se guarda hasta que se elige cuál, porque sin
  // sucursal no hay pedido.
  const [elegida, setElegida] = useState<DeliveryType>("D");
  const wantsSucursal = elegida === "S";
  const [agencies, setAgencies] = useState<Agency[] | null>(null);
  const [savingDelivery, setSavingDelivery] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");
  const acordarModal = useRef<HTMLDialogElement>(null);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  // Todo el resumen sale del servidor: es él quien decide el total que se cobra, así que la pantalla no puede tener su
  // propia versión de la cuenta.
  const subtotal = quote?.subtotal ?? cart.amount_to_pay;
  const discount = quote?.discount ?? 0;
  const shippingCost = quote?.shippingCost ?? 0;
  // Correo no cotizó lo elegido: hay que elegir otra opción para pagar.
  const sinCotizacion = Boolean(quote) && quote?.shippingCost === null;
  const total = quote?.amount_to_pay ?? subtotal;

  // Si la cotización falla (sesión vencida, Correo caído), el pago queda
  // deshabilitado en vez de mostrar un total inventado.
  const refreshQuote = async () => {
    setDisablePay(true);
    setShipmentError("");

    const data = await getShippingCost(getToken());

    // Sin `delivery_type` ni `shippingCost` no es una respuesta del cotizador
    // (sesión vencida, API caída). Un `shippingCost` null con `delivery_type`
    // sí lo es: Correo no cotizó, y se ofrece acordar el envío. Con
    // `shippingCost` y sin `delivery_type` es la API anterior a Correo: se
    // muestra el costo como siempre, sin opciones.
    if (!data?.delivery_type && typeof data?.shippingCost !== "number") {
      setQuote(null);
      setShipmentError("No pudimos calcular el costo de envío. Intentá de nuevo.");
      return;
    }

    setQuote(data as ShippingQuote);
    setElegida(data.delivery_type ?? "D");
    setDisablePay(data.shippingCost === null);
  };

  const loadAgencies = async () => {
    if (agencies) return;
    const list = await getAgencies(getToken());
    if (!list) {
      setDeliveryError("No pudimos cargar las sucursales. Intentá de nuevo.");
      return;
    }
    setAgencies(list);
  };

  const saveDelivery = async (type: DeliveryType, agencyCode?: string) => {
    setSavingDelivery(true);
    setDeliveryError("");

    const res = await setDelivery(getToken(), type, agencyCode);

    if (!res?.success) {
      setDeliveryError(res?.message ?? "No pudimos guardar la forma de entrega.");
    } else {
      await refreshQuote();
    }

    setSavingDelivery(false);
  };

  // Domicilio y acordar se guardan al toque; sucursal espera a que elija cuál.
  const choose = (type: DeliveryType) => {
    setElegida(type);
    if (type !== "S" && quote?.delivery_type !== type) saveDelivery(type);
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
    setSlot(document.getElementById("entrega-slot"));
  }, []);

  // Al marcar sucursal (o si el carrito ya la tenía elegida) se carga la lista.
  useEffect(() => {
    if (wantsSucursal) loadAgencies();
  }, [wantsSucursal]);

  const opciones = quote?.options ?? null;
  const sucursalElegida = quote?.delivery_type === "S" ? quote.agency : null;
  // Marcó sucursal pero todavía no eligió cuál: no se puede pagar.
  const faltaSucursal = wantsSucursal && !sucursalElegida;
  const ahorroSucursal =
    opciones?.D && opciones?.S ? opciones.D.price - opciones.S.price : 0;
  const etiquetaSucursal = (a: Agency) =>
    `${a.name} — ${a.address}${a.locality ? `, ${a.locality}` : ""}`;

  const cuponPuesto = quote?.coupon ?? null;
  const faltaParaGratis = quote?.missing_for_free ?? 0;

  // La entrega va debajo de los productos cuando la página tiene dónde
  // ponerla (cart.astro deja #entrega-slot): en la columna del resumen hacía
  // una tira larguísima. Es un portal y no otro componente porque comparte
  // todo el estado con el resumen: la opción elegida cambia el total.
  const entrega = (
    <>
      <h5 className="mb-3 text-lg font-bold text-primary">Entrega</h5>
      <span className="text-xs">Enviamos por Correo Argentino a todo el país.</span>
      <div className="my-2">
        {cart.amount_to_pay > 0 && (
          <span className="text-xs">
            Tu dirección:{" "}
            {quote?.address ? (
              <strong>{quote.address}</strong>
            ) : (
              <strong className="text-orange-500">
                cargando dirección. . .
              </strong>
            )}
          </span>
        )}
      </div>

      {/* Solo con la API que cotiza con Correo: la anterior no entiende
          de formas de entrega. */}
      {quote?.delivery_type && (
        <fieldset className="mt-3 flex flex-col gap-2" disabled={savingDelivery}>
          <legend className="sr-only">Forma de entrega</legend>

          {/* Sucursal primero: es la más barata y la que conviene empujar. */}
          {opciones?.S && (
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl border-[1.5px] px-4 py-3 ${
                wantsSucursal ? "border-primary bg-panel" : "border-line"
              }`}
            >
              <input
                type="radio"
                name="delivery_type"
                className="mt-1"
                checked={wantsSucursal}
                onChange={() => choose("S")}
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-ink">
                    Retiro en sucursal
                  </span>
                  <span className="text-sm font-bold text-green_">
                    {opciones.S.price === 0 ? (
                      <>
                        {opciones.S.list_price ? (
                          <s className="mr-1 font-normal text-muted">
                            {money(opciones.S.list_price)}
                          </s>
                        ) : null}
                        GRATIS
                      </>
                    ) : (
                      money(opciones.S.price)
                    )}
                  </span>
                </span>
                <span className="block text-xs text-muted">
                  {ahorroSucursal > 0 && (
                    <strong className="text-green-ink">
                      Ahorrás {money(ahorroSucursal)}.{" "}
                    </strong>
                  )}
                  {plazo(opciones.S)}
                </span>
              </span>
            </label>
          )}

          {opciones?.D && (
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl border-[1.5px] px-4 py-3 ${
                elegida === "D" ? "border-primary bg-panel" : "border-line"
              }`}
            >
              <input
                type="radio"
                name="delivery_type"
                className="mt-1"
                checked={elegida === "D"}
                onChange={() => choose("D")}
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-ink">
                    Envío a domicilio
                  </span>
                  <span
                    className={`text-sm ${
                      opciones.D.price === 0 ? "font-bold text-green_" : "font-semibold text-ink"
                    }`}
                  >
                    {opciones.D.price === 0 ? (
                      <>
                        <s className="mr-1 font-normal text-muted">
                          {money(opciones.D.list_price ?? 0)}
                        </s>
                        GRATIS
                      </>
                    ) : (
                      money(opciones.D.price)
                    )}
                  </span>
                </span>
                <span className="block text-xs text-muted">{plazo(opciones.D)}</span>
              </span>
            </label>
          )}

          {/* Siempre disponible: si el cliente tiene otra forma de recibirlo,
              o si Correo no cotizó, igual puede pagar y coordinamos después. */}
          <label
            className={`flex cursor-pointer items-start gap-3 rounded-xl border-[1.5px] px-4 py-3 ${
              elegida === "A" ? "border-primary bg-panel" : "border-line"
            }`}
          >
            <input
              type="radio"
              name="delivery_type"
              className="mt-1"
              checked={elegida === "A"}
              onChange={() => choose("A")}
            />
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-ink">
                  Acordar el envío
                </span>
                <span className="text-sm text-muted">A coordinar</span>
              </span>
              <span className="block text-xs text-muted">
                Pagás ahora solo los productos y después nos escribís por
                WhatsApp para coordinar la entrega.
              </span>
              {elegida === "A" && (
                <button
                  type="button"
                  onClick={(e) => {
                    // Está dentro del label: sin esto el click también marca
                    // el radio, que ya está marcado, y vuelve a guardar.
                    e.preventDefault();
                    acordarModal.current?.showModal();
                  }}
                  className="mt-1 text-xs font-semibold text-primary underline"
                >
                  ¿Cómo funciona?
                </button>
              )}
            </span>
          </label>
        </fieldset>
      )}

      <AcordarEnvioModal dialogRef={acordarModal} />

      {quote?.quote_error && (
        <p className="mt-2 text-xs text-orange-500">
          {quote.quote_error} Podés elegir acordar el envío y pagar igual.
        </p>
      )}

      {wantsSucursal && (
        <div className="mt-3">
          <label className="text-xs" htmlFor="agency">
            Sucursal donde lo retirás
          </label>
          {agencies ? (
            <select
              id="agency"
              value={sucursalElegida?.code ?? ""}
              disabled={savingDelivery}
              onChange={(e) => e.target.value && saveDelivery("S", e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border-[1.5px] border-line bg-panel px-3 text-sm text-ink"
            >
              <option value="">Elegí una sucursal…</option>
              {agencies.some((a) => a.near) && (
                <optgroup label="Cerca de tu código postal">
                  {agencies
                    .filter((a) => a.near)
                    .map((a) => (
                      <option key={a.code} value={a.code}>
                        {etiquetaSucursal(a)}
                      </option>
                    ))}
                </optgroup>
              )}
              <optgroup label="Resto de la provincia">
                {agencies
                  .filter((a) => !a.near)
                  .map((a) => (
                    <option key={a.code} value={a.code}>
                      {etiquetaSucursal(a)}
                    </option>
                  ))}
              </optgroup>
            </select>
          ) : (
            !deliveryError && (
              <p className="mt-1 text-xs text-orange-500">cargando sucursales. . .</p>
            )
          )}
        </div>
      )}

      {deliveryError && (
        <p className="mt-2 text-xs text-red-500">{deliveryError}</p>
      )}

      {/* Lo que falta para retirar gratis. Solo aparece cuando falta algo:
          si ya está gratis, la opción de sucursal lo dice sola. */}
      {faltaParaGratis > 0 && (
        <div className="mt-3 rounded-xl border border-[#c6ecd5] bg-green-soft px-4 py-3">
          <p className="text-xs font-semibold text-green-ink">
            Te faltan {money(faltaParaGratis)} para retirar gratis en sucursal.
          </p>
        </div>
      )}
    </>
  );

  return (
    <article className="h-fit w-full rounded-2xl border border-line bg-white p-6 shadow-[0_14px_34px_rgba(30,5,63,0.06)] md:max-w-sm md:sticky md:top-4">
      {slot ? (
        createPortal(
          <section className="mt-6 rounded-2xl border border-line bg-white p-6">
            {entrega}
          </section>,
          slot
        )
      ) : (
        <div className="w-full mb-8">{entrega}</div>
      )}

      <div className={slot ? "" : "mt-7 border-t border-line pt-6"}>
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
            {shipmentError || sinCotizacion
              ? "—"
              : !quote
              ? "A calcular"
              : quote.delivery_type === "A"
              ? "A coordinar"
              : quote.free
              ? "GRATIS"
              : money(shippingCost)}
          </span>
        </div>
        {/* Por qué salió gratis. Un "GRATIS" sin explicación se lee como un
            error de la página tanto como un beneficio. */}
        {!shipmentError && quote?.free && (
          <p className="text-xs text-muted">
            {quote.reason === "caba"
              ? "Envío bonificado en CABA."
              : `Retiro en sucursal gratis: tu compra supera ${money(quote.free_shipping_min)}.`}
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
          Pagar
        </h5>
        <p className="mb-4 text-xs text-muted">
          Te lleva al checkout de Mercado Pago. No guardamos los datos de tu
          tarjeta.
        </p>
        {/* Nave está implementado del lado de la API pero sin credenciales,
            así que el botón no se muestra: ofrecer un medio de pago que va a
            fallar en la pasarela es peor que no ofrecerlo. Para volver a
            activarlo alcanza con reponer este bloque con method="nv". */}
        <div className="flex flex-col gap-5">
          <div>
            <PayCartButton
              disablePay={disablePay || savingDelivery || faltaSucursal}
              cart={cart}
              finalTotal={total}
              shipments={{
                local_pickup: false,
                cost: shippingCost,
                free_shipping: Boolean(quote?.free),
                receiver_address: { street_name: quote?.address ?? "" },
              }}
              method="mp"
            />
            <p className="mt-2 text-center text-xs text-muted">
              {faltaSucursal
                ? "Elegí la sucursal donde lo retirás para continuar."
                : sinCotizacion
                ? "Elegí otra forma de entrega para continuar."
                : "Dinero en cuenta, crédito o débito."}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

/**
 * Qué es "acordar el envío". Las condiciones completas están en la política de
 * envíos (/legales/envios); si cambian acá, cambian allá.
 */
const AcordarEnvioModal = ({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
}) => {
  const cerrar = () => dialogRef.current?.close();

  const pasos = [
    "Pagás ahora solo los productos. El envío no se cobra en el checkout.",
    "Después de pagar, escribinos por WhatsApp, elegí “Acordar envío de compra” y mandanos tu número de pedido (está en la pantalla de compra y en el mail, que trae un botón que lo hace por vos).",
    "Una persona del equipo coordina con vos el punto, el día y el horario.",
    "Llevamos el paquete sin cargo a un punto de CABA que te sirva: por ejemplo, la terminal de un expreso o transporte de encomiendas, un comisionista, o la dirección de alguien de confianza.",
    "Lo entregamos a la persona o empresa que nos indiques por escrito y te mandamos la constancia (remito firmado, comprobante del transporte o foto).",
  ];

  return (
    <dialog
      ref={dialogRef}
      // Click en el fondo cierra, igual que los otros modales del sitio.
      onClick={(e) => e.target === dialogRef.current && cerrar()}
      className="w-[min(560px,calc(100vw-2rem))] rounded-3xl p-0 backdrop:bg-primary/40 backdrop:backdrop-blur-sm"
    >
      <header className="flex items-center justify-between gap-4 border-b border-line px-6 py-5">
        <h2 className="text-lg font-bold text-primary">Acordar el envío</h2>
        <button
          type="button"
          onClick={cerrar}
          aria-label="Cerrar"
          className="flex size-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-panel hover:text-primary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
        <p className="text-[13px] leading-relaxed text-muted">
          Es para cuando te conviene recibirlo de otra forma: tenés un
          transporte de confianza, un expreso que llega a tu ciudad, o alguien
          que lo puede retirar por vos en CABA.
        </p>

        <ol className="mt-5 flex flex-col gap-3">
          {pasos.map((paso, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-[13px] leading-relaxed text-ink">{paso}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-2xl border border-line bg-panel px-5 py-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-gray-400">
            Tené en cuenta
          </h3>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-4 text-[12px] leading-relaxed text-muted">
            <li>
              Desde que entregamos el paquete en el punto acordado, el traslado
              que sigue (costo, plazos y cuidado del paquete) corre por tu
              cuenta o la del transporte que elegiste. Te recomendamos
              declararle el valor para que viaje asegurado.
            </li>
            <li>
              Si el punto está fuera de CABA, puede tener un costo: te lo
              decimos antes y solo se cobra si lo aceptás.
            </li>
            <li>
              Si no nos escribís dentro de los 10 días, o no llegamos a
              coordinar, podés pasarte a envío por Correo Argentino pagando su
              costo, o cancelar la compra con reintegro total.
            </li>
            <li>La garantía y tu derecho de arrepentimiento no cambian.</li>
          </ul>
        </div>

        <p className="mt-5 text-[12px] text-muted">
          Las condiciones completas están en la{" "}
          <a href="/legales/envios#acordar" target="_blank" className="font-semibold text-primary underline">
            política de envíos
          </a>
          .
        </p>
      </div>

      <footer className="flex justify-end border-t border-line px-6 py-4">
        <button
          type="button"
          onClick={cerrar}
          className="h-11 rounded-full bg-primary px-7 text-sm font-semibold text-white"
        >
          Entendido
        </button>
      </footer>
    </dialog>
  );
};

export default OrderResume;
