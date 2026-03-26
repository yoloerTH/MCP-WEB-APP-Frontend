import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FormattedText from './FormattedText'
import { useAuth } from '../hooks/useAuth'

const StyleIcons = {
  formal: (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <line x1="5" y1="5.5" x2="11" y2="5.5" />
      <line x1="5" y1="8" x2="11" y2="8" />
      <line x1="5" y1="10.5" x2="9" y2="10.5" />
    </svg>
  ),
  casual: (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h12v8a1 1 0 01-1 1H6l-3 2.5V12H2a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <circle cx="5.5" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="8" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  concise: (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,8 6,12 14,4" />
    </svg>
  ),
  detailed: (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="3" x2="14" y2="3" />
      <line x1="2" y1="6" x2="14" y2="6" />
      <line x1="2" y1="9" x2="14" y2="9" />
      <line x1="2" y1="12" x2="10" y2="12" />
    </svg>
  ),
}

const STYLES = [
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
  { value: 'concise', label: 'Concise' },
  { value: 'detailed', label: 'Detailed' },
] as const

type StyleValue = typeof STYLES[number]['value']

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
  const { personalizationData, updatePersonalization } = useAuth()
  const [activeStyle, setActiveStyle] = useState<StyleValue>('concise')
  const [isSavingStyle, setIsSavingStyle] = useState(false)

  // Sync from Supabase on load
  useEffect(() => {
    if (personalizationData?.communication_style) {
      setActiveStyle(personalizationData.communication_style)
    }
  }, [personalizationData])

  const handleStyleChange = async (style: StyleValue) => {
    if (style === activeStyle || isSavingStyle) return
    setActiveStyle(style)
    setIsSavingStyle(true)
    try {
      await updatePersonalization({ ...personalizationData, communication_style: style })
    } catch (e) {
      console.error('Failed to save style:', e)
      // Revert on failure
      if (personalizationData?.communication_style) {
        setActiveStyle(personalizationData.communication_style)
      }
    } finally {
      setIsSavingStyle(false)
    }
  }

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
        <h3 className="text-sm font-bold text-emerald-400/80 flex items-center gap-2 tracking-wide">
          <span>Chat Conversation</span>
          {messages.length > 0 && (
            <span className="text-xs font-medium text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {messages.length}
            </span>
          )}
        </h3>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 bg-white/[0.02] rounded-xl p-4 border border-white/[0.06] mb-4"
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
                    className={`p-3.5 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-white/[0.05] border border-white/[0.08] text-white'
                        : message.type === 'ai'
                        ? 'bg-gradient-to-br from-emerald-500/90 to-emerald-600/90 text-white shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]'
                        : 'bg-amber-500/10 border border-amber-500/20 text-amber-200 text-center text-xs'
                    }`}
                  >
                    {/* Label */}
                    {message.type !== 'system' && (
                      <div className={`text-[10px] font-bold mb-1 uppercase tracking-wider ${
                        message.type === 'user' ? 'text-white/40' : 'text-emerald-100/80'
                      }`}>
                        {message.type === 'user' ? 'You' : 'AI Assistant'}
                      </div>
                    )}

                    {/* Message text */}
                    <FormattedText
                      text={message.text}
                      className={`text-sm leading-relaxed ${
                        message.type === 'system' ? 'italic font-medium' : 'font-medium'
                      }`}
                    />

                    {/* Timestamp */}
                    <div className={`text-[10px] mt-1.5 font-medium ${
                      message.type === 'user'
                        ? 'text-white/30'
                        : message.type === 'ai'
                        ? 'text-emerald-200/70'
                        : 'text-amber-300/60'
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
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-2xl">
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
          className="flex-1 px-4 py-3 bg-white/[0.04] text-white placeholder-white/30 rounded-xl border border-white/[0.08] focus:border-emerald-500/50 focus:bg-white/[0.06] focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!input.trim() || isWaiting}
          className="px-6 py-3 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] transition-all duration-200"
        >
          Send
        </motion.button>
      </div>

      {/* Conversation Style Selector */}
      <div className="flex items-center gap-2 mt-2.5 px-1">
        <span className="text-[11px] text-white/30 font-medium uppercase tracking-wider shrink-0">Style</span>
        <div className="flex gap-1.5">
          {STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => handleStyleChange(style.value)}
              disabled={isSavingStyle}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 ${
                activeStyle === style.value
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-white/35 hover:text-white/60 hover:bg-white/[0.04] border border-transparent'
              } ${isSavingStyle ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {StyleIcons[style.value]}
              <span>{style.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
