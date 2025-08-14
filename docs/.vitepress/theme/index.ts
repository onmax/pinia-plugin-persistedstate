import type { Theme } from 'vitepress'
import TwoslashClient from '@shikijs/vitepress-twoslash/client'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import '@shikijs/vitepress-twoslash/style.css'
import './style.css'
import 'virtual:group-icons.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, { })
  },
  enhanceApp({ app }) {
    app.use(TwoslashClient)
  },
} satisfies Theme
