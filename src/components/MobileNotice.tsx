import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MobileNotice() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if user has already dismissed the notice
    const dismissed = localStorage.getItem('mobile-notice-dismissed')

    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileKeywords = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/
      return mobileKeywords.test(userAgent) || window.innerWidth < 768
    }

    const mobile = checkMobile()
    setIsMobile(mobile)

    // Show notice if mobile and not dismissed
    if (mobile && !dismissed) {
      // Delay showing for smoother UX
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('mobile-notice-dismissed', 'true')
  }

  if (!isMobile) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 z-[100] pointer-events-none flex justify-center"
        >
          <div className="relative pointer-events-auto max-w-md w-full bg-gradient-to-br from-emerald-900/95 to-emerald-950/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-500/20 p-4">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 rounded-2xl pointer-events-none" />

            {/* Content */}
            <div className="relative flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm mb-1">
                  Best on Desktop
                </h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  For the best experience, please use Naurra.ai on desktop. Our mobile app is coming soon!
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* App Store badge hint */}
            <div className="relative mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-gray-400">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>Mobile app arriving on App Store & Play Store soon</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
