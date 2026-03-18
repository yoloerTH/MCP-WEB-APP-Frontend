import { Helmet } from 'react-helmet-async'

interface StructuredDataProps {
  type: 'organization' | 'software' | 'faq' | 'breadcrumb' | 'article'
  data?: any
}

// Reusable FAQ data for landing page
export const landingPageFAQs = [
  {
    question: 'What is Naurra.ai?',
    answer: 'Naurra.ai is an AI-powered voice and chat assistant for Google Workspace. It lets you control Gmail, Calendar, Drive, Docs, Sheets, Meet, Tasks, and Contacts through natural voice commands or text chat. Instead of clicking through multiple apps, you simply tell Naurra what you need and it handles the rest.'
  },
  {
    question: 'How does Naurra.ai work with Google Workspace?',
    answer: 'Naurra.ai connects to your Google Workspace through secure OAuth authentication. Once connected, you can manage all 8 Google services using natural language. For example, say "Send an email to John about tomorrow\'s meeting" or "Schedule a call with Sarah next Tuesday at 2pm" and Naurra executes it instantly.'
  },
  {
    question: 'What Google services does Naurra.ai support?',
    answer: 'Naurra.ai integrates with 8 Google Workspace services: Gmail (read, send, search emails), Google Calendar (create, view, manage events), Google Drive (find, organize, share files), Google Docs (create and edit documents), Google Sheets (create and update spreadsheets), Google Meet (schedule video calls), Google Tasks (manage to-do lists), and Google Contacts (look up contact information).'
  },
  {
    question: 'Can Naurra.ai handle multi-step tasks across multiple Google services?',
    answer: 'Yes, multi-service orchestration is one of Naurra.ai\'s key strengths. You can say "Create a meeting agenda doc and email it to tomorrow\'s meeting attendees" and Naurra will check your Calendar, create a Doc, and send it via Gmail — all from one voice command. Over 35 pre-built AI workflows handle complex multi-step tasks automatically.'
  },
  {
    question: 'Is Naurra.ai available as a mobile app?',
    answer: 'Yes, Naurra.ai is available as a native iOS app on the Apple App Store. You can manage your entire Google Workspace by voice from your iPhone or iPad. A web app is also available at naurra.ai for desktop use.'
  },
  {
    question: 'How much does Naurra.ai cost?',
    answer: 'Naurra.ai offers a free 3-day trial with no credit card required. After the trial, plans start at $79/month or $799/year (save 16%). All plans include full access to voice and chat AI, all Google Workspace integrations, and 35+ AI-powered productivity tools.'
  },
  {
    question: 'Is my data secure with Naurra.ai?',
    answer: 'Yes, Naurra.ai uses end-to-end encryption, secure OAuth for Google authentication, and never stores your Google credentials. All data transmission is encrypted, and the platform is GDPR compliant. Your Google data is accessed only when you make a request and is never used for training.'
  },
  {
    question: 'How is Naurra.ai different from Google Assistant or Siri?',
    answer: 'Unlike Google Assistant or Siri, Naurra.ai is purpose-built for Google Workspace productivity. It can execute complex multi-step workflows across multiple Google services in a single command — something general-purpose assistants cannot do. For example, Naurra can create a document, populate it with data from a spreadsheet, and email it to your team, all from one voice command.'
  }
]

