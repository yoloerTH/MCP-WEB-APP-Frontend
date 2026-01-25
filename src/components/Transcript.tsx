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
      <h3 className="text-sm font-semibold text-neutral-600 mb-3">
        Conversation
      </h3>

      <div
        ref={scrollRef}
        className="h-64 overflow-y-auto space-y-3 bg-neutral-50 rounded-xl p-4 border border-neutral-200"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full text-center text-neutral-400 text-sm"
            >
              <div>
                <p>No messages yet</p>
                <p className="text-xs mt-1">Start a call to begin</p>
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
                    className={`p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-white border border-neutral-200 text-neutral-800'
                        : message.type === 'ai'
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 border border-neutral-200 text-neutral-500 text-center text-xs'
                    }`}
                  >
                    {/* Label for non-system messages */}
                    {message.type !== 'system' && (
                      <div className={`text-[10px] font-medium mb-1 ${
                        message.type === 'user' ? 'text-neutral-500' : 'text-primary-100'
                      }`}>
                        {message.type === 'user' ? 'You' : 'AI Assistant'}
                      </div>
                    )}

                    {/* Message text */}
                    <div className={`text-sm leading-relaxed ${
                      message.type === 'system' ? 'italic' : ''
                    }`}>
                      {message.text}
                    </div>

                    {/* Timestamp */}
                    <div className={`text-[10px] mt-1 ${
                      message.type === 'user'
                        ? 'text-neutral-400'
                        : message.type === 'ai'
                        ? 'text-primary-200'
                        : 'text-neutral-400'
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
