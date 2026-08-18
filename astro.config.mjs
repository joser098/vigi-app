import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.vigi.cam',
  integrations: [tailwind(), react(), sitemap()],
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});