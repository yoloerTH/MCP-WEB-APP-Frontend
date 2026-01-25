import { motion } from 'framer-motion'

type CallStatus = 'disconnected' | 'connecting' | 'connected' | 'listening' | 'ai-speaking' | 'processing'

interface CallControlsProps {
  callStatus: CallStatus
  isMuted: boolean
  onStartCall: () => void
  onEndCall: () => void
  onToggleMute: () => void
}

export default function CallControls({
  callStatus,
  isMuted,
  onStartCall,
  onEndCall,
  onToggleMute,
}: CallControlsProps) {
  const isCallActive = ['listening', 'ai-speaking', 'processing'].includes(callStatus)

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Start/End Call Button */}
      {!isCallActive ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartCall}
          disabled={callStatus === 'connecting'}
          className="relative px-10 py-4 bg-gradient-to-br from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-bold rounded-xl shadow-glow-coral transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <span className="relative z-10">
            {callStatus === 'connecting' ? 'Connecting...' : 'Start Call'}
          </span>
        </motion.button>
      ) : (
        <>
          {/* Mute Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleMute}
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 shadow-soft ${
              isMuted
                ? 'bg-neutral-200 text-neutral-600 border border-neutral-300'
                : 'bg-emerald-100 text-emerald-600 border border-emerald-300'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMuted ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              )}
            </svg>
          </motion.button>

          {/* End Call Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEndCall}
            className="px-10 py-4 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-soft transition-all duration-200"
          >
            End Call
          </motion.button>
        </>
      )}
    </div>
  )
}
