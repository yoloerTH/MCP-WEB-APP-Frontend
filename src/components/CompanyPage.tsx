import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SEO } from './SEO'
import { StructuredData } from './StructuredData'

/* ═══════════════════════════════════════════════════════════════════
   CASE STUDIES — framed as Problem → Solution → Impact
   ═══════════════════════════════════════════════════════════════════ */
const caseStudies = [
  {
    id: 0,
    industry: 'Automotive',
    title: 'Automotive Sourcing Engine',
    problem: 'A car reseller was manually browsing dozens of listing sites daily, trying to spot undervalued vehicles before competitors. Slow, exhausting, and easy to miss profitable deals.',
    solution: 'We built an automated pipeline that scrapes thousands of listings, runs AI-powered filtering to identify undervalued inventory, cross-references wholesale pricing, and calculates instant profit margins.',
    impact: '$15K profit every two weeks',
    impactDetail: 'The system surfaces deals the client would have never found manually — filtering noise from signal across the entire market in real time.',
    tags: ['Web Scraping', 'AI Filtering', 'Profit Analytics'],
    accentFrom: 'from-cyan-400',
    accentTo: 'to-blue-400',
    testimonial: {
      quote: 'Thanos helped me set up automation for my automotive business and it completely changed the game for me. Since implementing it we\'ve been averaging around $15K profit every two weeks. Because of that, I was able to buy my dad his dream truck. If anyone is looking to automate parts of their business, he really knows what he\'s doing.',
      image: '/testimonial-automotive.jpg',
    },
  },
  {
    id: 1,
    industry: 'HVAC & MEP',
    title: 'MEP Quotation Intelligence',
    problem: 'HVAC contractors were spending hours manually matching equipment specs to project requirements, then building quotes line by line. Every quotation was a bottleneck.',
    solution: 'We built an AI engine that reads project specifications, automatically matches the right equipment from supplier catalogs, and generates complete quotations — priced, formatted, and ready to send.',
    impact: '95% faster processing',
    impactDetail: 'What used to take a full workday now takes minutes. The system handles equipment matching, pricing calculations, and document formatting autonomously.',
    tags: ['GPT-4', 'Document Processing', 'SaaS Platform'],
    accentFrom: 'from-emerald-400',
    accentTo: 'to-teal-400',
  },
  {
    id: 2,
    industry: 'CRM & Sales',
    title: 'AI Communication Suite',
    problem: 'A sales team was losing leads because customers would message on WhatsApp, follow up via email, and get treated as new conversations each time. No unified memory, no context.',
    solution: 'We deployed a single AI brain across WhatsApp, Telegram, email, and web chat — all connected to Salesforce. The AI remembers every interaction regardless of channel and responds with full context.',
    impact: '4 channels, 1 AI brain',
    impactDetail: 'Customer switches from WhatsApp to email? The AI knows exactly where the conversation left off. Every interaction is logged in Salesforce automatically.',
    tags: ['Salesforce CRM', 'Multi-Channel', 'Autonomous Agents'],
    accentFrom: 'from-amber-400',
    accentTo: 'to-orange-400',
  },
  {
    id: 3,
    industry: 'Legal & Finance',
    title: 'Lease AI Analyser',
    problem: 'A legal team was spending 2-3 days per commercial lease agreement — reading 50+ page documents, extracting key terms, calculating NPV, and flagging risk clauses manually.',
    solution: 'We built a document intelligence engine that ingests lease agreements, extracts every critical clause, calculates net present value, identifies risk flags, and outputs a structured summary.',
    impact: 'Days reduced to under 60 seconds',
    impactDetail: 'The same analysis that took a legal team days is now done before they finish their coffee. Every clause extracted, every risk flagged, every number calculated.',
    tags: ['NLP', 'Document Intelligence', 'Financial Modeling'],
    accentFrom: 'from-violet-400',
    accentTo: 'to-purple-400',
  },
  {
    id: 4,
    industry: 'Fashion',
    title: 'AI Virtual Fitting Room',
    problem: 'A bespoke tailor had no way to show clients what a custom suit would look like before production. Clients were committing thousands on fabric choices they could only imagine.',
    solution: 'We created a platform where clients upload a photo and see themselves wearing any suit configuration — different fabrics, cuts, and accessories — powered by Google Imagen AI generation.',
    impact: 'Infinite try-ons, zero inventory',
    impactDetail: 'Clients now explore hundreds of combinations visually before committing. Conversion rates increased because confidence replaced uncertainty.',
    tags: ['Google Imagen', 'Computer Vision', 'Generative AI'],
    accentFrom: 'from-rose-400',
    accentTo: 'to-pink-400',
  },
  {
    id: 5,
    industry: 'Travel',
    title: 'AI Travel Concierge',
    problem: 'A travel agency spent hours per client building custom itineraries — researching destinations, checking logistics, formatting PDFs. High-touch work that didn\'t scale.',
    solution: 'We built intelligent agents on Telegram and WhatsApp that converse with travelers, understand their style and budget, and generate beautifully formatted PDF itineraries — complete with timings, costs, and recommendations.',
    impact: '10x faster itinerary creation',
    impactDetail: 'Clients chat naturally about their dream trip. The AI handles research, logistics, and formatting. What took hours now takes a single conversation.',
    tags: ['Telegram Bots', 'PDF Generation', 'Conversational AI'],
    accentFrom: 'from-sky-400',
    accentTo: 'to-indigo-400',
  },
  {
    id: 6,
    industry: 'E-Commerce',
    title: 'Full-Stack E-Commerce Platform',
    problem: 'A wellness brand was doing everything manually — customer support, email marketing, social posting, order receipts, SEO updates. The founder was the bottleneck for their own growth.',
    solution: 'We built an end-to-end platform: AI web assistant handles customer questions, email agent manages campaigns, social AI posts across LinkedIn, Twitter, Facebook, and Pinterest. Receipts, SEO, everything automated.',
    impact: '100% automated operations',
    impactDetail: 'The founder went from working IN the business to working ON it. Marketing, support, and operations run 24/7 without human intervention.',
    tags: ['Full-Stack', 'Social Media AI', 'Marketing Automation'],
    accentFrom: 'from-amber-400',
    accentTo: 'to-yellow-400',
  },
]

