import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

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

/* Service icon SVGs -- themed to each capability */
/* Service icon SVGs -- themed to each capability */
const serviceIcons: Record<string, (color: string) => JSX.Element> = {
  'Custom AI Agents': (c) => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      {/* Robot head */}
      <rect x="34" y="32" width="52" height="44" rx="10" stroke={c} strokeWidth="1.5" opacity="0.7" />
      {/* Antenna */}
      <line x1="60" y1="32" x2="60" y2="18" stroke={c} strokeWidth="1.5" opacity="0.5" />
      <circle cx="60" cy="15" r="4" stroke={c} strokeWidth="1.5" opacity="0.6" />
      <circle cx="60" cy="15" r="1.5" fill={c} opacity="0.8" />
      {/* Eyes */}
      <circle cx="46" cy="50" r="6" stroke={c} strokeWidth="1.5" opacity="0.6" />
      <circle cx="46" cy="50" r="2.5" fill={c} opacity="0.8" />
      <circle cx="74" cy="50" r="6" stroke={c} strokeWidth="1.5" opacity="0.6" />
      <circle cx="74" cy="50" r="2.5" fill={c} opacity="0.8" />
      {/* Mouth - neutral straight */}
      <line x1="50" y1="65" x2="70" y2="65" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Ear connectors */}
      <rect x="26" y="44" width="8" height="16" rx="3" stroke={c} strokeWidth="1.2" opacity="0.4" />
      <rect x="86" y="44" width="8" height="16" rx="3" stroke={c} strokeWidth="1.2" opacity="0.4" />
      {/* Signal waves from antenna */}
      <path d="M48 10a16 16 0 0124 0" stroke={c} strokeWidth="1" opacity="0.25" fill="none" />
      <path d="M43 5a22 22 0 0134 0" stroke={c} strokeWidth="1" opacity="0.15" fill="none" />
      {/* Body hint */}
      <path d="M42 76v10a6 6 0 006 6h24a6 6 0 006-6V76" stroke={c} strokeWidth="1.5" opacity="0.35" />
      {/* Sparkle accents */}
      <path d="M95 28l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill={c} opacity="0.4" />
      <path d="M18 62l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill={c} opacity="0.25" />
    </svg>
  ),
  'Workflow Automation': (c) => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      {/* Step nodes */}
      <rect x="10" y="25" width="26" height="22" rx="5" stroke={c} strokeWidth="1.5" opacity="0.7" />
      <rect x="47" y="25" width="26" height="22" rx="5" stroke={c} strokeWidth="1.5" opacity="0.7" />
      <rect x="84" y="25" width="26" height="22" rx="5" stroke={c} strokeWidth="1.5" opacity="0.7" />
      {/* Second row */}
      <rect x="28" y="68" width="26" height="22" rx="5" stroke={c} strokeWidth="1.5" opacity="0.6" />
      <rect x="66" y="68" width="26" height="22" rx="5" stroke={c} strokeWidth="1.5" opacity="0.6" />
      {/* Arrow connectors row 1 */}
      <path d="M36 36h11" stroke={c} strokeWidth="1.5" opacity="0.5" />
      <path d="M44 33l3 3-3 3" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M73 36h11" stroke={c} strokeWidth="1.5" opacity="0.5" />
      <path d="M81 33l3 3-3 3" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      {/* Arrow connectors going down */}
      <path d="M23 47v9a5 5 0 005 5h8" stroke={c} strokeWidth="1.5" opacity="0.4" fill="none" />
      <path d="M33 58l3 3-3 3" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <path d="M97 47v9a5 5 0 01-5 5h-8" stroke={c} strokeWidth="1.5" opacity="0.4" fill="none" />
      <path d="M87 58l-3 3 3 3" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      {/* Arrow between row 2 */}
      <path d="M54 79h12" stroke={c} strokeWidth="1.5" opacity="0.5" />
      <path d="M63 76l3 3-3 3" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      {/* Gear inside first box */}
      <circle cx="23" cy="36" r="6" stroke={c} strokeWidth="1" opacity="0.5" />
      <circle cx="23" cy="36" r="2" fill={c} opacity="0.5" />
      {/* Lightning in middle box */}
      <path d="M62 30l-4 7h5l-4 7" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Check in last box */}
      <path d="M92 34l4 4 8-8" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Loop arrow at bottom */}
      <path d="M79 96a25 25 0 01-38 0" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.25" strokeDasharray="3 3" />
      <path d="M44 93l-3 3 3 3" stroke={c} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
    </svg>
  ),
  'LLM Integration': (c) => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      {/* Chip body */}
      <rect x="35" y="35" width="50" height="50" rx="6" stroke={c} strokeWidth="1.5" opacity="0.7" />
      {/* Inner circuit ring */}
      <rect x="46" y="46" width="28" height="28" rx="4" stroke={c} strokeWidth="1" opacity="0.35" />
      {/* Center brain pattern instead of text */}
      <circle cx="60" cy="56" r="3" fill={c} opacity="0.7" />
      <circle cx="52" cy="62" r="2" fill={c} opacity="0.5" />
      <circle cx="68" cy="62" r="2" fill={c} opacity="0.5" />
      <circle cx="60" cy="68" r="2" fill={c} opacity="0.5" />
      <line x1="60" y1="56" x2="52" y2="62" stroke={c} strokeWidth="0.8" opacity="0.4" />
      <line x1="60" y1="56" x2="68" y2="62" stroke={c} strokeWidth="0.8" opacity="0.4" />
      <line x1="52" y1="62" x2="60" y2="68" stroke={c} strokeWidth="0.8" opacity="0.4" />
      <line x1="68" y1="62" x2="60" y2="68" stroke={c} strokeWidth="0.8" opacity="0.4" />
      {/* Pins - top */}
      {[44, 52, 60, 68, 76].map((x) => (
        <line key={`t${x}`} x1={x} y1="35" x2={x} y2="22" stroke={c} strokeWidth="1.5" opacity="0.35" />
        ))}
      {/* Pins - bottom */}
      {[44, 52, 60, 68, 76].map((x) => (
        <line key={`b${x}`} x1={x} y1="85" x2={x} y2="98" stroke={c} strokeWidth="1.5" opacity="0.35" />
      ))}
      {/* Pins - left */}
      {[44, 52, 60, 68, 76].map((y) => (
        <line key={`l${y}`} x1="35" y1={y} x2="22" y2={y} stroke={c} strokeWidth="1.5" opacity="0.35" />
      ))}
      {/* Pins - right */}
      {[44, 52, 60, 68, 76].map((y) => (
        <line key={`r${y}`} x1="85" y1={y} x2="98" y2={y} stroke={c} strokeWidth="1.5" opacity="0.35" />
      ))}
      {/* Pin end dots */}
      {[44, 52, 60, 68, 76].map((v) => (
        <g key={`dots${v}`}>
          <circle cx={v} cy="20" r="1.5" fill={c} opacity="0.25" />
          <circle cx={v} cy="100" r="1.5" fill={c} opacity="0.25" />
          <circle cx="20" cy={v} r="1.5" fill={c} opacity="0.25" />
          <circle cx="100" cy={v} r="1.5" fill={c} opacity="0.25" />
        </g>
      ))}
    </svg>
  ),
  'Multi-Channel Bots': (c) => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      {/* Central brain */}
      <circle cx="60" cy="60" r="16" stroke={c} strokeWidth="1.5" opacity="0.8" />
      <circle cx="60" cy="60" r="6" fill={c} opacity="0.5" />
      {/* Inner pulse rings */}
      <circle cx="60" cy="60" r="10" stroke={c} strokeWidth="0.75" opacity="0.2" strokeDasharray="2 2" />
      {/* Chat bubble - top left (WhatsApp) */}
      <path d="M16 16h22a4 4 0 014 4v10a4 4 0 01-4 4H24l-4 4v-4h-4a4 4 0 01-4-4V20a4 4 0 014-4z" stroke={c} strokeWidth="1.2" opacity="0.6" />
      <line x1="18" y1="23" x2="34" y2="23" stroke={c} strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="28" x2="30" y2="28" stroke={c} strokeWidth="1" opacity="0.25" />
      {/* Chat bubble - top right (Telegram) */}
      <path d="M82 16h22a4 4 0 014 4v10a4 4 0 01-4 4h-10l-4 4v-4h-4a4 4 0 01-4-4V20a4 4 0 014-4z" stroke={c} strokeWidth="1.2" opacity="0.6" />
      <line x1="84" y1="23" x2="100" y2="23" stroke={c} strokeWidth="1" opacity="0.3" />
      <line x1="84" y1="28" x2="96" y2="28" stroke={c} strokeWidth="1" opacity="0.25" />
      {/* Chat bubble - bottom left (Slack) */}
      <path d="M8 80h22a4 4 0 014 4v10a4 4 0 01-4 4H18l-4 4v-4H8a4 4 0 01-4-4V84a4 4 0 014-4z" stroke={c} strokeWidth="1.2" opacity="0.55" />
      <line x1="10" y1="88" x2="26" y2="88" stroke={c} strokeWidth="1" opacity="0.25" />
      <line x1="10" y1="93" x2="22" y2="93" stroke={c} strokeWidth="1" opacity="0.2" />
      {/* Chat bubble - bottom right (Web) */}
      <path d="M86 80h22a4 4 0 014 4v10a4 4 0 01-4 4H96l-4 4v-4h-6a4 4 0 01-4-4V84a4 4 0 014-4z" stroke={c} strokeWidth="1.2" opacity="0.55" />
      <line x1="88" y1="88" x2="104" y2="88" stroke={c} strokeWidth="1" opacity="0.25" />
      <line x1="88" y1="93" x2="100" y2="93" stroke={c} strokeWidth="1" opacity="0.2" />
      {/* Connection lines from brain to bubbles */}
      <line x1="48" y1="48" x2="36" y2="36" stroke={c} strokeWidth="1" opacity="0.3" />
      <line x1="72" y1="48" x2="84" y2="36" stroke={c} strokeWidth="1" opacity="0.3" />
      <line x1="48" y1="72" x2="32" y2="82" stroke={c} strokeWidth="1" opacity="0.25" />
      <line x1="72" y1="72" x2="88" y2="82" stroke={c} strokeWidth="1" opacity="0.25" />
      {/* Small data dots flowing along connections */}
      <circle cx="42" cy="42" r="1.5" fill={c} opacity="0.6" />
      <circle cx="78" cy="42" r="1.5" fill={c} opacity="0.6" />
      <circle cx="40" cy="77" r="1.5" fill={c} opacity="0.4" />
      <circle cx="80" cy="77" r="1.5" fill={c} opacity="0.4" />
    </svg>
  ),
  'Document Intelligence': (c) => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      {/* Document */}
      <path d="M35 15h35l15 15v75a5 5 0 01-5 5H35a5 5 0 01-5-5V20a5 5 0 015-5z" stroke={c} strokeWidth="1.5" opacity="0.7" />
      <path d="M70 15v15h15" stroke={c} strokeWidth="1.5" opacity="0.5" />
      {/* Text lines */}
      <line x1="42" y1="42" x2="78" y2="42" stroke={c} strokeWidth="1.5" opacity="0.25" />
      <line x1="42" y1="52" x2="72" y2="52" stroke={c} strokeWidth="1.5" opacity="0.25" />
      <line x1="42" y1="62" x2="75" y2="62" stroke={c} strokeWidth="1.5" opacity="0.25" />
      <line x1="42" y1="72" x2="68" y2="72" stroke={c} strokeWidth="1.5" opacity="0.25" />
      <line x1="42" y1="82" x2="78" y2="82" stroke={c} strokeWidth="1.5" opacity="0.25" />
      <line x1="42" y1="92" x2="60" y2="92" stroke={c} strokeWidth="1.5" opacity="0.25" />
      {/* Scanning beam */}
      <rect x="38" y="58" width="44" height="10" rx="2" fill={c} opacity="0.08" />
      <line x1="38" y1="63" x2="82" y2="63" stroke={c} strokeWidth="2" opacity="0.5" />
      {/* Magnifying glass */}
      <circle cx="88" cy="85" r="12" stroke={c} strokeWidth="1.5" opacity="0.6" />
      <line x1="96" y1="93" x2="105" y2="102" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="88" cy="85" r="5" stroke={c} strokeWidth="1" opacity="0.3" />
    </svg>
  ),
  'Full-Stack Platforms': (c) => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      {/* Browser window */}
      <rect x="18" y="20" width="84" height="58" rx="5" stroke={c} strokeWidth="1.5" opacity="0.7" />
      <line x1="18" y1="32" x2="102" y2="32" stroke={c} strokeWidth="1" opacity="0.4" />
      {/* Browser dots */}
      <circle cx="27" cy="26" r="2" fill={c} opacity="0.5" />
      <circle cx="35" cy="26" r="2" fill={c} opacity="0.4" />
      <circle cx="43" cy="26" r="2" fill={c} opacity="0.3" />
      {/* Code lines inside browser */}
      <line x1="26" y1="40" x2="50" y2="40" stroke={c} strokeWidth="1.5" opacity="0.3" />
      <line x1="30" y1="48" x2="62" y2="48" stroke={c} strokeWidth="1.5" opacity="0.2" />
      <line x1="30" y1="56" x2="55" y2="56" stroke={c} strokeWidth="1.5" opacity="0.2" />
      <line x1="26" y1="64" x2="45" y2="64" stroke={c} strokeWidth="1.5" opacity="0.3" />
      {/* Mobile phone */}
      <rect x="75" y="55" width="28" height="48" rx="4" stroke={c} strokeWidth="1.5" opacity="0.6" />
      <line x1="75" y1="62" x2="103" y2="62" stroke={c} strokeWidth="0.75" opacity="0.3" />
      <line x1="75" y1="94" x2="103" y2="94" stroke={c} strokeWidth="0.75" opacity="0.3" />
      <circle cx="89" cy="97.5" r="2" stroke={c} strokeWidth="1" opacity="0.3" />
      {/* Mobile content */}
      <line x1="80" y1="68" x2="98" y2="68" stroke={c} strokeWidth="1" opacity="0.2" />
      <line x1="80" y1="74" x2="94" y2="74" stroke={c} strokeWidth="1" opacity="0.2" />
      <line x1="80" y1="80" x2="96" y2="80" stroke={c} strokeWidth="1" opacity="0.2" />
      {/* Cloud element */}
      <path d="M62 15c-3 0-5.5 2-6.3 4.7a5.5 5.5 0 00-4.2 5.3 5.5 5.5 0 005.5 5.5h10a4.5 4.5 0 000-9c-.3 0-.5 0-.8.1A6.5 6.5 0 0062 15z" stroke={c} strokeWidth="1" opacity="0.35" />
    </svg>
  ),
}

