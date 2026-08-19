import { getCustomerOrders } from "@/services/fetchData";
import { getToken } from "@/services/scripts";
import { useEffect, useState } from "react";
import Loader from "../Icons/Loader";

/**
 * Las compras del cliente.
 *
 * La versión anterior mostraba fecha, número de orden y "1 Artículo": ni qué
 * había comprado, ni cuánto había pagado, ni en qué punto del camino estaba el
 * pedido. Todo eso ya venía en la respuesta de la API o estaba a un join de
 * distancia; solo faltaba mostrarlo.
 */
interface OrderItem {
  name: string;
  quantity: number;
  unit_price: number;
  model: string | null;
  thumbnail: string | null;
}

interface Order {
  id: string;
  payment_id: string;
  amount_paid: number;
  discount: number;
  coupon_code: string | null;
  status: string;
  status_label: string;
  status_order: number;
  status_is_final: boolean;
  date: string;
  items: OrderItem[];
}

const money = (n: number) =>
  Number(n).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });

const fechaLarga = (iso: string) => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";

  return d.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Los cuatro estados de order_statuses, en orden. El seguimiento se dibuja
// contra `status_order`, así que si mañana se agrega un estado en la base hay
// que sumarlo acá también.
const PASOS = [
  { orden: 1, label: "Recibido" },
  { orden: 2, label: "En preparación" },
  { orden: 3, label: "Enviado" },
  { orden: 4, label: "Entregado" },
];

const Seguimiento = ({ actual }: { actual: number }) => (
  <ol className="flex items-center gap-1" aria-label="Estado del pedido">
    {PASOS.map((paso, i) => {
      const alcanzado = paso.orden <= actual;

      return (
        <li key={paso.orden} className="flex flex-1 items-center gap-1">
          <div className="flex flex-1 flex-col gap-1.5">
            <span
              className={`h-1 rounded-full ${alcanzado ? "bg-green_" : "bg-gray-200"}`}
              aria-hidden="true"
            />
            <span
              className={`text-[10px] leading-tight sm:text-[11px] ${
                paso.orden === actual
                  ? "font-bold text-green-ink"
                  : alcanzado
                    ? "text-muted"
                    : "text-gray-400"
              }`}
            >
              {paso.label}
            </span>
          </div>
          {i < PASOS.length - 1 && <span className="sr-only">→</span>}
        </li>
      );
    })}
  </ol>
);

