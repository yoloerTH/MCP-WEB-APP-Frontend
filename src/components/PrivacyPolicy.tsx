import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to Naurra.ai ("we," "our," or "us"). We are committed to protecting your privacy and ensuring
              the security of your personal information. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our AI-powered workspace assistant service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            <p className="mb-3">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Account information (name, email address)</li>
              <li>Google Workspace data you authorize us to access</li>
              <li>Voice recordings and transcripts when using voice features</li>
              <li>Chat messages and interaction data</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your requests and commands</li>
              <li>Integrate with your Google Workspace tools</li>
              <li>Communicate with you about service updates</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Google Workspace Integration</h2>
            <p>
              Naurra.ai integrates with Google Workspace services. We only access the data you explicitly authorize
              through Google's OAuth consent process. We do not store your Google credentials and follow Google's
              API Services User Data Policy, including the Limited Use requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal
              information. However, no method of transmission over the Internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in
              this Privacy Policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Revoke Google Workspace access permissions</li>
              <li>Object to certain data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Services</h2>
            <p>
              Our service integrates with Google Workspace and may use other third-party services. These services
              have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Children's Privacy</h2>
            <p>
              Our service is not intended for users under the age of 13. We do not knowingly collect personal
              information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:privacy@naurra.ai" className="text-emerald-400 hover:text-emerald-300">
                privacy@naurra.ai
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
