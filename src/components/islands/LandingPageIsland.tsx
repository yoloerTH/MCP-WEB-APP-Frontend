import PageIsland from './PageIsland'
import LandingPage from '../LandingPage'

export default function LandingPageIsland() {
  const handleGetStarted = (mode: 'voice' | 'chat' = 'voice') => {
    window.location.href = mode === 'chat' ? '/chatai' : '/voiceai'
  }

  return (
    <PageIsland>
      <LandingPage onGetStarted={handleGetStarted} />
    </PageIsland>
  )
}
