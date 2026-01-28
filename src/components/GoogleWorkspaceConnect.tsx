import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

const MCP_SERVER_URL = import.meta.env.VITE_MCP_SERVER_URL || 'http://localhost:3000'

export function GoogleWorkspaceConnect() {
  const { user } = useAuth()
  const [isConnected, setIsConnected] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (user) {
      checkConnection()
    }
  }, [user])

  const checkConnection = async () => {
    if (!user) return

    try {
      setIsChecking(true)
      // Try to check if tokens exist for this user
      // This is a simple check - in production you might want a dedicated endpoint
      const response = await fetch(`${MCP_SERVER_URL}/health`)
      if (response.ok) {
        // For now, we'll assume connection status based on local storage or a simple flag
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

  const handleConnect = () => {
    if (!user) return

    // Open OAuth flow in new window
    const width = 600
    const height = 700
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    const oauthWindow = window.open(
      `${MCP_SERVER_URL}/oauth/start?userId=${user.id}`,
      'Google Workspace OAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    )

    // Poll for window close to refresh connection status
    const pollTimer = setInterval(() => {
      if (oauthWindow?.closed) {
        clearInterval(pollTimer)
        localStorage.setItem(`workspace_connected_${user.id}`, 'true')
        setIsConnected(true)
      }
    }, 500)
  }

  if (!user) return null

  if (isChecking) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-emerald-500"></div>
          <span className="text-gray-300">Checking connection status...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-yellow-500'}`}></div>
          <div>
            <h3 className="text-white font-semibold">Google Workspace</h3>
            <p className="text-sm text-gray-400">
              {isConnected ? 'Connected and ready' : 'Not connected'}
            </p>
          </div>
        </div>

        {!isConnected ? (
          <button
            onClick={handleConnect}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600
                     text-white font-semibold rounded-lg shadow-lg
                     hover:from-emerald-600 hover:to-emerald-700
                     transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Connect Google Workspace
          </button>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem(`workspace_connected_${user.id}`)
              setIsConnected(false)
            }}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg
                     hover:bg-gray-600 transition-colors duration-200"
          >
            Disconnect
          </button>
        )}
      </div>

      {isConnected && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Your Google Workspace account is connected. You can now use voice commands
            to manage your emails, calendar, and documents.
          </p>
        </div>
      )}
    </div>
  )
}
