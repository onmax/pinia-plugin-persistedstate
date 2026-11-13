import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '#app': 'nuxt/app',
    },
  },
  test: {
    environment: 'happy-dom',
    server: {
      deps: {
        inline: ['vitest-package-exports'],
      },
    },
  },
})
