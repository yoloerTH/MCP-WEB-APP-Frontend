import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AudioVisualizerProps {
  audioLevel: number
  isActive: boolean
  isSpeaking: boolean
}

export default function AudioVisualizer({ audioLevel, isActive, isSpeaking }: AudioVisualizerProps) {
  const [bars, setBars] = useState<number[]>(new Array(32).fill(0))

  useEffect(() => {
    if (!isActive) {
      setBars(new Array(32).fill(0))
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
    }, 50)

    return () => clearInterval(interval)
  }, [audioLevel, isActive])

  return (
    <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-900 border border-emerald-500/30 shadow-glow-emerald">
      {/* Ambient glow effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08), transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Center orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            scale: isActive ? [1, 1.08, 1] : 1,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Outer glow rings */}
          {isActive && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 60%)',
                  width: '250px',
                  height: '250px',
                  left: '-75px',
                  top: '-75px',
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)',
                  width: '200px',
                  height: '200px',
                  left: '-50px',
                  top: '-50px',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </>
          )}

          {/* Main orb */}
          <motion.div
            className="relative w-28 h-28 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: isActive
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
              boxShadow: isActive
                ? '0 10px 40px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                : '0 4px 16px rgba(100, 116, 139, 0.2)',
            }}
            animate={{
              boxShadow: isActive
                ? [
                    '0 10px 40px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    '0 15px 50px rgba(16, 185, 129, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                    '0 10px 40px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  ]
                : '0 4px 16px rgba(100, 116, 139, 0.2)',
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Inner highlight */}
            <motion.div
              className="w-20 h-20 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1))',
              }}
              animate={{
                scale: isActive ? [1, 1.2, 1] : 1,
                opacity: isActive ? [0.7, 1, 0.7] : 0.5,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Orbital rings */}
          {isActive && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-emerald-400/40"
                style={{
                  width: '140px',
                  height: '140px',
                  left: '-6px',
                  top: '-6px',
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-gold-400/30"
                style={{
                  width: '160px',
                  height: '160px',
                  left: '-16px',
                  top: '-16px',
                }}
                animate={{
                  rotate: -360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: {
                    duration: 12,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              />
            </>
          )}
        </motion.div>
      </div>

      {/* Frequency bars with gradient */}
      <div className="absolute inset-0 flex items-end justify-center gap-1 p-8 opacity-25">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-full"
            style={{
              background: 'linear-gradient(to top, #10b981, #34d399)',
              maxWidth: '8px',
            }}
            initial={{ height: '4px' }}
            animate={{
              height: isActive ? `${Math.max(height * 100, 4)}%` : '4px',
            }}
            transition={{
              duration: 0.12,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Status text with badge */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <motion.div
          className={`px-4 py-2 rounded-full backdrop-blur-md border ${
            isActive
              ? 'bg-emerald-500/20 border-emerald-400/50'
              : 'bg-midnight-700/50 border-midnight-500/30'
          }`}
          animate={{
            scale: isActive ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <p className={`text-xs font-semibold ${
            isActive ? 'text-emerald-300' : 'text-midnight-300'
          }`}>
            {isSpeaking ? '🎙️ AI Speaking' : isActive ? '👂 Listening' : '⏸️ Inactive'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
