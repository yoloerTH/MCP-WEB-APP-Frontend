import { useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const { user, loading, signInWithGoogle } = useAuth()
  const pathname = location.pathname.replace(/\/+$/, '') || '/'
  const isChatRoute = pathname === '/chatai'
  const experienceLabel = isChatRoute ? 'Chat AI' : 'Voice AI'
  const experienceDescription = isChatRoute
    ? 'Open Naurra.ai Chat AI to run Gmail, Calendar, Drive, Docs, and Sheets from one conversation.'
    : 'Open Naurra.ai Voice AI to control Gmail, Calendar, Drive, Docs, and Sheets with natural voice commands.'

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                    flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2
                        border-emerald-500 mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-6 py-16 text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
          <div className="mb-6 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
            Login required
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            {experienceLabel} lives behind your Naurra.ai account
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-300">
            {experienceDescription} Sign in with Google to continue safely from this page without losing your place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => signInWithGoogle()}
              className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition hover:bg-emerald-400"
            >
              Continue with Google
            </button>
            <a
              href="/pricing/"
              className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-emerald-400/50 hover:bg-white/5"
            >
              View pricing
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            After sign-in, you&apos;ll return to the same experience automatically.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
