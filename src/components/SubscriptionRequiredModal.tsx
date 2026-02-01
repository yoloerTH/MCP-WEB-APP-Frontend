import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import CheckoutModal from './CheckoutModal'

interface SubscriptionRequiredModalProps {
  isOpen: boolean
  onSubscribed: () => void
}

/**
 * SubscriptionRequiredModal
 *
 * Non-dismissable modal that forces new users to choose a subscription plan
 * before they can access the platform.
 *
 * User must either:
 * 1. Start 3-day free trial (no card required)
 * 2. Subscribe to Monthly plan (€79/month)
 * 3. Subscribe to Yearly plan (€799/year)
 */
export default function SubscriptionRequiredModal({
  isOpen,
  onSubscribed,
}: SubscriptionRequiredModalProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkoutPlan, setCheckoutPlan] = useState<{
    planId: 'monthly' | 'yearly'
    amount: number
    period: string
  } | null>(null)

  // Safety check - should not show modal if no user
  if (!user) {
    return null
  }

  const handleStartTrial = async () => {
    setLoading(true)
    setError(null)

    try {
      // Supabase automatically includes apikey + Authorization
      const { data, error: apiError } = await supabase.functions.invoke('activate-trial')

      if (apiError) {
        throw new Error(apiError.message || 'Failed to activate trial')
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to activate trial')
      }

      // Success - notify parent to refresh subscription state
      onSubscribed()
    } catch (err: any) {
      setError(err.message || 'Failed to activate trial')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectPaidPlan = (planId: 'monthly' | 'yearly') => {
    const amount = planId === 'monthly' ? 79 : 799
    const period = planId === 'monthly' ? 'month' : 'year'

    setCheckoutPlan({ planId, amount, period })
  }

  const handleCheckoutClose = () => {
    setCheckoutPlan(null)
    // Refresh subscription state after successful payment
    onSubscribed()
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && !checkoutPlan && (
          <>
            {/* Backdrop - Non-dismissable */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-4xl bg-[#0a0e1a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 pointer-events-none" />

                {/* Content */}
                <div className="relative p-8 md:p-12">
                  {/* Header */}
                  <div className="text-center mb-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="relative w-24 h-24 mx-auto mb-6"
                    >
                      {/* Glow effect behind logo */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-amber-500/30 blur-2xl rounded-full" />
                      {/* Logo */}
                      <img
                        src="/logo-transparent.png"
                        alt="Naurra.ai"
                        className="relative w-full h-full object-contain"
                      />
                    </motion.div>

                    <h2 className="text-4xl font-bold text-white mb-3">
                      Welcome to Naurra.ai!
                    </h2>
                    <p className="text-xl text-gray-400">
                      Choose a plan to unlock AI-powered productivity
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Plans Grid */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Free Trial */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-white mb-2">
                            Free Trial
                          </h3>
                          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent mb-1">
                            €0
                          </div>
                          <p className="text-sm text-gray-400">for 3 days</p>
                        </div>

                        <ul className="space-y-2 mb-6 flex-grow">
                          <li className="flex items-start gap-2 text-sm text-gray-300">
                            <svg
                              className="w-5 h-5 text-emerald-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Full access to all features
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-300">
                            <svg
                              className="w-5 h-5 text-emerald-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            No credit card required
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-300">
                            <svg
                              className="w-5 h-5 text-emerald-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            35+ AI-powered tools
                          </li>
                        </ul>

                        <button
                          onClick={handleStartTrial}
                          disabled={loading}
                          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Activating...' : 'Start Free Trial'}
                        </button>
                      </div>
                    </motion.div>

                    {/* Monthly Plan */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative bg-white/5 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 h-full flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-white mb-2">
                            Monthly
                          </h3>
                          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent mb-1">
                            €79
                          </div>
                          <p className="text-sm text-gray-400">per month</p>
                        </div>

                        <ul className="space-y-2 mb-6 flex-grow">
                          <li className="flex items-start gap-2 text-sm text-gray-300">
                            <svg
                              className="w-5 h-5 text-emerald-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Everything in Free Trial
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-300">
                            <svg
                              className="w-5 h-5 text-emerald-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            3-day trial included
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-300">
                            <svg
                              className="w-5 h-5 text-emerald-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Cancel anytime
                          </li>
                        </ul>

                        <button
                          onClick={() => handleSelectPaidPlan('monthly')}
                          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30"
                        >
                          Subscribe Monthly
                        </button>
                      </div>
                    </motion.div>

                    {/* Yearly Plan */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="relative group"
                    >
                      {/* Best Value Badge */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                          Save €149
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative bg-white/5 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-6 h-full flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-white mb-2">
                            Yearly
                          </h3>
                          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent mb-1">
                            €799
                          </div>
                          <p className="text-sm text-gray-400">per year</p>
                        </div>

                        <ul className="space-y-2 mb-6 flex-grow">
                          <li className="flex items-start gap-2 text-sm text-gray-300">
                            <svg
                              className="w-5 h-5 text-emerald-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Everything in Monthly
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-300">
                            <svg
                              className="w-5 h-5 text-emerald-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Best value for money
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-300">
                            <svg
                              className="w-5 h-5 text-emerald-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Exclusive yearly perks
                          </li>
                        </ul>

                        <button
                          onClick={() => handleSelectPaidPlan('yearly')}
                          className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30"
                        >
                          Subscribe Yearly
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Footer Note */}
                  <p className="text-center text-sm text-gray-500">
                    You must choose a plan to continue. All plans include full
                    access to 35+ AI-powered tools.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal for Paid Plans */}
      {checkoutPlan && (
        <CheckoutModal
          isOpen={!!checkoutPlan}
          onClose={handleCheckoutClose}
          planId={checkoutPlan.planId}
          amount={checkoutPlan.amount}
          period={checkoutPlan.period}
        />
      )}
    </>
  )
}
