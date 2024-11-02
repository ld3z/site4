import type { ContentData, SiteConfig } from 'vitepress'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import consola from 'consola'
import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'
import { meta } from '../constants'

export async function generateFeed(config: SiteConfig): Promise {
  const feed: Feed = new Feed({
    id: meta.hostname,
    link: meta.hostname,
    title: 'ld3z blog',
    description: meta.description,
    language: 'en-US',
    image: 'https://github.com/ld3z.png',
    favicon: `${meta.hostname}/favicon.ico`,
    copyright: 'Copyright (c) ld3z'
  })

  const posts: ContentData[] = await createContentLoader('posts/*.md', {
    excerpt: true,
    render: true,
    transform: (rawData) => {
      return rawData.sort((a, b) => {
        return (
          Number(new Date(b.frontmatter.date)) -
          Number(new Date(a.frontmatter.date))
        )
      })
    }
  }).load()

  for (const { url, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title as string,
      id: `${meta.hostname}${url.replace(/\/\d+\./, '/')}`,
      link: `${meta.hostname}${url.replace(/\/\d+\./, '/')}`,
      date: frontmatter.date,
      content: html?.replaceAll('&ZeroWidthSpace;', '')
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
  return consola.info('Generated rss feed.')
}
