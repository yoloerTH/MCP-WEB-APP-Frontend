import { motion } from 'framer-motion'

type CallStatus = 'disconnected' | 'connecting' | 'connected' | 'listening' | 'ai-speaking' | 'processing'

interface StatusIndicatorProps {
  status: CallStatus
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const statusConfig = {
    disconnected: {
      label: 'OFFLINE',
      color: 'text-gray-500',
      dotColor: 'bg-gray-500',
      glowColor: 'shadow-gray-500/50',
    },
    connecting: {
      label: 'CONNECTING',
      color: 'text-yellow-400',
      dotColor: 'bg-yellow-400',
      glowColor: 'shadow-yellow-400/50',
    },
    connected: {
      label: 'STANDBY',
      color: 'text-green-400',
      dotColor: 'bg-green-400',
      glowColor: 'shadow-green-400/50',
    },
    listening: {
      label: 'LISTENING',
      color: 'text-cyber-400',
      dotColor: 'bg-cyber-400',
      glowColor: 'shadow-cyber-400/50',
    },
    'ai-speaking': {
      label: 'AI SPEAKING',
      color: 'text-magenta-500',
      dotColor: 'bg-magenta-500',
      glowColor: 'shadow-magenta-500/50',
    },
    processing: {
      label: 'PROCESSING',
      color: 'text-purple-400',
      dotColor: 'bg-purple-400',
      glowColor: 'shadow-purple-400/50',
    },
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-3">
      {/* Status dot */}
      <div className="relative">
        <motion.div
          className={`w-3 h-3 rounded-full ${config.dotColor} ${config.glowColor}`}
          animate={{
            boxShadow:
              status !== 'disconnected' && status !== 'connected'
                ? [
                    `0 0 10px currentColor`,
                    `0 0 20px currentColor`,
                    `0 0 10px currentColor`,
                  ]
                : `0 0 5px currentColor`,
            scale:
              status !== 'disconnected' && status !== 'connected'
                ? [1, 1.2, 1]
                : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Pulse rings */}
        {status !== 'disconnected' && status !== 'connected' && (
          <>
            <motion.div
              className={`absolute inset-0 rounded-full ${config.dotColor} opacity-50`}
              animate={{
                scale: [1, 2, 2],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className={`absolute inset-0 rounded-full ${config.dotColor} opacity-50`}
              animate={{
                scale: [1, 2, 2],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.75,
              }}
            />
          </>
        )}
      </div>

      {/* Status label */}
      <motion.span
        className={`font-display font-semibold text-sm tracking-widest ${config.color}`}
        animate={{
          opacity: status !== 'disconnected' && status !== 'connected' ? [1, 0.7, 1] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {config.label}
      </motion.span>

      {/* Decorative bars */}
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-1 rounded-full ${config.dotColor}`}
            initial={{ height: 4 }}
            animate={{
              height:
                status !== 'disconnected' && status !== 'connected'
                  ? [4, 12, 4]
                  : 4,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  )
}
