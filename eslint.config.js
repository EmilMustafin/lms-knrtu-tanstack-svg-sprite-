// @ts-check

import path from 'path';
import { fileURLToPath } from 'url';
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';
import eslintPluginImportX from 'eslint-plugin-import-x';
import reactPlugin from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// const typeScriptExtensions = ['.ts', '.tsx', '.cts', '.mts'];
// const allExtensions = [...typeScriptExtensions, '.js', '.jsx', '.cjs', '.mjs'];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default tseslint.config(
  { ignores: ['dist', '.storybook', '.lintstagedrc.cjs', './src/app/router/'] },
  js.configs.recommended,
  ...pluginRouter.configs['flat/recommended'],
  ...pluginQuery.configs['flat/recommended'],
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  ...fixupConfigRules(compat.extends('plugin:react-hooks/recommended')),
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    files: ['**/*.{js,jsx,ts,tsx}',"tailwind.config.js"],
    settings: {
      // 'import-x/extensions': allExtensions,
      'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import-x/resolver': {
        // extensions: allExtensions,
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json'],
        },
        node: true,
      },
      react: { version: 'detect' },
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
      'react/prop-types': 'off',
      'import-x/named': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/no-dynamic-require': 'warn',
      'import-x/no-cycle': 'error',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          'newlines-between': 'never',
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'pages/**', group: 'internal', position: 'after' },
            { pattern: 'widgets/**', group: 'internal', position: 'after' },
            { pattern: 'features/**', group: 'internal', position: 'after' },
            { pattern: 'entities/**', group: 'internal', position: 'after' },
            { pattern: 'shared/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
