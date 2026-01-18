// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://footballcontent.site", // Your actual domain
  trailingSlash: "never", // keeps /blog not /blog/
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
