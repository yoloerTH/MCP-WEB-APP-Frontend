import { motion } from 'framer-motion'

type CallStatus = 'disconnected' | 'connecting' | 'connected' | 'listening' | 'ai-speaking' | 'processing'

interface StatusIndicatorProps {
  status: CallStatus
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const statusConfig = {
    disconnected: {
      label: 'Offline',
      color: 'text-white/40',
      dotColor: 'bg-white/30',
      bgColor: 'bg-white/[0.04]',
      borderColor: 'border-white/[0.06]',
    },
    connecting: {
      label: 'Connecting',
      color: 'text-amber-300',
      dotColor: 'bg-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    connected: {
      label: 'Ready',
      color: 'text-emerald-400',
      dotColor: 'bg-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    listening: {
      label: 'Listening',
      color: 'text-emerald-400',
      dotColor: 'bg-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    'ai-speaking': {
      label: 'Speaking',
      color: 'text-amber-300',
      dotColor: 'bg-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    processing: {
      label: 'Processing',
      color: 'text-amber-300',
      dotColor: 'bg-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
  }

  const config = statusConfig[status]
  const isActive = status !== 'disconnected' && status !== 'connected'

  return (
    <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full ${config.bgColor} border ${config.borderColor}`}>
      {/* Status dot */}
      <div className="relative">
        <motion.div
          className={`w-2 h-2 rounded-full ${config.dotColor}`}
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
      <span className={`text-xs font-semibold tracking-wide ${config.color}`}>
        {config.label}
      </span>
    </div>
  )
}
