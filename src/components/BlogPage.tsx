import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SEO } from './SEO'
import { blogPosts, getFeaturedPosts, getAllCategories, getAllTags } from '../data/blogPosts'

export default function BlogPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const categories = getAllCategories()
  const tags = getAllTags()
  const featuredPosts = getFeaturedPosts()

  // Filter posts based on search, category, and tag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || post.category === selectedCategory
      const matchesTag = !selectedTag || post.tags.includes(selectedTag)

      return matchesSearch && matchesCategory && matchesTag
    })
  }, [searchQuery, selectedCategory, selectedTag])

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedTag(null)
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
      <SEO
        title="Blog - Naurra.ai | AI Workspace Automation Insights & Tutorials"
        description="Explore expert articles on AI workspace automation, productivity tips, Google Workspace optimization, and voice AI tutorials. Stay ahead with Naurra.ai's latest insights."
        keywords="AI blog, workspace automation articles, productivity tips, Google Workspace tutorials, voice AI guides, AI assistant insights"
        url="/blog"
      />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5" />
        <div className="absolute top-0 -right-1/4 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-1/4 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <nav className="relative border-b border-emerald-500/10 bg-[#0a0e1a]/95 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
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
              onClick={() => navigate('/')}
              className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-500/20 rounded-full mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">AI Insights & Guides</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-6xl lg:text-7xl xl:text-8xl mb-8 tracking-tight leading-[0.9]"
          >
            <span className="block text-white mb-2">The Naurra</span>
            <span className="block bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
              Intelligence Hub
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Discover cutting-edge AI strategies, workspace automation secrets, and productivity insights that transform how you work.
          </motion.p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tag Pills */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedTag === tag
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-400 border border-white/5'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Active Filters */}
          {(selectedCategory || selectedTag || searchQuery) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <span className="text-sm text-gray-500">Active filters:</span>
              <button
                onClick={clearFilters}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear all
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Featured Posts */}
        {!searchQuery && !selectedCategory && !selectedTag && featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-amber-500 rounded-full" />
              <h2 className="font-display text-3xl lg:text-4xl text-white">Featured Articles</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  onClick={() => handlePostClick(post.slug)}
                  className="group relative cursor-pointer"
                >
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300">
                    {/* Featured Badge */}
                    <div className="absolute top-6 right-6 z-10">
                      <div className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-xs font-bold text-white shadow-lg shadow-amber-500/30">
                        FEATURED
                      </div>
                    </div>

                    <div className="p-8 lg:p-10">
                      {/* Category */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">{post.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl lg:text-3xl text-white mb-4 leading-tight group-hover:text-emerald-300 transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 mb-6 leading-relaxed line-clamp-2">
                        {post.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-500"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-amber-500 rounded-full" />
            <h2 className="font-display text-3xl lg:text-4xl text-white">
              {searchQuery || selectedCategory || selectedTag ? 'Search Results' : 'All Articles'}
            </h2>
            <span className="text-gray-500 text-lg">({filteredPosts.length})</span>
          </div>

          <AnimatePresence mode="wait">
            {filteredPosts.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display text-white mb-3">No articles found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                    onClick={() => handlePostClick(post.slug)}
                    className="group relative cursor-pointer"
                  >
                    {/* Card */}
                    <div className="relative h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 flex flex-col">
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Category & Reading Time */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                            <div className="w-1 h-1 rounded-full bg-emerald-400" />
                            <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">{post.category}</span>
                          </div>
                          <span className="text-xs text-gray-500">{post.readingTime} min</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-xl text-white mb-3 leading-tight group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-3 flex-1">
                          {post.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-gray-500"
                            >
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="px-2 py-0.5 text-xs text-gray-600">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-3 text-xs text-gray-500 pt-4 border-t border-gray-700/50">
                          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span>•</span>
                          <span>{post.author.name}</span>
                        </div>
                      </div>

                      {/* Hover indicator */}
                      <div className="h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-32 relative"
        >
          <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50 rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6">
              Ready to Transform Your Workspace?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Experience the power of AI-driven workspace automation. Start your free 3-day trial today.
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
      <footer className="relative border-t border-gray-700/50 bg-[#0a0e1a] mt-32">
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
    </div>
  )
}
