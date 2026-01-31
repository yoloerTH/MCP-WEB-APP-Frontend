import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'

const MCP_SERVER_URL = import.meta.env.VITE_MCP_SERVER_URL || 'http://localhost:3000'

interface WorkspaceService {
  id: string
  name: string
  icon: string
  iconType: 'image' | 'emoji'
  description: string
}

const WORKSPACE_SERVICES: WorkspaceService[] = [
  { id: 'gmail', name: 'Gmail', icon: '/google-icons/gmail.png', iconType: 'image', description: 'Read, send, and manage emails' },
  { id: 'calendar', name: 'Calendar', icon: '/google-icons/calendar.png', iconType: 'image', description: 'View and create events' },
  { id: 'drive', name: 'Drive', icon: '/google-icons/drive.png', iconType: 'image', description: 'Access and organize files' },
  { id: 'docs', name: 'Docs', icon: '/google-icons/docs.png', iconType: 'image', description: 'Create and edit documents' },
  { id: 'sheets', name: 'Sheets', icon: '/google-icons/sheets.png', iconType: 'image', description: 'Manage spreadsheets' },
  { id: 'contacts', name: 'Contacts', icon: '👤', iconType: 'emoji', description: 'View and update contacts' },
  { id: 'tasks', name: 'Tasks', icon: '/google-icons/tasks.png', iconType: 'image', description: 'Create and track tasks' },
  { id: 'meet', name: 'Meet', icon: '/google-icons/meet.png', iconType: 'image', description: 'Schedule video meetings' },
]

