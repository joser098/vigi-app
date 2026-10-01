/**
 * Guías de compra (/guias).
 *
 * Apuntan a las búsquedas de quien todavía no sabe qué comprar ("qué cámara
 * de seguridad comprar", "cámara wifi o dvr"), que una ficha o una categoría
 * no contestan. Cada guía termina mandando a las categorías que corresponden.
 *
 * Una lista acá y no `import.meta.glob` sobre las páginas: la usan el índice,
 * el sitemap y el layout de cada guía, y así una guía nueva se agrega en un
 * solo lugar. `updated` es lo que va al <lastmod> del sitemap y al
 * `dateModified` del schema: cambiarlo solo cuando el texto cambia de verdad.
 */
export interface Guia {
  slug: string;
  title: string;
  /** Para la tarjeta del índice y la meta description. Hasta ~155 caracteres. */
  description: string;
  published: string;
  updated: string;
}

export const GUIAS: Guia[] = [
  {
    slug: "como-elegir-camara-de-seguridad",
    title: "Cómo elegir una cámara de seguridad para tu casa",
    description:
      "Resolución, visión nocturna, Wi-Fi o cable, dónde grabar y cuántas cámaras necesitás. Todo lo que hay que mirar antes de comprar, explicado simple.",
    published: "2026-10-01",
    updated: "2026-10-01",
  },
  {
    slug: "camaras-wifi-o-dvr",
    title: "Cámaras Wi-Fi o sistema con DVR: cuál te conviene",
    description:
      "Diferencias entre cámaras Wi-Fi, sistemas analógicos con DVR y cámaras IP con NVR: instalación, costo, estabilidad y para qué caso sirve cada uno.",
    published: "2026-10-01",
    updated: "2026-10-01",
  },
  {
    slug: "camaras-a-bateria-y-solares",
    title: "Cámaras a batería y solares: lo que tenés que saber",
    description:
      "Cómo funcionan las cámaras a batería, cuánto dura la carga, cuándo conviene el panel solar y cuándo una 4G. Ventajas y límites antes de comprar.",
    published: "2026-10-01",
    updated: "2026-10-01",
  },
];
