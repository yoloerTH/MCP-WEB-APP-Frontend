import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

export function SEO({
  title = 'Naurra.ai - AI Voice & Chat Assistant for Google Workspace',
  description = 'Control Gmail, Calendar, Drive, Docs and Sheets with natural voice commands or chat. The AI assistant built for Google Workspace productivity.',
  keywords = 'AI assistant, Google Workspace, voice AI, chat AI, productivity, automation, Naurra, workspace management',
  image = 'https://naurra.ai/logo-transparent.png',
  url = 'https://naurra.ai/',
  type = 'website',
  author = 'Naurra.ai',
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const needsSlash = (u: string) => {
    const [pathAndQueryHash] = [u]
    const hashIdx = pathAndQueryHash[0].indexOf('#')
    const queryIdx = pathAndQueryHash[0].indexOf('?')
    const cutIdx = [hashIdx, queryIdx].filter((i) => i >= 0).sort((a, b) => a - b)[0]
    const path = cutIdx === undefined ? u : u.slice(0, cutIdx)
    if (path.endsWith('/')) return false
    const lastSeg = path.split('/').pop() || ''
    if (lastSeg.includes('.')) return false
    return true
  }
  const withSlash = (u: string) => {
    if (!needsSlash(u)) return u
    const hashIdx = u.indexOf('#')
    const queryIdx = u.indexOf('?')
    const cutIdx = [hashIdx, queryIdx].filter((i) => i >= 0).sort((a, b) => a - b)[0]
    if (cutIdx === undefined) return `${u}/`
    return `${u.slice(0, cutIdx)}/${u.slice(cutIdx)}`
  }
  const normalizedUrl = withSlash(url)
  const fullUrl = normalizedUrl.startsWith('http') ? normalizedUrl : `https://naurra.ai${normalizedUrl}`
  const fullImage = image.startsWith('http') ? image : `https://naurra.ai${image}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Naurra.ai" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Naurra_ai" />
      <meta name="twitter:creator" content="@Naurra_ai" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* OG Image dimensions */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
    </Helmet>
  )
}
