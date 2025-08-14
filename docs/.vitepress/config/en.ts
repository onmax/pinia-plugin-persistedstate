import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { version } from '../../../package.json'

export const en: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: 'Configurable persistence of Pinia stores.',
  themeConfig: {
    editLink: {
      text: 'Suggest changes to this page',
      pattern: 'https://codeberg.org/praz/pinia-plugin-persistedstate/_edit/main/docs/:path',
    },
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
        activeMatch: '/guide/',
      },
      {
        text: 'Frameworks',
        items: [
          { text: 'Nuxt', link: '/frameworks/nuxt' },
          { text: 'Other Frameworks', link: '/frameworks/others' },
        ],
      },
      {
        text: `v${version}`,
        items: [
          {
            items: [{
              text: 'Release Notes',
              link: 'https://codeberg.org/praz/pinia-plugin-persistedstate/releases',
            }],
          },
          {
            text: 'Versions',
            items: [
              {
                text: `${version} (Current)`,
                activeMatch: '/',
                link: '#',
              },
              {
                text: '3.2.2',
                link: 'https://codeberg.org/praz/pinia-plugin-persistedstate/src/branch/v3',
              },
              {
                text: '2.4.0',
                link: 'https://codeberg.org/praz/pinia-plugin-persistedstate/src/branch/v2',
              },
              {
                text: '1.6.3',
                link: 'https://codeberg.org/praz/pinia-plugin-persistedstate/src/branch/v1',
              },
            ],
          },
        ],
      },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Why this plugin?', link: '/guide/why' },
          { text: 'Getting Started', link: '/guide/' },
          { text: 'Configuration', link: '/guide/config' },
          { text: 'Limitations', link: '/guide/limitations' },
          { text: 'Advanced Usage', link: '/guide/advanced' },
        ],
      },
      {
        text: 'Frameworks',
        items: [
          { text: 'Nuxt', link: '/frameworks/nuxt' },
          { text: 'Other Frameworks', link: '/frameworks/others' },
        ],
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present praz & contributors',
    },

  },
}
