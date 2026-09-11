import type { APIRoute } from "astro";
import { getProductsByCategory } from "@/services/fetchData";
import { categories } from "@/services/const";
import type { Product } from "@/services/types";

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
  { path: "/nosotros", priority: "0.5", changefreq: "yearly" },
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

const url = (loc: string, changefreq: string, priority: string, lastmod: string) =>
  `<url><loc>${escape(loc)}</loc><lastmod>${lastmod}</lastmod>` +
  `<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;

export const GET: APIRoute = async () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries: string[] = [];

  for (const page of staticPages) {
    entries.push(url(`${SITE}${page.path}`, page.changefreq, page.priority, lastmod));
  }

  for (const c of categories) {
    entries.push(url(`${SITE}/category/${c.path}`, "daily", "0.8", lastmod));
  }

  /*
    Para juntar los productos se consultan las ocho de la navegación más
    `camaras`.

    Las ocho del menú son facetas (interior, exterior, batería, análogas...) y
    hay 24 cámaras que no tienen ninguna cargada: no salen en ninguna de las
    cuatro consultas de cámara y quedaban fuera del sitemap, que para una
    página que no tiene links entrantes es quedar fuera de Google. `camaras`
    es el valor crudo del campo `category` y las junta a todas.

    Solo se usa para descubrir productos: /category/camaras no se publica como
    URL de categoría porque no está en el menú y duplicaría casi entera a
    /category/exterior.
  */
  const slugsParaDescubrir = [...categories.map((c) => c.path), "camaras"];

  // Un producto puede estar en más de una categoría (una cámara de exterior a
  // batería sale en las dos), así que se deduplica por modelo.
  const vistos = new Set<string>();

  const porCategoria = await Promise.all(
    slugsParaDescubrir.map(async (slug) => {
      try {
        const lista = await getProductsByCategory(slug, "");
        return Array.isArray(lista) ? (lista as Product[]) : [];
      } catch {
        return [];
      }
    }),
  );

  for (const lista of porCategoria) {
    for (const p of lista) {
      if (!p?.model || vistos.has(p.model)) continue;
      vistos.add(p.model);

      // encodeURIComponent y no encodeURI: siete modelos de la línea solar
      // llevan una barra adentro del nombre ("HB8 2K+ (4MP) P/S") y sin
      // escaparla el sitemap publicaría una URL que parte la ruta en dos.
      entries.push(
        url(`${SITE}/product/${encodeURIComponent(p.model)}`, "weekly", "0.7", lastmod),
      );
    }
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
