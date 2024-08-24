// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { createMediumZoomProvider } from "./composables";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import './style.css'
import 'virtual:uno.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    enhanceAppWithTabs(app);
    createMediumZoomProvider(app, router);
  }
} satisfies Theme