export function GoogleWorkspaceConnect() {
  const { user } = useAuth()
  const [isConnected, setIsConnected] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (user) {
      checkConnection()
    }
  }, [user])

  const checkConnection = async () => {
    if (!user) return

    try {
      setIsChecking(true)
      const response = await fetch(`${MCP_SERVER_URL}/health`)
      if (response.ok) {
        const hasConnected = localStorage.getItem(`workspace_connected_${user.id}`)
        setIsConnected(!!hasConnected)
      }
    } catch (error) {
      console.error('Error checking connection:', error)
      setIsConnected(false)
    } finally {
      setIsChecking(false)
    }
  }

  const handleOpenModal = () => {
    setShowModal(true)
    setConnectionStatus('idle')
  }

  const handleCloseModal = () => {
    if (connectionStatus !== 'connecting') {
      setShowModal(false)
    }
  }

  const handleProceedWithOAuth = () => {
    if (!user) {
      console.error('❌ No user found')
      return
    }

    console.log('🔐 Starting OAuth flow...')
    console.log('MCP Server URL:', MCP_SERVER_URL)
    console.log('User ID:', user.id)

    setConnectionStatus('connecting')

    // Listen for postMessage from OAuth popup
    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security - extract origin from MCP_SERVER_URL
      const mcpOrigin = new URL(MCP_SERVER_URL).origin
      const allowedOrigins = [
        mcpOrigin,
        'https://mcp-google-production-032a.up.railway.app',
        'http://localhost:3000'
      ]

      if (!allowedOrigins.includes(event.origin)) {
        console.warn('Received message from unauthorized origin:', event.origin)
        return
      }

      const { type, userId, error } = event.data

      if (type === 'oauth-success') {
        console.log('✅ OAuth success received for user:', userId)

        // Mark as successful
        setConnectionStatus('success')
        localStorage.setItem(`workspace_connected_${user.id}`, 'true')
        setIsConnected(true)

        // Close modal after success animation
        setTimeout(() => {
          setShowModal(false)
          setConnectionStatus('idle')
        }, 2000)

        // Remove listener
        window.removeEventListener('message', handleMessage)
      } else if (type === 'oauth-error') {
        console.error('❌ OAuth error:', error)

        // Mark as failed
        setConnectionStatus('error')

        // Remove listener
        window.removeEventListener('message', handleMessage)
      }
    }

    // Add message listener
    window.addEventListener('message', handleMessage)

    // Open OAuth flow in centered popup
    const width = 600
    const height = 700
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    const oauthUrl = `${MCP_SERVER_URL}/oauth/start?userId=${user.id}`
    console.log('🌐 Opening OAuth popup:', oauthUrl)

    // Open popup (no need to store reference with postMessage pattern)
    const popup = window.open(
      oauthUrl,
      'Google Workspace OAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    )

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      console.error('❌ Popup was blocked! Please allow popups for this site.')
      setConnectionStatus('error')
      alert('Popup was blocked! Please allow popups for naurra.ai and try again.')
      return
    }

    console.log('✅ Popup opened successfully')

    // Timeout fallback (only if no message received after 2 minutes)
    const timeoutId = setTimeout(() => {
      console.warn('OAuth timeout - no response received')
      setConnectionStatus('error')
      window.removeEventListener('message', handleMessage)
    }, 120000) // 2 minutes

    // Clean up timeout if message is received
    const originalHandler = handleMessage
    const wrappedHandler = (event: MessageEvent) => {
      clearTimeout(timeoutId)
      originalHandler(event)
    }

    window.removeEventListener('message', handleMessage)
    window.addEventListener('message', wrappedHandler)
  }

  const handleDisconnect = () => {
    if (!user) return
    localStorage.removeItem(`workspace_connected_${user.id}`)
    setIsConnected(false)
  }

  if (!user) return null

  if (isChecking) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 backdrop-blur-xl p-6"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-500 border-r-emerald-500"></div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20"></div>
          </div>
          <div>
            <div className="h-5 w-32 bg-gray-700/50 rounded animate-pulse mb-2"></div>
            <div className="h-3 w-24 bg-gray-700/30 rounded animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 backdrop-blur-xl"
      >
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-emerald-500/20 blur-xl animate-pulse"></div>
        </div>

        <div className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Status indicator */}
              <div className="relative">
                <motion.div
                  animate={{
                    scale: isConnected ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isConnected ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className={`w-3 h-3 rounded-full ${
                    isConnected
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                      : 'bg-amber-500 shadow-lg shadow-amber-500/50'
                  }`}
                />
                {isConnected && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-emerald-500"
                  />
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-white font-semibold text-lg tracking-tight flex items-center gap-2">
                  Google Workspace
                  {isConnected && (
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="text-emerald-500"
                    >
                      ✓
                    </motion.span>
                  )}
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  {isConnected ? (
                    <span className="text-emerald-400">Connected • 8 services active</span>
                  ) : (
                    'Enable AI workspace control'
                  )}
                </p>
              </div>
            </div>

            {/* Action button */}
            {!isConnected ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenModal}
                className="group relative px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Connect
                </span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDisconnect}
                className="px-5 py-2.5 bg-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors duration-200 font-medium"
              >
                Disconnect
              </motion.button>
            )}
          </div>

          {/* Connected services preview */}
          {isConnected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-700/50"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {WORKSPACE_SERVICES.slice(0, 8).map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    title={service.name}
                  >
                    {service.iconType === 'image' ? (
                      <img
                        src={service.icon}
                        alt={service.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <span className="text-2xl">{service.icon}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Permission Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden"
            >
              {/* Decorative gradient orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-full blur-3xl"></div>

              {/* Close button */}
              {connectionStatus !== 'connecting' && (
                <button
                  onClick={handleCloseModal}
                  className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              <div className="relative p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 mb-6"
                  >
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-white mb-3"
                  >
                    Connect Google Workspace
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-gray-400 text-lg"
                  >
                    Enable AI voice control for your entire workspace
                  </motion.p>
                </div>

                {/* Status screens */}
                <AnimatePresence mode="wait">
                  {connectionStatus === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Services grid */}
                      <div className="mb-8">
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide text-gray-400">
                          Services You'll Control
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {WORKSPACE_SERVICES.map((service, index) => (
                            <motion.div
                              key={service.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                              className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-emerald-500/30 hover:bg-gray-800/70 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                                {service.iconType === 'image' ? (
                                  <img
                                    src={service.icon}
                                    alt={service.name}
                                    className="w-8 h-8 object-contain"
                                  />
                                ) : (
                                  <span className="text-2xl">{service.icon}</span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm">{service.name}</p>
                                <p className="text-gray-500 text-xs truncate">{service.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Privacy notice */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-emerald-300 font-semibold text-sm mb-1">Secure & Private</h4>
                            <p className="text-emerald-200/70 text-xs leading-relaxed">
                              Your credentials are encrypted and stored securely. We only access what's needed for AI commands. You can disconnect anytime.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Action buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.75 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCloseModal}
                          className="flex-1 px-6 py-3 rounded-xl bg-gray-800 text-gray-300 font-semibold hover:bg-gray-700 transition-colors duration-200"
                        >
                          Maybe Later
                        </motion.button>
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleProceedWithOAuth}
                          className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <span>Continue with Google</span>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {connectionStatus === 'connecting' && (
                    <motion.div
                      key="connecting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 text-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 mb-6"
                      >
                        <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-emerald-500 border-r-emerald-500"></div>
                      </motion.div>
                      <h3 className="text-white text-xl font-semibold mb-2">Connecting...</h3>
                      <p className="text-gray-400">Complete the authorization in the popup window</p>
                    </motion.div>
                  )}

                  {connectionStatus === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/50 mb-6"
                      >
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-white text-xl font-semibold mb-2">Successfully Connected!</h3>
                      <p className="text-gray-400">Your Google Workspace is now accessible via AI</p>
                    </motion.div>
                  )}

                  {connectionStatus === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 text-center"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 mb-6">
                        <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h3 className="text-white text-xl font-semibold mb-2">Connection Failed</h3>
                      <p className="text-gray-400 mb-6">Please try again or check your permissions</p>
                      <button
                        onClick={() => setConnectionStatus('idle')}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold"
                      >
                        Try Again
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
