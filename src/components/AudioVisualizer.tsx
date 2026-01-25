import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AudioVisualizerProps {
  audioLevel: number
  isActive: boolean
  isSpeaking: boolean
}

export default function AudioVisualizer({ audioLevel, isActive, isSpeaking }: AudioVisualizerProps) {
  const [bars, setBars] = useState<number[]>(new Array(24).fill(0))

  useEffect(() => {
    if (!isActive) {
      setBars(new Array(24).fill(0))
      return
    }

    const interval = setInterval(() => {
      setBars(prev => {
        const newBars = [...prev]
        // Shift bars to create wave effect
        newBars.pop()
        newBars.unshift(audioLevel + Math.random() * 0.15)
        return newBars
      })
    }, 60)

    return () => clearInterval(interval)
  }, [audioLevel, isActive])

  return (
    <div className="relative h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200/50">
      {/* Center orb - refined and subtle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            scale: isActive ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Soft glow */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(107, 138, 255, 0.2) 0%, transparent 70%)',
                width: '200px',
                height: '200px',
                left: '-50px',
                top: '-50px',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}

          {/* Main orb */}
          <motion.div
            className="relative w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(107, 138, 255, 0.9), rgba(85, 112, 235, 0.8))',
              boxShadow: isActive
                ? '0 8px 32px rgba(107, 138, 255, 0.3)'
                : '0 4px 16px rgba(107, 138, 255, 0.2)',
            }}
            animate={{
              boxShadow: isActive
                ? [
                    '0 8px 32px rgba(107, 138, 255, 0.3)',
                    '0 12px 40px rgba(107, 138, 255, 0.4)',
                    '0 8px 32px rgba(107, 138, 255, 0.3)',
                  ]
                : '0 4px 16px rgba(107, 138, 255, 0.2)',
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Inner core */}
            <motion.div
              className="w-16 h-16 rounded-full bg-white"
              animate={{
                scale: isActive ? [1, 1.15, 1] : 1,
                opacity: isActive ? [0.9, 1, 0.9] : 0.8,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Frequency bars - minimal and elegant */}
      <div className="absolute inset-0 flex items-end justify-center gap-1.5 p-6 opacity-30">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-full bg-gradient-to-t from-primary-500 to-primary-400"
            style={{
              maxWidth: '6px',
            }}
            initial={{ height: '4px' }}
            animate={{
              height: isActive ? `${Math.max(height * 80, 4)}%` : '4px',
            }}
            transition={{
              duration: 0.15,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Status text */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <motion.p
          className="text-xs font-medium text-primary-600"
          animate={{
            opacity: isActive ? [0.6, 1, 0.6] : 0.4,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {isSpeaking ? 'Speaking...' : isActive ? 'Listening...' : 'Inactive'}
        </motion.p>
      </div>
    </div>
  )
}
