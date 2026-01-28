import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export function AuthButton() {
  const { user, signInWithGoogle, signOut, loading } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-700 h-10 w-32 rounded-lg"></div>
    )
  }

  if (!user) {
    return (
      <button
        onClick={signInWithGoogle}
        disabled={loading}
        className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600
                 text-white font-semibold rounded-lg shadow-lg
                 hover:from-emerald-600 hover:to-emerald-700
                 transition-all duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed
                 flex items-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign in with Google
      </button>
    )
  }

  const userEmail = user.email || 'User'
  const userName = user.user_metadata?.full_name || user.user_metadata?.name || userEmail.split('@')[0]
  const userAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 px-4 py-2 bg-gray-800/50
                 rounded-lg hover:bg-gray-700/50 transition-all duration-200
                 border border-gray-700"
      >
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600
                        flex items-center justify-center text-white font-semibold">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-white font-medium">{userName}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            showDropdown ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl
                        border border-gray-700 overflow-hidden z-20">
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-sm text-gray-400">Signed in as</p>
              <p className="text-white font-medium truncate">{userEmail}</p>
            </div>
            <button
              onClick={() => {
                signOut()
                setShowDropdown(false)
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-700/50
                       transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
