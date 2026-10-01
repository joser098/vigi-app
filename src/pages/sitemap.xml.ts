import type { APIRoute } from "astro";
import { categories } from "@/services/const";
import { traerCatalogo } from "@/services/catalogo";
import { BRANDS } from "@/services/seoContent";
import { GUIAS } from "@/services/guias";

/*
  Sitemap armado a mano y on-demand, en vez de @astrojs/sitemap.

  La integración recorre las rutas que Astro construye en el build, y acá el
  catálogo entero —las ocho categorías y los ~650 productos— se renderiza
  on-demand (`prerender = false`). El resultado era un sitemap de trece URLs
  que no incluía ni un solo producto pero sí /login, /cart, /profile y /datos:
  o sea, cero páginas que quisiéramos posicionar y cuatro que no.

  Generarlo on-demand además lo mantiene al día. Cuando se carga un producto
  nuevo desde el panel aparece en el sitemap sin necesidad de un deploy, que es
  lo que pasaría con un fetch en tiempo de build.
*/
export const prerender = false;

const SITE = "https://www.vigi.com.ar";

// Las estáticas que sí queremos en Google. Las privadas y transaccionales
// (/cart, /login, /profile, /datos, /buscar...) quedan afuera a propósito y
// además mandan `noindex` desde el Layout.
const staticPages: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/guias", priority: "0.5", changefreq: "monthly" },
  { path: "/nosotros", priority: "0.5", changefreq: "yearly" },
  { path: "/legales/envios", priority: "0.3", changefreq: "yearly" },
  { path: "/legales/devoluciones", priority: "0.3", changefreq: "yearly" },
  { path: "/legales/terminos", priority: "0.3", changefreq: "yearly" },
  { path: "/legales/privacidad", priority: "0.3", changefreq: "yearly" },
];

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/*
  `lastmod` solo cuando hay una fecha real detrás.

  Antes todas las URLs decían la fecha del día. Google lo detecta y pasa a
  ignorar el campo en todo el sitemap, que es justo lo que no queremos: es la
  señal con la que se entera de que un precio cambió y vuelve a rastrear la
  ficha. Los productos usan `updated_at` (lo actualiza un trigger en cada
  cambio) y las guías su fecha de edición. Las categorías, las marcas y las
  estáticas no tienen una fecha honesta, así que van sin.
*/
const url = (
  loc: string,
  changefreq: string,
  priority: string,
  lastmod?: string | null,
) =>
  `<url><loc>${escape(loc)}</loc>` +
  (lastmod ? `<lastmod>${lastmod}</lastmod>` : "") +
  `<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;

const fecha = (iso?: string | null) => {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
};

export const GET: APIRoute = async () => {
  const entries: string[] = [];

  for (const page of staticPages) {
    entries.push(url(`${SITE}${page.path}`, page.changefreq, page.priority));
  }

  for (const c of categories) {
    entries.push(url(`${SITE}/category/${c.path}`, "daily", "0.8"));
  }

  for (const b of BRANDS) {
    entries.push(url(`${SITE}/marca/${b.slug}`, "daily", "0.7"));
  }

  for (const g of GUIAS) {
    entries.push(url(`${SITE}/guias/${g.slug}`, "monthly", "0.6", g.updated));
  }

  // Las mismas que lista el feed de Merchant Center: ver `traerCatalogo`.
  //
  // /category/camaras no se publica como URL de categoría aunque se consulte
  // para descubrir productos: no está en el menú y duplicaría casi entera a
  // /category/exterior.
  for (const p of await traerCatalogo()) {
    // encodeURIComponent y no encodeURI: siete modelos de la línea solar
    // llevan una barra adentro del nombre ("HB8 2K+ (4MP) P/S") y sin
    // escaparla el sitemap publicaría una URL que parte la ruta en dos.
    entries.push(
      url(
        `${SITE}/product/${encodeURIComponent(p.model)}`,
        "weekly",
        "0.7",
        fecha(p.updated_at),
      ),
    );
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    entries.join("") +
    `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Una hora en el edge. El sitemap lo pide un robot cada tanto, no hace
      // falta pegarle a la API ocho veces por visita de Googlebot.
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
};
