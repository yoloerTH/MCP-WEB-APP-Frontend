import { motion } from 'framer-motion'

type CallStatus = 'disconnected' | 'connecting' | 'connected' | 'listening' | 'ai-speaking' | 'processing'

interface StatusIndicatorProps {
  status: CallStatus
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const statusConfig = {
    disconnected: {
      label: 'Offline',
      color: 'text-neutral-400',
      dotColor: 'bg-neutral-400',
    },
    connecting: {
      label: 'Connecting',
      color: 'text-amber-500',
      dotColor: 'bg-amber-500',
    },
    connected: {
      label: 'Ready',
      color: 'text-emerald-500',
      dotColor: 'bg-emerald-500',
    },
    listening: {
      label: 'Listening',
      color: 'text-primary-600',
      dotColor: 'bg-primary-500',
    },
    'ai-speaking': {
      label: 'Speaking',
      color: 'text-primary-600',
      dotColor: 'bg-primary-500',
    },
    processing: {
      label: 'Processing',
      color: 'text-primary-600',
      dotColor: 'bg-primary-500',
    },
  }

  const config = statusConfig[status]
  const isActive = status !== 'disconnected' && status !== 'connected'

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-200">
      {/* Status dot */}
      <div className="relative">
        <motion.div
          className={`w-2 h-2 rounded-full ${config.dotColor}`}
          animate={{
            scale: isActive ? [1, 1.2, 1] : 1,
            opacity: isActive ? [1, 0.6, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Subtle pulse ring */}
        {isActive && (
          <motion.div
            className={`absolute inset-0 rounded-full ${config.dotColor} opacity-40`}
            animate={{
              scale: [1, 2],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
      </div>

      {/* Status label */}
      <span className={`text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    </div>
  )
}
