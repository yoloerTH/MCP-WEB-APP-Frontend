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
    <div className="flex items-center justify-center gap-4">
      {/* Start/End Call Button */}
      {!isCallActive ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartCall}
          disabled={callStatus === 'connecting'}
          className="group relative px-8 py-4 font-display font-bold text-lg tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-400 to-magenta-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

          {/* Border */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyber-400 to-magenta-500 p-[2px]">
            <div className="h-full w-full bg-black rounded-lg" />
          </div>

          {/* Content */}
          <span className="relative z-10 bg-gradient-to-r from-cyber-400 to-magenta-500 bg-clip-text text-transparent">
            {callStatus === 'connecting' ? 'CONNECTING...' : 'START CALL'}
          </span>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-400" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-magenta-500" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber-400" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-magenta-500" />
        </motion.button>
      ) : (
        <>
          {/* Mute Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleMute}
            className="group relative w-14 h-14 rounded-full"
          >
            {/* Glow */}
            <div
              className={`absolute inset-0 rounded-full blur-md transition-opacity ${
                isMuted
                  ? 'bg-gray-500 opacity-30'
                  : 'bg-cyber-400 opacity-50 group-hover:opacity-75'
              }`}
            />

            {/* Border */}
            <div
              className={`absolute inset-0 rounded-full p-[2px] ${
                isMuted
                  ? 'bg-gray-500'
                  : 'bg-cyber-400'
              }`}
            >
              <div className="h-full w-full bg-black rounded-full flex items-center justify-center">
                <svg
                  className={`w-6 h-6 ${isMuted ? 'text-gray-400' : 'text-cyber-400'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMuted ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </>
                  )}
                </svg>
              </div>
            </div>
          </motion.button>

          {/* End Call Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEndCall}
            className="group relative px-8 py-4 font-display font-bold text-lg tracking-wider"
          >
            {/* Glow background */}
            <div className="absolute inset-0 bg-red-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

            {/* Border */}
            <div className="absolute inset-0 rounded-lg bg-red-500 p-[2px]">
              <div className="h-full w-full bg-black rounded-lg" />
            </div>

            {/* Content */}
            <span className="relative z-10 text-red-500">
              END CALL
            </span>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500" />
          </motion.button>
        </>
      )}
    </div>
  )
}
