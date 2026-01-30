import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function TermsOfService() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Header */}
      <nav className="border-b border-emerald-500/10 backdrop-blur-xl bg-[#0a0e1a]/90">
        <div className="max-w-4xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
              <img src="/logo-transparent.png" alt="Naurra.ai Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-display tracking-tight bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
              Naurra.ai
            </span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </nav>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-8 py-12"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Naurra.ai ("Service"), you agree to be bound by these Terms of Service
              ("Terms"). If you do not agree to these Terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p>
              Naurra.ai provides an AI-powered workspace assistant that integrates with Google Workspace to help you
              manage tasks, communications, and productivity through voice and chat interfaces.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
            <p className="mb-3">When you create an account with us, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Google Workspace Integration</h2>
            <p>
              Our Service integrates with Google Workspace. By using this integration, you authorize us to access
              your Google Workspace data as specified during the OAuth consent process. You may revoke this access
              at any time through your Google account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Acceptable Use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Use the Service to transmit malware or harmful code</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Abuse, harass, or harm other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by Naurra.ai and are
              protected by international copyright, trademark, patent, trade secret, and other intellectual property
              laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. User Data and Privacy</h2>
            <p>
              Your use of the Service is also governed by our Privacy Policy. We collect and process your data as
              described in the Privacy Policy, which is incorporated into these Terms by reference.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Service Availability</h2>
            <p>
              We strive to provide reliable service but do not guarantee that the Service will be uninterrupted,
              timely, secure, or error-free. We reserve the right to modify, suspend, or discontinue the Service at
              any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Naurra.ai shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your use of or inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind, either express or
              implied, including but not limited to warranties of merchantability, fitness for a particular purpose,
              or non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice,
              for any reason, including breach of these Terms. You may also terminate your account at any time by
              contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting
              the new Terms on this page and updating the "Last updated" date. Continued use of the Service after
              changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to
              conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:{' '}
              <a href="mailto:support@naurra.ai" className="text-emerald-400 hover:text-emerald-300">
                support@naurra.ai
              </a>
            </p>
          </section>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-8 mt-12">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Naurra.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
