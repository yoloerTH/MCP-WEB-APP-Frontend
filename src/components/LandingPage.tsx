import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'

interface LandingPageProps {
  onGetStarted: () => void
}

// Google Service Icons as SVG components
const GoogleServiceIcon = ({ service }: { service: string }) => {
  const icons: Record<string, JSX.Element> = {
    gmail: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" fill="#4285F4" rx="8"/>
        <path fill="#fff" d="M10 18h28v20a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V18z"/>
        <path fill="#4285F4" d="M10 12a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v10H10V12z"/>
        <text x="24" y="34" fontSize="18" fontWeight="bold" fill="#4285F4" textAnchor="middle">31</text>
      </svg>
    ),
    drive: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <path fill="#0066DA" d="M15 32.5 8.5 44h31L46 32.5H15z"/>
        <path fill="#00AC47" d="M16 31 2 31 15.5 4.5 29.5 4.5z"/>
        <path fill="#EA4335" d="M31 31 17.5 4.5h27L46 31z"/>
      </svg>
    ),
    docs: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <path fill="#4285F4" d="M37 45H11c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h18l10 10v30c0 1.1-.9 2-2 2z"/>
        <path fill="#F1F1F1" d="M29 3v8c0 1.1.9 2 2 2h8l-10-10z"/>
        <path fill="#fff" d="M15 20h18v2H15zm0 4h18v2H15zm0 4h12v2H15z"/>
      </svg>
    ),
    sheets: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <path fill="#0F9D58" d="M37 45H11c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h18l10 10v30c0 1.1-.9 2-2 2z"/>
        <path fill="#F1F1F1" d="M29 3v8c0 1.1.9 2 2 2h8l-10-10z"/>
        <path fill="#fff" d="M15 20h18v2H15zm0 4h18v2H15zm0 4h18v2H15zm0 4h18v2H15z"/>
      </svg>
    ),
    contacts: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" fill="#1976D2" rx="8"/>
        <circle cx="24" cy="18" r="6" fill="#fff"/>
        <path fill="#fff" d="M24 26c-6 0-11 3-11 6v4h22v-4c0-3-5-6-11-6z"/>
      </svg>
    ),
    tasks: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" fill="#4285F4" rx="8"/>
        <path fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M12 24l6 6 12-12"/>
        <circle cx="24" cy="24" r="16" fill="none" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    meet: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" fill="#00897B" rx="8"/>
        <path fill="#fff" d="M32 22v4l8 6V16l-8 6zm-16-6h16v16H16z"/>
        <circle cx="38" cy="12" r="6" fill="#EA4335"/>
      </svg>
    )
  }

  return icons[service] || null
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '30%'])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden relative">
      {/* Load Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        .font-mono {
          font-family: 'JetBrains Mono', monospace;
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
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0e1a]/80 border-b border-emerald-500/10"
        style={{ opacity: headerOpacity }}
      >
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

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGetStarted}
            className="group relative px-7 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg font-semibold text-sm overflow-hidden shadow-xl shadow-emerald-500/25 border border-emerald-400/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              Launch Platform
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-8 min-h-screen flex items-center">
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">Live & Operational</span>
                </div>

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
                  onClick={onGetStarted}
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl font-semibold text-lg overflow-hidden shadow-2xl shadow-emerald-500/30 border border-emerald-400/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Try Voice Mode</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(245, 158, 11, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onGetStarted}
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl font-semibold text-lg overflow-hidden shadow-2xl shadow-amber-500/30 border border-amber-400/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Try Chat Mode</span>
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

              {/* Main container with proper positioning */}
              <div className="relative w-[450px] h-[450px]">
                {/* Center AI core */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 40px rgba(16, 185, 129, 0.3)",
                      "0 0 80px rgba(16, 185, 129, 0.5)",
                      "0 0 40px rgba(16, 185, 129, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-400/30 shadow-2xl z-20"
                >
                  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </motion.div>

                {/* Orbiting service icons - FIXED positioning */}
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
                  const radius = 170
                  const angleRad = (item.angle * Math.PI) / 180
                  const x = Math.cos(angleRad) * radius
                  const y = Math.sin(angleRad) * radius

                  return (
                    <motion.div
                      key={item.service}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + idx * 0.08, duration: 0.6 }}
                      whileHover={{ scale: 1.15, transition: { duration: 0.3 } }}
                      className="absolute z-10"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                    >
                      <div className="relative group w-12 h-12">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-lg group-hover:bg-emerald-500/40 transition-all duration-300" />
                        <div className="relative bg-[#0a0e1a]/95 backdrop-blur-sm border border-white/10 rounded-lg p-1.5 shadow-xl group-hover:border-emerald-500/50 transition-all duration-300">
                          <GoogleServiceIcon service={item.service} />
                        </div>
                      </div>

                      {/* Connection line - FIXED */}
                      <div
                        className="absolute top-1/2 left-1/2 pointer-events-none"
                        style={{
                          width: `${radius}px`,
                          height: '1px',
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

          {/* Large Interactive Hub */}
          <div className="relative w-full h-[700px] max-w-5xl mx-auto flex items-center justify-center">
            <div className="relative w-[700px] h-[700px]">
              {/* Center AI Brain */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
              <div className="relative group">
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

                {/* Main brain container */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-48 h-48 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-3xl flex items-center justify-center border-2 border-emerald-400/50 shadow-2xl shadow-emerald-500/50"
                >
                  <svg className="w-24 h-24 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>

                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/50" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/50" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/50" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/50" />
                </motion.div>

                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="font-display text-xl text-white">AI Assistant</div>
                  <div className="text-sm text-emerald-400 text-center font-mono">Neural Core</div>
                </div>
              </div>
            </motion.div>

              {/* Google Services in Orbit - FIXED */}
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
                const radius = 280
                const angleRad = (item.angle * Math.PI) / 180
                const x = Math.cos(angleRad) * radius
                const y = Math.sin(angleRad) * radius

                return (
                  <motion.div
                    key={item.service}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.08, ease: "backOut" }}
                    className="absolute z-10"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                    }}
                  >
                  {/* Connection Line - FIXED */}
                  <div
                    className="absolute top-1/2 left-1/2 pointer-events-none -z-10"
                    style={{
                      width: `${radius - 50}px`,
                      height: '2px',
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
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="group relative cursor-pointer"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/30 blur-2xl rounded-2xl transition-all duration-500" />

                    {/* Service card */}
                    <div className="relative bg-[#0a0e1a]/95 backdrop-blur-xl border border-white/10 group-hover:border-emerald-500/50 rounded-2xl p-4 shadow-2xl transition-all duration-300">
                      <div className="w-16 h-16 mb-2">
                        <GoogleServiceIcon service={item.service} />
                      </div>
                      <div className="text-sm font-semibold text-white">{item.name}</div>
                      <div className="text-xs text-emerald-400 font-mono">{item.tools} tools</div>
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

      {/* Features Grid */}
      <section className="relative py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">Capabilities</span>
            </div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-tight">
              <span className="text-white">Enterprise-Grade </span>
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Features</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Voice Control',
                desc: 'Natural speech recognition with real-time transcription and audio feedback',
                gradient: 'from-emerald-500 to-emerald-600',
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )
              },
              {
                title: 'Chat Interface',
                desc: 'Type commands and get instant intelligent responses with full context',
                gradient: 'from-amber-500 to-amber-600',
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )
              },
              {
                title: 'Secure Authentication',
                desc: 'Industry-standard OAuth 2.0 keeps your data safe and encrypted',
                gradient: 'from-blue-500 to-blue-600',
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              },
              {
                title: 'Real-time Processing',
                desc: 'Lightning-fast AI responses with WebSocket connections for instant updates',
                gradient: 'from-purple-500 to-purple-600',
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Smart Context',
                desc: 'AI understands intent and executes complex multi-step workflows automatically',
                gradient: 'from-pink-500 to-pink-600',
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: 'Always Available',
                desc: 'Cloud infrastructure ensures 24/7 global availability and reliability',
                gradient: 'from-cyan-500 to-cyan-600',
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-xl rounded-3xl transition-opacity duration-500`} />

                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-emerald-500/30 rounded-2xl p-8 h-full transition-all duration-300">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
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
              onClick={onGetStarted}
              className="group relative px-12 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl font-display text-xl overflow-hidden shadow-2xl shadow-emerald-500/30 border border-emerald-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3">
                Launch Platform
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
