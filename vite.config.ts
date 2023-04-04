import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import Component from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import electron from 'vite-plugin-electron';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  return {
    build: {
      outDir: join(__dirname, '/dist-electron/front')
    },
    plugins: [
      vue(),
      Component({
        resolvers: [AntDesignVueResolver()],
      }),
      electron([
        {
          entry: join(__dirname, '/electron/main/index.ts'),
          vite: {
            build: {
              outDir: 'dist-electron/main',
              minify: isBuild,
              sourcemap: !isBuild,
              rollupOptions: {
                external: Object.keys(
                  'dependencies' in pkg ? pkg.dependencies : {}
                ),
              },
            },
          },
        },
        {
          entry: join(__dirname, '/electron/preload/index.ts'),
          onstart(options) {
            options.reload();
          },
          vite: {
            build: {
              outDir: 'dist-electron/preload',
              sourcemap: !isBuild,
              minify: isBuild,
              rollupOptions: {
                external: Object.keys(
                  'dependencies' in pkg ? pkg.dependencies : {}
                ),
              },
            },
          },
        },
      ]),
    ],
    resolve: {
      alias: {
        '@': join(__dirname, '/src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@use "./src/assets/style/vars.scss" as *;',
        },
      },
    },
  };
});
