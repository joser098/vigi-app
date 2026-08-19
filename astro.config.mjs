import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.vigi.cam',
  integrations: [react(), sitemap()],
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
