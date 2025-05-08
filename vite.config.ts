

import path from 'node:path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import inspect from 'vite-plugin-inspect';

// READ-MORE: https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd() + '/env');

  const isDevMode = mode === 'development';
  const isProdMode = mode === 'production';
  const isTestMode = process.env.VITEST === 'true';

  const shouldCheckESLintDev = isDevMode && JSON.parse(env.VITE_ESLINT_DEV_CHECK) ? true : false;
  const shouldCheckTypeScriptDev = isDevMode && JSON.parse(env.VITE_TSC_DEV_CHECK) ? true : false;

  const plugins = [
    !isTestMode &&
      TanStackRouterVite({
        routesDirectory: './src/app/routes/',
        generatedRouteTree: './src/app/router/routeTree.gen.ts',
        routeFileIgnorePrefix: '-',
        autoCodeSplitting: true,
      }),
    react(),
    inspect(),
  ];

  if (!isTestMode) {
    // READ-MORE: https://github.com/fi3ework/vite-plugin-checker
    plugins.push(
      checker({
        typescript: shouldCheckTypeScriptDev,
        ...(shouldCheckESLintDev
          ? {
              eslint: {
                lintCommand: 'eslint "src/**/*.{js,jsx,ts,tsx}"',
                useFlatConfig: true,
              },
            }
          : {}),
      }),
    );
  }

  if (isProdMode) {
    plugins.push(
      visualizer({
        template: 'treemap',
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: './reports/build/analyze.html', // will be saved in project's root
      }),
    );
  }

  return {
    server: {
      port: 3000,
      strictPort: true,
      open: true,
      fs: {
        allow: [path.resolve(__dirname, './src')], // Разрешить доступ к ./src
      },
    },
    preview: {
      port: 5001,
      strictPort: true,
      open: true,
    },
    base: isProdMode ? '/lms-knrtu/' : '/',
    envDir: './env',
    plugins,
    build: {
      outDir: 'dist',
      sourcemap: true,
      // READ-MORE:  https://vitejs.dev/config/build-options#build-target
      target: 'esnext',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@app': path.resolve(__dirname, './src/app'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@widgets': path.resolve(__dirname, './src/widgets'),
        '@features': path.resolve(__dirname, './src/features'),
        '@entities': path.resolve(__dirname, './src/entities'),
        '@shared': path.resolve(__dirname, './src/shared'),
      },
    },
  };
});
