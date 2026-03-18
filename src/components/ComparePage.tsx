import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SEO } from './SEO'
import { StructuredData } from './StructuredData'

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
    feature: 'Google Drive, Docs & Sheets Control',
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

const StatusCell = ({ status, note }: { status: string; note: string }) => {
  if (status === 'full') {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-[11px] text-gray-500 text-center leading-tight hidden lg:block">{note}</span>
      </div>
    )
  }
  if (status === 'limited') {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-7 h-7 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
          <span className="text-amber-400 text-xs font-bold">~</span>
        </div>
        <span className="text-[11px] text-gray-500 text-center leading-tight hidden lg:block">{note}</span>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <span className="text-[11px] text-gray-600 text-center leading-tight hidden lg:block">{note}</span>
    </div>
  )
}

const differentiators = [
  {
    title: 'Voice-First Design',
    description: 'Built from the ground up for voice interaction with Google Workspace. Speak naturally and Naurra understands context, handles follow-ups, and supports barge-in (interrupt while AI is speaking).',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: 'Multi-Service Orchestration',
    description: 'One voice command triggers actions across Gmail, Calendar, Drive, Docs, and Sheets simultaneously. "Create a meeting agenda and email it to attendees" — done in seconds.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: '35+ Pre-Built Workflows',
    description: 'Ready-made automations for common tasks — no configuration, no setup, no technical knowledge required. Just speak and it works.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Privacy-First Architecture',
    description: 'End-to-end encryption, secure OAuth authentication, GDPR compliant. Naurra never stores your Google credentials or data — your workspace stays yours.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
]

export default function ComparePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
      <SEO
        title="Naurra.ai vs Google Assistant vs Siri — AI Workspace Assistant Comparison"
        description="Compare Naurra.ai with Google Assistant, Siri, and AI chatbots for Google Workspace automation. See why Naurra.ai is the only voice AI purpose-built for Gmail, Calendar, Drive, Docs, and Sheets."
        keywords="Naurra vs Google Assistant, best AI assistant for Google Workspace, AI voice assistant comparison, Naurra vs Siri, Google Workspace AI tools comparison, voice assistant for Gmail"
        url="/compare"
      />
      <StructuredData type="faq" data={{
        faqs: [
          {
            question: 'How is Naurra.ai different from Google Assistant for Google Workspace?',
            answer: 'Naurra.ai is purpose-built for Google Workspace productivity, offering full control over 8 Google services through voice commands. Unlike Google Assistant, which handles basic queries, Naurra.ai supports multi-service orchestration — one command can create a document, pull data from a spreadsheet, and email it to your team. It also includes 35+ pre-built workflows that Google Assistant does not offer.'
          },
          {
            question: 'Can Siri manage Google Workspace?',
            answer: 'Siri is designed for the Apple ecosystem and does not integrate with Google Workspace services like Gmail, Google Calendar, Google Drive, Docs, or Sheets. Naurra.ai is specifically built to control all 8 Google Workspace services through natural voice commands.'
          },
          {
            question: 'What is the best AI assistant for Google Workspace in 2026?',
            answer: 'Naurra.ai is the leading voice-first AI assistant purpose-built for Google Workspace. It is the only tool that offers multi-service orchestration (one command spanning Gmail, Calendar, Drive, Docs, Sheets), 35+ pre-built workflows, both voice and chat modes, and a native iOS app — all designed specifically for Google Workspace productivity.'
          },
          {
            question: 'Can ChatGPT or other AI chatbots control Google Workspace?',
            answer: 'General-purpose AI chatbots like ChatGPT do not have direct integration with Google Workspace. They cannot send emails, create calendar events, manage Drive files, or edit Google Docs. Naurra.ai connects directly to your Google Workspace through secure OAuth and executes real actions across all 8 Google services.'
          }
        ]
      }} />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5" />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 -right-1/4 w-[900px] h-[900px] bg-emerald-500/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-0 -left-1/4 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[140px]"
        />
      </div>

      {/* Header */}
      <nav className="relative border-b border-emerald-500/10 backdrop-blur-xl bg-[#0a0e1a]/90 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full group-hover:bg-emerald-500/30 transition-all" />
              <img src="/logo-transparent.png" alt="Naurra.ai" className="w-full h-full object-contain relative z-10" />
            </div>
            <span className="font-display text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
              Naurra.ai
            </span>
          </button>
          <button onClick={() => navigate('/')} className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors">
            ← Back to Home
          </button>
        </div>
      </nav>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">Comparison</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[1.1]">
            <span className="text-white">How Naurra.ai </span>
            <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Compares</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            The only AI assistant purpose-built for Google Workspace. See how Naurra.ai stacks up against general-purpose assistants.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-32"
        >
          <div className="overflow-x-auto -mx-6 px-6">
            <div className="min-w-[700px]">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_repeat(4,120px)] lg:grid-cols-[1fr_repeat(4,160px)] gap-3 mb-4">
                <div className="px-4 py-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-500">Feature</span>
                </div>
                {/* Naurra column header - highlighted */}
                <div className="relative px-4 py-4 rounded-t-2xl bg-emerald-500/10 border border-emerald-500/30 border-b-0 text-center">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-500 rounded-full">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white font-bold">Best</span>
                  </div>
                  <span className="font-display text-sm lg:text-base text-emerald-300">Naurra.ai</span>
                </div>
                <div className="px-4 py-4 text-center">
                  <span className="text-sm text-gray-400">Google Assistant</span>
                </div>
                <div className="px-4 py-4 text-center">
                  <span className="text-sm text-gray-400">Siri</span>
                </div>
                <div className="px-4 py-4 text-center">
                  <span className="text-sm text-gray-400">AI Chatbots</span>
                </div>
              </div>

              {/* Table Rows */}
              {comparisonData.map((row, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04, duration: 0.4 }}
                  className={`grid grid-cols-[1fr_repeat(4,120px)] lg:grid-cols-[1fr_repeat(4,160px)] gap-3 ${
                    idx % 2 === 0 ? 'bg-white/[0.02]' : ''
                  } rounded-xl`}
                >
                  <div className="px-4 py-4 flex items-center">
                    <span className="text-sm text-gray-300 font-medium">{row.feature}</span>
                  </div>
                  {/* Naurra column - highlighted */}
                  <div className={`px-4 py-4 flex justify-center items-start border-x border-emerald-500/20 bg-emerald-500/[0.04] ${
                    idx === comparisonData.length - 1 ? 'rounded-b-2xl border-b border-emerald-500/30' : ''
                  }`}>
                    <StatusCell status={row.naurra} note={row.naurraNote} />
                  </div>
                  <div className="px-4 py-4 flex justify-center items-start">
                    <StatusCell status={row.google} note={row.googleNote} />
                  </div>
                  <div className="px-4 py-4 flex justify-center items-start">
                    <StatusCell status={row.siri} note={row.siriNote} />
                  </div>
                  <div className="px-4 py-4 flex justify-center items-start">
                    <StatusCell status={row.chatbots} note={row.chatbotsNote} />
                  </div>
                </motion.div>
              ))}
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
              <div className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <span className="text-amber-400 text-[8px] font-bold">~</span>
              </div>
              Limited
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
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
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight">
              <span className="text-white">Why </span>
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
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 blur-2xl rounded-3xl transition-opacity duration-500" />
                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 group-hover:border-emerald-500/30 rounded-2xl p-7 h-full transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-xl text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 blur-3xl" />
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-12 lg:p-16 max-w-3xl mx-auto">
              <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-4">
                <span className="text-white">Ready to Try the </span>
                <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Difference?</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Start your free 3-day trial. No credit card required. Experience the only AI assistant built specifically for Google Workspace.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/pricing')}
                  className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                >
                  Start Free Trial
                </button>
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
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom nav */}
        <div className="text-center text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="text-emerald-400 hover:text-emerald-300 transition-colors">
            ← Back to Naurra.ai
          </button>
        </div>
      </div>
    </div>
  )
}
