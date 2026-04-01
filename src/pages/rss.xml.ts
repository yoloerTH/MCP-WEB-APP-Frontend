import type { APIRoute } from 'astro'
import { blogPosts } from '../data/blogPosts'

export const prerender = true

const SITE_URL = 'https://naurra.ai'
const FEED_URL = `${SITE_URL}/rss.xml`
const BLOG_URL = `${SITE_URL}/blog`

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function stripMarkdown(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export const GET: APIRoute = () => {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const latestBuildDate = sortedPosts[0]?.updatedAt || sortedPosts[0]?.publishedAt || new Date().toISOString()

  const itemsXml = sortedPosts
    .map((post) => {
      const postUrl = `${BLOG_URL}/${post.slug}`
      const description = escapeXml(post.description)
      const contentPreview = escapeXml(stripMarkdown(post.content).slice(0, 400))
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join('')

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${description}</description>
      <author>support@naurra.ai (${escapeXml(post.author.name)})</author>
      ${categories}
      <content:encoded><![CDATA[${contentPreview}]]></content:encoded>
    </item>`.trim()
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Naurra.ai Blog</title>
    <link>${BLOG_URL}</link>
    <description>AI workspace automation insights, Google Workspace tutorials, productivity strategies, and voice AI guides from Naurra.ai.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(latestBuildDate).toUTCString()}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
