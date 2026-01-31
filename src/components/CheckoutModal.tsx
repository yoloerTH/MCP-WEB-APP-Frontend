import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { supabase } from '../lib/supabase'

// Initialize Stripe (you'll need to add your publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  planId: 'monthly' | 'yearly'
  amount: number
  period: string
}

function CheckoutForm({ planId, amount, period, onClose }: Omit<CheckoutModalProps, 'isOpen'>) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) throw new Error('Card element not found')

      // Create payment method
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      if (pmError) {
        throw new Error(pmError.message)
      }

      // Call Supabase edge function to create subscription
      const { data: sessionData } = await supabase.auth.getSession()

      if (!sessionData.session) {
        throw new Error('Not authenticated')
      }

      const { data, error: apiError } = await supabase.functions.invoke('create-subscription', {
        body: {
          planId: planId,
          paymentMethodId: paymentMethod.id,
        },
      })

      if (apiError) {
        throw new Error(apiError.message || 'Failed to create subscription')
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to create subscription')
      }

      console.log('Subscription created:', data.subscription)

      setSuccess(true)

      // Close modal after success and redirect to dashboard
      setTimeout(() => {
        onClose()
        window.location.href = '/chatai' // Redirect to main app
      }, 2000)

    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
        <p className="text-gray-400">Your subscription is now active. Redirecting...</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Plan Summary */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white capitalize">{planId} Plan</h3>
            <p className="text-sm text-gray-400">Full access to Naurra.ai</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
              €{amount}
            </div>
            <div className="text-xs text-gray-400">per {period}</div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>

      {/* Card Element */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Card Information
        </label>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-emerald-500/30 transition-colors">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': {
                    color: '#9ca3af',
                  },
                  iconColor: '#10b981',
                },
                invalid: {
                  color: '#ef4444',
                  iconColor: '#ef4444',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
          isProcessing
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/30'
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : (
          `Subscribe for €${amount}/${period}`
        )}
      </button>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Secured by Stripe. Your card details are never stored.</span>
      </div>
    </form>
  )
}

export default function CheckoutModal({ isOpen, onClose, planId, amount, period }: CheckoutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#0a0e1a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="relative p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Complete Your Subscription</h2>
                  <p className="text-gray-400">Enter your payment details to get started</p>
                </div>

                <Elements stripe={stripePromise}>
                  <CheckoutForm planId={planId} amount={amount} period={period} onClose={onClose} />
                </Elements>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
