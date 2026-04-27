export type Locale = 'en' | 'el'

export const LOCALES: Locale[] = ['en', 'el']
export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: 'en',
  el: 'el',
}

export const LOCALE_OG: Record<Locale, string> = {
  en: 'en_US',
  el: 'el_GR',
}

export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  el: 'Ελληνικά',
}

export const LOCALE_FLAG: Record<Locale, string> = {
  en: '🇬🇧',
  el: '🇬🇷',
}

export function blogIndexPath(locale: Locale): string {
  return locale === 'en' ? '/blog/' : `/${locale}/blog/`
}

export function blogPostPath(locale: Locale, slug: string): string {
  return locale === 'en' ? `/blog/${slug}/` : `/${locale}/blog/${slug}/`
}

export function absoluteUrl(path: string): string {
  return `https://naurra.ai${path}`
}

export const UI_STRINGS = {
  en: {
    backToBlog: 'Back to Blog',
    contact: 'Contact',
    author: 'Author',
    minRead: 'min read',
    contents: 'Contents',
    taggedIn: 'Tagged in:',
    shareArticle: 'Share this article',
    copyLink: 'Copy Link',
    copied: 'Copied!',
    continueReading: 'Continue Reading',
    ctaTitle: 'Ready to Experience AI Automation?',
    ctaBody: 'Transform your workspace with voice-powered AI. Start your free trial today.',
    ctaButton: 'Start Free Trial',
    footerTagline: 'Transforming workspaces with AI.',
    blogTitle: 'Blog - Naurra.ai | AI Workspace Automation Insights & Tutorials',
    blogDescription: "Explore expert articles on AI workspace automation, productivity tips, Google Workspace optimization, and voice AI tutorials. Stay ahead with Naurra.ai's latest insights.",
    blogKeywords: 'AI blog, workspace automation articles, productivity tips, Google Workspace tutorials, voice AI guides, AI assistant insights',
    home: 'Home',
    blog: 'Blog',
    languageLabel: 'Language',
  },
  el: {
    backToBlog: 'Επιστροφή στο Blog',
    contact: 'Επικοινωνία',
    author: 'Συγγραφέας',
    minRead: 'λεπτά ανάγνωσης',
    contents: 'Περιεχόμενα',
    taggedIn: 'Ετικέτες:',
    shareArticle: 'Μοιραστείτε το άρθρο',
    copyLink: 'Αντιγραφή συνδέσμου',
    copied: 'Αντιγράφηκε!',
    continueReading: 'Συνέχεια ανάγνωσης',
    ctaTitle: 'Έτοιμοι για AI Automation;',
    ctaBody: 'Μεταμορφώστε τον χώρο εργασίας σας με φωνητικό AI. Ξεκινήστε δωρεάν δοκιμή σήμερα.',
    ctaButton: 'Ξεκινήστε Δωρεάν',
    footerTagline: 'Μεταμορφώνουμε τον χώρο εργασίας με AI.',
    blogTitle: 'Blog - Naurra.ai | AI Automation για Google Workspace',
    blogDescription: 'Άρθρα και οδηγοί για AI automation, παραγωγικότητα, Google Workspace και φωνητικό AI από την Naurra.ai.',
    blogKeywords: 'ai automation, google workspace ελληνικά, φωνητικό ai, παραγωγικότητα, naurra, αυτοματοποίηση εργασιών',
    home: 'Αρχική',
    blog: 'Blog',
    languageLabel: 'Γλώσσα',
  },
} as const

export function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString)
  if (locale === 'el') {
    return date.toLocaleDateString('el-GR', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