const services = [
  {
    title: 'Custom AI Agents',
    description: 'Autonomous agents that handle support, sales, and operations across any channel.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: 'Workflow Automation',
    description: 'Transform manual processes into intelligent pipelines that run themselves.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
      </svg>
    ),
  },
  {
    title: 'LLM Integration',
    description: 'Embed frontier AI models into your systems for intelligent document processing and decision support.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
  },
  {
    title: 'Multi-Channel Bots',
    description: 'Deploy intelligent bots on WhatsApp, Telegram, Slack, email, and web simultaneously.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: 'Document Intelligence',
    description: 'AI that reads, analyzes, and extracts insights from any business document in seconds.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Full-Stack Platforms',
    description: 'Web apps, mobile apps, SaaS — designed, built, and deployed end-to-end.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
]

const processSteps = [
  { step: '01', title: 'Discovery', description: 'Deep-dive into your workflows, pain points, and goals. No generic pitches.' },
  { step: '02', title: 'Architecture', description: 'Design the system, pick the right models, map integrations with your tools.' },
  { step: '03', title: 'Build & Iterate', description: 'Rapid development with weekly demos. You see progress from day one.' },
  { step: '04', title: 'Deploy', description: 'Battle-tested deployment to your infrastructure. We handle the complexity.' },
  { step: '05', title: 'Scale & Support', description: 'Ongoing optimization and monitoring as your needs evolve.' },
]

