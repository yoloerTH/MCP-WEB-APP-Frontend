import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import VoiceAIApp from './VoiceAIApp'
import { InspirationPage } from './components/InspirationPage'
import { Settings } from './components/Settings'
import { PersonalizationModal } from './components/PersonalizationModal'

function App() {
  const { user, hasPersonalization, personalizationLoading } = useAuth()
  const location = useLocation()
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false)

  // Show personalization modal on first login (not on landing page)
  useEffect(() => {
    const isLandingPage = location.pathname === '/'
    const isSettingsPage = location.pathname === '/settings'
    const isInspirationPage = location.pathname === '/inspiration'

    // Only show modal if:
    // 1. User exists
    // 2. Personalization data has finished loading
    // 3. User doesn't have personalization
    // 4. Not on excluded pages
    if (user && !personalizationLoading && !hasPersonalization && !isLandingPage && !isSettingsPage && !isInspirationPage) {
      setShowPersonalizationModal(true)
    } else {
      setShowPersonalizationModal(false)
    }
  }, [user, hasPersonalization, personalizationLoading, location.pathname])

  const handleCloseModal = () => {
    setShowPersonalizationModal(false)
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<VoiceAIApp />} />
        <Route path="/voiceai" element={<VoiceAIApp />} />
        <Route path="/chatai" element={<VoiceAIApp />} />
        <Route path="/inspiration" element={<InspirationPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {/* Personalization Modal - Shows on first login */}
      <PersonalizationModal
        isOpen={showPersonalizationModal}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default App
