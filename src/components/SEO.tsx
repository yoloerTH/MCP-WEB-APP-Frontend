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
  title = 'Naurra.ai - AI-Powered Workspace Assistant | Google Workspace Automation',
  description = 'Your intelligent AI assistant for Google Workspace. Control your entire workspace through natural voice commands or chat. 35+ AI tools at your fingertips.',
  keywords = 'AI assistant, Google Workspace, voice AI, chat AI, productivity, automation, Naurra, workspace management',
  image = 'https://naurra.ai/logo-transparent.png',
  url = 'https://naurra.ai/',
  type = 'website',
  author = 'Naurra.ai',
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const fullUrl = url.startsWith('http') ? url : `https://naurra.ai${url}`
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
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  )
}
