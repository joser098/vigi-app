import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // Con www. El dominio sin www redirige 308 a www.vigi.com.ar, así que
  // `https://vigi.com.ar` acá hacía que todas las canónicas y todas las URLs
  // del sitemap apuntaran a una redirección. Google las sigue, pero pierde
  // tiempo de rastreo en cada una y, cuando el sitemap y la canónica no
  // coinciden con lo que el servidor entrega, elige la canónica él.
  site: 'https://www.vigi.com.ar',

  // /nosotros y /nosotros/ devolvían las dos un 200 con el mismo HTML: dos
  // URLs para una página. Ahora la de la barra final redirige.
  trailingSlash: 'never',

  // El sitemap viejo lo generaba @astrojs/sitemap y quedó registrado en Search
  // Console. Sin esto pasaría a dar 404 y la consola marcaría el sitemap como
  // "no se pudo leer" hasta que alguien lo borre a mano.
  redirects: {
    '/sitemap-index.xml': '/sitemap.xml',
    '/sitemap-0.xml': '/sitemap.xml',
  },

  integrations: [react()],
  output: "static",
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    // Sin ISR a propósito.
    //
    // Acá había un cache de edge de 5 minutos sobre home, categorías y fichas.
    // El problema no era la ventana: era que Vercel sirve *stale while
    // revalidate*. Pasado el vencimiento entrega la copia vieja y recién
    // entonces regenera en segundo plano, así que la versión nueva aparece en
    // la visita SIGUIENTE. Con el tráfico de hoy eso significa que un cambio de
    // precio hecho en el panel podía no verse nunca en una recarga normal:
    // medido en producción, `x-vercel-cache: STALE` con `age: 348`.
    //
    // Un precio viejo en pantalla no es solo una molestia: el carrito cobra lo
    // que dice la base, así que el cliente ve un número y paga otro.
    //
    // El costo de sacarlo es una llamada a la API por visita, que entre Vercel
    // y Railway es de milisegundos. Si el tráfico crece y hace falta volver a
    // cachear, la forma correcta no es subir el expiration sino purgar bajo
    // demanda: `isr.bypassToken` más un ping a la URL con el header
    // `x-prerender-revalidate` cuando el panel guarda un producto.
  })
});