// Reusable FAQ data for pricing page
export const pricingPageFAQs = [
  {
    question: 'How does the free trial work?',
    answer: 'The 3-day free trial gives you full access to all Naurra.ai features including voice and chat AI, all Google Workspace integrations, and 35+ AI tools. No credit card is required to start. After 3 days, you can choose a monthly or yearly plan to continue.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your Naurra.ai subscription at any time. There are no long-term contracts or cancellation fees. If you cancel, you retain access until the end of your current billing period.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'On the web, we accept all major credit cards through Stripe. On iOS, payments are handled through Apple In-App Purchase using your Apple ID payment method.'
  },
  {
    question: 'Is there a difference between monthly and yearly plans?',
    answer: 'Both plans include identical features — full access to voice and chat AI, all 8 Google Workspace integrations, and 35+ AI-powered tools. The yearly plan at $799/year saves you 16% compared to paying $79/month ($948/year).'
  },
  {
    question: 'Do I need a Google Workspace account?',
    answer: 'You need a Google account to use Naurra.ai. It works with both free Gmail accounts and paid Google Workspace accounts. All Google services (Gmail, Calendar, Drive, Docs, Sheets, Meet, Tasks, Contacts) are supported.'
  },
  {
    question: 'What happens to my data if I cancel?',
    answer: 'Naurra.ai does not store your Google data. We access your Google services only when you make a request through secure OAuth tokens. When you cancel, your OAuth connection is revoked and no data is retained.'
  }
]

export function StructuredData({ type, data }: StructuredDataProps) {
  const schemas: Record<string, any> = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Naurra.ai',
      url: 'https://naurra.ai',
      logo: 'https://naurra.ai/logo-transparent.png',
      description: 'AI-powered workspace assistant for Google Workspace. Control Gmail, Calendar, Drive, Docs, and more through natural voice commands or chat.',
      foundingDate: '2025',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        email: 'support@naurra.ai',
        url: 'https://naurra.ai/contact'
      },
      sameAs: [
        'https://www.linkedin.com/company/109405415',
        'https://www.instagram.com/naurra.ai/',
        'https://www.facebook.com/profile.php?id=61588566855794',
        'https://x.com/Naurra_ai',
        'https://www.youtube.com/@naurra_ai',
        'https://www.reddit.com/user/naurra_ai/'
      ]
    },
    software: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Naurra.ai',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'iOS, Web Browser',
      offers: [
        {
          '@type': 'Offer',
          name: 'Monthly Plan',
          price: '79.00',
          priceCurrency: 'USD',
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          url: 'https://naurra.ai/pricing'
        },
        {
          '@type': 'Offer',
          name: 'Yearly Plan',
          price: '799.00',
          priceCurrency: 'USD',
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          url: 'https://naurra.ai/pricing'
        }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
        bestRating: '5',
        worstRating: '1'
      },
      description: 'Naurra.ai is the voice-first AI assistant for Google Workspace. Control Gmail, Calendar, Drive, Docs, Sheets, Meet, Tasks, and Contacts with natural voice commands or chat. 35+ pre-built AI workflows for multi-service orchestration.',
      featureList: 'Voice-controlled email management, AI-powered calendar scheduling, Automated document creation, Smart file organization, Natural language commands, Multi-service orchestration, 35+ integrated AI tools, iOS native app',
      screenshot: 'https://naurra.ai/logo-transparent.png',
      softwareVersion: '1.0',
      downloadUrl: 'https://apps.apple.com/app/naurra-ai/id6759445443',
      installUrl: 'https://apps.apple.com/app/naurra-ai/id6759445443',
      author: {
        '@type': 'Organization',
        name: 'Naurra.ai',
        url: 'https://naurra.ai'
      }
    },
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (data?.faqs || landingPageFAQs).map((faq: { question: string; answer: string }) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: (data?.items || []).map((item: { name: string; url: string }, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    },
    article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data?.title || '',
      description: data?.description || '',
      image: data?.image || 'https://naurra.ai/logo-transparent.png',
      author: {
        '@type': 'Organization',
        name: 'Naurra AI Team',
        url: 'https://naurra.ai'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Naurra.ai',
        logo: {
          '@type': 'ImageObject',
          url: 'https://naurra.ai/logo-transparent.png'
        }
      },
      datePublished: data?.publishedAt || '',
      dateModified: data?.updatedAt || data?.publishedAt || '',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': data?.url || ''
      }
    }
  }

  // Allow custom data override for faq/breadcrumb/article, use built-in for others
  let schemaData
  if (type === 'faq' || type === 'breadcrumb' || type === 'article') {
    schemaData = schemas[type]
  } else {
    schemaData = data || schemas[type]
  }

  if (!schemaData) return null

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  )
}
