export type CaseStudyTheme = {
  primary: string
  secondary: string
  primarySoft: string
  primaryBorder: string
  secondarySoft: string
  secondaryBorder: string
}

export type CaseStudyTestimonial = {
  quote: string
  image?: string
  author: string
  role: string
}

export type CaseStudy = {
  id: number
  slug: string
  industry: string
  title: string
  summary: string
  seoTitle: string
  description: string
  heroLabel: string
  publishedAt: string
  updatedAt: string
  problem: string
  solution: string
  impact: string
  impactDetail: string
  challengeBullets: string[]
  systemComponents: string[]
  outcomes: string[]
  timeline: string
  stack: string[]
  tags: string[]
  proofSource: string
  proofContext: string
  accentFrom: string
  accentTo: string
  theme: CaseStudyTheme
  featured: boolean
  relatedSolutionHref?: string
  relatedSolutionLabel?: string
  relatedBlogHref?: string
  relatedBlogLabel?: string
  testimonial?: CaseStudyTestimonial
}

export const caseStudies: CaseStudy[] = [
  {
    id: 0,
    slug: 'automotive-sourcing-engine-profit-automation',
    industry: 'Automotive',
    title: 'Automotive Sourcing Engine',
    summary: 'An AI sourcing and profit engine that scans marketplaces, filters undervalued inventory, and surfaces profitable cars before competitors get there.',
    seoTitle: 'Automotive AI Sourcing Case Study: $15K Profit Every Two Weeks',
    description: 'See how Naurra.ai built an automotive AI sourcing engine that scans listing sites, filters undervalued cars, and helps a reseller uncover roughly $15K profit every two weeks.',
    heroLabel: 'Automotive case study',
    publishedAt: '2026-05-13',
    updatedAt: '2026-05-13',
    problem: 'A car reseller was manually browsing dozens of listing sites every day, trying to catch undervalued inventory before competitors. The process was exhausting, inconsistent, and depended too much on one person noticing the right listing at the right moment.',
    solution: 'We built an automated sourcing engine that scrapes thousands of listings, scores opportunities using AI filters, checks wholesale benchmarks, and highlights the exact deals worth reviewing. Instead of browsing the market manually, the client gets a live stream of high-signal opportunities with margin context attached.',
    impact: '$15K profit every two weeks',
    impactDetail: 'The system consistently surfaces profitable inventory the client would have struggled to find manually, turning scattered listing data into a repeatable sourcing advantage.',
    challengeBullets: [
      'Inventory opportunities disappeared before a human could review every marketplace.',
      'Profitability depended on manually comparing listing prices against wholesale value.',
      'The founder spent time hunting instead of negotiating, closing, and scaling.'
    ],
    systemComponents: [
      'Marketplace scraping across high-volume listing sources',
      'AI filtering to separate noise from genuinely promising vehicles',
      'Wholesale price cross-checking and instant gross-profit estimation',
      'A review workflow that puts only the best opportunities in front of the client'
    ],
    outcomes: [
      'A repeatable sourcing workflow instead of opportunistic browsing',
      'Faster reaction time on undervalued inventory',
      'Clearer confidence on which listings deserved immediate action'
    ],
    timeline: '4 weeks from discovery to live monitoring',
    stack: ['Web scraping', 'AI filtering', 'Profit analytics', 'Notification workflow'],
    tags: ['Web Scraping', 'AI Filtering', 'Profit Analytics'],
    proofSource: 'Automotive reseller',
    proofContext: 'AI sourcing and margin engine',
    accentFrom: 'from-cyan-400',
    accentTo: 'to-blue-400',
    theme: {
      primary: '#22d3ee',
      secondary: '#60a5fa',
      primarySoft: 'rgba(34,211,238,0.14)',
      primaryBorder: 'rgba(34,211,238,0.26)',
      secondarySoft: 'rgba(96,165,250,0.12)',
      secondaryBorder: 'rgba(96,165,250,0.24)',
    },
    featured: true,
    relatedSolutionHref: '/solutions/ai-agent-custom-crm-quoting-system-small-business/',
    relatedSolutionLabel: 'See the AI CRM + quoting solution',
    relatedBlogHref: '/blog/ai-car-sourcing-engine-undervalued-inventory/',
    relatedBlogLabel: 'Read the sourcing-engine deep dive',
    testimonial: {
      quote: 'Thanos helped me set up automation for my automotive business and it completely changed the game for me. Since implementing it we have been averaging around $15K profit every two weeks. Because of that, I was able to buy my dad his dream truck. If anyone is looking to automate parts of their business, he really knows what he is doing.',
      image: '/testimonial-automotive.jpg',
      author: 'Automotive reseller client',
      role: 'Independent automotive sourcing business',
    },
  },
  {
    id: 7,
    slug: 'document-intelligence-flight-compensation-eu261-automation',
    industry: 'LegalTech & Aviation',
    title: 'Flight-Compensation Document Intelligence',
    summary: 'An async document-intelligence pipeline that reads, classifies, and extracts data from incoming legal mail for an EU261 flight-compensation firm, then writes structured results back to the CRM — with a safe manual-review fallback for anything uncertain.',
    seoTitle: 'Document Intelligence Case Study: Automating EU261 Flight-Compensation Paperwork',
    description: 'See how Naurra.ai productionized a document-intelligence pipeline for an EU flight-compensation firm — OCR, classification, and field extraction across six document types with a credential-isolated, safe-by-design architecture.',
    heroLabel: 'LegalTech case study',
    publishedAt: '2026-06-30',
    updatedAt: '2026-06-30',
    problem: 'An EU flight-compensation firm (claims under EU Regulation 261/2004) received a constant stream of incoming PDFs — objection notices, court-cost invoices, handover letters, booking confirmations, customer claim forms. Each one had to be read, identified, and have its key fields entered into the CRM by hand. A previously built pipeline had stalled because its OCR engine never worked reliably, so nothing flowed end to end.',
    solution: 'We were brought in as a task force to finish, fix, and cut the system over — not rebuild it. We fixed the OCR layer, then hardened a single async pass that runs OCR, a keyword pre-filter, classification, summarization, and field extraction, and emits a CRM-ready result. Born-digital PDFs skip GPU-OCR entirely by reading their text layer. The document that opens untrusted attachments holds no CRM credentials; results travel back over HMAC-signed callbacks to a workflow that is the only component allowed to write to the CRM. Anything low-confidence or unrecognized is routed to a human instead of written blindly. The system is built for safe, auditable automation — not blind throughput.',
    impact: 'One pass, zero bad writes',
    impactDetail: 'The full flow runs live end-to-end with a credential-isolated design and a proven safe fallback: well-formed documents are classified and extracted automatically, while garbage or uncertain inputs are flagged for human review instead of corrupting case data. Roughly half of incoming documents are born-digital and bypass OCR completely.',
    challengeBullets: [
      'Every incoming PDF had to be read, identified, and keyed into the CRM by hand.',
      'A prior pipeline had stalled on a broken OCR engine, so nothing ran end to end.',
      'The system handles untrusted attachments, so it could not be trusted with CRM credentials.'
    ],
    systemComponents: [
      'Vision OCR with a text-layer triage path that skips OCR for born-digital PDFs',
      'A deterministic keyword pre-filter that primes — but never overrides — the classifier',
      'LLM classification and field extraction across six document types plus a safe "unknown" bucket',
      'A credential-isolated brain plus HMAC-signed callbacks to a single CRM-writing workflow',
      'A manual-review fallback that flags anything uncertain instead of writing it'
    ],
    outcomes: [
      'A live, auditable pipeline from inbound PDF to structured CRM update',
      'Safe-by-design handling of untrusted documents with no bad writes',
      'A clean async architecture that replaced a stalled, never-validated monolith'
    ],
    timeline: 'Engaged as a task force to finish, fix, and cut over a stalled pipeline',
    stack: ['Vision OCR', 'LLM classification & extraction', 'FastAPI async pipeline', 'n8n orchestration', 'HMAC-signed callbacks'],
    tags: ['Document Intelligence', 'OCR', 'LLM Extraction'],
    proofSource: 'EU flight-compensation firm',
    proofContext: 'Async document-intelligence pipeline (EU261)',
    accentFrom: 'from-indigo-400',
    accentTo: 'to-violet-400',
    theme: {
      primary: '#818cf8',
      secondary: '#a78bfa',
      primarySoft: 'rgba(129,140,248,0.14)',
      primaryBorder: 'rgba(129,140,248,0.26)',
      secondarySoft: 'rgba(167,139,250,0.12)',
      secondaryBorder: 'rgba(167,139,250,0.24)',
    },
    featured: true,
    relatedSolutionHref: '/solutions/ai-agent-handle-customer-support-emails-small-business/',
    relatedSolutionLabel: 'See the AI customer support solution',
    relatedBlogHref: '/blog/document-intelligence-in-production-automating-back-office-paperwork/',
    relatedBlogLabel: 'Read the document-intelligence deep dive',
  },
  {
    id: 1,
    slug: 'mep-quotation-intelligence-hvac-case-study',
    industry: 'HVAC & MEP',
    title: 'MEP Quotation Intelligence',
    summary: 'An AI quotation system that reads project specs, matches equipment from supplier catalogs, and produces review-ready quotes in minutes.',
    seoTitle: 'HVAC AI Quoting Case Study: 95% Faster Processing',
    description: 'See how Naurra.ai built an HVAC and MEP quotation intelligence system that reads specs, matches equipment, and generates complete quotes with 95% faster processing.',
    heroLabel: 'HVAC case study',
    publishedAt: '2026-05-13',
    updatedAt: '2026-05-13',
    problem: 'HVAC contractors were spending hours matching equipment specs to project requirements, checking supplier catalogs manually, and assembling quotations line by line. Each quote became a bottleneck, especially when multiple requests landed at once.',
    solution: 'We built an AI quotation engine that ingests project documentation, maps technical requirements to valid equipment choices, pulls pricing logic, and drafts a complete quotation package. The team reviews, adjusts edge cases if needed, and sends far faster than before.',
    impact: '95% faster processing',
    impactDetail: 'What previously consumed most of a working day now happens in minutes, with the team focusing on commercial judgment instead of repetitive document matching.',
    challengeBullets: [
      'Project specifications arrived in messy, document-heavy formats.',
      'Equipment matching required expert attention and slowed quote turnaround.',
      'Every delay in quoting created room for competitors to respond first.'
    ],
    systemComponents: [
      'Specification parsing across project documents and schedules',
      'Catalog matching against supplier and equipment libraries',
      'Pricing and document assembly into a send-ready quote structure',
      'A review layer so the commercial team stays in control of final output'
    ],
    outcomes: [
      'Much faster quote turnaround for inbound opportunities',
      'Less repetitive manual spec matching by senior staff',
      'A quoting process that scales better when request volume spikes'
    ],
    timeline: '6 weeks from workflow mapping to production rollout',
    stack: ['Latest GPT models', 'Document processing', 'Catalog matching', 'Quotation workflow'],
    tags: ['Latest GPT Models', 'Document Processing', 'SaaS Platform'],
    proofSource: 'HVAC and MEP team',
    proofContext: 'AI equipment-matching and quote-generation system',
    accentFrom: 'from-emerald-400',
    accentTo: 'to-teal-400',
    theme: {
      primary: '#34d399',
      secondary: '#2dd4bf',
      primarySoft: 'rgba(52,211,153,0.14)',
      primaryBorder: 'rgba(52,211,153,0.24)',
      secondarySoft: 'rgba(45,212,191,0.12)',
      secondaryBorder: 'rgba(45,212,191,0.22)',
    },
    featured: true,
    relatedSolutionHref: '/solutions/ai-agent-custom-crm-quoting-system-small-business/',
    relatedSolutionLabel: 'See the AI CRM + quoting solution',
    relatedBlogHref: '/blog/ai-agent-custom-crm-quoting-system-small-business/',
    relatedBlogLabel: 'Read the quoting workflow guide',
  },
  {
    id: 2,
    slug: 'multi-channel-salesforce-ai-communication-suite',
    industry: 'CRM & Sales',
    title: 'AI Communication Suite',
    summary: 'One AI brain across WhatsApp, Telegram, email, and web chat, synced with Salesforce so conversations keep their context everywhere.',
    seoTitle: 'Multi-Channel AI Sales Case Study: 4 Channels, 1 AI Brain',
    description: 'See how Naurra.ai deployed a multi-channel AI communication suite across WhatsApp, Telegram, email, and web chat with Salesforce memory and handoff.',
    heroLabel: 'Sales case study',
    publishedAt: '2026-05-13',
    updatedAt: '2026-05-13',
    problem: 'A sales team was losing context every time a customer switched channels. Someone might message on WhatsApp, then follow up by email, then ask another question on web chat and get treated like a brand-new conversation each time.',
    solution: 'We deployed a single AI communication layer across WhatsApp, Telegram, email, and web chat, connected directly to Salesforce. The system remembers prior interactions, logs new ones automatically, and gives both the AI and the human team the same shared context.',
    impact: '4 channels, 1 AI brain',
    impactDetail: 'Instead of fragmented conversations across separate inboxes, the business now has continuity, memory, and cleaner CRM data across the full customer journey.',
    challengeBullets: [
      'Leads and customers changed channel constantly, breaking continuity.',
      'Important context lived in inboxes instead of the CRM.',
      'The team spent too much time reconstructing conversation history.'
    ],
    systemComponents: [
      'Channel integrations across WhatsApp, Telegram, email, and web chat',
      'Shared memory layer for customer context and conversation state',
      'Salesforce syncing for every inbound and outbound touchpoint',
      'Routing logic for autonomous replies, drafts, and human escalation'
    ],
    outcomes: [
      'Cleaner lead history regardless of where the conversation starts',
      'Fewer duplicate or context-blind responses',
      'A better foundation for qualification, follow-up, and sales reporting'
    ],
    timeline: '5 weeks from architecture to multi-channel deployment',
    stack: ['Salesforce CRM', 'WhatsApp', 'Telegram', 'Email', 'Web chat'],
    tags: ['Salesforce CRM', 'Multi-Channel', 'Autonomous Agents'],
    proofSource: 'Sales and CRM team',
    proofContext: 'Unified customer communication system',
    accentFrom: 'from-amber-400',
    accentTo: 'to-orange-400',
    theme: {
      primary: '#fbbf24',
      secondary: '#fb923c',
      primarySoft: 'rgba(251,191,36,0.14)',
      primaryBorder: 'rgba(251,191,36,0.26)',
      secondarySoft: 'rgba(251,146,60,0.12)',
      secondaryBorder: 'rgba(251,146,60,0.24)',
    },
    featured: false,
    relatedSolutionHref: '/solutions/ai-agent-capture-qualify-leads-instagram-whatsapp-email-small-business/',
    relatedSolutionLabel: 'See the AI lead capture solution',
    relatedBlogHref: '/blog/ai-agent-capture-qualify-leads-instagram-whatsapp-email-small-business/',
    relatedBlogLabel: 'Read the lead-capture guide',
  },
  {
    id: 3,
    slug: 'lease-ai-analyser-legal-document-intelligence',
    industry: 'Legal & Finance',
    title: 'Lease AI Analyser',
    summary: 'A document-intelligence engine that extracts clauses, calculates NPV, and flags risk from commercial leases in under a minute.',
    seoTitle: 'Legal AI Document Review Case Study: Lease Analysis in Under 60 Seconds',
    description: 'See how Naurra.ai built a lease AI analyser for legal and finance teams that extracts clauses, calculates NPV, and flags risk in under 60 seconds.',
    heroLabel: 'Legal case study',
    publishedAt: '2026-05-13',
    updatedAt: '2026-05-13',
    problem: 'A legal team was spending two to three days per commercial lease agreement, manually reading long documents, extracting key terms, calculating NPV, and checking for risky clauses under deadline pressure.',
    solution: 'We built a document-intelligence engine that ingests commercial leases, identifies critical fields and clauses, calculates the financial view, and returns a structured summary for legal review. Instead of starting from a blank page, the team starts from a prepared analysis.',
    impact: 'Days reduced to under 60 seconds',
    impactDetail: 'The first-pass analysis now appears almost instantly, letting specialists focus on judgment, negotiation, and exception handling instead of rote extraction.',
    challengeBullets: [
      'Lease review was slow, cognitively heavy, and expensive.',
      'Teams had to combine legal reading with financial calculation manually.',
      'Important clauses and risk flags could still hide inside long documents.'
    ],
    systemComponents: [
      'Document ingestion for long-form commercial agreements',
      'Clause extraction and field normalization',
      'Financial calculation layer for NPV and related commercial metrics',
      'Structured summary output for fast human review and escalation'
    ],
    outcomes: [
      'A radically faster first-pass review process',
      'More consistency in how agreements are summarized',
      'Better use of expert time on high-value interpretation'
    ],
    timeline: '5 weeks from problem framing to review-ready system',
    stack: ['NLP', 'Document intelligence', 'Financial modeling', 'Structured outputs'],
    tags: ['NLP', 'Document Intelligence', 'Financial Modeling'],
    proofSource: 'Legal and finance workflow',
    proofContext: 'Commercial lease analysis',
    accentFrom: 'from-violet-400',
    accentTo: 'to-purple-400',
    theme: {
      primary: '#a78bfa',
      secondary: '#c084fc',
      primarySoft: 'rgba(167,139,250,0.14)',
      primaryBorder: 'rgba(167,139,250,0.26)',
      secondarySoft: 'rgba(192,132,252,0.12)',
      secondaryBorder: 'rgba(192,132,252,0.24)',
    },
    featured: false,
    relatedSolutionHref: '/solutions/ai-agent-generate-proposals-statements-of-work-small-business/',
    relatedSolutionLabel: 'See the AI proposal solution',
    relatedBlogHref: '/blog/ai-agent-generate-proposals-statements-of-work-small-business/',
    relatedBlogLabel: 'Read the proposal-generation guide',
  },
  {
    id: 4,
    slug: 'bespoke-fashion-ai-virtual-fitting-room',
    industry: 'Fashion',
    title: 'AI Virtual Fitting Room',
    summary: 'A visual configuration platform that lets clients preview custom suits before production, replacing uncertainty with confidence.',
    seoTitle: 'Fashion AI Case Study: Virtual Fitting Room for Custom Tailoring',
    description: 'See how Naurra.ai built an AI virtual fitting room for a bespoke tailor so clients could preview suit combinations before production.',
    heroLabel: 'Fashion case study',
    publishedAt: '2026-05-13',
    updatedAt: '2026-05-13',
    problem: 'A bespoke tailor had no real way to show clients what a custom suit would look like before production. Customers were making high-value decisions based on imagination, fabric swatches, and verbal reassurance.',
    solution: 'We created a platform where clients upload a photo, choose suit variations, and see visual previews generated across fabrics, cuts, and styling options. The result is a more interactive buying experience without carrying physical inventory for every possibility.',
    impact: 'Infinite try-ons, zero inventory',
    impactDetail: 'The experience shifted the sales conversation from abstract explanation to visual confidence, helping clients commit with less hesitation.',
    challengeBullets: [
      'Clients were buying an expensive custom product without seeing the end result.',
      'Fabric and style decisions created anxiety late in the sales process.',
      'Showing every combination physically would have been impractical and costly.'
    ],
    systemComponents: [
      'Photo-based client visualization workflow',
      'Configurable styling options across cuts, fabrics, and accessories',
      'AI-generated previews to simulate the final look',
      'A sales experience built around exploration and higher-confidence decisions'
    ],
    outcomes: [
      'A more persuasive consultation process',
      'Lower uncertainty for premium custom purchases',
      'A branded differentiator in a traditionally offline sales flow'
    ],
    timeline: '6 weeks from prototype to client-ready showroom experience',
    stack: ['Google Imagen', 'Computer vision', 'Generative AI', 'Custom interface'],
    tags: ['Google Imagen', 'Computer Vision', 'Generative AI'],
    proofSource: 'Bespoke tailoring studio',
    proofContext: 'AI-assisted visual product preview',
    accentFrom: 'from-rose-400',
    accentTo: 'to-pink-400',
    theme: {
      primary: '#fb7185',
      secondary: '#f472b6',
      primarySoft: 'rgba(251,113,133,0.14)',
      primaryBorder: 'rgba(251,113,133,0.26)',
      secondarySoft: 'rgba(244,114,182,0.12)',
      secondaryBorder: 'rgba(244,114,182,0.24)',
    },
    featured: false,
  },
  {
    id: 5,
    slug: 'ai-travel-concierge-whatsapp-telegram-itineraries',
    industry: 'Travel',
    title: 'AI Travel Concierge',
    summary: 'A conversational travel-planning agent on Telegram and WhatsApp that turns a natural chat into a polished itinerary package.',
    seoTitle: 'Travel AI Concierge Case Study: 10x Faster Itinerary Creation',
    description: 'See how Naurra.ai built an AI travel concierge on Telegram and WhatsApp that generated polished itineraries and reduced itinerary creation time by 10x.',
    heroLabel: 'Travel case study',
    publishedAt: '2026-05-13',
    updatedAt: '2026-05-13',
    problem: 'A travel agency spent hours per client building custom itineraries, researching destinations, checking logistics, and formatting deliverables. The service was high-touch and valuable, but difficult to scale profitably.',
    solution: 'We built intelligent travel agents on Telegram and WhatsApp that collect preferences naturally, reason through style and budget, and generate polished PDF itineraries with timings, pricing guidance, and curated recommendations.',
    impact: '10x faster itinerary creation',
    impactDetail: 'A process that used to require hours of manual assembly now starts with a conversation, allowing the agency to serve more travelers without diluting the experience.',
    challengeBullets: [
      'Each itinerary required research, judgment, and polished formatting.',
      'The agency offered premium personalization but could not scale that effort easily.',
      'Manual itinerary production consumed time better spent on client relationships.'
    ],
    systemComponents: [
      'Conversational intake on WhatsApp and Telegram',
      'Preference capture for budget, style, trip type, and constraints',
      'Structured itinerary generation with polished PDF output',
      'A workflow designed to preserve boutique feel while reducing manual labor'
    ],
    outcomes: [
      'Much faster itinerary creation without losing customization',
      'A more interactive and modern booking experience',
      'Better operational leverage for a high-service travel business'
    ],
    timeline: '4 weeks from design to live concierge workflow',
    stack: ['Telegram bots', 'WhatsApp workflows', 'PDF generation', 'Conversational AI'],
    tags: ['Telegram Bots', 'PDF Generation', 'Conversational AI'],
    proofSource: 'Travel agency',
    proofContext: 'Conversational itinerary generation',
    accentFrom: 'from-sky-400',
    accentTo: 'to-indigo-400',
    theme: {
      primary: '#38bdf8',
      secondary: '#818cf8',
      primarySoft: 'rgba(56,189,248,0.14)',
      primaryBorder: 'rgba(56,189,248,0.26)',
      secondarySoft: 'rgba(129,140,248,0.12)',
      secondaryBorder: 'rgba(129,140,248,0.24)',
    },
    featured: true,
    relatedSolutionHref: '/solutions/ai-agent-schedule-confirm-client-appointments-small-business/',
    relatedSolutionLabel: 'See the AI scheduling solution',
  },
  {
    id: 6,
    slug: 'full-stack-ecommerce-ai-operations-platform',
    industry: 'E-Commerce',
    title: 'Full-Stack E-Commerce Platform',
    summary: 'An AI-driven operations stack handling support, email marketing, social publishing, receipts, and SEO updates for a growing wellness brand.',
    seoTitle: 'E-Commerce AI Operations Case Study: Full-Stack Automation for a Wellness Brand',
    description: 'See how Naurra.ai built a full-stack AI operations platform for a wellness brand, automating support, email marketing, social publishing, receipts, and SEO workflows.',
    heroLabel: 'E-commerce case study',
    publishedAt: '2026-05-13',
    updatedAt: '2026-05-13',
    problem: 'A wellness brand founder was manually handling support, email campaigns, social posting, receipts, and SEO updates. Growth depended on one person staying in the middle of every workflow.',
    solution: 'We built an end-to-end automation platform: an AI web assistant for support, an email agent for campaigns, social automation across multiple platforms, and operations workflows that removed repetitive back-office tasks from the founder’s plate.',
    impact: '100% automated operations',
    impactDetail: 'The founder moved from constant execution mode into an actual operator role, with customer-facing and internal workflows running continuously in the background.',
    challengeBullets: [
      'The founder was the bottleneck across support, marketing, and operations.',
      'Routine work crowded out higher-value decisions and growth planning.',
      'Automation needed to span multiple systems, not just one isolated workflow.'
    ],
    systemComponents: [
      'AI web assistant for customer support and common product questions',
      'Email workflow for campaign execution and lifecycle messaging',
      'Social publishing automation across multiple channels',
      'Operational automations for receipts, content updates, and repetitive admin'
    ],
    outcomes: [
      'Far less founder dependence on day-to-day execution',
      'A more consistent operating rhythm across marketing and support',
      'A stronger foundation for growth without adding manual overhead first'
    ],
    timeline: '6 weeks for initial platform launch and phased automation rollout',
    stack: ['Full-stack web app', 'Social media AI', 'Marketing automation', 'Operations workflows'],
    tags: ['Full-Stack', 'Social Media AI', 'Marketing Automation'],
    proofSource: 'Wellness e-commerce brand',
    proofContext: 'AI-led operations and marketing platform',
    accentFrom: 'from-amber-400',
    accentTo: 'to-yellow-400',
    theme: {
      primary: '#f59e0b',
      secondary: '#facc15',
      primarySoft: 'rgba(245,158,11,0.14)',
      primaryBorder: 'rgba(245,158,11,0.26)',
      secondarySoft: 'rgba(250,204,21,0.12)',
      secondaryBorder: 'rgba(250,204,21,0.22)',
    },
    featured: true,
    relatedSolutionHref: '/solutions/ai-agent-handle-customer-support-emails-small-business/',
    relatedSolutionLabel: 'See the AI customer support solution',
    relatedBlogHref: '/blog/ai-agent-handle-customer-support-emails-small-business/',
    relatedBlogLabel: 'Read the support-email guide',
  },
  {
    id: 8,
    slug: 'football-ev-lab-probability-expected-value-engine',
    industry: 'Quantitative Analytics',
    title: 'Quantitative Probability & EV Engine',
    summary: 'An in-house quantitative engine that builds a full probability distribution over a match, prices every derived market from that one coherent model, anchors to margin-free market consensus, and surfaces only positive expected-value selections, validated by calibration and closing-line value rather than short-term results.',
    seoTitle: 'Quantitative Analytics Case Study: A Probability and Expected-Value Engine',
    description: 'See how Naurra.ai built a probabilistic modeling and expected-value engine. A single Poisson outcome grid prices every market consistently, anchors to margin-free market consensus, and is validated with calibration and closing-line value.',
    heroLabel: 'Quantitative analytics case study',
    publishedAt: '2026-06-30',
    updatedAt: '2026-06-30',
    problem: 'Pricing many correlated markets consistently from a single coherent view of an event is genuinely hard. Without one underlying probability model, decisions drift toward narrative and gut feeling instead of whether a price is actually mispriced, so a "good call" becomes just a confident guess.',
    solution: 'We built a decision engine, not a tips channel. A single Poisson outcome grid, driven by expected goals and Elo-style strength ratings, is computed once, and every market is derived directly from it so the logic stays internally consistent. Market odds are stripped of margin to form a fair-probability anchor, and bounded research signals can nudge the numbers but can never override the math. For each selection it outputs probability, fair odds, expected value, confidence, a CORE or LOTTERY grade, and a fractional-Kelly stake. It is built for disciplined, auditable analysis and is explicitly not financial advice or a guarantee of outcomes.',
    impact: '1 model, every market',
    impactDetail: 'One probability map prices the entire board consistently, and success is judged by process: calibration (do 60% picks win about 60% of the time?) and closing-line value (did we beat the market price?), rather than by individual results. Every prediction is stored so it can be audited and back-tested later.',
    challengeBullets: [
      'Selections drift toward narrative instead of whether a price is genuinely mispriced.',
      'Pricing 10+ correlated markets consistently from one model is hard to get right.',
      'Research narratives tend to override the math unless they are strictly bounded.'
    ],
    systemComponents: [
      'A single Poisson outcome grid from which every market is derived',
      'Expected goals plus Elo-style strength ratings to drive the grid',
      'Margin-free market consensus as the probability anchor',
      'Bounded research adjustments that prime but never override the model',
      'EV, confidence, risk grade, and fractional-Kelly staking with CORE / LOTTERY classification',
      'Calibration and closing-line-value tracking for honest, long-run validation'
    ],
    outcomes: [
      'Every market priced consistently from one internally coherent model',
      'Value defined as true probability beating the implied price, not as confidence',
      'A validation loop built on calibration and CLV, with every prediction auditable'
    ],
    timeline: 'Ongoing in-house quantitative R&D build',
    stack: ['Poisson modeling', 'Expected goals (xG)', 'Python', 'Supabase Postgres', 'Fractional Kelly', 'Calibration & CLV'],
    tags: ['Quantitative Modeling', 'Probability', 'Python'],
    proofSource: 'Naurra in-house build',
    proofContext: 'Quantitative probability & EV engine',
    accentFrom: 'from-teal-400',
    accentTo: 'to-cyan-400',
    theme: {
      primary: '#2dd4bf',
      secondary: '#22d3ee',
      primarySoft: 'rgba(45,212,191,0.14)',
      primaryBorder: 'rgba(45,212,191,0.26)',
      secondarySoft: 'rgba(34,211,238,0.12)',
      secondaryBorder: 'rgba(34,211,238,0.24)',
    },
    featured: true,
    relatedBlogHref: '/blog/probability-not-prediction-how-an-ev-engine-finds-value',
    relatedBlogLabel: 'Read how the EV engine finds value',
  },
]

export const featuredCaseStudies = caseStudies.filter((study) => study.featured)

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}
