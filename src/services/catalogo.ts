import { getProductsByCategory } from "@/services/fetchData";
import { categories } from "@/services/const";
import type { Product } from "@/services/types";

/**
 * El catálogo entero, sin repetidos.
 *
 * La API no tiene un "traer todo": se consulta por categoría. Las ocho del menú
 * son facetas (interior, exterior, batería, análogas...) y hay cámaras que no
 * tienen ninguna cargada: no salen en ninguna de las consultas de cámara y se
 * perderían. `camaras` es el valor crudo del campo `category` y las junta a
 * todas.
 *
 * Un producto puede estar en más de una categoría (una cámara de exterior a
 * batería sale en las dos), así que se deduplica por modelo.
 *
 * Lo usan el sitemap y el feed de Google Merchant Center: los dos tienen que
 * listar exactamente los mismos productos.
 */
export const traerCatalogo = async (): Promise<Product[]> => {
  const slugs = [...categories.map((c) => c.path), "camaras"];

  const porCategoria = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const lista = await getProductsByCategory(slug, "");
        return Array.isArray(lista) ? (lista as Product[]) : [];
      } catch {
        return [];
      }
    }),
  );

  const vistos = new Set<string>();
  const productos: Product[] = [];

  for (const lista of porCategoria) {
    for (const p of lista) {
      if (!p?.model || vistos.has(p.model)) continue;
      vistos.add(p.model);
      productos.push(p);
    }
  }

  return productos;
};
