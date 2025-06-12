// @ts-check
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import sectionize from "remark-sectionize";

export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: "https://pointers.js.org",
  output: "static",
  markdown: {
    remarkPlugins: [sectionize],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
    },
  },
});
