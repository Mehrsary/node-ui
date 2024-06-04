import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "vue/multi-word-component-names": 0,
    },
    ignores: [
      "**/dist/*",
      "**/*.d.ts",
      "**/node_modules/**",
      "**/.nuxt",
      "**/writable/**",
      "**/packages/frontend/ui/components/svg/**",
      "public/**",
    ],
  },
];