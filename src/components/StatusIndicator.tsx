import { motion } from 'framer-motion'

type CallStatus = 'disconnected' | 'connecting' | 'connected' | 'listening' | 'ai-speaking' | 'processing'

interface StatusIndicatorProps {
  status: CallStatus
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const statusConfig = {
    disconnected: {
      label: 'Offline',
      color: 'text-neutral-500',
      dotColor: 'bg-neutral-400',
      bgColor: 'bg-neutral-50',
      borderColor: 'border-neutral-200',
    },
    connecting: {
      label: 'Connecting',
      color: 'text-coral-600',
      dotColor: 'bg-coral-500',
      bgColor: 'bg-coral-50',
      borderColor: 'border-coral-200',
    },
    connected: {
      label: 'Ready',
      color: 'text-emerald-600',
      dotColor: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    listening: {
      label: 'Listening',
      color: 'text-emerald-700',
      dotColor: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
    },
    'ai-speaking': {
      label: 'Speaking',
      color: 'text-coral-700',
      dotColor: 'bg-coral-500',
      bgColor: 'bg-coral-50',
      borderColor: 'border-coral-300',
    },
    processing: {
      label: 'Processing',
      color: 'text-midnight-700',
      dotColor: 'bg-midnight-500',
      bgColor: 'bg-midnight-50',
      borderColor: 'border-midnight-300',
    },
  }

  const config = statusConfig[status]
  const isActive = status !== 'disconnected' && status !== 'connected'

  return (
    <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full ${config.bgColor} border ${config.borderColor} shadow-soft`}>
      {/* Status dot */}
      <div className="relative">
        <motion.div
          className={`w-2.5 h-2.5 rounded-full ${config.dotColor}`}
          animate={{
            scale: isActive ? [1, 1.3, 1] : 1,
            opacity: isActive ? [1, 0.5, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Pulse ring */}
        {isActive && (
          <motion.div
            className={`absolute inset-0 rounded-full ${config.dotColor} opacity-40`}
            animate={{
              scale: [1, 2.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
      </div>

      {/* Status label */}
      <span className={`text-xs font-semibold ${config.color}`}>
        {config.label}
      </span>
    </div>
  )
}
