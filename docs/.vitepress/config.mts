import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { figure } from "@mdit/plugin-figure";
import { imgLazyload } from "@mdit/plugin-img-lazyload";
import { align } from "@mdit/plugin-align";
import { imgSize } from "@mdit/plugin-img-size";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { fileURLToPath, URL } from "url";
import { emojiRender, defs, movePlugin} from './configs/'

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
        text: 'Resources',
        items: [
          { text: 'Cuphead', link: '/cuphead' },
          { text: 'Satisfactory', link: '/satisfactory' },
          { text: 'Subnautica', link: '/subnautica' },
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
      {
        ariaLabel: "Bluesky",
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Bluesky</title><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/></svg>',
        },
        link: "https://bsky.app/profile/ld3zian.bsky.social",
      },
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
