import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-unused-vars": "off", // Disable unused variables warning
      "@typescript-eslint/no-unused-vars": [
        "warn", // Change from "error" to "warn"
        {
          vars: "all",
          args: "none", // Ignore unused function arguments like `props`
          ignoreRestSiblings: true, // Allow object rest/spread usage
        },
      ],
      "import/prefer-default-export": "off", // Disable warning about default exports
      "react/display-name": "off", // Suppress missing display name warnings
      "@typescript-eslint/ban-ts-comment": "off", // Ignore TypeScript comments restrictions
    },
  },
];

export default eslintConfig;
