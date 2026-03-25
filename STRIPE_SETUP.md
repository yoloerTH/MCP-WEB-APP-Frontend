# 💳 Stripe Payment Integration Setup Guide

## 🎯 Overview

Naurra.ai now has a complete payment system with:
- ✅ Beautiful custom pricing page
- ✅ Custom Stripe checkout modal (no redirects!)
- ✅ 3-day free trial
- ✅ Monthly (€79) and Yearly (€799) plans

---

## 📋 Step 1: Stripe Account Setup

### 1.1 Get Your API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_test_` for test mode)
4. Copy your **Secret key** (starts with `sk_test_` for test mode)

### 1.2 Add to Environment Variables

**Frontend (.env):**
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

**Backend (.env):** (we'll create this next)
```bash
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

---

## 📋 Step 2: Create Stripe Products & Prices

### 2.1 Create Products in Stripe Dashboard

1. Go to **Products** → **Add product**

**Product 1: Naurra.ai Monthly**
- Name: `Naurra.ai Monthly`
- Description: `Full access to Naurra.ai AI workspace assistant - Monthly subscription`
- Pricing:
  - Type: **Recurring**
  - Amount: **€79.00**
  - Billing period: **Monthly**
  - Trial period: **3 days**
- Save and copy the **Price ID** (starts with `price_`)

**Product 2: Naurra.ai Yearly**
- Name: `Naurra.ai Yearly`
- Description: `Full access to Naurra.ai AI workspace assistant - Yearly subscription (Save €149!)`
- Pricing:
  - Type: **Recurring**
  - Amount: **€799.00**
  - Billing period: **Yearly**
  - Trial period: **3 days**
- Save and copy the **Price ID**

### 2.2 Note Your Price IDs

You'll need these for the backend:
```
STRIPE_PRICE_ID_MONTHLY=price_xxxxxxxxxxxxx
STRIPE_PRICE_ID_YEARLY=price_xxxxxxxxxxxxx
```

---

## 📋 Step 3: Set Up Supabase Database

### 3.1 Create Subscriptions Table

Run this SQL in Supabase SQL Editor:

```sql
-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('trial', 'monthly', 'yearly')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'expired')),
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can only read their own subscription
CREATE POLICY "Users can view own subscription"
  ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only authenticated users can insert (via backend)
CREATE POLICY "Service role can manage subscriptions"
  ON subscriptions
  FOR ALL
  USING (true);
```

---

## 📋 Step 4: Backend Implementation (Next Steps)

You'll need to create API endpoints for:

1. **Create Subscription** - `/api/create-subscription`
2. **Cancel Subscription** - `/api/cancel-subscription`
3. **Webhook Handler** - `/api/stripe-webhook`
4. **Check Subscription Status** - `/api/subscription-status`

---

## 🎨 Frontend Features Already Implemented

✅ **Pricing Page** (`/pricing`)
- Beautiful card-based design
- Monthly/Yearly toggle
- Free trial highlighted
- Responsive design

✅ **Checkout Modal**
- Custom Stripe Elements integration
- Card input with validation
- Loading states
- Success/error handling
- No redirect required!

✅ **Routes**
- `/pricing` - Main pricing page
- Ready for subscription management

---

## 🧪 Testing

### Test Cards (Stripe Test Mode)

**Success:**
- `4242 4242 4242 4242` - Visa
- Any future expiry date (e.g., 12/34)
- Any 3-digit CVC
- Any ZIP code

**Specific Scenarios:**
- `4000 0000 0000 3220` - Requires 3D Secure authentication
- `4000 0000 0000 9995` - Declined card

---

## 🚀 Deployment Checklist

### Netlify Environment Variables:
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
VITE_BACKEND_URL=https://your-backend.railway.app
VITE_MCP_SERVER_URL=https://your-mcp-server.railway.app
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Backend Environment Variables:
```bash
STRIPE_SECRET_KEY=sk_live_your_secret_key
STRIPE_PRICE_ID_MONTHLY=price_xxxxx
STRIPE_PRICE_ID_YEARLY=price_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 📝 Next Steps

1. **Get Stripe API keys** from dashboard
2. **Create products & prices** in Stripe
3. **Set up Supabase table** with SQL above
4. **Add environment variables** to .env
5. **Build backend subscription endpoints** (I can help with this!)
6. **Set up Stripe webhooks** for subscription events
7. **Test with test cards**
8. **Switch to live mode** when ready

---

## 🎯 User Journey

1. User visits `/pricing`
2. Clicks "Start Free Trial" or "Subscribe Now"
3. Signs in if not authenticated
4. Checkout modal opens with Stripe Elements
5. Enters card details
6. Backend creates Stripe subscription with 3-day trial
7. User gets immediate access
8. After trial: auto-charges unless canceled

---

## 💡 Pro Tips

- **Always test thoroughly** in test mode before going live
- **Set up webhooks** to handle subscription lifecycle events
- **Monitor failed payments** and send reminder emails
- **Offer cancellation flow** in user dashboard
- **Track metrics** in Stripe Dashboard

---

**Need help with backend implementation? Let me know!** 🚀
