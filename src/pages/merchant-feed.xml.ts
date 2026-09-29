import type { APIRoute } from "astro";
import { PRODUCT_CATEGORY_LABEL } from "@/services/const";
import { traerCatalogo } from "@/services/catalogo";
import type { Product } from "@/services/types";

/*
  Feed de productos para Google Merchant Center (pestaña Shopping y fichas
  gratuitas).

  Merchant Center puede leer los productos rastreando las fichas, pero así el
  precio se actualiza cuando Google vuelve a pasar por cada página, que puede
  ser días después de un cambio en el panel. Con el feed, Merchant Center lo
  descarga entero una vez por día desde
  https://www.vigi.com.ar/merchant-feed.xml.

  Lo que dice el feed tiene que coincidir con lo que muestra la ficha: si el
  precio o la disponibilidad no coinciden, Google rechaza el producto. Por eso
  sale de los mismos datos que la ficha y el JSON-LD de
  `pages/product/[...model].astro`: mismo precio, misma imagen principal, mismo
  "en stock".

  El envío no va acá: se configura una sola vez en Merchant Center (gratis
  desde FREE_SHIPPING_MIN_PURCHASE, el resto por cotizador).
*/
export const prerender = false;

const SITE = "https://www.vigi.com.ar";
const ASSETS = import.meta.env.PUBLIC_ASSETS_URL;

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const tag = (nombre: string, valor: string | number | null | undefined) =>
  valor === null || valor === undefined || valor === ""
    ? ""
    : `<${nombre}>${escape(String(valor))}</${nombre}>`;

const precio = (n: number) => `${Math.round(n)} ARS`;

// Las mismas URLs que usa la galería de la ficha y su JSON-LD.
const imagenes = (p: Product) =>
  Array.from(
    { length: Math.max(1, p.gallery) },
    (_, i) =>
      `${ASSETS}/gallery/${encodeURIComponent(p.model).replace(/%20/g, "+")}/${i}.png`,
  );

const item = (p: Product) => {
  const categoria = PRODUCT_CATEGORY_LABEL[p.category] ?? p.category;
  const [principal, ...extra] = imagenes(p);

  // `price` ya viene con el descuento aplicado. En promoción, Google quiere el
  // precio de lista en `price` y el rebajado en `sale_price`: así muestra el
  // tachado igual que la ficha.
  const enPromo = p.has_promotion && p.price_original && p.price_original > p.price;

  // La descripción viene separada por " | ", igual que en el JSON-LD.
  const descripcion =
    p.description?.replace(/\s*\|\s*/g, ". ").trim() || `${p.provider} ${p.model}`;

  return (
    "<item>" +
    tag("g:id", p.model) +
    tag("g:title", `${p.provider} ${p.model} — ${categoria}`.slice(0, 150)) +
    tag("g:description", descripcion.slice(0, 5000)) +
    tag("g:link", `${SITE}/product/${encodeURIComponent(p.model)}`) +
    tag("g:image_link", principal) +
    extra.slice(0, 10).map((u) => tag("g:additional_image_link", u)).join("") +
    tag("g:availability", "in_stock") +
    tag("g:condition", "new") +
    tag("g:price", precio(enPromo ? p.price_original! : p.price)) +
    (enPromo ? tag("g:sale_price", precio(p.price)) : "") +
    tag("g:brand", p.provider) +
    tag("g:mpn", p.model) +
    tag("g:product_type", categoria) +
    "</item>"
  );
};

export const GET: APIRoute = async () => {
  const productos = (await traerCatalogo()).filter((p) => p.price > 0);

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel>` +
    `<title>VIGI</title><link>${SITE}</link>` +
    `<description>Cámaras de seguridad, alarmas y kits de videovigilancia</description>` +
    productos.map(item).join("") +
    `</channel></rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Una hora en el edge, como el sitemap. Merchant Center lo baja una vez
      // por día; no hace falta pegarle a la API en cada pedido.
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
};
