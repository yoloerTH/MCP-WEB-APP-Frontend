import { AuthProvider } from '../../contexts/AuthContext'
import ContactUs from '../ContactUs'

export default function ContactPageIsland() {
  return (
    <AuthProvider>
      <ContactUs />
    </AuthProvider>
  )
}
