import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { io, Socket } from 'socket.io-client'
import AudioVisualizer from './components/AudioVisualizer'
import Transcript from './components/Transcript'
import CallControls from './components/CallControls'
import StatusIndicator from './components/StatusIndicator'
import ModeSelector from './components/ModeSelector'
import ChatInterface from './components/ChatInterface'
import LandingPage from './components/LandingPage'

// Backend URL - change this to your Railway URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

type CallStatus = 'disconnected' | 'connecting' | 'connected' | 'listening' | 'ai-speaking' | 'processing'

interface TranscriptMessage {
  type: 'user' | 'ai' | 'system'
  text: string
  timestamp: Date
}

function App() {
  // Landing page state
  const [hasStarted, setHasStarted] = useState(false)

  // Mode state
  const [appMode, setAppMode] = useState<'voice' | 'chat'>('voice')

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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)
  const audioQueueRef = useRef<string[]>([])
  const isPlayingAudioRef = useRef<boolean>(false)

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
    })

    newSocket.on('connect', () => {
      console.log('✅ Connected to backend:', newSocket.id)
      setCallStatus('connected')
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
      // Stop and cleanup current audio immediately
      if (currentAudioRef.current) {
        try {
          currentAudioRef.current.pause()
          currentAudioRef.current.currentTime = 0
          currentAudioRef.current.src = '' // Clear source to fully stop
          currentAudioRef.current = null
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
  }, [])

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
    if (!socket) return

    try {
      setCallStatus('connecting')

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioStreamRef.current = stream

      // Setup audio context for visualization
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      analyserRef.current = analyser

      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)

      // Start visualization loop
      visualizeAudio()

      // Setup MediaRecorder for streaming with mobile compatibility
      let options: MediaRecorderOptions = {}

      // Check supported MIME types (iOS Safari needs different format)
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        options.mimeType = 'audio/webm;codecs=opus'
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        options.mimeType = 'audio/mp4'
      } else if (MediaRecorder.isTypeSupported('audio/webm')) {
        options.mimeType = 'audio/webm'
      }
      // If none supported, use default (no mimeType)

      console.log('🎤 Using audio format:', options.mimeType || 'default')

      const mediaRecorder = new MediaRecorder(stream, options)
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
        } else {
          errorMessage = `Error: ${error.message}`
        }
      }

      addTranscript('system', errorMessage)
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
      currentAudioRef.current = null
    }
    audioQueueRef.current = []
    isPlayingAudioRef.current = false

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
    if (currentAudioRef.current) {
      console.log('🛑 Barge-in via text input - stopping AI audio')
      currentAudioRef.current.pause()
      currentAudioRef.current.currentTime = 0
      currentAudioRef.current.src = ''
      currentAudioRef.current = null
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

  const processAudioQueue = () => {
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
      const audio = new Audio(`data:audio/wav;base64,${base64Audio}`)
      currentAudioRef.current = audio

      // Set volume explicitly (helps on some mobile devices)
      audio.volume = 1.0

      // Handle the play() promise (critical for mobile browsers)
      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✅ Audio playback started successfully')
          })
          .catch((error) => {
            console.error('❌ Audio play() rejected:', error.name, error.message)
            // Try to continue to next audio
            if (currentAudioRef.current === audio) {
              currentAudioRef.current = null
            }
            processAudioQueue()
          })
      }

      audio.onended = () => {
        console.log('✅ Audio playback ended')
        if (currentAudioRef.current === audio) {
          currentAudioRef.current = null
        }
        // Play next audio in queue
        processAudioQueue()
      }

      audio.onerror = (e) => {
        console.error('❌ Audio playback error:', e)
        if (currentAudioRef.current === audio) {
          currentAudioRef.current = null
        }
        // Continue to next audio even on error
        processAudioQueue()
      }
    } catch (error) {
      console.error('❌ Failed to play audio:', error)
      // Continue to next audio even on error
      processAudioQueue()
    }
  }

  // Show landing page if user hasn't started
  if (!hasStarted) {
    return <LandingPage onGetStarted={() => setHasStarted(true)} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-midnight-soft relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-60 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-3xl relative z-10"
      >
        {/* Main card with premium styling */}
        <div className="bg-midnight-800 backdrop-blur-xl rounded-3xl shadow-glow-midnight border border-emerald-500/20 overflow-hidden">
          {/* Header with gradient accent */}
          <div className="relative px-8 pt-8 pb-6 border-b border-midnight-700">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-gold-400 to-gold-500" />
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {appMode === 'voice' ? '🎙️ Voice AI' : '💬 Chat AI'}
                </h1>
                <p className="text-sm text-emerald-300 mt-1 font-medium">
                  {appMode === 'voice'
                    ? 'Intelligent voice assistant with Google Workspace'
                    : 'Intelligent text assistant with Google Workspace'
                  }
                </p>
              </div>
              {appMode === 'voice' && <StatusIndicator status={callStatus} />}
            </div>
            {/* Mode Selector */}
            <ModeSelector mode={appMode} onModeChange={setAppMode} />
          </div>

          {/* Content */}
          <div className="p-8 space-y-6 bg-gradient-to-b from-midnight-800 to-midnight-900">
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
  )
}

export default App