const Compra = ({ orden }: { orden: Order }) => {
  const unidades = orden.items.reduce((t, i) => t + i.quantity, 0);
  const subtotal = orden.items.reduce((t, i) => t + i.unit_price * i.quantity, 0);
  const entregado = orden.status === "entregado";

  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-panel px-5 py-3.5">
        <div>
          <p className="text-[13px] font-semibold text-primary">
            {fechaLarga(orden.date)}
          </p>
          <p className="text-xs text-muted">
            Pedido <span className="font-medium text-ink">{orden.payment_id}</span>
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            entregado
              ? "bg-green-soft text-green-ink"
              : "bg-urgency-soft text-urgency"
          }`}
        >
          {orden.status_label}
        </span>
      </header>

      <div className="px-5 py-4">
        <Seguimiento actual={orden.status_order} />
      </div>

      <ul className="border-t border-line">
        {orden.items.map((item, i) => (
          <li
            key={`${orden.id}-${i}`}
            className="flex items-center gap-4 border-b border-line px-5 py-4 last:border-b-0"
          >
            {item.thumbnail ? (
              <img
                src={item.thumbnail}
                alt={item.name}
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
                className="size-16 shrink-0 rounded-xl bg-panel object-contain p-1.5"
              />
            ) : (
              <div className="size-16 shrink-0 rounded-xl bg-panel" aria-hidden="true" />
            )}

            <div className="min-w-0 flex-1">
              {/* El modelo puede faltar si el producto se dio de baja: ahí el
                  nombre del snapshot es lo único que queda. */}
              {item.model ? (
                <a
                  href={`/product/${item.model}`}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {item.name}
                </a>
              ) : (
                <span className="text-sm font-semibold text-primary">{item.name}</span>
              )}
              <p className="mt-0.5 text-xs text-muted">
                {item.quantity} × {money(item.unit_price)}
              </p>
            </div>

            <p className="shrink-0 text-sm font-bold text-ink">
              {money(item.unit_price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <footer className="border-t border-line px-5 py-4">
        <div className="ml-auto max-w-xs">
          <div className="flex justify-between py-1 text-[13px]">
            <span className="text-muted">
              {unidades} {unidades === 1 ? "artículo" : "artículos"}
            </span>
            <span className="text-ink">{money(subtotal)}</span>
          </div>

          {orden.discount > 0 && (
            <div className="flex justify-between py-1 text-[13px]">
              <span className="text-muted">
                Cupón {orden.coupon_code && <strong>{orden.coupon_code}</strong>}
              </span>
              <span className="font-semibold text-green_">− {money(orden.discount)}</span>
            </div>
          )}

          <div className="mt-2 flex items-baseline justify-between border-t border-line pt-2">
            <span className="text-sm font-semibold text-primary">Total pagado</span>
            <span className="text-xl font-bold tracking-tight text-ink">
              {money(orden.amount_paid)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <a
            href={`https://wa.me/541126039243?text=${encodeURIComponent(
              `Hola! Consulto por mi pedido ${orden.payment_id}`
            )}`}
            target="_blank"
            rel="noopener"
            className="inline-flex h-10 items-center justify-center rounded-full border-[1.5px] border-gray-300 bg-white px-5 text-[13px] font-semibold text-primary transition-colors hover:border-primary"
          >
            Consultar por este pedido
          </a>
          {orden.items[0]?.model && (
            <a
              href={`/product/${orden.items[0].model}`}
              className="inline-flex h-10 items-center justify-center rounded-full border-[1.5px] border-gray-300 bg-white px-5 text-[13px] font-semibold text-primary transition-colors hover:border-primary"
            >
              Volver a comprar
            </a>
          )}
        </div>
      </footer>
    </li>
  );
};

const PurchasesInfo = () => {
  const [purchases, setPurchases] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const response = await getCustomerOrders(getToken());

      // La API devuelve el error crudo cuando algo falla, no un array. Antes
      // eso llegaba a .reverse() y la sección entera desaparecía.
      if (!Array.isArray(response)) {
        setError("No pudimos cargar tus compras. Probá de nuevo en un momento.");
      } else {
        setPurchases(response);
      }

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-line bg-white px-6 py-12 text-center">
        <p className="text-sm text-muted">{error}</p>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-white px-6 py-16 text-center">
        <span className="mb-4 text-gray-300">
          <svg
            height="54"
            width="54"
            viewBox="0 0 16 16"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.75 7.75C6.30228 7.75 6.75 7.30228 6.75 6.75C6.75 6.19772 6.30228 5.75 5.75 5.75C5.19772 5.75 4.75 6.19772 4.75 6.75C4.75 7.30228 5.19772 7.75 5.75 7.75ZM11.25 6.75C11.25 7.30228 10.8023 7.75 10.25 7.75C9.69771 7.75 9.25 7.30228 9.25 6.75C9.25 6.19772 9.69771 5.75 10.25 5.75C10.8023 5.75 11.25 6.19772 11.25 6.75ZM11.5249 11.2622L11.8727 11.7814L10.8342 12.4771L10.4863 11.9578C9.94904 11.1557 9.0363 10.6298 8.00098 10.6298C6.96759 10.6298 6.05634 11.1537 5.51863 11.9533L5.16986 12.4719L4.13259 11.7744L4.48137 11.2558C5.2414 10.1256 6.53398 9.37982 8.00098 9.37982C9.47073 9.37982 10.7654 10.1284 11.5249 11.2622Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <h2 className="text-lg font-bold text-primary sm:text-xl">
          Todavía no hiciste ninguna compra
        </h2>
        <p className="mt-2 text-sm text-muted">
          Cuando compres, acá vas a poder seguir tus pedidos.
        </p>
        <a
          href="/"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white"
        >
          Ver productos
        </a>
      </div>
    );
  }

  return (
    <section>
      <ul className="flex flex-col gap-5">
        {purchases.map((orden) => (
          <Compra key={orden.id} orden={orden} />
        ))}
      </ul>
    </section>
  );
};

export default PurchasesInfo;
