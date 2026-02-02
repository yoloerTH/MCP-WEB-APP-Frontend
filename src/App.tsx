import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import VoiceAIApp from './VoiceAIApp'
import { InspirationPage } from './components/InspirationPage'
import { Settings } from './components/Settings'
import { PersonalizationModal } from './components/PersonalizationModal'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import PricingPage from './components/PricingPage'
import SubscriptionRequiredModal from './components/SubscriptionRequiredModal'
import MobileNotice from './components/MobileNotice'
import ContactUs from './components/ContactUs'
import BlogPage from './components/BlogPage'
import BlogPostPage from './components/BlogPostPage'

function App() {
  const {
    user,
    hasPersonalization,
    personalizationLoading,
    hasActiveSubscription,
    subscriptionLoading,
    fetchSubscription,
  } = useAuth()
  const location = useLocation()
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

  // Show subscription modal FIRST, then personalization modal
  useEffect(() => {
    const isLandingPage = location.pathname === '/'
    const isPricingPage = location.pathname === '/pricing'
    const isPublicPage = isLandingPage || isPricingPage || location.pathname === '/privacy' || location.pathname === '/terms'

    console.log('🎯 Modal decision:', {
      user: !!user,
      personalizationLoading,
      hasPersonalization,
      subscriptionLoading,
      hasActiveSubscription,
      pathname: location.pathname,
      isPublicPage,
    })

    // Priority 1: Show subscription modal FIRST (before personalization)
    if (
      user &&
      !subscriptionLoading &&
      !hasActiveSubscription &&
      !isPublicPage
    ) {
      console.log('✅ Showing subscription modal (Priority 1)')
      setShowSubscriptionModal(true)
      setShowPersonalizationModal(false)
      return
    }

    // Priority 2: Show personalization modal AFTER subscription is active
    if (
      user &&
      hasActiveSubscription &&
      !personalizationLoading &&
      !hasPersonalization &&
      !isPublicPage
    ) {
      console.log('✅ Showing personalization modal (Priority 2)')
      setShowPersonalizationModal(true)
      setShowSubscriptionModal(false)
      return
    }

    // No modals needed - user has both subscription and personalization
    console.log('❌ Not showing any modals - user is fully set up')
    setShowPersonalizationModal(false)
    setShowSubscriptionModal(false)
  }, [
    user,
    hasPersonalization,
    personalizationLoading,
    hasActiveSubscription,
    subscriptionLoading,
    location.pathname,
  ])

  const handleCloseModal = () => {
    setShowPersonalizationModal(false)
  }

  const handleSubscribed = async () => {
    // Refresh subscription status
    await fetchSubscription()
    setShowSubscriptionModal(false)
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<VoiceAIApp />} />
        <Route path="/voiceai" element={<VoiceAIApp />} />
        <Route path="/chatai" element={<VoiceAIApp />} />
        <Route path="/inspiration" element={<InspirationPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>

      {/* Personalization Modal - Shows on first login */}
      <PersonalizationModal
        isOpen={showPersonalizationModal}
        onClose={handleCloseModal}
      />

      {/* Subscription Required Modal - Shows after personalization if no subscription */}
      <SubscriptionRequiredModal
        isOpen={showSubscriptionModal}
        onSubscribed={handleSubscribed}
      />

      {/* Mobile Notice - Shows on mobile devices only */}
      <MobileNotice />
    </>
  )
}

export default App
