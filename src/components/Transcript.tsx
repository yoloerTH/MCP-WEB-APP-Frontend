import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface TranscriptMessage {
  type: 'user' | 'ai' | 'system'
  text: string
  timestamp: Date
}

interface TranscriptProps {
  messages: TranscriptMessage[]
}

export default function Transcript({ messages }: TranscriptProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <div className="mb-6">
      <h2 className="text-sm font-display font-semibold text-cyber-400 mb-3 tracking-wider">
        TRANSMISSION LOG
      </h2>

      <div
        ref={scrollRef}
        className="h-64 overflow-y-auto space-y-3 bg-black/30 border border-cyber-400/20 rounded-lg p-4 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="text-center text-gray-500 font-body text-sm pt-20"
            >
              No transmissions yet...
              <br />
              <span className="text-xs">Start a call to begin</span>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: message.type === 'user' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.type === 'system'
                      ? 'w-full'
                      : ''
                  }`}
                >
                  {/* Timestamp */}
                  <div
                    className={`text-[10px] font-body mb-1 ${
                      message.type === 'user'
                        ? 'text-left text-cyan-400/50'
                        : message.type === 'ai'
                        ? 'text-right text-magenta-500/50'
                        : 'text-center text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`relative p-3 rounded-lg font-body text-sm ${
                      message.type === 'user'
                        ? 'bg-cyber-400/10 border border-cyber-400/30 text-cyan-100'
                        : message.type === 'ai'
                        ? 'bg-magenta-500/10 border border-magenta-500/30 text-pink-100'
                        : 'bg-gray-800/30 border border-gray-600/30 text-gray-400 text-center text-xs italic'
                    }`}
                  >
                    {/* Corner accent */}
                    {message.type !== 'system' && (
                      <div
                        className={`absolute w-2 h-2 ${
                          message.type === 'user'
                            ? 'top-0 left-0 border-t-2 border-l-2 border-cyber-400'
                            : 'top-0 right-0 border-t-2 border-r-2 border-magenta-500'
                        }`}
                      />
                    )}

                    {/* Label */}
                    {message.type !== 'system' && (
                      <div
                        className={`text-[10px] font-display font-semibold mb-1 tracking-wider ${
                          message.type === 'user'
                            ? 'text-cyber-400'
                            : 'text-magenta-500'
                        }`}
                      >
                        {message.type === 'user' ? 'USER' : 'TESSA.AI'}
                      </div>
                    )}

                    {/* Text */}
                    <div className="leading-relaxed">
                      {message.text}
                    </div>

                    {/* Glow effect */}
                    {message.type !== 'system' && (
                      <div
                        className={`absolute inset-0 rounded-lg -z-10 blur-md opacity-20 ${
                          message.type === 'user'
                            ? 'bg-cyber-400'
                            : 'bg-magenta-500'
                        }`}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
