import { motion } from 'framer-motion'

interface ModeSelectorProps {
  mode: 'voice' | 'chat'
  onModeChange: (mode: 'voice' | 'chat') => void
}

export default function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-midnight-700/50 p-1.5 rounded-xl border border-midnight-600">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onModeChange('voice')}
        className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
          mode === 'voice'
            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-glow-emerald'
            : 'text-midnight-300 hover:text-emerald-300'
        }`}
      >
        🎙️ Voice
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onModeChange('chat')}
        className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
          mode === 'chat'
            ? 'bg-gradient-to-br from-gold-500 to-gold-600 text-midnight-900 shadow-glow-gold'
            : 'text-midnight-300 hover:text-gold-300'
        }`}
      >
        💬 Chat
      </motion.button>
    </div>
  )
}
