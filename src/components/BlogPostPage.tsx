import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { SEO } from './SEO'
import { StructuredData } from './StructuredData'
import { getPostBySlug, getRelatedPosts, BlogPost } from '../data/blogPosts'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [copySuccess, setCopySuccess] = useState(false)

  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug)
      if (foundPost) {
        setPost(foundPost)
        setRelatedPosts(getRelatedPosts(foundPost, 3))
      } else {
        navigate('/blog')
      }
    }
  }, [slug, navigate])

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Extract headings for table of contents
  const headings = post.content
    .split('\n')
    .filter(line => line.startsWith('##'))
    .map(heading => {
      const text = heading.replace(/^#+\s+/, '')
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
      return { text, id }
    })

  const shareUrl = `https://naurra.ai/blog/${post.slug}`
  const shareTitle = post.title

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    }

    window.open(urls[platform], '_blank', 'width=600,height=400')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  // Format markdown content to React elements
  const renderContent = () => {
    const lines = post.content.split('\n')
    const elements: JSX.Element[] = []
    let key = 0

    lines.forEach((line) => {
      // H1
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={key++} className="font-display text-5xl lg:text-6xl text-white mb-8 leading-tight">
            {line.replace(/^#\s+/, '')}
          </h1>
        )
      }
      // H2
      else if (line.startsWith('## ')) {
        const text = line.replace(/^##\s+/, '')
        const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
        elements.push(
          <h2
            key={key++}
            id={id}
            className="font-display text-3xl lg:text-4xl text-white mb-6 mt-16 leading-tight scroll-mt-32"
          >
            <span className="inline-block mr-4 text-emerald-400">//</span>
            {text}
          </h2>
        )
      }
      // H3
      else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className="font-display text-2xl lg:text-3xl text-white mb-4 mt-12 leading-tight">
            {line.replace(/^###\s+/, '')}
          </h3>
        )
      }
      // Paragraph
      else if (line.trim() && !line.startsWith('#')) {
        // Bold text
        let content: any = line
        if (line.includes('**')) {
          const parts = line.split('**')
          content = parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i} className="text-emerald-300 font-semibold">{part}</strong> : part
          )
        }

        elements.push(
          <p key={key++} className="text-lg text-gray-300 leading-relaxed mb-6">
            {content}
          </p>
        )
      }
      // Empty line
      else if (!line.trim() && elements.length > 0) {
        elements.push(<div key={key++} className="h-4" />)
      }
    })

    return elements
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name
    },
    publisher: {
      '@type': 'Organization',
      name: 'Naurra.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://naurra.ai/logo-transparent.png'
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      <SEO
        title={`${post.title} - Naurra.ai Blog`}
        description={post.description}
        keywords={post.keywords}
        url={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
      />
      <StructuredData type="organization" data={articleSchema} />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-500/20 to-transparent rounded-full blur-[120px]"
        />
      </div>

      {/* Header */}
      <nav className="relative border-b border-emerald-500/10 backdrop-blur-xl bg-[#0a0e1a]/90 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full group-hover:bg-emerald-500/30 transition-all" />
              <img src="/logo-transparent.png" alt="Naurra.ai" className="w-full h-full object-contain relative z-10" />
            </div>
            <span className="font-display text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
              Naurra.ai
            </span>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-semibold"
            >
              Contact
            </button>
            <button
              onClick={() => navigate('/blog')}
              className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </button>
          </div>
        </div>
      </nav>

      {/* Article Hero */}
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-mono uppercase tracking-widest text-emerald-300">{post.category}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl lg:text-6xl xl:text-7xl text-white mb-8 leading-[1.1] tracking-tight"
          >
            {post.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl lg:text-2xl text-gray-400 leading-relaxed mb-10"
          >
            {post.description}
          </motion.p>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 pb-10 border-b border-gray-700/50"
          >
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full border-2 border-emerald-500/30"
              />
              <div>
                <p className="font-semibold text-white">{post.author.name}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-700/50" />

            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <div className="h-8 w-px bg-gray-700/50" />

            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readingTime} min read</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents - Sticky Sidebar */}
          {headings.length > 0 && (
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="hidden lg:block lg:col-span-3"
            >
              <div className="sticky top-32">
                <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                  <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    Contents
                  </h3>
                  <nav className="space-y-2">
                    {headings.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className="block text-sm text-gray-400 hover:text-emerald-300 transition-colors py-1 border-l-2 border-transparent hover:border-emerald-500 pl-3"
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </motion.aside>
          )}

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={headings.length > 0 ? "lg:col-span-9" : "lg:col-span-12 max-w-4xl mx-auto"}
          >
            <div className="prose prose-invert prose-lg max-w-none">
              {renderContent()}
            </div>

            {/* Tags */}
            <div className="mt-16 pt-10 border-t border-gray-700/50">
              <h3 className="font-display text-lg text-white mb-4">Tagged in:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => navigate('/blog')}
                    className="px-4 py-2 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 rounded-xl text-sm text-gray-400 hover:text-emerald-300 transition-all"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-10 border-t border-gray-700/50">
              <h3 className="font-display text-lg text-white mb-6">Share this article</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleShare('twitter')}
                  className="group relative px-6 py-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-[#1DA1F2]/20 hover:to-[#1DA1F2]/10 border border-gray-700/50 hover:border-[#1DA1F2]/30 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">Twitter</span>
                  </div>
                </button>

                <button
                  onClick={() => handleShare('linkedin')}
                  className="group relative px-6 py-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-[#0A66C2]/20 hover:to-[#0A66C2]/10 border border-gray-700/50 hover:border-[#0A66C2]/30 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">LinkedIn</span>
                  </div>
                </button>

                <button
                  onClick={() => handleShare('facebook')}
                  className="group relative px-6 py-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-[#1877F2]/20 hover:to-[#1877F2]/10 border border-gray-700/50 hover:border-[#1877F2]/30 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">Facebook</span>
                  </div>
                </button>

                <button
                  onClick={copyToClipboard}
                  className="group relative px-6 py-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-emerald-500/20 hover:to-emerald-500/10 border border-gray-700/50 hover:border-emerald-500/30 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                      {copySuccess ? 'Copied!' : 'Copy Link'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </motion.article>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-32"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-10 bg-gradient-to-b from-emerald-500 to-amber-500 rounded-full" />
              <h2 className="font-display text-3xl lg:text-4xl text-white">Continue Reading</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  className="group relative cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/10 to-amber-500/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative h-full bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500 flex flex-col">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-4 self-start">
                        <div className="w-1 h-1 rounded-full bg-emerald-400" />
                        <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">{relatedPost.category}</span>
                      </div>

                      <h3 className="font-display text-xl text-white mb-3 leading-tight group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h3>

                      <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-2 flex-1">
                        {relatedPost.description}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-gray-500 pt-4 border-t border-gray-700/50">
                        <span>{relatedPost.readingTime} min read</span>
                      </div>
                    </div>

                    <div className="h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-emerald-400/20 to-amber-500/20 rounded-3xl blur-3xl" />
          <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6">
              Ready to Experience AI Automation?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Transform your workspace with voice-powered AI. Start your free trial today.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Start Free Trial
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-gray-700/50 bg-[#0a0e1a]/90 backdrop-blur-xl mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo-transparent.png" alt="Naurra.ai" className="w-8 h-8" />
              <span className="font-display text-lg bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                Naurra.ai
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2026 Naurra.ai. Transforming workspaces with AI.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Reading Progress Indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="relative">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#progress-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              style={{
                pathLength: scrollYProgress,
                strokeDasharray: "283",
                strokeDashoffset: 0
              }}
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