const services = [
  {
    num: '01',
    title: 'Custom AI Agents',
    value: '24/7 Autonomous Operations',
    description: 'Intelligent agents that handle support, sales, and operations across every channel your customers use -- without human intervention.',
    capabilities: ['Multi-channel deployment', 'Context-aware memory', 'CRM auto-sync'],
    color: { from: '#34d399', to: '#2dd4bf', text: 'text-emerald-400', glow: 'rgba(52,211,153,0.15)' },
  },
  {
    num: '02',
    title: 'Workflow Automation',
    value: 'Zero Manual Steps',
    description: 'Transform repetitive, time-consuming processes into intelligent pipelines that execute, monitor, and self-correct.',
    capabilities: ['End-to-end pipelines', 'Error self-healing', 'Real-time monitoring'],
    color: { from: '#fbbf24', to: '#fb923c', text: 'text-amber-400', glow: 'rgba(251,191,36,0.15)' },
  },
  {
    num: '03',
    title: 'LLM Integration',
    value: 'Frontier Models, Your Data',
    description: 'Embed GPT-4, Claude, or Gemini into your existing systems for intelligent document processing and decision support.',
    capabilities: ['RAG pipelines', 'Fine-tuned models', 'Secure data handling'],
    color: { from: '#a78bfa', to: '#c084fc', text: 'text-violet-400', glow: 'rgba(167,139,250,0.15)' },
  },
  {
    num: '04',
    title: 'Multi-Channel Bots',
    value: '1 Brain, Every Platform',
    description: 'Deploy a single intelligent bot across WhatsApp, Telegram, Slack, email, and web -- with unified memory across all channels.',
    capabilities: ['WhatsApp & Telegram', 'Slack & email', 'Unified conversation memory'],
    color: { from: '#22d3ee', to: '#60a5fa', text: 'text-cyan-400', glow: 'rgba(34,211,238,0.15)' },
  },
  {
    num: '05',
    title: 'Document Intelligence',
    value: 'Seconds, Not Days',
    description: 'AI that reads, analyzes, and extracts structured insights from contracts, invoices, leases, and any business document.',
    capabilities: ['PDF & image parsing', 'Clause extraction', 'Risk flagging'],
    color: { from: '#fb7185', to: '#f472b6', text: 'text-rose-400', glow: 'rgba(251,113,133,0.15)' },
  },
  {
    num: '06',
    title: 'Full-Stack Platforms',
    value: 'Idea to Production',
    description: 'Web apps, mobile apps, SaaS products -- designed, engineered, and deployed end-to-end with AI woven into the core.',
    capabilities: ['React & Next.js', 'iOS & Android', 'Cloud infrastructure'],
    color: { from: '#38bdf8', to: '#818cf8', text: 'text-sky-400', glow: 'rgba(56,189,248,0.15)' },
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
  const [activeProject, setActiveProject] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const project = caseStudies[activeProject]

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
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
            <motion.a href="/contact" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all">
              Get a Free Consultation
            </motion.a>
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
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(16, 185, 129, 0.35)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all text-lg inline-block"
              >
                Get a Free Consultation
              </motion.a>
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
      {/* SERVICES — Editorial vertical showcase                       */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} className="mb-20 lg:mb-28">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-[40px] bg-gradient-to-r from-amber-500 to-transparent" />
              <span className="text-xs text-amber-400/60 uppercase tracking-[0.25em] font-semibold">Capabilities</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-extrabold mb-4">
              What we{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">build.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Six core systems. Each one engineered to eliminate a specific bottleneck in your business.
            </p>
          </motion.div>

          {/* Service strips */}
          <div className="space-y-0">
            {services.map((service, i) => {
              const isEven = i % 2 === 0
              const IconComponent = serviceIcons[service.title]
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="group relative"
                >
                  {/* Top divider line */}
                  <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${service.color.from}20, transparent)` }} />

                  <div className={`relative py-14 lg:py-20 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start lg:items-center gap-10 lg:gap-16`}>

                    {/* Oversized background number */}
                    <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none select-none" style={{ [isEven ? 'right' : 'left']: '-2%' }}>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-[12rem] sm:text-[16rem] lg:text-[20rem] font-display font-black leading-none"
                        style={{
                          background: `linear-gradient(135deg, ${service.color.from}06, ${service.color.to}03)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {service.num}
                      </motion.span>
                    </div>

                    {/* Visual element side -- themed SVG illustration */}
                    <div className="relative w-full lg:w-5/12 flex-shrink-0">
                      <div className="relative aspect-[4/3] lg:aspect-square max-w-[320px] mx-auto lg:mx-0">
                        {/* Ambient glow behind icon */}
                        <div
                          className="absolute inset-[15%] rounded-full blur-[80px] transition-opacity duration-700 opacity-30 group-hover:opacity-60"
                          style={{ background: service.color.glow }}
                        />

                        {/* Outer rotating ring */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 30 + i * 5, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-[5%] rounded-full border border-dashed opacity-[0.06]"
                          style={{ borderColor: service.color.from }}
                        />

                        {/* Themed SVG illustration with gentle float */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.25 }}
                          className="absolute inset-[12%]"
                        >
                          <motion.div
                            animate={{ y: [0, -6, 0], rotate: [0, 1, 0, -1, 0] }}
                            transition={{ duration: 6 + i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                          >
                            {IconComponent && IconComponent(service.color.from)}
                          </motion.div>
                        </motion.div>

                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-10 h-10">
                          <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(90deg, ${service.color.from}30, transparent)` }} />
                          <div className="absolute top-0 left-0 h-full w-px" style={{ background: `linear-gradient(180deg, ${service.color.from}30, transparent)` }} />
                        </div>
                        <div className="absolute bottom-0 right-0 w-10 h-10">
                          <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: `linear-gradient(270deg, ${service.color.to}30, transparent)` }} />
                          <div className="absolute bottom-0 right-0 h-full w-px" style={{ background: `linear-gradient(0deg, ${service.color.to}30, transparent)` }} />
                        </div>
                      </div>
                    </div>

                    {/* Content side */}
                    <div className={`relative flex-1 ${isEven ? '' : 'lg:text-right'}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mb-4"
                      >
                        <span
                          className="text-sm font-semibold uppercase tracking-[0.2em]"
                          style={{ color: service.color.from }}
                        >
                          {service.title}
                        </span>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold leading-[1.1] mb-6"
                        style={{
                          background: `linear-gradient(135deg, ${service.color.from}, ${service.color.to})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {service.value}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-lg mb-8"
                        style={!isEven ? { marginLeft: 'auto' } : undefined}
                      >
                        {service.description}
                      </motion.p>

                      {/* Capabilities as inline flow */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${isEven ? '' : 'lg:justify-end'}`}
                      >
                        {service.capabilities.map((cap, ci) => (
                          <span key={cap} className="flex items-center gap-3">
                            {ci > 0 && (
                              <span
                                className="w-1 h-1 rounded-full flex-shrink-0"
                                style={{ background: service.color.from, opacity: 0.4 }}
                              />
                            )}
                            <span className="text-sm text-gray-500 font-medium">{cap}</span>
                          </span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
            {/* Final divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </div>

          {/* Internal links to pricing and blog */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href="/pricing"
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all text-base"
            >
              View Pricing
            </a>
            <a
              href="/blog/ai-workspace-automation-2026"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 text-white font-semibold rounded-xl transition-all text-base"
            >
              Read Our AI Automation Guide
            </a>
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
                                alt={`Client testimonial for ${project.title} project`}
                                className="w-full h-48 sm:h-full object-cover"
                                loading="lazy"
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
                    <img src="/ceo-thanos.jpg" alt="Thanos Panagiotakopoulos - CEO & AI Engineer at Naurra.ai" className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
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
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03, boxShadow: '0 25px 70px rgba(16, 185, 129, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-lg font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all inline-block"
              >
                Let's Discuss Your Project
              </motion.a>
              <p className="text-gray-600 text-sm mt-5">Free consultation — No commitment required</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-12" />
    </main>
  )
}