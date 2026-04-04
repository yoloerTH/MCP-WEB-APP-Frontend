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

const STARTER_PROMPTS = [
  {
    title: 'Unread emails',
    prompt: 'Give me a quick overview of my unread emails from today. Keep it short and grouped by priority.',
  },
  {
    title: 'Today calendar',
    prompt: 'Summarize my calendar for today and highlight any meetings I should prepare for.',
  },
  {
    title: 'Action items',
    prompt: 'List the top action items I should focus on today from my recent workspace activity.',
  },
  {
    title: 'Draft replies',
    prompt: 'Show me the 3 most important emails that likely need a reply today.',
  },
] as const

export default function ChatInterface({ messages, onSendMessage, isWaiting }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const { personalizationData, updatePersonalization } = useAuth()
  const [activeStyle, setActiveStyle] = useState<StyleValue>('concise')
  const [isSavingStyle, setIsSavingStyle] = useState(false)
  const hasConversation = messages.length > 0

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

  const handlePromptClick = (prompt: string) => {
    if (isWaiting) return
    onSendMessage(prompt)
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
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 140, damping: 22 }}
      className={`flex flex-col ${hasConversation ? 'min-h-[700px] lg:min-h-[760px]' : 'min-h-[620px] lg:min-h-[660px]'}`}
    >
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
        className={`flex-1 overflow-y-auto space-y-4 bg-white/[0.02] rounded-xl border border-white/[0.06] mb-4 transition-all duration-500 ${
          hasConversation ? 'p-5 lg:p-6' : 'p-4 lg:p-5'
        }`}
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
              className="flex items-center justify-center h-full text-center text-midnight-400 text-sm"
            >
              <div className="w-full max-w-3xl">
                <p className="font-medium text-emerald-400">Start a conversation</p>
                <p className="text-xs mt-1 text-midnight-400">Try a lightweight prompt to get moving quickly</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 text-left">
                  {STARTER_PROMPTS.map((item, index) => (
                    <motion.button
                      key={item.title}
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + index * 0.06, duration: 0.28 }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handlePromptClick(item.prompt)}
                      disabled={isWaiting}
                      className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] hover:border-emerald-500/25 px-4 py-4 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white/90">{item.title}</p>
                          <p className="text-xs leading-relaxed text-white/45 mt-1">{item.prompt}</p>
                        </div>
                        <span className="shrink-0 mt-0.5 text-emerald-300/60 group-hover:text-emerald-300 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 8h10" />
                            <path d="M9 4l4 4-4 4" />
                          </svg>
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 16,
                  x: message.type === 'user' ? 20 : message.type === 'ai' ? -20 : 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                  mass: 0.8,
                }}
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
            initial={{ opacity: 0, x: -20, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.8 }}
            className="flex justify-start"
          >
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <motion.div
                    className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  />
                </div>
                <span className="text-xs text-emerald-300/80 font-medium">Naurra is thinking...</span>
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
          placeholder={hasConversation ? 'Type your message...' : 'Ask Naurra about your inbox, calendar, docs, or tasks...'}
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
    </motion.div>
  )
}
