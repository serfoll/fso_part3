/** @format */

import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  js.configs.recommended,
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/quotes": ["error", "single"],
      "@stylistic/semi": ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "off",
    },
  },
]);
