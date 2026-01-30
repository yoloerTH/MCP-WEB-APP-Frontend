import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { io, Socket } from 'socket.io-client'
import { useAuth } from './hooks/useAuth'
import AudioVisualizer from './components/AudioVisualizer'
import Transcript from './components/Transcript'
import CallControls from './components/CallControls'
import StatusIndicator from './components/StatusIndicator'
import ModeSelector from './components/ModeSelector'
import ChatInterface from './components/ChatInterface'
import LandingPage from './components/LandingPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { GoogleWorkspaceConnect } from './components/GoogleWorkspaceConnect'

// Backend URL - change this to your Railway URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

type CallStatus = 'disconnected' | 'connecting' | 'connected' | 'listening' | 'ai-speaking' | 'processing'

interface TranscriptMessage {
  type: 'user' | 'ai' | 'system'
  text: string
  timestamp: Date
}

function VoiceAIApp() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signOut } = useAuth()

  // Determine mode based on route
  const isLandingPage = location.pathname === '/'
  const appMode: 'voice' | 'chat' = location.pathname === '/chatai' ? 'chat' : 'voice'

  // Voice AI state
  const [socket, setSocket] = useState<Socket | null>(null)
  const [callStatus, setCallStatus] = useState<CallStatus>('disconnected')
  const [isMuted, setIsMuted] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])
  const [audioLevel, setAudioLevel] = useState(0)
  const [textInput, setTextInput] = useState('')

  // Chat AI state
  const [chatMessages, setChatMessages] = useState<TranscriptMessage[]>([])
  const [isChatWaiting, setIsChatWaiting] = useState(false)

  // User menu state
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  // Hide tooltip after 10 seconds or when menu is opened
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showUserMenu) {
      setShowTooltip(false)
    }
  }, [showUserMenu])

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)
  const audioQueueRef = useRef<string[]>([])
  const isPlayingAudioRef = useRef<boolean>(false)
  const audioUnlockedRef = useRef<boolean>(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const previousUserIdRef = useRef<string | null>(null)

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  // Initialize socket connection
  useEffect(() => {
    const currentUserId = user?.id || null

    // Only reconnect if user ID actually changed
    if (previousUserIdRef.current === currentUserId) {
      return
    }

    previousUserIdRef.current = currentUserId
    console.log('🔌 Connecting to backend:', BACKEND_URL)

    const newSocket = io(BACKEND_URL, {
      auth: {
        userId: currentUserId
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    })

    newSocket.on('connect', () => {
      console.log('✅ Connected to backend:', newSocket.id)
      setCallStatus('connected')
    })

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message)
      setCallStatus('disconnected')
      addTranscript('system', `Connection error: ${error.message}. Please check your internet connection.`)
    })

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from backend')
      setCallStatus('disconnected')
    })

    newSocket.on('status', (message: string) => {
      console.log('📡 Status:', message)
      addTranscript('system', message)

      if (message.includes('Listening')) {
        setCallStatus('listening')
      } else if (message.includes('thinking')) {
        setCallStatus('processing')
      }
    })

    newSocket.on('transcript', (data: { text: string }) => {
      console.log('📝 User transcript:', data.text)
      addTranscript('user', data.text)
    })

    newSocket.on('ai-response', (data: { text: string }) => {
      console.log('🤖 AI response:', data.text)
      addTranscript('ai', data.text)
      setCallStatus('ai-speaking')
    })

    newSocket.on('audio-response', (audioBase64: string) => {
      console.log('🔊 Playing AI audio response')
      playAudioResponse(audioBase64)
    })

    newSocket.on('barge-in', () => {
      console.log('🛑 Barge-in detected - stopping AI audio')
      // Stop playback but keep audio element for reuse
      if (currentAudioRef.current) {
        try {
          currentAudioRef.current.pause()
          currentAudioRef.current.currentTime = 0
          // Don't destroy the element - we need to reuse it for iOS
        } catch (e) {
          console.error('Error stopping audio:', e)
        }
      }
      // Clear audio queue
      audioQueueRef.current = []
      isPlayingAudioRef.current = false
      setCallStatus('listening')
    })

    newSocket.on('error', (data: { message: string }) => {
      console.error('❌ Error:', data.message)
      addTranscript('system', `Error: ${data.message}`)
    })

    // Chat-specific events
    newSocket.on('chat-response', (data: { text: string }) => {
      console.log('💬 Chat response:', data.text)
      addChatMessage('ai', data.text)
      setIsChatWaiting(false)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [user?.id]) // Only reconnect when user ID changes, not on every auth event

  const addTranscript = (type: 'user' | 'ai' | 'system', text: string) => {
    setTranscript(prev => [...prev, {
      type,
      text,
      timestamp: new Date()
    }])
  }

  const addChatMessage = (type: 'user' | 'ai' | 'system', text: string) => {
    setChatMessages(prev => [...prev, {
      type,
      text,
      timestamp: new Date()
    }])
  }

  const handleSendChatMessage = (text: string) => {
    if (!socket || !text.trim()) return

    // Add user message to chat
    addChatMessage('user', text)

    // Set waiting state
    setIsChatWaiting(true)

    // Send to backend
    socket.emit('chat-message', { text: text.trim() })
  }

  const startCall = async () => {
    if (!socket) {
      console.error('❌ Socket not connected')
      addTranscript('system', 'Connection error. Please refresh the page.')
      return
    }

    // CRITICAL: Create and unlock ONE Audio element in user gesture context
    // This element will be reused for ALL audio playback (iOS requirement)
    if (!currentAudioRef.current) {
      try {
        console.log('🔓 Creating reusable Audio element in user gesture context...')
        const audioElement = new Audio()
        audioElement.volume = 1.0
        audioElement.preload = 'auto'

        // Play silent audio to unlock (iOS requirement)
        audioElement.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'
        audioElement.play().catch(e => console.warn('Silent play failed:', e))

        // Store for reuse
        currentAudioRef.current = audioElement
        audioUnlockedRef.current = true
        console.log('✅ Reusable Audio element created and unlocked')
      } catch (e) {
        console.warn('⚠️ Audio element creation error:', e)
      }
    }

    try {
      setCallStatus('connecting')
      console.log('🎤 Requesting microphone access...')

      // Get microphone access with timeout (iOS can hang here)
      const stream = await Promise.race([
        navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          }
        }),
        new Promise<MediaStream>((_, reject) =>
          setTimeout(() => reject(new Error('Microphone request timed out after 10 seconds')), 10000)
        )
      ])

      console.log('✅ Microphone access granted')
      audioStreamRef.current = stream

      // Setup audio context for visualization
      console.log('🔧 Setting up AudioContext...')
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      analyserRef.current = analyser

      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)
      console.log('✅ AudioContext ready')

      // Resume AudioContext if suspended (after initial unlock)
      if (audioContext.state === 'suspended') {
        console.log('🔓 Resuming AudioContext...')
        try {
          await audioContext.resume()
          console.log('✅ AudioContext resumed')
        } catch (e) {
          console.warn('⚠️ Could not resume AudioContext:', e)
        }
      }

      // Start visualization loop
      visualizeAudio()

      // Setup MediaRecorder for streaming with mobile compatibility
      console.log('🎙️ Detecting supported audio formats...')
      let options: MediaRecorderOptions = {}

      // Try formats in order of iOS compatibility
      const formats = [
        'audio/mp4',
        'audio/webm;codecs=opus',
        'audio/webm',
        ''
      ]

      for (const format of formats) {
        if (format === '' || MediaRecorder.isTypeSupported(format)) {
          if (format !== '') {
            options.mimeType = format
          }
          console.log('✅ Selected audio format:', format || 'default')
          break
        }
      }

      console.log('🎙️ Creating MediaRecorder...')
      let mediaRecorder: MediaRecorder
      try {
        mediaRecorder = new MediaRecorder(stream, options)
        console.log('✅ MediaRecorder created successfully')
      } catch (error) {
        console.error('❌ MediaRecorder creation failed with options:', options, error)
        // Try without any options (absolute fallback)
        console.log('🔄 Retrying MediaRecorder without options...')
        mediaRecorder = new MediaRecorder(stream)
        console.log('✅ MediaRecorder created with default settings')
      }

      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && socket && !isMuted) {
          // Convert blob to base64 and send
          const reader = new FileReader()
          reader.onloadend = () => {
            const base64 = (reader.result as string).split(',')[1]
            socket.emit('audio-stream', base64)
          }
          reader.readAsDataURL(event.data)
        }
      }

      mediaRecorder.start(100) // Send audio chunks every 100ms

      // Notify backend that call started
      socket.emit('call-start')

      addTranscript('system', 'Call started - Speak now!')

    } catch (error) {
      console.error('❌ Failed to start call:', error)
      setCallStatus('disconnected')

      let errorMessage = 'Failed to access microphone'

      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Microphone permission denied. Please allow microphone access in your browser settings.'
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No microphone found. Please connect a microphone and try again.'
        } else if (error.name === 'NotSupportedError') {
          errorMessage = 'Your browser doesn\'t support audio recording. Try using Chrome or Safari.'
        } else if (error.message && error.message.includes('timeout')) {
          errorMessage = 'Microphone request timed out. Please check your browser settings and permissions, then try again.'
        } else {
          errorMessage = `Error: ${error.message}`
        }
      }

      addTranscript('system', errorMessage)
      alert(errorMessage) // Show alert on mobile for better visibility
    }
  }

  const endCall = () => {
    if (socket) {
      socket.emit('call-end')
    }

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current = null
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop())
      audioStreamRef.current = null
    }

    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    // Stop any playing audio and clear queue
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current.src = '' // Clear source
      currentAudioRef.current = null
    }
    audioQueueRef.current = []
    isPlayingAudioRef.current = false
    audioUnlockedRef.current = false // Reset unlock flag for next call

    setCallStatus('connected')
    addTranscript('system', 'Call ended')
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioStreamRef.current) {
      audioStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = isMuted // Toggle (currently muted -> unmute)
      })
    }
  }

  const sendTextMessage = () => {
    if (!socket || !textInput.trim()) return

    const message = textInput.trim()

    // Trigger barge-in if AI is speaking
    if (currentAudioRef.current && isPlayingAudioRef.current) {
      console.log('🛑 Barge-in via text input - stopping AI audio')
      currentAudioRef.current.pause()
      currentAudioRef.current.currentTime = 0
      // Don't clear the audio element itself - just stop playback
      audioQueueRef.current = []
      isPlayingAudioRef.current = false
    }

    // Add to transcript
    addTranscript('user', message)

    // Send to backend
    socket.emit('text-message', { text: message })

    // Clear input
    setTextInput('')
  }

  const visualizeAudio = () => {
    if (!analyserRef.current) return

    const analyser = analyserRef.current
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const updateLevel = () => {
      analyser.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((a, b) => a + b) / bufferLength
      setAudioLevel(average / 255) // Normalize to 0-1

      requestAnimationFrame(updateLevel)
    }

    updateLevel()
  }

  const playAudioResponse = (base64Audio: string) => {
    // Add to queue
    audioQueueRef.current.push(base64Audio)

    // Start processing queue if not already playing
    if (!isPlayingAudioRef.current) {
      processAudioQueue()
    }
  }

  const processAudioQueue = async () => {
    // If queue is empty, stop
    if (audioQueueRef.current.length === 0) {
      isPlayingAudioRef.current = false
      setCallStatus('listening')
      return
    }

    // Get next audio from queue
    const base64Audio = audioQueueRef.current.shift()!
    isPlayingAudioRef.current = true

    try {
      // Resume AudioContext if needed (can get suspended on mobile)
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }

      // CRITICAL: Reuse the SAME Audio element (created during startCall)
      // Creating new Audio elements on iOS will be blocked
      const audio = currentAudioRef.current

      if (!audio) {
        console.error('❌ No audio element available')
        processAudioQueue()
        return
      }

      // Update the src to new audio (this works on already-unlocked element)
      audio.src = `data:audio/wav;base64,${base64Audio}`
      audio.load()

      // Setup event handlers
      audio.onended = () => {
        console.log('✅ Audio playback ended')
        // Play next audio in queue
        processAudioQueue()
      }

      audio.onerror = (e) => {
        console.error('❌ Audio playback error:', e)
        // Continue to next audio even on error
        processAudioQueue()
      }

      // Handle the play() promise (critical for mobile browsers)
      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✅ Audio playback started successfully')
          })
          .catch((error) => {
            console.error('❌ Audio play() rejected:', error.name, error.message)

            // If still getting NotAllowedError, try to unlock again
            if (error.name === 'NotAllowedError') {
              console.warn('⚠️ Audio still blocked - user may need to interact with page')
            }

            // Try to continue to next audio
            processAudioQueue()
          })
      }
    } catch (error) {
      console.error('❌ Failed to play audio:', error)
      // Continue to next audio even on error
      processAudioQueue()
    }
  }

  const handleGetStarted = (mode?: 'voice' | 'chat') => {
    // Unlock audio on first user interaction (landing page button click)
    // CRITICAL: Must be synchronous for iOS Safari to maintain user gesture context
    try {
      const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA')
      silentAudio.volume = 0
      // Fire and forget - don't await (iOS needs immediate state change)
      silentAudio.play()
        .then(() => {
          audioUnlockedRef.current = true
          console.log('✅ Audio unlocked via landing page interaction')
        })
        .catch(e => {
          console.warn('⚠️ Could not unlock audio on landing page:', e)
        })
    } catch (e) {
      console.warn('⚠️ Audio unlock error:', e)
    }
    // Navigate to the appropriate route
    navigate(mode === 'chat' ? '/chatai' : '/voiceai')
  }

  // Show landing page
  if (isLandingPage) {
    return <LandingPage onGetStarted={handleGetStarted} />
  }

  // Show voice/chat AI interface
  return (
    <ProtectedRoute>
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-midnight-soft relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-60 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[1400px] px-4 relative z-10"
      >
        {/* Main card with premium styling */}
        <div className="bg-midnight-800 backdrop-blur-xl rounded-3xl shadow-glow-midnight border border-emerald-500/20 overflow-hidden">
          {/* Header with gradient accent */}
          <div className="relative px-8 pt-8 pb-6 border-b border-midnight-700">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-gold-400 to-gold-500" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                  <img src="/logo-transparent.png" alt="Naurra.ai Logo" className="relative w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">
                    {appMode === 'voice' ? '🎙️ ' : '💬 '}
                    <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Naurra.ai</span>
                    {appMode === 'voice' ? ' Voice' : ' Chat'}
                  </h1>
                  <p className="text-sm text-emerald-300 mt-1 font-medium">
                    {appMode === 'voice'
                      ? 'Your intelligent voice assistant for Google Workspace'
                      : 'Your intelligent chat assistant for Google Workspace'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {appMode === 'voice' && <StatusIndicator status={callStatus} />}

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-2 rounded-xl bg-midnight-700/50 hover:bg-midnight-700 border border-emerald-500/30 hover:border-emerald-500/50 transition-all relative"
                  >
                    <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>

                    {/* Pulsing Badge */}
                    {showTooltip && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-3 h-3 bg-gold-400 rounded-full"
                        />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Gentle Tooltip */}
                  <AnimatePresence>
                    {showTooltip && !showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute right-0 top-12 z-40 whitespace-nowrap"
                      >
                        <div className="bg-gradient-to-br from-gold-400 to-gold-500 text-midnight-900 px-4 py-2 rounded-lg shadow-lg shadow-gold-400/30 text-sm font-semibold relative">
                          <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gold-400" />
                          ✨ Explore inspiring ideas
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-midnight-800 backdrop-blur-xl rounded-xl border border-emerald-500/20 shadow-2xl overflow-hidden z-50"
                      >
                      <div className="p-3 border-b border-midnight-700">
                        <p className="text-xs text-midnight-400">Signed in as</p>
                        <p className="text-sm text-white truncate">{user?.email}</p>
                      </div>

                      <div className="py-2">
                        <button
                          onClick={() => {
                            setShowUserMenu(false)
                            navigate('/inspiration')
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-emerald-300 hover:bg-midnight-700 transition-colors flex items-center gap-3"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          Explore AI Hub
                        </button>

                        <button
                          onClick={() => {
                            setShowUserMenu(false)
                            navigate('/settings')
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-emerald-300 hover:bg-midnight-700 transition-colors flex items-center gap-3"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Profile Settings
                        </button>
                      </div>

                      <div className="border-t border-midnight-700 py-2">
                        <button
                          onClick={() => {
                            setShowUserMenu(false)
                            signOut()
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-midnight-700 transition-colors flex items-center gap-3"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            {/* Mode Selector */}
            <ModeSelector
              mode={appMode}
              onModeChange={(mode) => navigate(mode === 'chat' ? '/chatai' : '/voiceai')}
            />
          </div>

          {/* Content */}
          <div className="p-8 space-y-6 bg-gradient-to-b from-midnight-800 to-midnight-900">
            {/* Google Workspace Connection */}
            <GoogleWorkspaceConnect />

            {appMode === 'voice' ? (
              <>
                {/* Voice Mode */}
                {/* Audio Visualizer */}
                <AudioVisualizer
                  audioLevel={audioLevel}
                  isActive={callStatus === 'listening' || callStatus === 'ai-speaking'}
                  isSpeaking={callStatus === 'ai-speaking'}
                />

                {/* Transcript */}
                <Transcript messages={transcript} />

                {/* Controls */}
                <CallControls
                  callStatus={callStatus}
                  isMuted={isMuted}
                  onStartCall={startCall}
                  onEndCall={endCall}
                  onToggleMute={toggleMute}
                />

                {/* Text Input (only visible during active call) */}
                {(callStatus === 'listening' || callStatus === 'ai-speaking' || callStatus === 'processing') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-3"
                  >
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          sendTextMessage()
                        }
                      }}
                      placeholder="Or type your message..."
                      className="flex-1 px-4 py-3 bg-midnight-700 text-white placeholder-midnight-400 rounded-xl border-2 border-emerald-500/30 focus:border-emerald-500 focus:outline-none transition-all duration-200"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendTextMessage}
                      disabled={!textInput.trim()}
                      className="px-6 py-3 bg-gradient-to-br from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 disabled:opacity-50 disabled:cursor-not-allowed text-midnight-900 font-bold rounded-xl shadow-glow-gold transition-all duration-200"
                    >
                      Send
                    </motion.button>
                  </motion.div>
                )}
              </>
            ) : (
              <>
                {/* Chat Mode */}
                <ChatInterface
                  messages={chatMessages}
                  onSendMessage={handleSendChatMessage}
                  isWaiting={isChatWaiting}
                />
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 space-y-2"
        >
          <p className="text-xs text-emerald-300/70 font-medium">
            Powered by advanced AI • Secured with enterprise-grade encryption
          </p>
        </motion.div>
      </motion.div>
    </div>
    </ProtectedRoute>
  )
}

export default VoiceAIApp
