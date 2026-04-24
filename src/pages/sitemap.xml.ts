import type { APIRoute } from 'astro'
import { blogPosts } from '../data/blogPosts'

export const prerender = true

const SITE_URL = 'https://naurra.ai'

type VideoEntry = {
  videoId: string
  title: string
  description: string
  publishedAt: string
}

type SitemapEntry = {
  loc: string
  lastmod: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: string
  videos?: VideoEntry[]
}

const staticPages: SitemapEntry[] = [
  { loc: `${SITE_URL}/`, lastmod: '2026-04-24', changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE_URL}/company/`, lastmod: '2026-04-21', changefreq: 'monthly', priority: '0.9' },
  { loc: `${SITE_URL}/pricing/`, lastmod: '2026-04-21', changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE_URL}/compare/`, lastmod: '2026-04-21', changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE_URL}/contact/`, lastmod: '2026-03-20', changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE_URL}/privacy/`, lastmod: '2026-03-20', changefreq: 'yearly', priority: '0.3' },
  { loc: `${SITE_URL}/terms/`, lastmod: '2026-03-20', changefreq: 'yearly', priority: '0.3' },
  { loc: `${SITE_URL}/blog/`, lastmod: '2026-04-24', changefreq: 'daily', priority: '0.9' },
  { loc: `${SITE_URL}/tools/`, lastmod: '2026-04-21', changefreq: 'weekly', priority: '0.8' },
  { loc: `${SITE_URL}/tools/email-signature/`, lastmod: '2026-04-21', changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/tools/mailto-link-generator/`, lastmod: '2026-04-21', changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/tools/meeting-agenda-builder/`, lastmod: '2026-04-21', changefreq: 'monthly', priority: '0.7' }
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
  const blogEntries: SitemapEntry[] = blogPosts.map((post) => {
    const videoIds = Array.from(new Set(
      Array.from(post.content.matchAll(/\{\{youtube:([^}]+)\}\}/g)).map(m => m[1].trim())
    ))
    const videos: VideoEntry[] = videoIds.map((videoId, idx) => ({
      videoId,
      title: videoIds.length > 1 ? `${post.title} — Video ${idx + 1}` : post.title,
      description: post.description,
      publishedAt: post.publishedAt
    }))
    return {
      loc: `${SITE_URL}/blog/${post.slug}/`,
      lastmod: post.updatedAt || post.publishedAt,
      changefreq: 'monthly',
      priority: post.featured ? '0.9' : '0.8',
      videos: videos.length > 0 ? videos : undefined
    }
  })

  const urls = [...staticPages, ...blogEntries]
    .map((entry) => {
      const videoBlocks = (entry.videos || []).map((v) => `    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/${xmlEscape(v.videoId)}/maxresdefault.jpg</video:thumbnail_loc>
      <video:title>${xmlEscape(v.title)}</video:title>
      <video:description>${xmlEscape(v.description)}</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=${xmlEscape(v.videoId)}</video:content_loc>
      <video:player_loc allow_embed="yes">https://www.youtube.com/embed/${xmlEscape(v.videoId)}</video:player_loc>
      <video:publication_date>${xmlEscape(v.publishedAt)}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
      <video:uploader info="https://www.youtube.com/@naurra_ai">Naurra.ai</video:uploader>
    </video:video>`).join('\n')

      return `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${videoBlocks ? '\n' + videoBlocks : ''}
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
