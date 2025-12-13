import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import next from "@next/eslint-plugin-next";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
   {
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // ⛔ React JSX-এ class detect করে error দেখাবে
      "react/no-unknown-property": ["error", { ignore: [] }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);


export default eslintConfig;
