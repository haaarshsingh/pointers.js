import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/styles.css"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions: (options) => {
    options.banner = {
      js: '"use client";',
    };
  },
});
