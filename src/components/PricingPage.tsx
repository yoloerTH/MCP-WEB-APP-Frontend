import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import CheckoutModal from './CheckoutModal'
import { supabase } from '../lib/supabase'

type BillingPeriod = 'monthly' | 'yearly'

interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  isTrial?: boolean
}

export default function PricingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly')
  const [checkoutPlan, setCheckoutPlan] = useState<{ planId: 'monthly' | 'yearly'; amount: number; period: string } | null>(null)

  const plans: PricingPlan[] = [
    {
      id: 'trial',
      name: 'Free Trial',
      price: 0,
      period: '3 days',
      description: 'Experience the full power of Naurra.ai',
      features: [
        'Full access to all features',
        'All Google Workspace tools',
        'Unlimited voice & chat',
        '35+ AI tools',
        'No credit card required'
      ],
      cta: 'Start Free Trial',
      isTrial: true
    },
    {
      id: 'monthly',
      name: 'Monthly',
      price: 79,
      period: 'month',
      description: 'Perfect for individuals and small teams',
      features: [
        'Full access to all features',
        'All Google Workspace integrations',
        'Unlimited voice & chat',
        '35+ AI-powered tools',
        'Priority support',
        'Cancel anytime'
      ],
      cta: 'Subscribe Now',
      highlighted: billingPeriod === 'monthly'
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: 799,
      period: 'year',
      description: 'Best value for committed power users',
      features: [
        'Everything in Monthly',
        'Save €149 per year',
        'All Google Workspace integrations',
        'Unlimited voice & chat',
        '35+ AI-powered tools',
        'Priority support',
        'Exclusive yearly perks'
      ],
      cta: 'Subscribe Now',
      highlighted: billingPeriod === 'yearly'
    }
  ]

  const handlePlanSelect = async (planId: string) => {
    if (!user) {
      // Redirect to sign in
      navigate('/')
      return
    }

    if (planId === 'trial') {
      // Start trial via edge function
      try {
        const { data, error } = await supabase.functions.invoke('activate-trial', {
          body: {},
        })

        if (error) {
          alert(`Error activating trial: ${error.message}`)
          return
        }

        if (!data.success) {
          alert(data.error || 'Failed to activate trial')
          return
        }

        // Success! Redirect to app
        alert(data.message || 'Trial activated successfully!')
        navigate('/chatai')
      } catch (err: any) {
        alert(`Error: ${err.message || 'Failed to activate trial'}`)
      }
    } else {
      // Open checkout modal
      const plan = plans.find(p => p.id === planId)
      if (plan) {
        setCheckoutPlan({
          planId: planId as 'monthly' | 'yearly',
          amount: plan.price,
          period: plan.period
        })
      }
    }
  }

  const savings = ((79 * 12) - 799).toFixed(0)

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Header */}
      <nav className="relative border-b border-emerald-500/10 backdrop-blur-xl bg-[#0a0e1a]/90">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
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
      <div className="relative max-w-7xl mx-auto px-8 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">Pricing</span>
          </motion.div>

          <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl mb-6 tracking-tight">
            <span className="block text-white">Choose Your</span>
            <span className="block bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
              AI Power Level
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Start with a free trial. Upgrade anytime to unlock continuous AI-powered productivity.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-4 p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
          >
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`relative px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`relative px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                billingPeriod === 'yearly'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Yearly</span>
              <span className="ml-2 text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full border border-amber-500/30">
                Save €{savings}
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {plans.map((plan, index) => {
              // Hide non-highlighted paid plans based on billing period
              if (!plan.isTrial && !plan.highlighted) return null

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative group ${plan.isTrial ? 'md:col-span-3' : ''}`}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 ${
                    plan.highlighted && !plan.isTrial
                      ? 'bg-gradient-to-br from-emerald-500/20 to-amber-500/20'
                      : 'bg-emerald-500/10'
                  } rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Card */}
                  <div className={`relative bg-white/5 backdrop-blur-xl border rounded-3xl p-8 h-full flex flex-col ${
                    plan.highlighted && !plan.isTrial
                      ? 'border-emerald-500/40 shadow-2xl shadow-emerald-500/20'
                      : 'border-white/10'
                  } ${plan.isTrial ? 'md:flex-row md:items-center md:justify-between' : ''}`}>

                    {/* Best Value Badge */}
                    {plan.highlighted && !plan.isTrial && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                          Best Value
                        </div>
                      </div>
                    )}

                    <div className={plan.isTrial ? 'md:flex-1' : ''}>
                      {/* Plan Name */}
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-gray-400 text-sm">{plan.description}</p>
                      </div>

                      {/* Price */}
                      <div className="mb-8">
                        {plan.isTrial ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                              Free
                            </span>
                            <span className="text-gray-400">for {plan.period}</span>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                              €{plan.price}
                            </span>
                            <span className="text-gray-400">/ {plan.period}</span>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <ul className={`space-y-4 ${plan.isTrial ? 'md:grid md:grid-cols-2 md:gap-4' : 'mb-8'}`}>
                        {plan.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(16, 185, 129, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                        plan.isTrial
                          ? 'md:w-auto md:px-12 md:ml-8 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/30'
                          : plan.highlighted
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/30'
                          : 'bg-white/10 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      {plan.cta}
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: '🔒', title: 'Secure Payments', desc: 'Powered by Stripe' },
              { icon: '💳', title: 'No Hidden Fees', desc: 'Cancel anytime' },
              { icon: '⚡', title: 'Instant Access', desc: 'Start using immediately' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400">
            Have questions?{' '}
            <a href="mailto:support@naurra.ai" className="text-emerald-400 hover:text-emerald-300 transition-colors underline">
              Contact our team
            </a>
          </p>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      {checkoutPlan && (
        <CheckoutModal
          isOpen={!!checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
          planId={checkoutPlan.planId}
          amount={checkoutPlan.amount}
          period={checkoutPlan.period}
        />
      )}
    </div>
  )
}
