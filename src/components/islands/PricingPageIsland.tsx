import { AuthProvider } from '../../contexts/AuthContext'
import PricingPage from '../PricingPage'

export default function PricingPageIsland() {
  return (
    <AuthProvider>
      <PricingPage />
    </AuthProvider>
  )
}
