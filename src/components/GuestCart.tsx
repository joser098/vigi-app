import { useStore } from "@nanostores/react";
import { Cart, removeItemCart, totalItems } from "@/store/cartStore";
import { calulateTotals, formatItems } from "@/services/scripts";
import type { CartItem } from "@/services/types";

const money = (n: number) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });

// El carrito de quien todavía no dejó datos. Vive en el navegador, así que se
// dibuja acá en el cliente y no en cart.astro, que se arma en el servidor
// leyendo la cookie de sesión.
//
// No muestra costo de envío ni cupón a propósito: los dos se cotizan contra la
// dirección del cliente, y todavía no hay dirección. Aparecen en el paso
// siguiente, cuando ya la dejó.
const GuestCart = () => {
  const items = formatItems(useStore(Cart) ?? {}) as CartItem[];
  useStore(totalItems);

  const { amount_to_pay } = calulateTotals(items);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-white p-12">
        <span className="text-center text-muted">
          Tu carrito está vacío por el momento.
        </span>
        <a
          href="/"
          className="mt-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white"
        >
          Ver productos
        </a>
      </div>
    );
  }

  return (
    <section className="flex flex-col justify-between gap-8 md:flex-row md:gap-8">
      <article className="w-full">
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          {items.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 border-b border-line p-4 last:border-b-0 sm:gap-5 sm:p-5"
            >
              <img
                src={product.picture_url}
                alt={product.title}
                className="size-20 shrink-0 rounded-xl bg-panel object-contain p-2 sm:size-24"
                width="96"
                height="96"
                loading="lazy"
                decoding="async"
              />

              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold text-primary sm:text-base">
                  {product.title}
                </h2>
                <p className="mt-1 text-[13px] text-muted">
                  {product.quantity} × {money(product.unit_price)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="w-28 text-right text-lg font-bold text-ink">
                  {money(product.quantity * product.unit_price)}
                </p>
                <button
                  onClick={() => removeItemCart(product.id)}
                  aria-label={`Quitar ${product.title}`}
                  className="text-xs text-gray-500 hover:text-primary hover:underline"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </article>

      <aside className="h-fit w-full rounded-2xl border border-line bg-white p-6 md:max-w-sm">
        <h2 className="text-lg font-bold text-primary">Resumen</h2>

        <div className="mt-4 flex justify-between text-sm">
          <span className="text-muted">Productos</span>
          <span className="font-semibold text-ink">{money(amount_to_pay)}</span>
        </div>

        <p className="mt-2 text-[13px] text-muted">
          El envío se calcula en el paso siguiente, con tu dirección.
        </p>

        <a
          href="/datos"
          className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-primary text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          Continuar
        </a>

        <p className="mt-4 text-center text-[13px] text-muted">
          ¿Ya tenés cuenta?{" "}
          <a href="/login?redirect=/cart" className="font-semibold text-primary hover:underline">
            Iniciá sesión
          </a>
        </p>
      </aside>
    </section>
  );
};

export default GuestCart;
