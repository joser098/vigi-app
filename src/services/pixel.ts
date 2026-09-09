// Eventos del píxel de Meta desde componentes de React.
//
// Todo pasa por acá y no por `fbq(...)` suelto por tres motivos:
//
//   - `fbq` puede no existir. Un bloqueador de publicidad, o el script todavía
//     cargando, no pueden romper el botón de agregar al carrito. Es un evento de
//     medición: si se pierde, se pierde, pero la compra sigue.
//   - Meta descarta los eventos sin `currency` cuando mandás `value`. Acá la
//     moneda es siempre ARS y se pone sola.
//   - El `eventID` deja la puerta abierta a la API de Conversiones: cuando el
//     mismo evento salga también desde vigi-api, Meta une los dos por ese id en
//     vez de contar la compra dos veces.

type DatosEvento = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const MONEDA = "ARS";

export const trackPixel = (
  evento: string,
  datos: DatosEvento = {},
  eventID?: string
) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  try {
    if (eventID) {
      window.fbq("track", evento, datos, { eventID });
      return;
    }

    window.fbq("track", evento, datos);
  } catch {
    // Medir nunca puede tumbar la pantalla.
  }
};

// Los ítems del carrito en la forma que espera Meta.
export const contenidos = (
  items: { id: string; quantity: number; unit_price: number }[]
) =>
  items.map((i) => ({
    id: i.id,
    quantity: i.quantity,
    item_price: i.unit_price,
  }));
