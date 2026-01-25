import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatMessage {
  type: 'user' | 'ai' | 'system'
  text: string
  timestamp: Date
}

interface ChatInterfaceProps {
  messages: ChatMessage[]
  onSendMessage: (text: string) => void
  isWaiting?: boolean
}

export default function ChatInterface({ messages, onSendMessage, isWaiting }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    onSendMessage(input.trim())
    setInput('')
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
          <span>Chat Conversation</span>
          {messages.length > 0 && (
            <span className="text-xs font-medium text-gold-300 bg-gold-500/20 px-2 py-0.5 rounded-full border border-gold-500/30">
              {messages.length}
            </span>
          )}
        </h3>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 bg-gradient-to-br from-midnight-900/80 to-midnight-800/50 rounded-xl p-4 border border-emerald-500/20 mb-4"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full text-center text-midnight-400 text-sm"
            >
              <div>
                <p className="font-medium text-emerald-400">Start a conversation</p>
                <p className="text-xs mt-1 text-midnight-400">Type your message below</p>
              </div>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' :
                  message.type === 'system' ? 'justify-center' : 'justify-start'
                }`}
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
                    {/* Label */}
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

        {/* Typing indicator */}
        {isWaiting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-emerald-500/20 border border-emerald-500/50 px-4 py-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <motion.div
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <span className="text-xs text-emerald-300 font-medium">AI is typing...</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Type your message..."
          disabled={isWaiting}
          className="flex-1 px-4 py-3 bg-midnight-700 text-white placeholder-midnight-400 rounded-xl border-2 border-emerald-500/30 focus:border-emerald-500 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!input.trim() || isWaiting}
          className="px-6 py-3 bg-gradient-to-br from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 disabled:opacity-50 disabled:cursor-not-allowed text-midnight-900 font-bold rounded-xl shadow-glow-gold transition-all duration-200"
        >
          Send
        </motion.button>
      </div>
    </div>
  )
}
