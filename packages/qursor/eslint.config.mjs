import baseConfig from "@repo/eslint-config/base.js";
import reactConfig from "@repo/eslint-config/react-internal.js";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
