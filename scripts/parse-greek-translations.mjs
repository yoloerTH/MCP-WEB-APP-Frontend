import fs from 'node:fs'
import path from 'node:path'

const SRC = '/Users/thanospangios/Downloads/AI ASSITANT FULL/greek-blog-translations.txt'
const OUT = path.resolve(process.cwd(), 'src/data/blogPostsEl.ts')

const CATEGORY_MAP = {
  'ai-workspace-automation-2026': 'Παραγωγικότητα',
  'non-technical-guide-to-ai-for-business-owners': 'Στρατηγική AI',
  'google-workspace-voice-commands-guide': 'Οδηγοί',
  'how-ai-organizes-emails-summaries-bulk-replies-and-meetings': 'Παραγωγικότητα',
  'gmail-automation-tips': 'Οδηγοί',
  'automate-google-workspace-in-5-minutes': 'Οδηγοί',
  'small-business-ai-automation': 'Επιχειρήσεις',
  'the-hidden-cost-of-not-using-ai-in-2026': 'Στρατηγική AI',
}

const raw = fs.readFileSync(SRC, 'utf8')
const blocks = raw.split(/^={20,}$/m).map((b) => b.trim()).filter(Boolean)

const articles = []
for (const block of blocks) {
  if (!/English slug:/i.test(block)) continue

  const enSlug = (block.match(/English slug:\s*(.+)/) || [])[1]?.trim()
  const slug = (block.match(/Greek slug:\s*(.+)/) || [])[1]?.trim()
  const title = (block.match(/Greek title:\s*(.+)/) || [])[1]?.trim()
  const description = (block.match(/Greek meta description:\s*(.+)/) || [])[1]?.trim()
  const keywords = (block.match(/Greek keywords:\s*(.+)/) || [])[1]?.trim()

  const contentMatch = block.match(/Content:\s*\n([\s\S]+)$/)
  let content = contentMatch ? contentMatch[1].trim() : ''

  if (!enSlug || !slug || !title || !description || !keywords || !content) {
    console.error('SKIPPING incomplete block, enSlug=', enSlug)
    continue
  }

  const category = CATEGORY_MAP[enSlug] || 'Παραγωγικότητα'
  articles.push({ enSlug, slug, title, description, keywords, category, content })
}

console.error(`Parsed ${articles.length} articles`)

function escapeForBacktick(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function escapeForSingleQuote(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

const entries = articles.map((a) => `  {
    enSlug: '${escapeForSingleQuote(a.enSlug)}',
    slug: '${escapeForSingleQuote(a.slug)}',
    title: '${escapeForSingleQuote(a.title)}',
    description: '${escapeForSingleQuote(a.description)}',
    keywords: '${escapeForSingleQuote(a.keywords)}',
    category: '${escapeForSingleQuote(a.category)}',
    content: \`
${escapeForBacktick(a.content)}
\`,
  },`).join('\n')

const output = `import type { BlogPost } from './blogPosts'

export interface BlogPostTranslation {
  enSlug: string
  slug: string
  title: string
  description: string
  content: string
  keywords: string
  category: string
  tags?: string[]
}

export const TRANSLATABLE_EN_SLUGS: string[] = [
  'ai-workspace-automation-2026',
  'non-technical-guide-to-ai-for-business-owners',
  'google-workspace-voice-commands-guide',
  'how-ai-organizes-emails-summaries-bulk-replies-and-meetings',
  'gmail-automation-tips',
  'automate-google-workspace-in-5-minutes',
  'small-business-ai-automation',
  'the-hidden-cost-of-not-using-ai-in-2026',
]

export const blogPostsEl: BlogPostTranslation[] = [
${entries}
]

export function getElTranslationByEnSlug(enSlug: string): BlogPostTranslation | undefined {
  return blogPostsEl.find((p) => p.enSlug === enSlug)
}

export function getElTranslationBySlug(slug: string): BlogPostTranslation | undefined {
  return blogPostsEl.find((p) => p.slug === slug)
}

export function mergeWithEnglish(en: BlogPost, el: BlogPostTranslation): BlogPost {
  return {
    ...en,
    slug: el.slug,
    title: el.title,
    description: el.description,
    content: el.content,
    keywords: el.keywords,
    category: el.category,
    tags: el.tags || en.tags,
  }
}
`

fs.writeFileSync(OUT, output, 'utf8')
console.error(`Wrote ${OUT} with ${articles.length} translations`)
