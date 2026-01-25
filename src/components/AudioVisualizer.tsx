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
        newBars.unshift(audioLevel + Math.random() * 0.2)
        return newBars
      })
    }, 50)

    return () => clearInterval(interval)
  }, [audioLevel, isActive])

  return (
    <div className="relative h-64 mb-8 rounded-xl overflow-hidden border border-cyber-400/20 bg-black/30">
      {/* Center orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            scale: isActive ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background: isSpeaking
                ? 'radial-gradient(circle, rgba(255, 0, 255, 0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              scale: isActive ? [1, 1.5, 1] : 1,
              opacity: isActive ? [0.4, 0.8, 0.4] : 0.2,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Core orb */}
          <motion.div
            className="relative w-32 h-32 rounded-full flex items-center justify-center"
            style={{
              background: isSpeaking
                ? 'radial-gradient(circle, #ff00ff 0%, #cc00cc 50%, transparent 100%)'
                : 'radial-gradient(circle, #00d4ff 0%, #0099cc 50%, transparent 100%)',
              boxShadow: isSpeaking
                ? '0 0 60px rgba(255, 0, 255, 0.6)'
                : '0 0 60px rgba(0, 212, 255, 0.6)',
            }}
            animate={{
              boxShadow: isActive
                ? isSpeaking
                  ? [
                      '0 0 60px rgba(255, 0, 255, 0.6)',
                      '0 0 80px rgba(255, 0, 255, 0.8)',
                      '0 0 60px rgba(255, 0, 255, 0.6)',
                    ]
                  : [
                      '0 0 60px rgba(0, 212, 255, 0.6)',
                      '0 0 80px rgba(0, 212, 255, 0.8)',
                      '0 0 60px rgba(0, 212, 255, 0.6)',
                    ]
                : '0 0 20px rgba(0, 212, 255, 0.3)',
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Inner core */}
            <motion.div
              className="w-20 h-20 rounded-full"
              style={{
                background: isSpeaking
                  ? 'linear-gradient(135deg, #ff00ff, #cc00cc)'
                  : 'linear-gradient(135deg, #00d4ff, #0099cc)',
              }}
              animate={{
                scale: isActive ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Frequency bars */}
      <div className="absolute inset-0 flex items-end justify-center gap-1 p-4 opacity-40">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              background: isSpeaking
                ? 'linear-gradient(to top, #ff00ff, #cc00cc)'
                : 'linear-gradient(to top, #00d4ff, #0099cc)',
              maxWidth: '12px',
            }}
            initial={{ height: 0 }}
            animate={{
              height: `${height * 100}%`,
            }}
            transition={{
              duration: 0.1,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Scan lines */}
      {isActive && (
        <>
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyber-400 to-transparent"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-magenta-500 to-transparent"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
              delay: 1.5,
            }}
          />
        </>
      )}
    </div>
  )
}
