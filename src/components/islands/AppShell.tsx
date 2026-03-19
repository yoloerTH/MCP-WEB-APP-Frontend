/**
 * AppShell - Mounts the full React SPA for authenticated routes.
 *
 * Handles: /voiceai, /chatai, /settings, /inspiration
 * These routes use React Router for client-side navigation between them
 * (preserving socket connections and state), while navigations to public
 * pages (/, /blog, /pricing, etc.) trigger full page loads.
 */
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider, type PersonalizationData } from '../../contexts/AuthContext'
import { useAuth } from '../../hooks/useAuth'
import VoiceAIApp from '../../VoiceAIApp'
import { InspirationPage } from '../InspirationPage'
import { Settings } from '../Settings'
import { PersonalizationModal } from '../PersonalizationModal'
import SubscriptionRequiredModal from '../SubscriptionRequiredModal'
import MobileNotice from '../MobileNotice'
import OnboardingWalkthrough, { hasCompletedOnboarding } from '../OnboardingWalkthrough'

/** Known app routes that React Router should handle client-side */
const APP_ROUTES = ['/voiceai', '/chatai', '/settings', '/inspiration']

/**
 * Intercepts navigations to public pages and converts them to full page loads.
 * Navigations between app routes stay client-side (React Router).
 */
function AppNavigationGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const isAppRoute = APP_ROUTES.some(route => location.pathname.startsWith(route))
    if (!isAppRoute && location.pathname !== '/') {
      // Navigation to a public page - do full page load
      window.location.href = location.pathname + location.search + location.hash
    }
  }, [location.pathname, location.search, location.hash])

  return <>{children}</>
}

/** Modal logic from the original App.tsx */
function AppModals() {
  const {
    user,
    hasPersonalization,
    personalizationData,
    personalizationLoading,
    hasActiveSubscription,
    subscriptionLoading,
    fetchSubscription,
  } = useAuth()
  const location = useLocation()
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Priority 1: Show subscription modal
    if (user && !subscriptionLoading && !hasActiveSubscription) {
      setShowSubscriptionModal(true)
      setShowPersonalizationModal(false)
      return
    }

    // Priority 2: Show personalization modal
    if (user && hasActiveSubscription && !personalizationLoading && !hasPersonalization) {
      setShowPersonalizationModal(true)
      setShowSubscriptionModal(false)
      return
    }

    setShowPersonalizationModal(false)
    setShowSubscriptionModal(false)

    // Show onboarding walkthrough if fully set up but hasn't seen it
    if (user && hasActiveSubscription && hasPersonalization && !hasCompletedOnboarding()) {
      setShowOnboarding(true)
    }
  }, [user, hasPersonalization, personalizationLoading, hasActiveSubscription, subscriptionLoading, location.pathname])

  const handleSubscribed = async () => {
    await fetchSubscription()
    setShowSubscriptionModal(false)
  }

  return (
    <>
      <PersonalizationModal
        isOpen={showPersonalizationModal}
        onClose={() => setShowPersonalizationModal(false)}
      />
      <SubscriptionRequiredModal
        isOpen={showSubscriptionModal}
        onSubscribed={handleSubscribed}
      />
      {showOnboarding && (
        <OnboardingWalkthrough
          preferredName={personalizationData?.preferred_name}
          onComplete={() => setShowOnboarding(false)}
        />
      )}
      <MobileNotice />
    </>
  )
}

export default function AppShell() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppNavigationGuard>
            <Routes>
              <Route path="/voiceai" element={<VoiceAIApp />} />
              <Route path="/chatai" element={<VoiceAIApp />} />
              <Route path="/inspiration" element={<InspirationPage />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <AppModals />
          </AppNavigationGuard>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  )
}
