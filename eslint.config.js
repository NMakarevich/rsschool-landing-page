import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import unicorn from 'eslint-plugin-unicorn';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      unicorn,
      eslintConfigPrettier,
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
