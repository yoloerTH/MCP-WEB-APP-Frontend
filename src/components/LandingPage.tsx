import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { AuthButton } from './AuthButton'

interface LandingPageProps {
  onGetStarted: (mode?: 'voice' | 'chat') => void
}

// Google Service Icons - Using official PNG icons
const GoogleServiceIcon = ({ service }: { service: string }) => {
  // For services with official icons, use PNG. For others, use simple SVG
  const hasOfficialIcon = ['gmail', 'calendar', 'drive', 'docs', 'sheets', 'meet', 'tasks'].includes(service)

  if (hasOfficialIcon) {
    return (
      <img
        src={`/google-icons/${service}.png`}
        alt={service}
        className="w-full h-full object-contain"
      />
    )
  }

  // Fallback SVG icon for Contacts only
  const fallbackIcons: Record<string, JSX.Element> = {
    contacts: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" fill="#1976D2" rx="8"/>
        <circle cx="24" cy="18" r="6" fill="#fff"/>
        <path fill="#fff" d="M24 26c-6 0-11 3-11 6v4h22v-4c0-3-5-6-11-6z"/>
      </svg>
    )
  }

  return fallbackIcons[service] || null
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const { user, signInWithGoogle } = useAuth()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentScenario, setCurrentScenario] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '30%'])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-scroll carousel
  useEffect(() => {
    if (isCarouselPaused) return

    const carouselInterval = setInterval(() => {
      setCurrentScenario((prev) => (prev + 1) % 3)
    }, 5000) // Change scenario every 5 seconds

    return () => clearInterval(carouselInterval)
  }, [isCarouselPaused])

  // Scroll carousel container when currentScenario changes
  useEffect(() => {
    const carouselContainer = document.querySelector('.carousel-container')
    if (carouselContainer) {
      const cardWidth = carouselContainer.querySelector('.scenario-card')?.clientWidth || 0
      const gap = 24 // 1.5rem = 24px
      carouselContainer.scrollTo({
        left: currentScenario * (cardWidth + gap),
        behavior: 'smooth'
      })
    }
  }, [currentScenario])

  const handleGetStartedClick = (mode?: 'voice' | 'chat') => {
    if (!user) {
      signInWithGoogle()
    } else {
      onGetStarted(mode)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden relative">
      {/* Load Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .font-display {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Custom scrollbar for carousel */
        .carousel-container::-webkit-scrollbar {
          height: 6px;
        }
        .carousel-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .carousel-container::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #10b981, #f59e0b);
          border-radius: 10px;
        }
      `}</style>

      {/* Dynamic gradient background */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-amber-500/20" />
        <div
          className="absolute w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]"
          style={{
            left: `${mousePosition.x - 400}px`,
            top: `${mousePosition.y - 400}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
      </motion.div>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"/>
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0e1a]/80 border-b border-emerald-500/10">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
              <div className="relative w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-500/50 border border-emerald-400/30">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
            <div>
              <span className="text-xl font-display tracking-tight">AI Assistant</span>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Workspace Edition</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <AuthButton />
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-8 min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-6"
              >
                <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight">
                  <span className="block text-white">Your AI-Powered</span>
                  <span className="block bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
                    Workspace
                  </span>
                  <span className="block text-white">Command Center</span>
                </h1>

                <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                  Control your entire Google Workspace through natural voice commands or intelligent chat.
                  <span className="text-emerald-300 font-medium"> 35+ AI tools</span> at your fingertips.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGetStartedClick('voice')}
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    handleGetStartedClick('voice')
                  }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl font-semibold text-lg overflow-hidden shadow-2xl shadow-emerald-500/30 border border-emerald-400/30 cursor-pointer touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="relative pointer-events-none">{user ? 'Try Voice Mode' : 'Sign in to Start'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(245, 158, 11, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGetStartedClick('chat')}
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    handleGetStartedClick('chat')
                  }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl font-semibold text-lg overflow-hidden shadow-2xl shadow-amber-500/30 border border-amber-400/30 cursor-pointer touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="relative pointer-events-none">{user ? 'Try Chat Mode' : 'Sign in to Start'}</span>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {[
                  { value: '35+', label: 'AI Tools', accent: 'emerald' },
                  { value: '8', label: 'Services', accent: 'amber' },
                  { value: '24/7', label: 'Uptime', accent: 'emerald' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-${stat.accent}-500/5 blur-xl rounded-2xl group-hover:bg-${stat.accent}-500/10 transition-all duration-300`} />
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 group-hover:border-emerald-500/30 transition-all duration-300">
                      <div className={`font-display text-4xl bg-gradient-to-br from-${stat.accent}-400 to-${stat.accent}-500 bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 font-medium mt-1">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Visual Element - Mini AI Hub Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full h-[500px] hidden lg:flex items-center justify-center"
            >
              {/* Glow effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/10 rounded-3xl blur-3xl" />

              {/* Main container with proper positioning - optimized size and centered */}
              <div className="relative w-[420px] h-[420px] mx-auto flex items-center justify-center">
                {/* Center AI core - perfectly centered */}
                <div className="absolute z-20">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 40px rgba(16, 185, 129, 0.3)",
                        "0 0 80px rgba(16, 185, 129, 0.5)",
                        "0 0 40px rgba(16, 185, 129, 0.3)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center border-2 border-emerald-400/40 shadow-2xl"
                  >
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </motion.div>
                </div>

                {/* Orbiting service icons - PROPERLY FIXED with Framer Motion */}
                {[
                  { service: 'gmail', angle: 0 },
                  { service: 'calendar', angle: 45 },
                  { service: 'drive', angle: 90 },
                  { service: 'docs', angle: 135 },
                  { service: 'sheets', angle: 180 },
                  { service: 'contacts', angle: 225 },
                  { service: 'tasks', angle: 270 },
                  { service: 'meet', angle: 315 },
                ].map((item, idx) => {
                  const radius = 160
                  const angleRad = (item.angle * Math.PI) / 180
                  const x = Math.cos(angleRad) * radius
                  const y = Math.sin(angleRad) * radius

                  return (
                    <motion.div
                      key={item.service}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1
                      }}
                      transition={{ delay: 0.6 + idx * 0.08, duration: 0.6, ease: "easeOut" }}
                      className="absolute z-10"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.15,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        className="relative group w-14 h-14 cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-xl group-hover:bg-emerald-500/50 transition-all duration-300" />
                        <div className="relative bg-[#0a0e1a]/95 backdrop-blur-sm border border-white/10 rounded-xl p-2 shadow-xl group-hover:border-emerald-500/80 group-hover:shadow-2xl group-hover:shadow-emerald-500/30 transition-all duration-300">
                          <GoogleServiceIcon service={item.service} />
                        </div>
                      </motion.div>

                      {/* Connection line */}
                      <div
                        className="absolute pointer-events-none -z-10"
                        style={{
                          width: `${radius - 28}px`,
                          height: '1px',
                          left: '50%',
                          top: '50%',
                          transformOrigin: '0 0',
                          transform: `rotate(${item.angle + 180}deg)`
                        }}
                      >
                        <motion.div
                          className="h-full border-t border-dashed border-emerald-500/30"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1, delay: 0.7 + idx * 0.08 }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Brain Hub Detailed Section */}
      <section className="relative py-32 px-8 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">Architecture</span>
            </div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-tight">
              <span className="text-white">Intelligent </span>
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Connection Hub</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Your AI assistant seamlessly orchestrates every Google Workspace tool
            </p>
          </motion.div>

          {/* Large Interactive Hub - optimized */}
          <div className="relative w-full h-[700px] max-w-5xl mx-auto flex items-center justify-center">
            <div className="relative w-[680px] h-[680px] mx-auto flex items-center justify-center">
              {/* Center AI Brain - perfectly centered */}
              <div className="absolute z-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative group"
                >
                  {/* Pulsing glow rings */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-emerald-500/30 blur-3xl rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full"
                  />

                  {/* Main brain container - perfectly centered */}
                  <motion.div
                    whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
                    className="relative w-40 h-40 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-3xl flex items-center justify-center border-2 border-emerald-400/60 shadow-2xl shadow-emerald-500/50 cursor-pointer"
                  >
                    <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>

                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/60" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/60" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/60" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/60" />
                  </motion.div>

                  <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                    <div className="font-display text-xl text-white">AI Assistant</div>
                    <div className="text-sm text-emerald-400 font-mono">Neural Core</div>
                  </div>
                </motion.div>
              </div>

              {/* Google Services in Orbit - PROPERLY FIXED with Framer Motion */}
              {[
                { service: 'gmail', name: 'Gmail', angle: 0, tools: 3 },
                { service: 'calendar', name: 'Calendar', angle: 45, tools: 6 },
                { service: 'drive', name: 'Drive', angle: 90, tools: 6 },
                { service: 'docs', name: 'Docs', angle: 135, tools: 5 },
                { service: 'sheets', name: 'Sheets', angle: 180, tools: 5 },
                { service: 'contacts', name: 'Contacts', angle: 225, tools: 4 },
                { service: 'tasks', name: 'Tasks', angle: 270, tools: 5 },
                { service: 'meet', name: 'Meet', angle: 315, tools: 5 },
              ].map((item, idx) => {
                const radius = 270
                const angleRad = (item.angle * Math.PI) / 180
                const x = Math.cos(angleRad) * radius
                const y = Math.sin(angleRad) * radius

                return (
                  <motion.div
                    key={item.service}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{
                      opacity: 1,
                      scale: 1
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.08, ease: "backOut" }}
                    className="absolute z-10"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Connection Line */}
                    <div
                      className="absolute pointer-events-none -z-10"
                      style={{
                        width: `${radius - 80}px`,
                        height: '2px',
                        left: '50%',
                        top: '50%',
                        transformOrigin: '0 0',
                        transform: `rotate(${item.angle + 180}deg)`
                      }}
                    >
                      <motion.div
                        className="h-full border-t-2 border-dashed border-emerald-500/40"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.5 + idx * 0.08 }}
                      />
                    </div>

                    <motion.div
                      whileHover={{
                        scale: 1.15,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="group relative cursor-pointer"
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-emerald-500/20 group-hover:bg-emerald-500/50 blur-2xl rounded-2xl transition-all duration-300" />

                      {/* Service card - better sizing */}
                      <div className="relative bg-[#0a0e1a]/95 backdrop-blur-xl border border-white/10 group-hover:border-emerald-500/80 group-hover:shadow-2xl group-hover:shadow-emerald-500/30 rounded-2xl p-4 shadow-2xl transition-all duration-300">
                        <div className="w-16 h-16 mb-2 flex items-center justify-center">
                          <GoogleServiceIcon service={item.service} />
                        </div>
                        <div className="text-sm font-semibold text-white text-center">{item.name}</div>
                        <div className="text-xs text-emerald-400 font-mono text-center">{item.tools} tools</div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Transformation - Animated Workflow Journey */}
      <section className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300">Impact Metrics</span>
            </div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-tight">
              <span className="text-white">Productivity </span>
              <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">Amplified</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real metrics from AI-powered workspace automation
            </p>
          </motion.div>

          {/* Animated Metrics Dashboard */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { value: 80, suffix: '%', label: 'Time Saved', desc: 'On routine tasks', color: 'emerald' },
              { value: 10, suffix: 'hrs', label: 'Weekly Gain', desc: 'Back to your schedule', color: 'amber' },
              { value: 5, suffix: 'x', label: 'Faster Workflows', desc: 'Task completion speed', color: 'blue' },
              { value: 35, suffix: '+', label: 'AI Tools', desc: 'At your command', color: 'purple' },
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}-500/20 to-${metric.color}-600/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-emerald-500/30 rounded-2xl p-8 transition-all duration-300">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.8, type: "spring" }}
                    className="font-display text-6xl bg-gradient-to-br from-emerald-400 to-amber-400 bg-clip-text text-transparent mb-2"
                  >
                    {metric.value}{metric.suffix}
                  </motion.div>
                  <div className="font-semibold text-lg text-white mb-1">{metric.label}</div>
                  <div className="text-sm text-gray-400">{metric.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Workflow Journey Animation */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="font-display text-3xl text-white mb-2">Your Day, Transformed</h3>
              <p className="text-gray-400">See how AI automation revolutionizes your workflow</p>
            </motion.div>

            {/* Animated Workflow Steps */}
            <div className="relative max-w-4xl mx-auto">
              {/* Progress line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2 hidden md:block" />
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 -translate-y-1/2 hidden md:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ transformOrigin: "left" }}
              />

              <div className="grid md:grid-cols-3 gap-8 relative">
                {[
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    ),
                    title: 'Speak Your Need',
                    desc: 'Natural voice command or quick chat message',
                    color: 'emerald'
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                    title: 'AI Executes',
                    desc: 'Intelligent processing across all Google services',
                    color: 'amber'
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ),
                    title: 'Done Instantly',
                    desc: 'Task completed, time saved, focus maintained',
                    color: 'emerald'
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 + 0.5, duration: 0.6 }}
                    className="relative"
                  >
                    {/* Animated number badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 + 0.7, duration: 0.6, type: "spring" }}
                      className={`w-16 h-16 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-${step.color}-500/30 relative z-10`}
                    >
                      {step.icon}
                    </motion.div>

                    <div className="text-center">
                      <h4 className="font-display text-xl text-white mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-400">{step.desc}</p>
                    </div>

                    {/* Arrow connector for mobile */}
                    {idx < 2 && (
                      <div className="md:hidden flex justify-center my-6">
                        <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to action in this section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="text-center mt-16"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-emerald-300">Real-time automation</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-amber-300">Zero learning curve</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Real-World Scenarios Carousel */}
      <section className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">Real Impact</span>
            </div>
            <h2 className="font-display text-5xl lg:text-7xl tracking-tight leading-[1.1]">
              <span className="text-white">Multi-Service </span>
              <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                Orchestration
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Watch your AI assistant combine multiple Google services in a single command
            </p>
          </motion.div>

          {/* Horizontal Scrolling Carousel */}
          <div className="relative">
            <div
              className="carousel-container flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              {[
                {
                  title: 'Meeting Orchestration',
                  command: '"Schedule team sync for tomorrow at 2pm"',
                  services: [
                    { name: 'meet', label: 'Meet', color: 'emerald' },
                    { name: 'calendar', label: 'Calendar', color: 'blue' },
                    { name: 'gmail', label: 'Gmail', color: 'red' }
                  ],
                  result: 'Creates Google Meet link, adds event to your calendar, and sends confirmation emails to all attendees',
                  gradient: 'from-emerald-500/20 to-blue-500/20',
                  accentColor: 'emerald'
                },
                {
                  title: 'Data & Documentation',
                  command: '"Generate monthly sales report from Q4 data"',
                  services: [
                    { name: 'sheets', label: 'Sheets', color: 'green' },
                    { name: 'docs', label: 'Docs', color: 'blue' },
                    { name: 'tasks', label: 'Tasks', color: 'purple' }
                  ],
                  result: 'Pulls data from Google Sheets, generates formatted report in Docs, and creates follow-up tasks',
                  gradient: 'from-green-500/20 to-purple-500/20',
                  accentColor: 'green'
                },
                {
                  title: 'Team Coordination',
                  command: '"Plan team lunch next Friday at noon"',
                  services: [
                    { name: 'calendar', label: 'Calendar', color: 'blue' },
                    { name: 'gmail', label: 'Gmail', color: 'red' }
                  ],
                  result: 'Creates calendar event and sends personalized invitations to all team members automatically',
                  gradient: 'from-blue-500/20 to-amber-500/20',
                  accentColor: 'amber'
                }
              ].map((scenario, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  className="scenario-card flex-shrink-0 w-[90vw] md:w-[600px] snap-center"
                >
                  <div className="group relative h-full">
                    {/* Holographic glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${scenario.gradient} blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700`} />

                    {/* Glass card */}
                    <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 group-hover:border-emerald-500/30 rounded-3xl p-8 h-full transition-all duration-500 shadow-2xl">
                      {/* Header */}
                      <div className="mb-8">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-${scenario.accentColor}-500/10 border border-${scenario.accentColor}-500/20 rounded-full mb-4`}>
                          <div className={`w-1.5 h-1.5 bg-${scenario.accentColor}-400 rounded-full`} />
                          <span className={`text-xs font-mono uppercase tracking-wider text-${scenario.accentColor}-300`}>
                            Scenario {idx + 1}
                          </span>
                        </div>
                        <h3 className="font-display text-3xl text-white mb-3 leading-tight">
                          {scenario.title}
                        </h3>
                        <div className="relative">
                          <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-amber-500 rounded-full" />
                          <p className="text-lg text-emerald-300 font-medium pl-6 italic">
                            {scenario.command}
                          </p>
                        </div>
                      </div>

                      {/* Service Flow Visualization */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between gap-4 relative">
                          {/* Animated connection line */}
                          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500 -translate-y-1/2 opacity-30" />

                          {scenario.services.map((service, serviceIdx) => (
                            <motion.div
                              key={serviceIdx}
                              initial={{ scale: 0, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.15 + serviceIdx * 0.1 + 0.3, duration: 0.5, type: "spring" }}
                              className="relative z-10 flex-1"
                            >
                              <div className="flex flex-col items-center gap-2">
                                {/* Service icon */}
                                <motion.div
                                  whileHover={{ scale: 1.1, y: -4 }}
                                  className="relative group/icon"
                                >
                                  <div className={`absolute inset-0 bg-${service.color}-500/20 blur-xl rounded-2xl`} />
                                  <div className="relative w-16 h-16 bg-[#0a0e1a]/90 backdrop-blur-sm border border-white/20 rounded-2xl p-2.5 shadow-xl">
                                    <GoogleServiceIcon service={service.name} />
                                  </div>
                                </motion.div>

                                {/* Service label */}
                                <span className="text-xs font-medium text-gray-400">
                                  {service.label}
                                </span>
                              </div>

                              {/* Arrow connector */}
                              {serviceIdx < scenario.services.length - 1 && (
                                <motion.div
                                  initial={{ scaleX: 0 }}
                                  whileInView={{ scaleX: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: idx * 0.15 + serviceIdx * 0.1 + 0.5, duration: 0.4 }}
                                  className="absolute top-8 -right-2 w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-amber-500"
                                  style={{ transformOrigin: 'left' }}
                                >
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-amber-500" />
                                </motion.div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Result */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">Result</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {scenario.result}
                        </p>
                      </div>

                      {/* Service count badge */}
                      <div className="absolute top-8 right-8">
                        <div className="relative">
                          <div className={`absolute inset-0 bg-${scenario.accentColor}-500/30 blur-lg rounded-full`} />
                          <div className={`relative w-12 h-12 bg-gradient-to-br from-${scenario.accentColor}-500 to-${scenario.accentColor}-600 rounded-full flex items-center justify-center border-2 border-white/10 shadow-xl`}>
                            <span className="font-display text-xl text-white">{scenario.services.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: [0, 10, 0] }}
              transition={{ delay: 1, duration: 2, repeat: Infinity }}
              className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 text-emerald-400"
            >
              <span className="text-sm font-mono">Scroll</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>

            {/* Carousel Indicators */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentScenario(idx)}
                  className="group relative"
                  aria-label={`Go to scenario ${idx + 1}`}
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      currentScenario === idx
                        ? 'w-12 bg-gradient-to-r from-emerald-500 to-amber-500'
                        : 'w-1.5 bg-white/20 group-hover:bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture Section */}
      <section className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300">Infrastructure</span>
            </div>
            <h2 className="font-display text-5xl lg:text-7xl tracking-tight leading-[1.1]">
              <span className="text-white">Distributed </span>
              <span className="bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent">
                AI Infrastructure
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powered by cutting-edge intelligent orchestration and real-time service mesh technology
            </p>
          </motion.div>

          {/* Architecture Visualization */}
          <div className="relative max-w-5xl mx-auto">
            {/* Central Orchestration Layer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative mb-16"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-emerald-500/20 blur-3xl" />

              <div className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-12 text-center">
                <div className="inline-flex items-center justify-center gap-4 mb-6">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 40px rgba(16, 185, 129, 0.3)",
                        "0 0 80px rgba(245, 158, 11, 0.5)",
                        "0 0 40px rgba(16, 185, 129, 0.3)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-amber-500 to-emerald-500 rounded-2xl flex items-center justify-center border-2 border-white/20"
                  >
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </motion.div>
                </div>

                <h3 className="font-display text-3xl text-white mb-3">Intelligent Orchestration Layer</h3>
                <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                  Neural coordination engine that intelligently routes and executes commands across distributed services
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {['Real-time Service Mesh', 'AI Intent Parser', 'Dynamic Load Balancer', 'Context Engine'].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                      className="px-4 py-2 bg-white/5 border border-emerald-500/20 rounded-full text-sm text-emerald-300 font-medium"
                    >
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Distributed AI Servers */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Processing Nodes',
                  desc: 'High-performance computation clusters',
                  stats: ['< 100ms latency', '99.9% uptime', 'Auto-scaling'],
                  icon: (
                    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  ),
                  gradient: 'from-emerald-500 to-emerald-600'
                },
                {
                  title: 'Data Pipeline',
                  desc: 'Secure encrypted data flows',
                  stats: ['End-to-end encryption', 'Zero-knowledge', 'GDPR compliant'],
                  icon: (
                    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  ),
                  gradient: 'from-amber-500 to-amber-600'
                },
                {
                  title: 'Neural Cache',
                  desc: 'Smart context & prediction layer',
                  stats: ['Contextual memory', 'Pattern learning', 'Adaptive routing'],
                  icon: (
                    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  gradient: 'from-blue-500 to-blue-600'
                }
              ].map((node, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${node.gradient} opacity-0 group-hover:opacity-10 blur-2xl rounded-3xl transition-opacity duration-500`} />

                  <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 group-hover:border-emerald-500/30 rounded-2xl p-6 h-full transition-all duration-300">
                    <div className={`w-14 h-14 bg-gradient-to-br ${node.gradient} rounded-xl flex items-center justify-center mb-4 p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {node.icon}
                    </div>

                    <h4 className="font-display text-xl text-white mb-2">{node.title}</h4>
                    <p className="text-sm text-gray-400 mb-4">{node.desc}</p>

                    <div className="space-y-2">
                      {node.stats.map((stat, statIdx) => (
                        <div key={statIdx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                          <span className="text-xs text-gray-500 font-mono">{stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="font-display text-5xl lg:text-6xl tracking-tight">
                <span className="block text-white mb-2">Ready to Transform</span>
                <span className="block bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                  Your Workflow?
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Start using your AI assistant today. No credit card required.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 25px 70px rgba(16, 185, 129, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGetStartedClick('voice')}
              onTouchEnd={(e) => {
                e.preventDefault()
                handleGetStartedClick('voice')
              }}
              className="group relative px-12 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl font-display text-xl overflow-hidden shadow-2xl shadow-emerald-500/30 border border-emerald-400/30 cursor-pointer touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative flex items-center gap-3 pointer-events-none">
                {user ? 'Launch Platform' : 'Sign in to Get Started'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-8 bg-[#0a0e1a]/50 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center border border-emerald-400/30">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <div className="font-display text-sm text-white">AI Assistant</div>
                <div className="text-xs text-gray-500 font-mono">Workspace Edition</div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 mb-1">
                Built with precision using React, TypeScript, and Tailwind CSS
              </p>
              <p className="text-xs text-gray-500 font-mono">
                Powered by Google Workspace API • Deployed on Railway & Netlify
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
