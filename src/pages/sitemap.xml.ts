import type { APIRoute } from 'astro'
import { blogPosts } from '../data/blogPosts'

export const prerender = true

const SITE_URL = 'https://naurra.ai'

type SitemapEntry = {
  loc: string
  lastmod: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: string
}

const staticPages: SitemapEntry[] = [
  { loc: `${SITE_URL}/`, lastmod: '2026-04-03', changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE_URL}/company`, lastmod: '2026-04-03', changefreq: 'monthly', priority: '0.9' },
  { loc: `${SITE_URL}/pricing`, lastmod: '2026-04-03', changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE_URL}/compare`, lastmod: '2026-04-03', changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE_URL}/contact`, lastmod: '2026-03-20', changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE_URL}/privacy`, lastmod: '2026-03-20', changefreq: 'yearly', priority: '0.3' },
  { loc: `${SITE_URL}/terms`, lastmod: '2026-03-20', changefreq: 'yearly', priority: '0.3' },
  { loc: `${SITE_URL}/blog`, lastmod: '2026-04-10', changefreq: 'daily', priority: '0.9' },
  { loc: `${SITE_URL}/tools/email-signature`, lastmod: '2026-03-29', changefreq: 'monthly', priority: '0.7' }
]

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const GET: APIRoute = () => {
  const blogEntries: SitemapEntry[] = blogPosts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: post.updatedAt || post.publishedAt,
    changefreq: 'monthly',
    priority: post.featured ? '0.9' : '0.8'
  }))

  const urls = [...staticPages, ...blogEntries]
    .map((entry) => `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
