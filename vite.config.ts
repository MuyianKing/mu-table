import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import useAlias from './alias.config'

const { alias_map } = useAlias()

const __dirname = fileURLToPath(import.meta.url)

export default defineConfig({
  build: {
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      external: [
        'vue',
        /^@floating-ui/,
        '@vueuse/core',
      ],
      output: [
        {
          format: 'es',
          exports: 'named',
          dir: './dist',
          preserveModules: true,
          entryFileNames: '[name].js',
          assetFileNames: 'index[extname]',
        },
      ],
      treeshake: false,
    },
    lib: {
      entry: [
        resolve(__dirname, '../src/core/index.ts'),
        resolve(__dirname, '../src/resolver/index.ts'),
      ],
    },
  },
  resolve: {
    alias: alias_map,
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      exclude: ['./src/main.ts'],
    }),
  ],
})
