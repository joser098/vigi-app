import type { CartItem, CartModel } from "@/services/types";
import { calulateTotals } from "@/services/scripts";

// Carrito de quien todavía no dejó ningún dato.
//
// El carrito de verdad vive en el servidor y cuelga de un cliente: `carts`
// tiene `customer_id not null`. Un visitante que recién llega no tiene cliente,
// así que hasta que decida comprar el carrito vive acá, en su navegador. Cuando
// completa los datos en /datos se crea el cliente y esto se sube de una sola
// vez con `PUT /api/cart/add`, que reemplaza los ítems enteros.
//
// No guarda precios para cobrar: los precios se releen del catálogo. Lo que se
// guarda es lo que hace falta para dibujar el carrito sin pedirle nada a la API.
const KEY = "vigi_guest_cart";

const disponible = () => typeof window !== "undefined";

export const leerGuestCart = (): CartItem[] => {
  if (!disponible()) return [];

  try {
    const crudo = window.localStorage.getItem(KEY);
    if (!crudo) return [];

    const items = JSON.parse(crudo);
    if (!Array.isArray(items)) return [];

    // Un ítem sin id o sin cantidad rompería el resumen y el push a la API.
    // Es más barato descartarlo que descubrirlo en el checkout.
    return items.filter(
      (i) => i && typeof i.id === "string" && Number(i.quantity) > 0
    );
  } catch {
    // localStorage puede estar bloqueado (modo privado, cookies de terceros) o
    // el JSON puede haber quedado a medias. Un carrito vacío es mejor que una
    // pantalla rota.
    return [];
  }
};

export const escribirGuestCart = (items: CartItem[]) => {
  if (!disponible()) return;

  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Sin storage el carrito no sobrevive la recarga, pero la compra en curso
    // sigue andando: el estado en memoria es el que dibuja la pantalla.
  }
};

export const vaciarGuestCart = () => {
  if (!disponible()) return;

  try {
    window.localStorage.removeItem(KEY);
  } catch {}
};

export const guestCartModel = (): CartModel => {
  const items = leerGuestCart();

  return { items, ...calulateTotals(items) };
};
