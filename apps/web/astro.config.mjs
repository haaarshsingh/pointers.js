// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sectionize from "remark-sectionize";

export default defineConfig({
  integrations: [tailwind(), mdx()],
  markdown: {
    remarkPlugins: [sectionize],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
    },
  },
});
