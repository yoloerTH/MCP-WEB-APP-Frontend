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
    })
  }

  return (
    <div>
      <h3 className="text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2">
        <span>Conversation</span>
        {messages.length > 0 && (
          <span className="text-xs font-medium text-gold-300 bg-gold-500/20 px-2 py-0.5 rounded-full border border-gold-500/30">
            {messages.length}
          </span>
        )}
      </h3>

      <div
        ref={scrollRef}
        className="h-64 overflow-y-auto space-y-3 bg-gradient-to-br from-midnight-900/80 to-midnight-800/50 rounded-xl p-4 border border-emerald-500/20"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full text-center text-midnight-400 text-sm"
            >
              <div>
                <p className="font-medium text-emerald-400">No messages yet</p>
                <p className="text-xs mt-1 text-midnight-400">Start a call to begin conversation</p>
              </div>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[85%] ${message.type === 'system' ? 'w-full' : ''}`}>
                  <div
                    className={`p-3.5 rounded-2xl shadow-soft ${
                      message.type === 'user'
                        ? 'bg-midnight-700 border border-midnight-600 text-white'
                        : message.type === 'ai'
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-glow-emerald'
                        : 'bg-gold-500/20 border border-gold-500/50 text-gold-200 text-center text-xs'
                    }`}
                  >
                    {/* Label for non-system messages */}
                    {message.type !== 'system' && (
                      <div className={`text-[10px] font-bold mb-1 uppercase tracking-wider ${
                        message.type === 'user' ? 'text-midnight-400' : 'text-emerald-100'
                      }`}>
                        {message.type === 'user' ? 'You' : 'AI Assistant'}
                      </div>
                    )}

                    {/* Message text */}
                    <div className={`text-sm leading-relaxed ${
                      message.type === 'system' ? 'italic font-medium' : 'font-medium'
                    }`}>
                      {message.text}
                    </div>

                    {/* Timestamp */}
                    <div className={`text-[10px] mt-1.5 font-medium ${
                      message.type === 'user'
                        ? 'text-midnight-400'
                        : message.type === 'ai'
                        ? 'text-emerald-200'
                        : 'text-gold-300'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
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
