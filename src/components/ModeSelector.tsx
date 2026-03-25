import { motion } from 'framer-motion'

interface ModeSelectorProps {
  mode: 'voice' | 'chat'
  onModeChange: (mode: 'voice' | 'chat') => void
}

export default function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onModeChange('voice')}
        className={`relative px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
          mode === 'voice'
            ? 'text-white'
            : 'text-white/40 hover:text-white/60'
        }`}
      >
        {mode === 'voice' && (
          <motion.div
            layoutId="mode-tab"
            className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Voice
        </span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onModeChange('chat')}
        className={`relative px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
          mode === 'chat'
            ? 'text-white'
            : 'text-white/40 hover:text-white/60'
        }`}
      >
        {mode === 'chat' && (
          <motion.div
            layoutId="mode-tab"
            className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Chat
        </span>
      </motion.button>
    </div>
  )
}
