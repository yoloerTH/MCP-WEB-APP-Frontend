import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { io, Socket } from 'socket.io-client'
import AudioVisualizer from './components/AudioVisualizer'
import Transcript from './components/Transcript'
import CallControls from './components/CallControls'
import StatusIndicator from './components/StatusIndicator'

// Backend URL - change this to your Railway URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

type CallStatus = 'disconnected' | 'connecting' | 'connected' | 'listening' | 'ai-speaking' | 'processing'

interface TranscriptMessage {
  type: 'user' | 'ai' | 'system'
  text: string
  timestamp: Date
}

function App() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [callStatus, setCallStatus] = useState<CallStatus>('disconnected')
  const [isMuted, setIsMuted] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])
  const [audioLevel, setAudioLevel] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)

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

    newSocket.on('error', (data: { message: string }) => {
      console.error('❌ Error:', data.message)
      addTranscript('system', `Error: ${data.message}`)
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

      // Setup MediaRecorder for streaming
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      })
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
      addTranscript('system', 'Failed to access microphone')
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
    try {
      const audio = new Audio(`data:audio/wav;base64,${base64Audio}`)
      audio.play()

      audio.onended = () => {
        setCallStatus('listening')
      }
    } catch (error) {
      console.error('❌ Failed to play audio:', error)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="scan-line" />
      <div className="holographic-noise" />
      <div className="grid-background" />

      {/* Radial gradient */}
      <div className="fixed inset-0 bg-gradient-radial from-cyber-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          {/* Holographic container */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyber-400 via-magenta-500 to-cyber-400 rounded-2xl opacity-20 blur-xl animate-pulse-glow" />

            {/* Main panel */}
            <div className="relative backdrop-blur-xl bg-black/40 border border-cyber-400/30 rounded-2xl p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <motion.h1
                  className="text-4xl font-display font-bold bg-gradient-to-r from-cyber-400 via-magenta-500 to-cyber-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  VOICE.AI
                </motion.h1>

                <StatusIndicator status={callStatus} />
              </div>

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
            </div>
          </div>

          {/* Footer hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="text-center mt-6 text-sm text-cyber-400/50 font-body"
          >
            POWERED BY HOLOGRAPHIC NEURAL INTERFACE v2.0
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default App
