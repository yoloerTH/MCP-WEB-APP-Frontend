import { AuthProvider } from '../../contexts/AuthContext'
import LandingPage from '../LandingPage'

// The landing page is server-rendered (client:load) for SEO. It deliberately
// does NOT use BrowserRouter/PageIsland: LandingPage navigates with
// window.location (full page loads, same as Astro routing). SEO meta and
// structured data are emitted server-side by index.astro/BaseLayout, so the
// only provider it needs is Auth (for CTA button state), which renders a
// stable SSR-safe default — no hydration drift.
export default function LandingPageIsland() {
  const handleGetStarted = (mode: 'voice' | 'chat' = 'voice') => {
    window.location.href = mode === 'chat' ? '/chatai' : '/voiceai'
  }

  return (
    <AuthProvider>
      <LandingPage onGetStarted={handleGetStarted} />
    </AuthProvider>
  )
}
