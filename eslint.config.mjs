import globals from "globals";
import jsPlugin from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import React from "react";
import jestPlugin from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules/**", ".next/**", "out/**"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        jest: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      prettier: prettierPlugin,
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      jest: jestPlugin,
    },
    env: {
      browser: true,
      es2021: true,
      "jest/globals": true, // Add this line
    },
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off", // Turn off the rule for React 17+
      "react/prop-types": "off", // Turn off prop-types rule if not using prop-types
      ...jsPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
    },
  },
];
