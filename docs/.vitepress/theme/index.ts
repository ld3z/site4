// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { createMediumZoomProvider } from "./composables";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
import Tooltip from "./components/Tooltip.vue";
import NotFoundComponent from "./components/notfound.vue";
import Post from './PostLayout.vue'
import './style.css'
import 'virtual:uno.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "not-found": () => h(NotFoundComponent)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.use(FloatingVue, {
      themes: {
        "info-tooltip": {
          $extend: "tooltip",
          $resetCss: true,
          triggers: ["hover", "touch", "click"],
        },
      },
    });
    enhanceAppWithTabs(app);
    createMediumZoomProvider(app, router);
    app.component("Tooltip", Tooltip);
    app.component('Post', Post);
  }
} satisfies Theme
