import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { figure } from "@mdit/plugin-figure";
import { imgLazyload } from "@mdit/plugin-img-lazyload";
import { align } from "@mdit/plugin-align";
import { imgSize } from "@mdit/plugin-img-size";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { fileURLToPath, URL } from "url";
import { emojiRender, defs, movePlugin} from './configs/'
import { generateFeed, generateMeta } from './hooks'
import consola from 'consola'
import {meta} from './constants'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Site4",
  description: "A misc site.",
  base: "/site4/",
  lastUpdated: true,
  cleanUrls: true,
  appearance: "dark",
  head: [['link', { rel: 'icon', href: '/site4/favicon.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Cuphead', link: '/cuphead' },
      { text: 'Satisfactory', link: '/satisfactory' },
      { text: 'Subnautica', link: '/subnautica' },
      {
        text:"Roblox Games",
        items: [
      { text: 'Pig 64', link: '/pig64' },
      { text: 'Piggy: Book 1', link: '/piggy-book1' },
      { text: 'Piggy: Book 2', link: '/piggy-book2' },
      { text: 'Phantom Forces', link: '/phantom-forces' },
      { text: 'Tower Defense Simulator', link: '/tds' },
      { text: 'Doors', link: '/doors' }
        ]
      }
    ],

    sidebar: [
      {
        text: 'Posts',
        items: [
          { text: 'Posts', link: '/posts' }
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'Cuphead', link: '/cuphead' },
          { text: 'Satisfactory', link: '/satisfactory' },
          { text: 'Subnautica', link: '/subnautica' }
        ],
      },
      {
        text: 'Roblox Games',
        items: [
          { text: 'Pig 64', link: '/pig64' },
          { text: 'Piggy: Book 1', link: '/piggy-book1' },
          { text: 'Piggy: Book 2', link: '/piggy-book2' },
          { text: 'Phantom Forces', link: '/phantom-forces' },
          { text: 'Tower Defense Simulator', link: '/tds' },
          { text: 'Doors', link: '/doors' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ld3z/site4' },
      { icon: 'mastodon', link: 'https://mastodon.social/@ld3zian' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/ld3zian.bsky.social' },
    ]
  },

  markdown: {
    emoji: { defs },
    config(md) {
      md.use(emojiRender);
      md.use(imgLazyload);
      md.use(align);
      md.use(figure);
      md.use(tabsMarkdownPlugin);
      md.use(imgSize);
    },
  },
  vite: {
    plugins: [
      UnoCSS({
        configFile: "../unocss.config.ts",
      }),
      {
        name: "custom:adjust-order",
        configResolved(c) {
          movePlugin(c.plugins as any, "vitepress", "before", "unocss:transformers:pre");
        },
      },
    ],
    resolve: {
			alias: [
				{
					find: /^.*\/VPBadge\.vue$/,
					replacement: fileURLToPath(
						new URL("./theme/components/Badge.vue", import.meta.url),
					),
				},
      ]
    }
  },
});
