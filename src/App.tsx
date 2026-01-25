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

      audio.play()

      audio.onended = () => {
        if (currentAudioRef.current === audio) {
          currentAudioRef.current = null
        }
        // Play next audio in queue
        processAudioQueue()
      }

      audio.onerror = () => {
        console.error('❌ Audio playback error')
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-3xl"
      >
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-soft-lg border border-neutral-200/50 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
                  Voice AI
                </h1>
                <p className="text-sm text-neutral-500 mt-1">
                  Intelligent voice assistant
                </p>
              </div>
              <StatusIndicator status={callStatus} />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
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

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-xs text-neutral-400"
        >
          Powered by advanced AI technology
        </motion.p>
      </motion.div>
    </div>
  )
}

export default App
