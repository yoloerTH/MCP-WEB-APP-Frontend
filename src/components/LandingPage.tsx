import { motion } from 'framer-motion'

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight-900/80 backdrop-blur-md border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                <circle cx="8" cy="10" r="1.5" fill="white"/>
                <circle cx="16" cy="10" r="1.5" fill="white"/>
                <path d="M8 15c0 2 1.79 3 4 3s4-1 4-3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold">AI Assistant</span>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="px-6 py-2.5 bg-gradient-to-br from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-midnight-900 font-bold rounded-xl shadow-lg shadow-gold-500/30 transition-all duration-200"
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-gold-400 bg-clip-text text-transparent">
                Your AI-Powered
                <br />
                Google Workspace Assistant
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Control your entire Google Workspace ecosystem with voice or chat.
              Powered by cutting-edge AI technology.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-xl shadow-emerald-500/30 text-lg transition-all duration-300"
              >
                Try Voice Mode
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-br from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-midnight-900 font-bold rounded-xl shadow-xl shadow-gold-500/30 text-lg transition-all duration-300"
              >
                Try Chat Mode
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '35+', label: 'AI Tools' },
              { value: '8', label: 'Google Services' },
              { value: '2', label: 'Modes' },
              { value: '24/7', label: 'Available' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-midnight-800/50 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-emerald-400 to-gold-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Brain Hub Visualization */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Intelligent <span className="bg-gradient-to-r from-emerald-400 to-gold-400 bg-clip-text text-transparent">Connection</span>
            </h2>
            <p className="text-lg text-gray-400">Your AI assistant seamlessly integrates with Google Workspace</p>
          </motion.div>

          {/* AI Brain Hub - Desktop */}
          <div className="hidden md:block relative max-w-5xl mx-auto" style={{ height: '600px' }}>
            {/* Center AI Brain */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(16, 185, 129, 0.3)",
                    "0 0 60px rgba(16, 185, 129, 0.5)",
                    "0 0 30px rgba(16, 185, 129, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full w-32 h-32 flex items-center justify-center relative"
              >
                <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
                  <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
                  <path d="M8 15c0 2 1.79 3 4 3s4-1 4-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div className="absolute -bottom-8 text-center whitespace-nowrap">
                  <p className="text-sm font-bold text-emerald-400">AI Assistant</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Google Services in circle around AI */}
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
              const radius = 240
              const angleRad = (item.angle - 90) * (Math.PI / 180)
              const x = Math.cos(angleRad) * radius
              const y = Math.sin(angleRad) * radius

              return (
                <motion.div
                  key={item.service}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="absolute top-1/2 left-1/2 z-20"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                >
                  {/* Connection line */}
                  <svg
                    className="absolute top-1/2 left-1/2 pointer-events-none"
                    style={{
                      width: `${Math.abs(radius)}px`,
                      height: '2px',
                      transformOrigin: 'left center',
                      transform: `translate(-${radius < 0 ? 0 : 100}%, -50%) rotate(${item.angle + (radius < 0 ? 180 : 0)}deg)`
                    }}
                  >
                    <motion.line
                      x1="0"
                      y1="1"
                      x2={Math.abs(radius)}
                      y2="1"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 + idx * 0.1 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <motion.div
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="bg-midnight-800 border-2 border-emerald-500/30 rounded-xl p-3 hover:border-emerald-500 transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    <div className="w-12 h-12 mb-2">
                      <GoogleServiceIcon service={item.service} />
                    </div>
                    <p className="text-xs font-bold text-center whitespace-nowrap">{item.name}</p>
                    <p className="text-[10px] text-emerald-400 text-center">{item.tools} tools</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* AI Brain Hub - Mobile */}
          <div className="md:hidden relative max-w-sm mx-auto" style={{ height: '700px' }}>
            {/* Center AI Brain */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full w-24 h-24 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
                  <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
                  <path d="M8 15c0 2 1.79 3 4 3s4-1 4-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-sm font-bold text-emerald-400 text-center mt-2">AI Assistant</p>
            </motion.div>

            {/* Google Services */}
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
              const radius = 140
              const angleRad = (item.angle - 90) * (Math.PI / 180)
              const x = Math.cos(angleRad) * radius
              const y = Math.sin(angleRad) * radius

              return (
                <motion.div
                  key={item.service}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="absolute z-20"
                  style={{
                    top: `calc(20% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="bg-midnight-800 border-2 border-emerald-500/30 rounded-xl p-2 shadow-lg">
                    <div className="w-10 h-10 mb-1">
                      <GoogleServiceIcon service={item.service} />
                    </div>
                    <p className="text-[10px] font-bold text-center whitespace-nowrap">{item.name}</p>
                    <p className="text-[8px] text-emerald-400 text-center">{item.tools} tools</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Productivity Infographic - Before/After */}
      <section className="py-20 px-6 bg-midnight-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Boost Your <span className="bg-gradient-to-r from-emerald-400 to-gold-400 bg-clip-text text-transparent">Productivity</span>
            </h2>
            <p className="text-lg text-gray-400">See the difference AI automation makes</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-900/20 to-red-800/20 border-2 border-red-500/30 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❌</span>
                </div>
                <h3 className="text-2xl font-bold text-red-400">Before</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Manually switching between multiple Google apps',
                  'Typing every email and document from scratch',
                  'Forgetting calendar events and tasks',
                  'Wasting time on repetitive actions',
                  'Losing track of important information',
                  'Hours spent on routine workspace tasks'
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-red-400 mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <p className="text-3xl font-bold text-red-400">5-10 hours/week</p>
                <p className="text-sm text-gray-400">wasted on manual work</p>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 border-2 border-emerald-500/30 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-emerald-400">After</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Voice or chat commands control everything',
                  'AI drafts emails and documents instantly',
                  'Never miss an event with smart reminders',
                  'Automate repetitive workspace actions',
                  'AI remembers and retrieves information',
                  'Focus on what matters most'
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <p className="text-3xl font-bold text-emerald-400">80% time saved</p>
                <p className="text-sm text-gray-400">focus on high-value work</p>
              </div>
            </motion.div>
          </div>

          {/* Arrow between */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-3xl animate-pulse">
              →
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful <span className="bg-gradient-to-r from-emerald-400 to-gold-400 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-lg text-gray-400">Everything you need to supercharge your productivity</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Voice Control',
                desc: 'Natural speech recognition with real-time transcription and audio feedback',
                gradient: 'from-emerald-500 to-emerald-600'
              },
              {
                title: 'Chat Interface',
                desc: 'Type your commands and get instant responses with full conversation history',
                gradient: 'from-gold-500 to-gold-600'
              },
              {
                title: 'Secure Authentication',
                desc: 'Industry-standard OAuth 2.0 keeps your Google data safe and private',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Real-time Processing',
                desc: 'Lightning-fast AI responses with instant updates and notifications',
                gradient: 'from-purple-500 to-purple-600'
              },
              {
                title: 'Smart Context',
                desc: 'AI understands your intent and executes complex multi-step workflows',
                gradient: 'from-pink-500 to-pink-600'
              },
              {
                title: 'Always Available',
                desc: 'Cloud-powered infrastructure ensures 24/7 uptime and global access',
                gradient: 'from-cyan-500 to-cyan-600'
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-midnight-800 to-midnight-700 border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to Transform Your Workflow?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Start using your AI assistant today. No credit card required.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-10 py-5 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-2xl shadow-emerald-500/30 text-xl transition-all duration-300"
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-500/20 py-8 px-6 bg-midnight-900">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
          <p className="mb-2">
            Built with care using React, TypeScript, and Tailwind CSS
          </p>
          <p className="text-xs">
            Powered by Google Workspace API • Deployed on Railway & Netlify
          </p>
        </div>
      </footer>
    </div>
  )
}
