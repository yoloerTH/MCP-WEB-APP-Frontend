import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import type { PersonalizationData } from '../contexts/AuthContext'

interface PersonalizationModalProps {
  isOpen: boolean
  onClose: () => void
}

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

export function PersonalizationModal({ isOpen, onClose }: PersonalizationModalProps) {
  const { updatePersonalization } = useAuth()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSkip = () => {
    onClose()
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await updatePersonalization(formData)
      onClose()
    } catch (error) {
      console.error('Failed to save personalization:', error)
      alert('Failed to save your preferences. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.full_name && formData.full_name.trim().length > 0
      case 2:
        return formData.occupation_type !== undefined
      case 3:
        return formData.communication_style !== undefined
      default:
        return true
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleSkip}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-gold-400/20 to-gold-500/20 blur-3xl opacity-50" />

            {/* Modal Card */}
            <div className="relative bg-gradient-to-br from-midnight-800/95 to-midnight-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-500/20 overflow-hidden flex flex-col h-full">
              {/* Header Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-gold-400 to-gold-500" />

              {/* Header */}
              <div className="px-8 pt-8 pb-6 border-b border-midnight-700/50">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                      Personalize Your AI
                    </h2>
                    <p className="text-emerald-300/80 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Help us tailor your experience for better assistance
                    </p>
                  </div>
                  <button
                    onClick={handleSkip}
                    className="text-midnight-400 hover:text-emerald-300 transition-colors text-sm font-medium"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Skip for now
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-midnight-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: step >= s ? '100%' : '0%' }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className={`h-full ${
                          step >= s
                            ? 'bg-gradient-to-r from-emerald-500 to-gold-400'
                            : 'bg-midnight-600'
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-emerald-300 font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {step === 1 && 'Basic Info'}
                    {step === 2 && 'Professional Context'}
                    {step === 3 && 'AI Preferences'}
                  </span>
                  <span className="text-xs text-midnight-400" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Step {step} of 3
                  </span>
                </div>
              </div>

              {/* Content - Scrollable Area */}
              <div
                className="px-8 py-8 max-h-[60vh] overflow-y-auto"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#10b981 transparent'
                }}
              >
                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Info */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-emerald-300 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          Full Name <span className="text-gold-400">*</span>
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
                          <span className="text-midnight-400 text-xs ml-2 font-normal">(What should the AI call you?)</span>
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

                      <div className="pt-4 flex items-center gap-3 text-sm text-midnight-400">
                        <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span style={{ fontFamily: 'Outfit, sans-serif' }}>
                          This helps the AI address you personally and remember your preferences
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Professional Context */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-emerald-300 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          I am a <span className="text-gold-400">*</span>
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                      <div className="pt-4 flex items-center gap-3 text-sm text-midnight-400">
                        <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span style={{ fontFamily: 'Outfit, sans-serif' }}>
                          This context helps the AI understand your professional needs
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: AI Optimization */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
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
                          <span className="text-midnight-400 text-xs ml-2 font-normal">(Select all that apply)</span>
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
                          <span className="text-midnight-400 text-xs ml-2 font-normal">(Select all that apply)</span>
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
                        <label className="block text-sm font-semibold text-emerald-300 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          Communication Style <span className="text-gold-400">*</span>
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

                      <div className="pt-4 flex items-center gap-3 text-sm text-midnight-400">
                        <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span style={{ fontFamily: 'Outfit, sans-serif' }}>
                          These preferences optimize how the AI communicates with you
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 border-t border-midnight-700/50 flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: step > 1 ? 1.05 : 1 }}
                  whileTap={{ scale: step > 1 ? 0.95 : 1 }}
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    step === 1
                      ? 'text-midnight-600 cursor-not-allowed'
                      : 'text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 hover:border-emerald-500/50'
                  }`}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Back
                </motion.button>

                <div className="flex items-center gap-3">
                  {step < 3 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                        isStepValid()
                          ? 'bg-gradient-to-br from-emerald-500 to-gold-400 hover:from-emerald-600 hover:to-gold-500 text-midnight-900 shadow-emerald-500/30'
                          : 'bg-midnight-700 text-midnight-500 cursor-not-allowed'
                      }`}
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      Next Step
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmit}
                      disabled={!isStepValid() || isSubmitting}
                      className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                        isStepValid() && !isSubmitting
                          ? 'bg-gradient-to-br from-emerald-500 to-gold-400 hover:from-emerald-600 hover:to-gold-500 text-midnight-900 shadow-emerald-500/30'
                          : 'bg-midnight-700 text-midnight-500 cursor-not-allowed'
                      }`}
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        'Complete Setup'
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
