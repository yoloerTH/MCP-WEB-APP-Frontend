import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OnboardingWalkthroughProps {
  preferredName?: string
  onComplete: () => void
}

interface WalkthroughStep {
  id: string
  title: string
  subtitle: string
  description: string
  icon: JSX.Element
  accentColor: string
  glowColor: string
}

const STORAGE_KEY = 'naurra_onboarding_completed'

export default function OnboardingWalkthrough({ preferredName, onComplete }: OnboardingWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isExiting, setIsExiting] = useState(false)

  const displayName = preferredName || 'there'

  const steps: WalkthroughStep[] = [
    {
      id: 'welcome',
      title: `Welcome, ${displayName}`,
      subtitle: 'Your AI workspace is ready',
      description: 'Naurra connects to your Google Workspace and lets you control everything with your voice or chat. Let\'s show you around.',
      accentColor: '#34d399',
      glowColor: 'rgba(52, 211, 153, 0.15)',
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Orbital rings */}
          <motion.div
            className="absolute w-32 h-32 rounded-full border border-emerald-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full border border-emerald-500/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          {/* Center logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="relative z-10"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <img src="/logo-transparent.png" alt="Naurra" className="w-14 h-14 object-contain" />
            </div>
          </motion.div>
          {/* Floating dots on orbit */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{
                background: i % 2 === 0 ? '#34d399' : '#f59e0b',
                boxShadow: `0 0 12px ${i % 2 === 0 ? 'rgba(52,211,153,0.5)' : 'rgba(245,158,11,0.5)'}`,
              }}
              animate={{
                x: [Math.cos((i / 5) * Math.PI * 2) * 80, Math.cos((i / 5) * Math.PI * 2 + Math.PI * 2) * 80],
                y: [Math.sin((i / 5) * Math.PI * 2) * 80, Math.sin((i / 5) * Math.PI * 2 + Math.PI * 2) * 80],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
            />
          ))}
        </div>
      ),
    },
    {
      id: 'workspace',
      title: 'Connect Google Workspace',
      subtitle: 'Step 1 — Link your account',
      description: 'Tap the "Connect Google Workspace" button at the top of the app. This gives Naurra access to your Gmail, Calendar, Drive, Docs, and more.',
      accentColor: '#4285F4',
      glowColor: 'rgba(66, 133, 244, 0.15)',
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Google-style card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative"
          >
            <div className="bg-[#1e2440] rounded-2xl p-5 border border-white/10 shadow-xl w-56">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <span className="text-sm text-white/80 font-medium">Google Workspace</span>
              </div>
              {/* Service icons grid */}
              <div className="grid grid-cols-4 gap-2">
                {['gmail', 'calendar', 'drive', 'docs'].map((service, i) => (
                  <motion.div
                    key={service}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center"
                  >
                    <img src={`/google-icons/${service}.png`} alt={service} className="w-6 h-6 object-contain" />
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Animated connection line */}
            <motion.div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-6"
              style={{ background: 'linear-gradient(to bottom, transparent, #4285F4)' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      ),
    },
    {
      id: 'modes',
      title: 'Two Ways to Interact',
      subtitle: 'Voice or Chat — your choice',
      description: 'Use the mode selector to switch between Voice mode (talk naturally) and Chat mode (type messages). Both connect to the same AI — pick what suits the moment.',
      accentColor: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.15)',
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="flex gap-4">
            {/* Voice card */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="bg-[#1e2440] rounded-2xl p-5 border border-emerald-500/30 w-36 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-white">Voice</p>
                <p className="text-xs text-white/40 mt-1">Speak naturally</p>
                {/* Sound wave */}
                <div className="flex items-center gap-0.5 mt-3 h-5">
                  {[3, 5, 8, 12, 8, 5, 3, 5, 10, 6].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full bg-emerald-400/60"
                      animate={{ height: [h, h * 1.8, h] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
                      style={{ height: h }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            {/* Chat card */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35, type: 'spring' }}
              className="bg-[#1e2440] rounded-2xl p-5 border border-amber-500/30 w-36 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-white">Chat</p>
                <p className="text-xs text-white/40 mt-1">Type messages</p>
                {/* Typing dots */}
                <div className="flex items-center gap-1.5 mt-3 h-5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-amber-400/60"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: 'voice',
      title: 'Start a Voice Call',
      subtitle: 'Just press and speak',
      description: 'Tap the green Start Call button, allow microphone access, and start talking. Ask Naurra to send emails, check your calendar, create documents — anything in your Google Workspace.',
      accentColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.15)',
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Pulsing call button */}
          <motion.div
            className="absolute w-36 h-36 rounded-full bg-emerald-500/10"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute w-28 h-28 rounded-full bg-emerald-500/15"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40 cursor-pointer"
          >
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </motion.div>

          {/* Example commands floating around */}
          {[
            { text: '"Check my emails"', x: -100, y: -60, delay: 0.5 },
            { text: '"Schedule a meeting"', x: 80, y: -50, delay: 0.7 },
            { text: '"Create a doc"', x: -80, y: 55, delay: 0.9 },
          ].map((cmd, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: cmd.delay, type: 'spring' }}
              className="absolute px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50 font-mono"
              style={{ left: `calc(50% + ${cmd.x}px)`, top: `calc(50% + ${cmd.y}px)` }}
            >
              {cmd.text}
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: 'menu',
      title: 'Your Settings & More',
      subtitle: 'Everything in one place',
      description: 'Tap the user icon in the top-right corner to access your Profile Settings, the AI Hub for inspiration, Contact Us, or to Sign Out.',
      accentColor: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.12)',
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring' }}
            className="bg-[#1e2440] rounded-2xl border border-white/10 shadow-xl w-52 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/80 font-medium">{displayName}</p>
                  <p className="text-[10px] text-white/30">Connected</p>
                </div>
              </div>
            </div>
            {/* Menu items */}
            {[
              { icon: '💡', label: 'AI Hub', color: 'text-emerald-300', delay: 0.3 },
              { icon: '⚙️', label: 'Profile Settings', color: 'text-emerald-300', delay: 0.4 },
              { icon: '✉️', label: 'Contact Us', color: 'text-amber-400', delay: 0.5 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: item.delay, type: 'spring' }}
                className="px-4 py-2.5 flex items-center gap-3 hover:bg-white/5"
              >
                <span className="text-sm">{item.icon}</span>
                <span className={`text-sm ${item.color}`}>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ),
    },
    {
      id: 'ready',
      title: 'You\'re All Set!',
      subtitle: 'Start exploring Naurra',
      description: 'Try saying "What\'s on my calendar today?" or "Check my unread emails" to see the magic. The more you use it, the better it gets.',
      accentColor: '#34d399',
      glowColor: 'rgba(52, 211, 153, 0.2)',
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Celebration burst */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: ['#34d399', '#f59e0b', '#60a5fa', '#f472b6'][i % 4],
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i / 8) * Math.PI * 2) * 70,
                y: Math.sin((i / 8) * Math.PI * 2) * 70,
              }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
            />
          ))}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <motion.svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                />
              </motion.svg>
            </div>
          </motion.div>
        </div>
      ),
    },
  ]

  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0
  const step = steps[currentStep]

  const handleComplete = useCallback(() => {
    setIsExiting(true)
    localStorage.setItem(STORAGE_KEY, 'true')
    setTimeout(() => {
      onComplete()
    }, 400)
  }, [onComplete])

  const handleNext = () => {
    if (isLastStep) {
      handleComplete()
      return
    }
    setDirection(1)
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    if (isFirstStep) return
    setDirection(-1)
    setCurrentStep((prev) => prev - 1)
  }

  const handleSkip = () => {
    handleComplete()
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') handleNext()
      else if (e.key === 'ArrowLeft') handleBack()
      else if (e.key === 'Escape') handleSkip()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
    }),
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ fontFamily: "'Outfit', -apple-system, sans-serif" }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#0a0e1a]/85 backdrop-blur-md"
            onClick={handleSkip}
          />

          {/* Ambient glow that changes with steps */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            animate={{
              background: `radial-gradient(circle, ${step.glowColor} 0%, transparent 70%)`,
            }}
            transition={{ duration: 0.8 }}
            style={{ top: '20%', left: '50%', transform: 'translateX(-50%)' }}
          />

          {/* Main card */}
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-[#141829]/95 backdrop-blur-xl rounded-3xl border border-white/[0.08] shadow-2xl overflow-hidden"
          >
            {/* Top accent line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              animate={{
                background: `linear-gradient(90deg, transparent, ${step.accentColor}50, transparent)`,
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Skip button */}
            {!isLastStep && (
              <button
                onClick={handleSkip}
                className="absolute top-5 right-5 z-20 text-xs text-white/30 hover:text-white/60 transition-colors font-medium tracking-wide uppercase"
              >
                Skip
              </button>
            )}

            {/* Step counter */}
            <div className="absolute top-5 left-6 z-20">
              <span className="text-xs font-mono text-white/20">
                {String(currentStep + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
              </span>
            </div>

            {/* Icon/illustration area */}
            <div className="relative h-52 flex items-center justify-center overflow-hidden">
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '32px 32px',
                }}
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {step.icon}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {/* Content area */}
            <div className="px-8 pt-6 pb-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step.id + '-content'}
                  custom={direction}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
                    style={{ color: step.accentColor }}
                  >
                    {step.subtitle}
                  </p>
                  <h2
                    className="text-2xl font-bold text-white mb-3 tracking-tight"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {step.title}
                  </h2>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom controls */}
            <div className="px-8 pb-7 pt-4 flex items-center justify-between">
              {/* Step dots */}
              <div className="flex items-center gap-2">
                {steps.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentStep ? 1 : -1)
                      setCurrentStep(i)
                    }}
                    className="relative h-2 rounded-full transition-colors"
                    animate={{
                      width: i === currentStep ? 24 : 8,
                      backgroundColor: i === currentStep ? step.accentColor : 'rgba(255,255,255,0.1)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    whileHover={{ backgroundColor: i === currentStep ? step.accentColor : 'rgba(255,255,255,0.2)' }}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-2.5">
                {!isFirstStep && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleBack}
                    className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                )}
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-10 px-5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-shadow"
                  style={{
                    background: `linear-gradient(135deg, ${step.accentColor}, ${step.accentColor}cc)`,
                    color: '#0a0e1a',
                    boxShadow: `0 4px 20px ${step.accentColor}30`,
                  }}
                >
                  {isLastStep ? 'Get Started' : 'Next'}
                  {!isLastStep && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Helper to check if onboarding has been completed
export function hasCompletedOnboarding(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

// Helper to reset onboarding (for testing)
export function resetOnboarding(): void {
  localStorage.removeItem(STORAGE_KEY)
}