const companyFAQs = [
  { question: 'What types of businesses do you work with?', answer: 'We work with businesses of all sizes across multiple industries — from startups to established enterprises. Our clients span HVAC, legal, automotive, travel, fashion, e-commerce, wellness, and more. If your business has manual processes that could benefit from AI automation, we can help.' },
  { question: 'How long does a typical project take?', answer: 'Most projects are delivered within 4-8 weeks, depending on complexity. We start with a discovery phase (1 week), followed by architecture design, rapid development with weekly demos, and deployment. You see working progress from week one — not after months of waiting.' },
  { question: 'What does a custom AI solution cost?', answer: 'Every project is scoped individually based on your needs. We offer fixed-price engagements so you know exactly what you\'re paying upfront. Contact us for a free consultation and we\'ll provide a detailed proposal within 48 hours.' },
  { question: 'Do you offer ongoing support after deployment?', answer: 'Yes. We offer ongoing support and optimization packages. AI systems improve over time with fine-tuning and monitoring, and we partner with you long-term to ensure your solution keeps delivering results as your business evolves.' },
  { question: 'Can you integrate AI with our existing tools and systems?', answer: 'Absolutely. We specialize in integrating AI into existing workflows — whether that\'s Salesforce, Google Workspace, Slack, WhatsApp, custom CRMs, or legacy systems. Our solutions work alongside what you already use, not replace it.' },
  { question: 'What makes Naurra different from other AI agencies?', answer: 'We\'re not a generic agency — we\'re engineers who build and ship. Our founder has personally delivered every project in our portfolio. You work directly with the people who write the code, not account managers who relay messages. That means faster delivery, better communication, and solutions that actually work.' },
]

/* ═══════════════════════════════════════════════════════════════════ */

