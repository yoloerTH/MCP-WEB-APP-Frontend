import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { PersonalizationData } from '../contexts/AuthContext'

const OCCUPATION_TYPES = [
  { value: 'student', label: 'Student' },
  { value: 'professional', label: 'Professional' },
  { value: 'business_owner', label: 'Business Owner' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'other', label: 'Other' }
] as const

const COMMUNICATION_STYLES = [
  { value: 'formal', label: 'Formal', description: 'Professional and structured' },
  { value: 'casual', label: 'Casual', description: 'Friendly and conversational' },
  { value: 'concise', label: 'Concise', description: 'Brief and to the point' },
  { value: 'detailed', label: 'Detailed', description: 'Thorough and comprehensive' }
] as const

const COMMON_TOOLS = [
  'Gmail',
  'Calendar',
  'Drive',
  'Docs',
  'Sheets',
  'Slides',
  'Meet',
  'Forms',
  'Keep'
]

const TYPICAL_TASKS = [
  'Write emails',
  'Schedule meetings',
  'Create documents',
  'Analyze data',
  'Collaborate with team',
  'Manage projects',
  'Research topics',
  'Present ideas'
]

export function Settings() {
  const navigate = useNavigate()
  const { user, personalizationData, updatePersonalization, fetchPersonalization } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<PersonalizationData>({
    full_name: '',
    preferred_name: '',
    occupation_type: undefined,
    job_title: '',
    company_organization: '',
    industry: '',
    primary_work_focus: '',
    common_tools: [],
    typical_tasks: [],
    communication_style: undefined,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  })

  useEffect(() => {
    const loadData = async () => {
      await fetchPersonalization()
      setIsLoading(false)
    }
    loadData()
  }, [])

  useEffect(() => {
    if (personalizationData) {
      setFormData(personalizationData)
    }
  }, [personalizationData])

  const updateField = (field: keyof PersonalizationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: 'common_tools' | 'typical_tasks', item: string) => {
    setFormData(prev => {
      const currentArray = prev[field] || []
      const newArray = currentArray.includes(item)
        ? currentArray.filter(i => i !== item)
        : [...currentArray, item]
      return { ...prev, [field]: newArray }
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updatePersonalization(formData)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert('Failed to save your settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const generatePreviewSummary = () => {
    return `User: ${formData.preferred_name || formData.full_name || 'User'}. Role: ${formData.job_title || formData.occupation_type || 'professional'} at ${formData.company_organization || 'their organization'}. Focus: ${formData.primary_work_focus || 'productivity'}. Typical tasks: ${formData.typical_tasks?.join(', ') || 'general tasks'}. Prefers ${formData.communication_style || 'professional'} communication.`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-900 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl" />
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl shadow-emerald-500/30 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Settings saved successfully!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-medium transition-colors"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </motion.button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-gold-400 blur-3xl opacity-30" />
              <h1 className="relative text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-gold-400 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                Profile Settings
              </h1>
            </div>
            <p className="text-emerald-200/70 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {user?.email ? `Signed in as ${user.email}` : 'Customize how the AI assists you'}
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-midnight-800/90 to-midnight-900/90 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-2xl overflow-hidden"
          >
            {/* Header Accent */}
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-gold-400 to-gold-500" />

            <div className="p-8 space-y-8">

              {/* Basic Info Section */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                  <span className="text-3xl">👤</span>
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.full_name || ''}
                      onChange={(e) => updateField('full_name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-midnight-700/50 border border-emerald-500/30 rounded-xl text-white placeholder-midnight-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Preferred Name
                    </label>
                    <input
                      type="text"
                      value={formData.preferred_name || ''}
                      onChange={(e) => updateField('preferred_name', e.target.value)}
                      placeholder="John"
                      className="w-full px-4 py-3 bg-midnight-700/50 border border-emerald-500/30 rounded-xl text-white placeholder-midnight-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    />
                  </div>
                </div>
              </motion.section>

              <div className="border-t border-midnight-700" />

              {/* Professional Context Section */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                  <span className="text-3xl">💼</span>
                  Professional Context
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      I am a
                    </label>
                    <select
                      value={formData.occupation_type || ''}
                      onChange={(e) => updateField('occupation_type', e.target.value)}
                      className="w-full px-4 py-3 bg-midnight-700/50 border border-emerald-500/30 rounded-xl text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      <option value="">Select your role...</option>
                      {OCCUPATION_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-emerald-300 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={formData.job_title || ''}
                        onChange={(e) => updateField('job_title', e.target.value)}
                        placeholder="Marketing Manager"
                        className="w-full px-4 py-3 bg-midnight-700/50 border border-emerald-500/30 rounded-xl text-white placeholder-midnight-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-emerald-300 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Industry
                      </label>
                      <input
                        type="text"
                        value={formData.industry || ''}
                        onChange={(e) => updateField('industry', e.target.value)}
                        placeholder="Technology"
                        className="w-full px-4 py-3 bg-midnight-700/50 border border-emerald-500/30 rounded-xl text-white placeholder-midnight-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company_organization || ''}
                      onChange={(e) => updateField('company_organization', e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 bg-midnight-700/50 border border-emerald-500/30 rounded-xl text-white placeholder-midnight-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    />
                  </div>
                </div>
              </motion.section>

              <div className="border-t border-midnight-700" />

              {/* AI Optimization Section */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                  <span className="text-3xl">🤖</span>
                  AI Preferences
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Primary Work Focus
                    </label>
                    <input
                      type="text"
                      value={formData.primary_work_focus || ''}
                      onChange={(e) => updateField('primary_work_focus', e.target.value)}
                      placeholder="Campaign analytics and team coordination"
                      className="w-full px-4 py-3 bg-midnight-700/50 border border-emerald-500/30 rounded-xl text-white placeholder-midnight-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Google Tools I Use
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {COMMON_TOOLS.map(tool => (
                        <motion.button
                          key={tool}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleArrayItem('common_tools', tool)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            formData.common_tools?.includes(tool)
                              ? 'bg-gradient-to-br from-emerald-500 to-gold-400 text-midnight-900 shadow-lg shadow-emerald-500/20'
                              : 'bg-midnight-700/50 text-midnight-300 border border-midnight-600 hover:border-emerald-500/50'
                          }`}
                          style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                          {tool}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Typical Tasks
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {TYPICAL_TASKS.map(task => (
                        <motion.button
                          key={task}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleArrayItem('typical_tasks', task)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                            formData.typical_tasks?.includes(task)
                              ? 'bg-gradient-to-br from-emerald-500 to-gold-400 text-midnight-900 shadow-lg shadow-emerald-500/20'
                              : 'bg-midnight-700/50 text-midnight-300 border border-midnight-600 hover:border-emerald-500/50'
                          }`}
                          style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                          {task}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Communication Style
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {COMMUNICATION_STYLES.map(style => (
                        <motion.button
                          key={style.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateField('communication_style', style.value)}
                          className={`px-4 py-3 rounded-xl text-left transition-all ${
                            formData.communication_style === style.value
                              ? 'bg-gradient-to-br from-emerald-500 to-gold-400 text-midnight-900 shadow-lg shadow-emerald-500/20 border-2 border-gold-400'
                              : 'bg-midnight-700/50 text-midnight-300 border-2 border-midnight-600 hover:border-emerald-500/50'
                          }`}
                        >
                          <div className="font-semibold text-sm mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {style.label}
                          </div>
                          <div className={`text-xs ${
                            formData.communication_style === style.value ? 'text-midnight-800' : 'text-midnight-400'
                          }`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {style.description}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>

              <div className="border-t border-midnight-700" />

              {/* AI Context Preview */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                  <span className="text-3xl">🧠</span>
                  AI Context Summary
                </h2>
                <p className="text-sm text-midnight-400 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  This is what the AI knows about you to provide personalized assistance
                </p>
                <div className="bg-gradient-to-br from-midnight-700/80 to-midnight-800/80 border border-emerald-500/30 rounded-xl p-6">
                  <p className="text-emerald-200 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {generatePreviewSummary()}
                  </p>
                </div>
              </motion.section>

            </div>

            {/* Footer Actions */}
            <div className="px-8 py-6 bg-midnight-900/50 border-t border-midnight-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-midnight-400" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Changes are saved to your profile
                </div>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors underline"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Contact Support
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={isSaving}
                className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  isSaving
                    ? 'bg-midnight-700 text-midnight-500 cursor-not-allowed'
                    : 'bg-gradient-to-br from-emerald-500 to-gold-400 hover:from-emerald-600 hover:to-gold-500 text-midnight-900 shadow-emerald-500/30'
                }`}
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
