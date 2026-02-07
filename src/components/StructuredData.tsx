import { Helmet } from 'react-helmet-async'

interface StructuredDataProps {
  type: 'organization' | 'software' | 'faq' | 'breadcrumb'
  data?: any
}

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
        'https://twitter.com/naurra_ai',
        'https://www.linkedin.com/company/109405415'
      ]
    },
    software: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Naurra.ai',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '79.00',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://naurra.ai/pricing'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
        bestRating: '5',
        worstRating: '1'
      },
      description: 'Transform your Google Workspace with AI-powered voice and chat assistant. Control Gmail, Calendar, Drive, Docs, Sheets, and more with natural language commands.',
      features: [
        'Voice-controlled email management',
        'AI-powered calendar scheduling',
        'Automated document creation',
        'Smart file organization',
        'Natural language commands',
        '35+ integrated AI tools'
      ],
      screenshot: 'https://naurra.ai/logo-transparent.png',
      softwareVersion: '1.0',
      author: {
        '@type': 'Organization',
        name: 'Naurra.ai'
      }
    }
  }

  // Allow custom data override
  const schemaData = data || schemas[type]

  if (!schemaData) return null

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  )
}
