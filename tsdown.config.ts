import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  format: ['cjs', 'esm', 'iife', 'umd'],
  outDir: 'dist',
  outputOptions: {
    name: 'piniaPluginPersistedstate',
  },
})
