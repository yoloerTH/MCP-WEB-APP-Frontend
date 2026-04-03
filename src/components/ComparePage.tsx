import { useState } from 'react'
import { motion } from 'framer-motion'

const comparisonData = [
  {
    feature: 'Voice-Controlled Google Workspace',
    naurra: 'full',
    google: 'limited',
    siri: 'no',
    chatbots: 'no',
    naurraNote: 'Full control of all 8 services',
    googleNote: 'Basic queries only',
    siriNote: 'Apple ecosystem only',
    chatbotsNote: 'Text-only, no integration',
  },
  {
    feature: 'Multi-Service Orchestration',
    naurra: 'full',
    google: 'no',
    siri: 'no',
    chatbots: 'no',
    naurraNote: 'One command spans Gmail + Calendar + Drive',
    googleNote: 'Single service per command',
    siriNote: 'Single service per command',
    chatbotsNote: 'No workspace integration',
  },
  {
    feature: 'Gmail Management by Voice',
    naurra: 'full',
    google: 'limited',
    siri: 'no',
    chatbots: 'no',
    naurraNote: 'Send, search, reply, forward, archive',
    googleNote: 'Read & basic search only',
    siriNote: 'Apple Mail only',
    chatbotsNote: 'No email access',
  },
  {
    feature: 'Calendar Management by Voice',
    naurra: 'full',
    google: 'limited',
    siri: 'limited',
    chatbots: 'no',
    naurraNote: 'Create, view, update, check availability',
    googleNote: 'Create & view events',
    siriNote: 'Apple Calendar only',
    chatbotsNote: 'No calendar access',
  },
  {
    feature: 'Google Drive, Docs & Sheets',
    naurra: 'full',
    google: 'no',
    siri: 'no',
    chatbots: 'no',
    naurraNote: 'Find, create, edit, share files & docs',
    googleNote: 'No file management',
    siriNote: 'No Google integration',
    chatbotsNote: 'No file access',
  },
  {
    feature: '35+ Pre-Built Workflows',
    naurra: 'full',
    google: 'no',
    siri: 'no',
    chatbots: 'no',
    naurraNote: 'Ready-made automations',
    googleNote: 'Manual setup required',
    siriNote: 'Shortcuts only',
    chatbotsNote: 'No workflows',
  },
  {
    feature: 'Native iOS App',
    naurra: 'full',
    google: 'full',
    siri: 'full',
    chatbots: 'limited',
    naurraNote: 'App Store',
    googleNote: 'App Store',
    siriNote: 'Built-in',
    chatbotsNote: 'Varies',
  },
  {
    feature: 'Chat + Voice Modes',
    naurra: 'full',
    google: 'full',
    siri: 'limited',
    chatbots: 'limited',
    naurraNote: 'Both modes, seamless switch',
    googleNote: 'Both modes',
    siriNote: 'Voice-only primarily',
    chatbotsNote: 'Text-only primarily',
  },
  {
    feature: 'Purpose-Built for Productivity',
    naurra: 'full',
    google: 'no',
    siri: 'no',
    chatbots: 'no',
    naurraNote: 'Designed for workspace automation',
    googleNote: 'General purpose assistant',
    siriNote: 'General purpose assistant',
    chatbotsNote: 'General purpose AI',
  },
]

const StatusCell = ({ status, note, highlighted }: { status: string; note: string; highlighted?: boolean }) => {
  if (status === 'full') {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            highlighted
              ? 'bg-emerald-500/25 border-2 border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'bg-emerald-500/15 border border-emerald-500/30'
          }`}
        >
          <svg className={`w-4 h-4 ${highlighted ? 'text-emerald-300' : 'text-emerald-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <span className={`text-[10px] text-center leading-tight hidden lg:block max-w-[130px] ${highlighted ? 'text-emerald-300/70' : 'text-gray-500'}`}>{note}</span>
      </div>
    )
  }
  if (status === 'limited') {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
          <svg className="w-4 h-4 text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </div>
        <span className="text-[10px] text-gray-500 text-center leading-tight hidden lg:block max-w-[130px]">{note}</span>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
        <svg className="w-3.5 h-3.5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <span className="text-[10px] text-gray-600 text-center leading-tight hidden lg:block max-w-[130px]">{note}</span>
    </div>
  )
}

