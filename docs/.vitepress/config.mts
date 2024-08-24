import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Site4",
  description: "A misc site.",
  base: "/site4/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Cuphead', link: '/cuphead' },
      { text: 'Pig 64', link: '/pig-64' },
      { text: 'Piggy: Book 1', link: '/piggy-book1' },
      { text: 'Piggy: Book 2', link: '/piggy-book2' }
    ],

    sidebar: [
      {
        text: 'Resources',
        items: [
          { text: 'Cuphead', link: '/cuphead' },
          { text: 'Pig 64', link: '/pig-64' },
          { text: 'Piggy: Book 1', link: '/piggy-book1' },
          { text: 'Piggy: Book 2', link: '/piggy-book2' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ld3z/site4' }
    ]
  }
})
