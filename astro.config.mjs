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
    // Home, categorías y fichas se sirven desde el cache del edge y se
    // regeneran cada 5 minutos: velocidad de página estática sin dejar los
    // precios congelados hasta el próximo deploy.
    isr: {
      expiration: 60 * 5,
      // Todo lo que depende de quién esté mirando no se puede cachear.
      exclude: [
        "/cart",
        "/profile",
        "/login",
        "/register",
        "/forgot-password",
        "/buscar",
        /^\/payment\/.+/,
        /^\/new-password\/.+/,
      ]
    }
  })
});