const differentiators = [
  {
    title: 'Voice-First Design',
    description: 'Built from the ground up for voice interaction with Google Workspace. Speak naturally and Naurra understands context, handles follow-ups, and supports barge-in.',
    stat: '3x',
    statLabel: 'faster than typing',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Multi-Service Orchestration',
    description: 'One voice command triggers actions across Gmail, Calendar, Drive, Docs, and Sheets simultaneously. No other assistant can do this.',
    stat: '8',
    statLabel: 'Google services connected',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    title: '35+ Pre-Built Workflows',
    description: 'Ready-made automations for common tasks — no configuration, no setup, no technical knowledge required. Just speak and it works.',
    stat: '35+',
    statLabel: 'AI-powered tools',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Privacy-First Architecture',
    description: 'End-to-end encryption, secure OAuth authentication, GDPR compliant. Naurra never stores your Google credentials or data.',
    stat: '0',
    statLabel: 'data stored',
    gradient: 'from-purple-500 to-violet-600',
  },
]

export default function ComparePage() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  // Count Naurra wins
  const naurraWins = comparisonData.filter(r => r.naurra === 'full').length

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5" />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 -right-1/4 w-[900px] h-[900px] bg-emerald-500/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-0 -left-1/4 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[140px]"
        />
      </div>

      {/* Header */}
      <nav className="relative border-b border-emerald-500/10 backdrop-blur-xl bg-[#0a0e1a]/90 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full group-hover:bg-emerald-500/30 transition-all" />
              <img src="/logo-transparent.png" alt="Naurra.ai" className="w-full h-full object-contain relative z-10" />
            </div>
            <span className="font-display text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
              Naurra.ai
            </span>
          </a>
          <div className="flex items-center gap-5">
            <a href="/pricing" className="text-sm text-gray-400 hover:text-emerald-300 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>Pricing</a>
            <a href="/blog" className="text-sm text-gray-400 hover:text-emerald-300 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>Blog</a>
            <a href="/" className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors">
              &larr; Home
            </a>
          </div>
        </div>
      </nav>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">Comparison</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[1.1]">
            <span className="text-white">How Naurra.ai </span>
            <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Compares</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            The only AI assistant purpose-built for Google Workspace productivity.
          </p>
        </motion.div>

        {/* Score banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="font-display text-lg text-white">{naurraWins}</span>
              </div>
              <div>
                <div className="text-sm text-white font-medium">Naurra.ai leads</div>
                <div className="text-[11px] text-gray-500 font-mono">out of {comparisonData.length} categories</div>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-2">
              {comparisonData.map((row, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    row.naurra === 'full' ? 'bg-emerald-400' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-32"
        >
          <div className="overflow-x-auto -mx-6 px-6 pb-4">
            <div className="min-w-[720px]">
              {/* Glass container */}
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-3xl overflow-hidden">

                {/* Table Header */}
                <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] border-b border-white/[0.06]">
                  <div className="px-6 py-5">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-500">Feature</span>
                  </div>
                  {/* Naurra column header */}
                  <div className="px-4 py-5 text-center bg-emerald-500/[0.06] border-x border-emerald-500/10 relative">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-amber-400" />
                    <div className="flex flex-col items-center gap-1">
                      <img src="/logo-transparent.png" alt="Naurra.ai" className="w-6 h-6 object-contain" loading="lazy" />
                      <span className="font-display text-sm text-emerald-300">Naurra.ai</span>
                    </div>
                  </div>
                  <div className="px-4 py-5 text-center">
                    <span className="text-sm text-gray-400">Google Assistant</span>
                  </div>
                  <div className="px-4 py-5 text-center">
                    <span className="text-sm text-gray-400">Siri</span>
                  </div>
                  <div className="px-4 py-5 text-center">
                    <span className="text-sm text-gray-400">AI Chatbots</span>
                  </div>
                </div>

                {/* Table Rows */}
                {comparisonData.map((row, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03, duration: 0.4 }}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`grid grid-cols-[1.4fr_repeat(4,1fr)] transition-colors duration-200 ${
                      idx !== comparisonData.length - 1 ? 'border-b border-white/[0.04]' : ''
                    } ${hoveredRow === idx ? 'bg-white/[0.03]' : ''}`}
                  >
                    <div className="px-6 py-5 flex items-center">
                      <span className={`text-sm font-medium transition-colors duration-200 ${
                        hoveredRow === idx ? 'text-white' : 'text-gray-300'
                      }`}>{row.feature}</span>
                    </div>
                    <div className="px-4 py-5 flex justify-center items-start bg-emerald-500/[0.04] border-x border-emerald-500/[0.06]">
                      <StatusCell status={row.naurra} note={row.naurraNote} highlighted />
                    </div>
                    <div className="px-4 py-5 flex justify-center items-start">
                      <StatusCell status={row.google} note={row.googleNote} />
                    </div>
                    <div className="px-4 py-5 flex justify-center items-start">
                      <StatusCell status={row.siri} note={row.siriNote} />
                    </div>
                    <div className="px-4 py-5 flex justify-center items-start">
                      <StatusCell status={row.chatbots} note={row.chatbotsNote} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Full support
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </div>
              Limited
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              Not available
            </div>
          </div>
        </motion.div>

        {/* Why Naurra.ai Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full backdrop-blur-sm mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300">Advantages</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight">
              <span className="text-white">Why Choose </span>
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Naurra.ai?</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Purpose-built for Google Workspace, not bolted on as an afterthought.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {differentiators.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.07] blur-2xl rounded-3xl transition-opacity duration-500`} />
                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 group-hover:border-emerald-500/30 rounded-2xl p-7 h-full transition-all duration-300">
                  <div className="flex items-start justify-between mb-5">
                    <h3 className="font-display text-xl text-white">{item.title}</h3>
                    <div className="flex flex-col items-end">
                      <span className={`font-display text-2xl bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>{item.stat}</span>
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{item.statLabel}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Voice Example Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-3">
              <span className="text-white">One Command. </span>
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Multiple Services.</span>
            </h2>
            <p className="text-gray-400">What takes 5 clicks in Google Workspace takes 1 sentence with Naurra.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                command: '"Create a meeting agenda doc and email it to my 2pm attendees"',
                services: ['Calendar', 'Docs', 'Gmail'],
                steps: '3 services, 1 command',
              },
              {
                command: '"Check my emails, summarize what\'s urgent, and add any deadlines to my calendar"',
                services: ['Gmail', 'Calendar'],
                steps: '2 services, 1 command',
              },
              {
                command: '"Pull Q4 numbers from the tracker spreadsheet and create a summary report doc"',
                services: ['Sheets', 'Docs'],
                steps: '2 services, 1 command',
              },
            ].map((example, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300">Voice Command</span>
                </div>
                <p className="text-white text-sm italic mb-4 leading-relaxed">{example.command}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {example.services.map((service, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-300 font-mono">
                        {service}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{example.steps}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 to-amber-500/15 blur-3xl rounded-full" />
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-12 lg:p-16 max-w-3xl mx-auto">
              <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-4">
                <span className="text-white">Ready to Try the </span>
                <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Difference?</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Start your free 3-day trial. No credit card required. Every paid plan includes unlimited usage for the full billing period.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="/pricing"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 inline-block"
                >
                  Start Free Trial
                </motion.a>
                <a
                  href="https://apps.apple.com/app/naurra-ai/id6759445443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-12"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom nav */}
        <div className="text-center text-sm text-gray-500">
          <a href="/" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            &larr; Back to Naurra.ai
          </a>
        </div>
      </div>
    </div>
  )
}
