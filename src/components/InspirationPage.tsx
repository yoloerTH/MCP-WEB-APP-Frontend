import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { USE_CASES, CATEGORY_INFO, UseCase } from '../data/useCases'

type CategoryFilter = 'all' | 'email' | 'calendar' | 'documents' | 'multi-service' | 'quick-tasks'

export function InspirationPage() {
  const navigate = useNavigate()
  const { personalizationData } = useAuth()
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [shuffleKey, setShuffleKey] = useState(0)

  // Smart randomization with personalization weighting
  const selectedUseCases = useMemo(() => {
    let filteredCases = categoryFilter === 'all'
      ? USE_CASES
      : USE_CASES.filter(uc => uc.category === categoryFilter)

    // If personalization exists, weight by relevance
    if (personalizationData) {
      const weights = filteredCases.map(useCase => {
        let weight = 1.0

        // Weight by occupation type match
        if (personalizationData.occupation_type &&
            useCase.tags.includes(personalizationData.occupation_type)) {
          weight *= 2.5
        }

        // Weight by common tools match
        const toolMatches = personalizationData.common_tools?.filter(tool =>
          useCase.tags.some(tag => tag.toLowerCase().includes(tool.toLowerCase()))
        ).length || 0
        weight *= (1 + toolMatches * 0.5)

        // Weight by typical tasks match
        const taskMatches = personalizationData.typical_tasks?.filter(task =>
          useCase.tags.some(tag => task.toLowerCase().includes(tag.toLowerCase())) ||
          useCase.description.toLowerCase().includes(task.toLowerCase())
        ).length || 0
        weight *= (1 + taskMatches * 0.3)

        return weight
      })

      // Weighted random selection
      const selected: UseCase[] = []
      const maxSelections = Math.min(6, filteredCases.length)
      const availableIndices = [...Array(filteredCases.length).keys()]

      for (let i = 0; i < maxSelections; i++) {
        const totalWeight = availableIndices.reduce((sum, idx) => sum + weights[idx], 0)
        let random = Math.random() * totalWeight

        let selectedIdx = availableIndices[0]
        for (const idx of availableIndices) {
          random -= weights[idx]
          if (random <= 0) {
            selectedIdx = idx
            break
          }
        }

        selected.push(filteredCases[selectedIdx])
        availableIndices.splice(availableIndices.indexOf(selectedIdx), 1)

        if (availableIndices.length === 0) break
      }

      return selected
    }

    // Balanced random without personalization
    const shuffled = [...filteredCases].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 6)
  }, [categoryFilter, shuffleKey, personalizationData])

  const handleShuffle = () => {
    setShuffleKey(prev => prev + 1)
  }

  const handleTryThis = (useCase: UseCase, mode: 'voice' | 'chat') => {
    // Navigate with prompt as state
    navigate(mode === 'voice' ? '/voiceai' : '/chatai', {
      state: { prefillPrompt: useCase.examplePrompt }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-900 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl" />
      </div>

      {/* Navigation Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 px-6 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            AI Hub
          </h1>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/voiceai')}
              className="px-5 py-2.5 bg-midnight-700/50 hover:bg-midnight-700 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-300 rounded-xl font-medium transition-all backdrop-blur-sm"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Voice AI
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/chatai')}
              className="px-5 py-2.5 bg-midnight-700/50 hover:bg-midnight-700 border border-gold-400/30 hover:border-gold-400/50 text-gold-300 rounded-xl font-medium transition-all backdrop-blur-sm"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Chat AI
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="px-5 py-2.5 bg-midnight-700/50 hover:bg-midnight-700 border border-amber-400/30 hover:border-amber-400/50 text-amber-300 rounded-xl font-medium transition-all backdrop-blur-sm"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-16 pt-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-gold-400 blur-2xl opacity-40" />
                <h2 className="relative text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-gold-400 to-gold-500 pb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  What can you do?
                </h2>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-emerald-200/80 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Your AI assistant connects with Google Workspace to automate tasks,
              boost productivity, and make your workday effortless
            </motion.p>
          </motion.div>

          {/* Platform Flow Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-br from-midnight-800/80 to-midnight-900/80 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                {/* Voice + Chat AI */}
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-2xl shadow-lg shadow-emerald-500/30"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -5 }}
                    className="bg-gradient-to-br from-gold-400 to-gold-500 p-4 rounded-2xl shadow-lg shadow-gold-400/30"
                  >
                    <svg className="w-8 h-8 text-midnight-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </motion.div>
                </div>

                {/* Arrow */}
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-emerald-400"
                >
                  <svg className="w-12 h-12 rotate-0 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>

                {/* Google Workspace Services */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'Gmail', icon: '✉️', color: 'red' },
                    { name: 'Calendar', icon: '📅', color: 'blue' },
                    { name: 'Drive', icon: '📁', color: 'yellow' },
                    { name: 'Docs', icon: '📄', color: 'blue' },
                    { name: 'Sheets', icon: '📊', color: 'green' },
                    { name: 'Meet', icon: '🎥', color: 'green' }
                  ].map((service, idx) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.05 }}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="bg-midnight-700/50 backdrop-blur-sm p-3 rounded-xl border border-midnight-600 hover:border-emerald-500/50 transition-all cursor-default"
                      title={service.name}
                    >
                      <span className="text-2xl">{service.icon}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center text-sm text-midnight-400 mt-6"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Speak or type naturally • AI understands your intent • Actions happen automatically
              </motion.p>
            </div>
          </motion.div>

          {/* Personalization Notice */}
          {personalizationData && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-gold-400/10 border border-emerald-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
                <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-sm font-medium text-emerald-300" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Showing personalized suggestions for {personalizationData.preferred_name || 'you'}
                </span>
              </div>
            </motion.div>
          )}

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 flex flex-wrap items-center justify-center gap-3"
          >
            {(['all', 'email', 'calendar', 'documents', 'multi-service', 'quick-tasks'] as CategoryFilter[]).map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategoryFilter(category)}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all backdrop-blur-sm ${
                  categoryFilter === category
                    ? 'bg-gradient-to-br from-emerald-500 to-gold-400 text-midnight-900 shadow-lg shadow-emerald-500/30'
                    : 'bg-midnight-700/50 text-midnight-300 border border-midnight-600 hover:border-emerald-500/50 hover:text-emerald-300'
                }`}
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {category === 'all' ? 'All' : CATEGORY_INFO[category].name}
              </motion.button>
            ))}
          </motion.div>

          {/* Shuffle Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, rotate: 180 }}
              onClick={handleShuffle}
              className="inline-flex items-center gap-3 px-6 py-3 bg-midnight-700/80 hover:bg-midnight-700 border border-gold-400/40 hover:border-gold-400 rounded-xl text-gold-300 font-bold transition-all backdrop-blur-sm shadow-lg"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Shuffle Ideas
            </motion.button>
          </motion.div>

          {/* Use Case Cards Grid */}
          <motion.div
            key={shuffleKey}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {selectedUseCases.map((useCase, idx) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.1, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-gradient-to-br from-midnight-800/90 to-midnight-900/90 backdrop-blur-xl rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 p-6 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
              >
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    useCase.category === 'email' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    useCase.category === 'calendar' ? 'bg-gold-400/20 text-gold-300 border border-gold-400/30' :
                    useCase.category === 'documents' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    useCase.category === 'multi-service' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {CATEGORY_INFO[useCase.category].name}
                  </div>
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="mb-4"
                >
                  {useCase.icon.startsWith('/') ? (
                    <img
                      src={useCase.icon}
                      alt={useCase.title}
                      className="w-14 h-14 object-contain"
                    />
                  ) : (
                    <span className="text-5xl">{useCase.icon}</span>
                  )}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {useCase.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-midnight-300 mb-4 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {useCase.description}
                </p>

                {/* Example Prompt */}
                <div className="bg-midnight-700/50 rounded-lg p-3 mb-4 border border-midnight-600">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p className="text-xs text-emerald-200 italic leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      "{useCase.examplePrompt}"
                    </p>
                  </div>
                </div>

                {/* Try This Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTryThis(useCase, 'voice')}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    🎙️ Voice
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTryThis(useCase, 'chat')}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-br from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-midnight-900 rounded-lg font-bold text-sm shadow-lg shadow-gold-400/30 transition-all"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    💬 Chat
                  </motion.button>
                </div>

                {/* Difficulty Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1">
                    {[...Array(useCase.difficulty === 'beginner' ? 1 : useCase.difficulty === 'intermediate' ? 2 : 3)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-20 text-center"
          >
            <p className="text-midnight-400 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Ready to experience the future of productivity?
            </p>
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/voiceai')}
                className="px-8 py-4 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-bold shadow-xl shadow-emerald-500/30 transition-all"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Try Voice AI
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/chatai')}
                className="px-8 py-4 bg-gradient-to-br from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-midnight-900 rounded-xl font-bold shadow-xl shadow-gold-400/30 transition-all"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Try Chat AI
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
