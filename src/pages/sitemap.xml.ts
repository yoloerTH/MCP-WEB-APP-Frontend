import type { APIRoute } from 'astro'
import { blogPosts } from '../data/blogPosts'
import { blogPostsEl } from '../data/blogPostsEl'
import { caseStudies } from '../data/caseStudies'
import { solutionPages } from '../data/solutionPages'

export const prerender = true

const SITE_URL = 'https://naurra.ai'

type VideoEntry = {
  videoId: string
  title: string
  description: string
  publishedAt: string
}

type AlternateEntry = { hreflang: string; href: string }

type SitemapEntry = {
  loc: string
  lastmod: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: string
  videos?: VideoEntry[]
  alternates?: AlternateEntry[]
}

const staticPages: SitemapEntry[] = [
  { loc: `${SITE_URL}/`, lastmod: '2026-04-24', changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE_URL}/about/`, lastmod: '2026-05-17', changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE_URL}/company/`, lastmod: '2026-05-17', changefreq: 'monthly', priority: '0.9' },
  { loc: `${SITE_URL}/case-studies/`, lastmod: '2026-05-13', changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE_URL}/pricing/`, lastmod: '2026-04-21', changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE_URL}/compare/`, lastmod: '2026-04-21', changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE_URL}/contact/`, lastmod: '2026-03-20', changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE_URL}/voiceai/`, lastmod: '2026-05-01', changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/chatai/`, lastmod: '2026-05-01', changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/privacy/`, lastmod: '2026-03-20', changefreq: 'yearly', priority: '0.3' },
  { loc: `${SITE_URL}/terms/`, lastmod: '2026-03-20', changefreq: 'yearly', priority: '0.3' },
  { loc: `${SITE_URL}/legal/`, lastmod: '2026-06-09', changefreq: 'yearly', priority: '0.3' },
  { loc: `${SITE_URL}/blog/`, lastmod: '2026-05-13', changefreq: 'daily', priority: '0.9' },
  { loc: `${SITE_URL}/tools/`, lastmod: '2026-04-21', changefreq: 'weekly', priority: '0.8' },
  { loc: `${SITE_URL}/tools/gmail-signature-generator/`, lastmod: '2026-04-21', changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/tools/mailto-link-generator/`, lastmod: '2026-04-21', changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/tools/meeting-agenda-maker/`, lastmod: '2026-04-21', changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/solutions/`, lastmod: '2026-05-13', changefreq: 'weekly', priority: '0.9' },
  ...caseStudies.map((study) => ({
    loc: `${SITE_URL}/case-studies/${study.slug}/`,
    lastmod: study.updatedAt,
    changefreq: 'monthly' as const,
    priority: study.featured ? '0.8' : '0.7'
  })),
  ...solutionPages.map((solution) => ({
    loc: `${SITE_URL}/solutions/${solution.slug}/`,
    lastmod: '2026-05-13',
    changefreq: 'monthly' as const,
    priority: solution.slug === 'ai-agent-custom-crm-quoting-system-small-business' ? '0.9' : '0.8'
  }))
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
    const enUrl = `${SITE_URL}/blog/${post.slug}/`
    const tr = blogPostsEl.find((t) => t.enSlug === post.slug)
    const alternates: AlternateEntry[] = tr
      ? [
          { hreflang: 'en', href: enUrl },
          { hreflang: 'el', href: `${SITE_URL}/el/blog/${tr.slug}/` },
          { hreflang: 'x-default', href: enUrl }
        ]
      : []
    return {
      loc: enUrl,
      lastmod: post.updatedAt || post.publishedAt,
      changefreq: 'monthly',
      priority: post.featured ? '0.9' : '0.8',
      videos: videos.length > 0 ? videos : undefined,
      alternates: alternates.length > 0 ? alternates : undefined
    }
  })

  const elBlogIndex: SitemapEntry[] = blogPostsEl.length > 0 ? [{
    loc: `${SITE_URL}/el/blog/`,
    lastmod: '2026-05-13',
    changefreq: 'weekly',
    priority: '0.9',
    alternates: [
      { hreflang: 'en', href: `${SITE_URL}/blog/` },
      { hreflang: 'el', href: `${SITE_URL}/el/blog/` },
      { hreflang: 'x-default', href: `${SITE_URL}/blog/` }
    ]
  }] : []

  const elBlogPosts: SitemapEntry[] = []
  for (const tr of blogPostsEl) {
    const en = blogPosts.find((p) => p.slug === tr.enSlug)
    if (!en) continue
    const enUrl = `${SITE_URL}/blog/${en.slug}/`
    const elUrl = `${SITE_URL}/el/blog/${tr.slug}/`
    elBlogPosts.push({
      loc: elUrl,
      lastmod: en.updatedAt || en.publishedAt,
      changefreq: 'monthly',
      priority: en.featured ? '0.9' : '0.8',
      alternates: [
        { hreflang: 'en', href: enUrl },
        { hreflang: 'el', href: elUrl },
        { hreflang: 'x-default', href: enUrl }
      ]
    })
  }

  // Mark English /blog/ as having Greek alternate when any translation exists
  const staticPagesWithAlternates = staticPages.map((entry) => {
    if (entry.loc === `${SITE_URL}/blog/` && blogPostsEl.length > 0) {
      return {
        ...entry,
        alternates: [
          { hreflang: 'en', href: entry.loc },
          { hreflang: 'el', href: `${SITE_URL}/el/blog/` },
          { hreflang: 'x-default', href: entry.loc }
        ]
      }
    }
    return entry
  })

  const urls = [...staticPagesWithAlternates, ...elBlogIndex, ...blogEntries, ...elBlogPosts]
    .map((entry) => {
      const videoBlocks = (entry.videos || []).map((v) => `    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/${xmlEscape(v.videoId)}/maxresdefault.jpg</video:thumbnail_loc>
      <video:title>${xmlEscape(v.title)}</video:title>
      <video:description>${xmlEscape(v.description)}</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=${xmlEscape(v.videoId)}</video:content_loc>
      <video:player_loc allow_embed="yes">https://www.youtube.com/embed/${xmlEscape(v.videoId)}</video:player_loc>
      <video:publication_date>${xmlEscape(v.publishedAt)}T09:00:00+00:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
      <video:uploader info="https://www.youtube.com/@naurra_ai">Naurra.ai</video:uploader>
    </video:video>`).join('\n')

      const altBlocks = (entry.alternates || []).map((a) =>
        `    <xhtml:link rel="alternate" hreflang="${xmlEscape(a.hreflang)}" href="${xmlEscape(a.href)}" />`
      ).join('\n')

      return `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${altBlocks ? '\n' + altBlocks : ''}${videoBlocks ? '\n' + videoBlocks : ''}
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
