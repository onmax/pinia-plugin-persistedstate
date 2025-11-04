import type { Plugin } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { algolia } from './algolia'
import { en } from './en'
import { zh } from './zh'

export default defineConfig({
  title: 'Pinia Plugin Persistedstate',
  base: '/pinia-plugin-persistedstate/',
  head: [
    ['link', {
      rel: 'icon',
      href: '/pinia-plugin-persistedstate/favicon.ico',
    }],
  ],
  sitemap: {
    hostname: 'https://praz.codeberg.page/pinia-plugin-persistedstate/',
  },
  lastUpdated: true,
  markdown: {
    typographer: true,
    codeTransformers: [
      transformerTwoslash({
        twoslashOptions: {
          compilerOptions: {
            types: ['pinia-plugin-persistedstate'],
          },
        },
      }) as Plugin,
    ],
    theme: {
      dark: 'catppuccin-mocha',
      light: 'catppuccin-latte',
    },
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          'nuxt': 'catppuccin:nuxt',
          '.ts': 'catppuccin:typescript',
          'pnpm': 'catppuccin:pnpm',
          'npm': 'catppuccin:npm',
          'yarn': 'catppuccin:yarn',
        },
      }) as Plugin,
    ],
  },
  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
    },
    search: {
      provider: 'algolia',
      options: algolia,
    },
    socialLinks: [
      {
        icon: 'codeberg',
        link: 'https://codeberg.org/praz/pinia-plugin-persistedstate',
      },
    ],
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      ...en,
    },
    zh: { label: '简体中文', ...zh },
  },
})