export default function CompanyPage() {
  const navigate = useNavigate()
  const [activeProject, setActiveProject] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const project = caseStudies[activeProject]

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
      <SEO
        title="Custom AI Solutions for Business | Naurra.ai"
        description="We build custom AI agents, workflow automation, and intelligent systems for businesses. Proven results across HVAC, legal, automotive, travel, fashion, and e-commerce. Get a free consultation."
        keywords="AI agents for business, custom AI solutions, AI automation company, AI workflow automation, business AI integration, custom AI development, AI consulting, enterprise AI solutions, AI chatbot for business"
        url="/company"
        type="website"
      />
      <StructuredData
        type="breadcrumb"
        data={{
          items: [
            { name: 'Home', url: 'https://naurra.ai/' },
            { name: 'Company', url: 'https://naurra.ai/company' },
          ],
        }}
      />

      {/* ── AMBIENT BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px]"
        />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.012]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="relative border-b border-emerald-500/10 backdrop-blur-xl bg-[#0a0e1a]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
          <motion.a href="/" className="flex items-center gap-3 cursor-pointer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <img src="/logo-transparent.png" alt="Naurra.ai Logo" className="w-9 h-9" />
            <span className="text-xl font-display font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Naurra.ai</span>
          </motion.a>
          <div className="hidden md:flex items-center gap-8">
            {[{ label: 'Product', href: '/' }, { label: 'Pricing', href: '/pricing' }, { label: 'Blog', href: '/blog' }, { label: 'Contact', href: '/contact' }].map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">{link.label}</a>
            ))}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/contact')} className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all">
              Get a Free Consultation
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO — Lead with what AI actually does, not buzzwords       */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 lg:pt-28 pb-20 lg:pb-28">
        {/* Faint grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-emerald-500 to-transparent" />
              <span className="text-emerald-400 text-xs uppercase tracking-[0.25em] font-semibold">Naurra AI Solutions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold leading-[1.05] tracking-tight mb-8"
            >
              Your business runs on
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                manual processes.
              </span>
              <br />
              We fix that.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg lg:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12"
            >
              We build AI systems that replace the repetitive, time-consuming work your team does every day — custom-engineered for your specific workflows, not generic templates.
            </motion.p>

            {/* Proof ticker — scrolling examples of what we automate */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12 overflow-hidden"
            >
              <div className="flex gap-4 flex-wrap">
                {[
                  'Quotes generated in seconds, not hours',
                  'Customer support across 4 channels with one AI',
                  'Legal documents analyzed in under 60 seconds',
                  'Profit opportunities found before competitors',
                  'Marketing that runs itself 24/7',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300 whitespace-nowrap">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(16, 185, 129, 0.35)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all text-lg"
              >
                Get a Free Consultation
              </motion.button>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 text-white font-semibold rounded-xl transition-all text-lg cursor-pointer"
              >
                See Our Work
              </motion.a>
            </motion.div>
          </div>

          {/* Side stats — absolute positioned on large screens */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="hidden xl:flex flex-col gap-6 absolute right-8 top-1/2 -translate-y-1/2"
          >
            {[
              { value: '7+', label: 'Industries' },
              { value: '15+', label: 'Projects' },
              { value: '95%', label: 'Faster' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-right">
                <div className="text-3xl font-display font-black bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PROJECTS — Interactive case study showcase                  */}
      {/* Click a project → full narrative expands                   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="projects" className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-[40px] bg-gradient-to-r from-emerald-500 to-transparent" />
              <span className="text-xs text-emerald-400/60 uppercase tracking-[0.25em] font-semibold">Case Studies</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-extrabold mb-4">
              Problems we've{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                solved.
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Every project started with a real business bottleneck. Here's what happened when we applied AI to it.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left — Project selector */}
            <div className="lg:w-[340px] flex-shrink-0">
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
                {caseStudies.map((cs, i) => (
                  <motion.button
                    key={cs.id}
                    onClick={() => setActiveProject(i)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`relative flex-shrink-0 text-left w-[280px] lg:w-full p-4 rounded-xl border transition-all duration-300 ${
                      activeProject === i
                        ? 'bg-white/[0.06] border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                        : 'bg-transparent border-white/[0.04] hover:bg-white/[0.03] hover:border-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold transition-colors ${
                        activeProject === i ? 'text-emerald-400' : 'text-gray-600'
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold truncate transition-colors ${
                          activeProject === i ? 'text-white' : 'text-gray-400'
                        }`}>
                          {cs.title}
                        </div>
                        <div className="text-xs text-gray-600 mt-0.5">{cs.industry}</div>
                      </div>
                      {activeProject === i && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right — Expanded case study */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden"
                >
                  {/* Top accent bar */}
                  <div className={`h-1 bg-gradient-to-r ${project.accentFrom} ${project.accentTo}`} />

                  <div className="p-8 lg:p-10">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                      <span className="px-3 py-1.5 bg-white/[0.06] border border-white/[0.08] rounded-lg text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        {project.industry}
                      </span>
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-emerald-500/[0.06] border border-emerald-500/10 rounded-md text-xs text-emerald-400/70 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-display font-extrabold text-white mb-8">
                      {project.title}
                    </h3>

                    {/* Problem → Solution → Impact narrative */}
                    <div className="space-y-8">
                      {/* The Problem */}
                      <div className="relative pl-6 border-l-2 border-white/[0.06]">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0a0e1a] border-2 border-gray-600" />
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">The Problem</p>
                        <p className="text-gray-300 leading-relaxed">{project.problem}</p>
                      </div>

                      {/* What We Built */}
                      <div className="relative pl-6 border-l-2 border-emerald-500/20">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0a0e1a] border-2 border-emerald-500/50" />
                        <p className="text-xs text-emerald-400/70 uppercase tracking-wider font-semibold mb-2">What We Built</p>
                        <p className="text-gray-300 leading-relaxed">{project.solution}</p>
                      </div>

                      {/* The Result */}
                      <div className="relative pl-6 border-l-2 border-emerald-500/40">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500/20 border-2 border-emerald-400" />
                        <p className="text-xs text-emerald-400 uppercase tracking-wider font-semibold mb-3">The Result</p>
                        <div className={`text-3xl lg:text-4xl font-display font-black bg-gradient-to-r ${project.accentFrom} ${project.accentTo} bg-clip-text text-transparent mb-2`}>
                          {project.impact}
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">{project.impactDetail}</p>
                      </div>

                      {/* Testimonial — if this project has one */}
                      {(project as any).testimonial && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="mt-8 relative bg-white/[0.03] border border-emerald-500/10 rounded-2xl overflow-hidden"
                        >
                          <div className="flex flex-col sm:flex-row">
                            {/* Testimonial screenshot */}
                            <div className="sm:w-48 flex-shrink-0">
                              <img
                                src={(project as any).testimonial.image}
                                alt="Client testimonial for automotive sourcing project"
                                className="w-full h-48 sm:h-full object-cover"
                              />
                            </div>
                            {/* Quote */}
                            <div className="p-6 flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4 text-emerald-400/60" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <span className="text-xs text-emerald-400/60 uppercase tracking-wider font-semibold">Client Testimonial</span>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed italic">
                                "{(project as any).testimonial.quote}"
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SERVICES                                                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-[40px] bg-gradient-to-r from-amber-500 to-transparent" />
              <span className="text-xs text-amber-400/60 uppercase tracking-[0.25em] font-semibold">Services</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-extrabold mb-4">
              What we{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">build.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-7 hover:border-emerald-500/20 transition-all group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/15 rounded-xl text-emerald-400 mb-5 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PROCESS                                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-[40px] bg-gradient-to-r from-cyan-500 to-transparent" />
              <span className="text-xs text-cyan-400/60 uppercase tracking-[0.25em] font-semibold">Process</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-extrabold">
              How we{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">work.</span>
            </h2>
          </motion.div>

          {/* Desktop horizontal */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-amber-500/30" />
              <div className="grid grid-cols-5 gap-6">
                {processSteps.map((step, i) => (
                  <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="relative pt-14">
                    <div className="absolute top-[34px] left-1/2 -translate-x-1/2">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full ring-4 ring-[#0a0e1a]" />
                    </div>
                    <div className="text-center">
                      <span className="inline-block text-xs text-emerald-400/50 font-mono font-bold mb-3">{step.step}</span>
                      <h3 className="text-lg font-display font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden space-y-6">
            {processSteps.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/15 rounded-xl">
                  <span className="text-lg font-display font-extrabold bg-gradient-to-br from-emerald-400 to-teal-400 bg-clip-text text-transparent">{step.step}</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-display font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* TECH STACK — Grouped with colored accents                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.015] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-[40px] bg-gradient-to-r from-violet-500 to-transparent" />
              <span className="text-xs text-violet-400/60 uppercase tracking-[0.25em] font-semibold">Technology</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-extrabold mb-4">
              Built with{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">the right tools.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl">
              We don't chase trends. We pick battle-tested technologies that ship fast and scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
            {[
              { title: 'AI & Intelligence', color: 'text-emerald-400', border: 'border-emerald-500/15', bg: 'bg-emerald-500/[0.06]', items: ['GPT-4o', 'Claude', 'Gemini', 'Voice AI', 'Autonomous Agents', 'MCP Protocol', 'RAG Pipelines', 'NLP / NLU'] },
              { title: 'Frontend & Mobile', color: 'text-amber-400', border: 'border-amber-500/15', bg: 'bg-amber-500/[0.06]', items: ['React', 'React Native', 'Next.js', 'Astro', 'TypeScript', 'Swift', 'Tailwind CSS'] },
              { title: 'Backend & APIs', color: 'text-cyan-400', border: 'border-cyan-500/15', bg: 'bg-cyan-500/[0.06]', items: ['Node.js', 'Python', 'Deno', 'GraphQL', 'WebSockets', 'Serverless'] },
              { title: 'Infrastructure', color: 'text-violet-400', border: 'border-violet-500/15', bg: 'bg-violet-500/[0.06]', items: ['AWS', 'Google Cloud', 'Azure', 'Supabase', 'PostgreSQL', 'Redis', 'Docker'] },
            ].map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-7">
                <h3 className={`text-sm font-bold ${cat.color} uppercase tracking-wider mb-5`}>{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className={`px-3 py-1.5 ${cat.bg} border ${cat.border} rounded-lg text-xs text-gray-300 font-medium`}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FOUNDER — Editorial with real photo                        */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-[40px] bg-gradient-to-r from-emerald-500 to-transparent" />
              <span className="text-xs text-emerald-400/60 uppercase tracking-[0.25em] font-semibold">Leadership</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-extrabold">
              Meet the{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">founder.</span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="relative max-w-5xl">
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-3xl overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />

              <div className="relative flex flex-col lg:flex-row items-stretch">
                {/* Photo */}
                <div className="relative w-full lg:w-5/12 flex-shrink-0">
                  <div className="relative h-80 lg:h-full min-h-[420px] overflow-hidden">
                    <img src="/ceo-thanos.jpg" alt="Thanos Panagiotakopoulos - CEO & AI Engineer at Naurra.ai" className="absolute inset-0 w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0a0e1a]/80" />
                    <div className="absolute bottom-6 left-6 lg:hidden">
                      <h3 className="text-2xl font-display font-extrabold text-white">Thanos Panagiotakopoulos</h3>
                      <p className="text-emerald-400 font-medium">Founder & CEO</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative w-full lg:w-7/12 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="hidden lg:block mb-6">
                    <h3 className="text-3xl font-display font-extrabold text-white mb-1">Thanos Panagiotakopoulos</h3>
                    <p className="text-emerald-400 font-semibold text-lg">Founder & CEO — AI Engineer</p>
                  </div>
                  <div className="space-y-4 text-gray-400 leading-relaxed">
                    <p>I don't manage projects from a distance — I build every solution personally. From architecting the AI system to writing the production code, I'm hands-on at every stage.</p>
                    <p>With projects shipped across HVAC, legal, automotive, travel, fashion, and e-commerce, I've seen firsthand how AI transforms operations when it's built right — not as a gimmick, but as infrastructure that delivers measurable ROI from day one.</p>
                    <p>When you work with Naurra, you work directly with the engineer who writes the code. No middlemen, no account managers relaying messages.</p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-8">
                    {['AI Engineering', 'Full-Stack', 'iOS & Mobile', 'System Architecture', 'Product Strategy'].map((skill) => (
                      <span key={skill} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-gray-400 font-medium">{skill}</span>
                    ))}
                  </div>

                  <a
                    href="https://www.linkedin.com/in/athanasios-ioannis-panagiotakopoulos-2362a9274/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 mt-6 px-4 py-2.5 bg-[#0A66C2]/10 border border-[#0A66C2]/20 rounded-xl hover:bg-[#0A66C2]/20 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="text-sm font-medium text-[#0A66C2] group-hover:text-[#0A66C2]/80 transition-colors">Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FAQ                                                         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-[40px] bg-gradient-to-r from-amber-500 to-transparent" />
              <span className="text-xs text-amber-400/60 uppercase tracking-[0.25em] font-semibold">FAQ</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-extrabold">
              Common{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">questions.</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl space-y-3">
            {companyFAQs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`bg-white/[0.03] backdrop-blur-xl border rounded-2xl overflow-hidden transition-colors ${openFaq === i ? 'border-emerald-500/20' : 'border-white/[0.06] hover:border-white/[0.1]'}`}
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <h3 className="text-base lg:text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${openFaq === i ? 'bg-emerald-500/15' : 'bg-white/5'}`}
                  >
                    <svg className={`w-4 h-4 transition-colors ${openFaq === i ? 'text-emerald-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
                      <div className="px-6 pb-6"><p className="text-gray-400 leading-relaxed">{faq.answer}</p></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CTA                                                         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="relative text-center max-w-3xl mx-auto">
            <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-emerald-500/10 via-transparent to-amber-500/10 rounded-3xl blur-3xl" />
            <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 lg:p-16">
              <h2 className="text-3xl lg:text-5xl font-display font-extrabold mb-5">
                Ready to{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">automate</span>?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Tell us about your business challenge. We'll respond within 24 hours with an honest assessment of how AI can help.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 25px 70px rgba(16, 185, 129, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contact')}
                className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-lg font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all"
              >
                Let's Discuss Your Project
              </motion.button>
              <p className="text-gray-600 text-sm mt-5">Free consultation — No commitment required</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-12" />
    </div>
  )
}
