export type SolutionTheme = {
  primary: string
  secondary: string
  primarySoft: string
  primaryBorder: string
  secondarySoft: string
  secondaryBorder: string
}

export type SolutionGuide = {
  label: string
  title: string
  body: string
  href: string
}

export type SolutionCapability = {
  title: string
  body: string
}

export type SolutionStep = {
  label: string
  title: string
  body: string
}

export type SolutionCompareRow = {
  label: string
  baseline: string
  middle: string
  custom: string
}

export type SolutionFaq = {
  question: string
  answer: string
}

export type SolutionPage = {
  slug: string
  name: string
  summary: string
  seoTitle: string
  description: string
  keywords: string
  image: string
  imageAlt: string
  heroLabel: string
  heroTitleTop: string
  heroTitleBottom: string
  heroDescription: string
  priceRange: string
  timeline: string
  runningCost: string
  lowPrice: string
  highPrice: string
  cardBadge: string
  proofLabel: string
  proofMetric: string
  proofBody: string
  proofSource: string
  proofContext: string
  proofHref?: string
  proofLinkLabel?: string
  problemTitle: string
  problemParagraphs: string[]
  capabilitiesTitle: string
  capabilities: SolutionCapability[]
  stepsTitle: string
  steps: SolutionStep[]
  compareTitle: string
  compareHeaders: {
    baseline: string
    middle: string
    custom: string
  }
  compareRows: SolutionCompareRow[]
  whenWorks: string[]
  whenNot: string[]
  faqs: SolutionFaq[]
  relatedGuides: SolutionGuide[]
  ctaTitle: string
  ctaBody: string
  theme: SolutionTheme
}

export const solutionPages: SolutionPage[] = [
  {
    slug: 'ai-agent-custom-crm-quoting-system-small-business',
    name: 'AI CRM + Quoting Agent',
    summary: 'Replace spreadsheet CRMs and Word-template quoting. Inbound lead to branded quote in minutes.',
    seoTitle: 'AI CRM and Quoting Agent for Small Business',
    description: 'Custom AI CRM and quoting agent for small business. Capture leads, draft branded quotes from real pricing, follow up automatically, and run one lightweight sales pipeline.',
    keywords: 'ai agent custom crm quoting system small business, ai crm quoting agent small business, custom ai crm small business, ai quoting system small business, ai sales agent small business, custom crm and quoting ai, ai agent for crm and quoting, ai agent quote generator small business, build ai crm small business, custom ai sales agent',
    image: '/blog/ai-agent-custom-crm-quoting-system-small-business.png',
    imageAlt: 'Naurra.ai CRM and quoting agent page preview',
    heroLabel: 'Most popular solution',
    heroTitleTop: 'AI Agent Custom',
    heroTitleBottom: 'CRM Quoting System',
    heroDescription: 'A custom AI CRM and quoting system for small business that captures every inbound lead, drafts a branded quote from your real pricing in minutes, and runs a lightweight CRM your sales team will actually open. Built around your exact products and process. Fixed price, deployed in 4 to 6 weeks.',
    priceRange: '€3.5K - €10K fixed',
    timeline: '4 - 6 weeks',
    runningCost: '€75 - €275/mo running',
    lowPrice: '3500',
    highPrice: '10000',
    cardBadge: 'Most popular',
    proofLabel: 'Real client outcome',
    proofMetric: '~$15K profit every two weeks',
    proofBody: '"Thanos helped me set up automation for my automotive business and it completely changed the game for me. Since implementing it we have been averaging around $15K profit every two weeks."',
    proofSource: 'Automotive reseller',
    proofContext: 'Custom AI quoting + CRM agent',
    proofHref: '/case-studies/automotive-sourcing-engine-profit-automation/',
    proofLinkLabel: 'Read the full automotive case study',
    problemTitle: 'If this sounds familiar, this is for you',
    problemParagraphs: [
      'Leads come in across email, web forms, WhatsApp, and Instagram. Someone copies the details into a spreadsheet, sometimes. Quotes get written in Google Docs from a template, with prices looked up in a separate sheet. Follow-up is sporadic. Win rate is unknown.',
      'The cost is invisible because it shows up in 30-second slices: a forgotten DM, a quote that takes a day to send, a price that gets entered wrong, a lead that never gets followed up on. Across a year it adds up to tens of thousands in lost revenue and a sales process the team quietly hates.',
      'A custom AI CRM and quoting agent removes that friction completely. Lead in, quote out, pipeline updated, follow-up scheduled. Built around exactly how your business sells, not how a SaaS thinks you should.'
    ],
    capabilitiesTitle: 'What the agent actually does',
    capabilities: [
      { title: 'Captures every inbound lead', body: 'Listens across Gmail, web forms, WhatsApp, Instagram DMs, and Telegram. Extracts the real fields that matter using an LLM, not a rigid form.' },
      { title: 'Pulls your real pricing', body: 'Reads from your sheet, Airtable, ERP, or custom database. Applies your margin rules and discount logic so pricing stays consistent.' },
      { title: 'Drafts the quote in your voice', body: 'Branded PDF or doc, your tone, your terms, your signature, and your attachments. Written like the last 50 quotes you sent and won.' },
      { title: 'Logs everything in a custom CRM', body: 'One pipeline view of every lead, every quote, every status. No spreadsheet. No per-seat CRM tax. Built for your sales process exactly.' },
      { title: 'Follows up automatically', body: 'Reminder cadence you approve. Tone calibrated to the relationship. No more forgotten leads or awkward chasing emails.' },
      { title: 'Reports what is actually happening', body: 'Win rate, average deal size, time to quote, by source. Real pipeline visibility for the first time.' }
    ],
    stepsTitle: 'How the build works',
    steps: [
      { label: 'WEEK 1', title: 'Discovery', body: 'We map every channel leads come from, where pricing lives, your tone, and your edge cases. Output: a fixed-price proposal.' },
      { label: 'WEEKS 2 - 3', title: 'Core build', body: 'Lead capture, pricing logic, and quote generation go into a working prototype. You see a real demo at the end of each week.' },
      { label: 'WEEKS 4 - 5', title: 'CRM and integrations', body: 'The lightweight CRM, follow-up logic, and integrations with Gmail, Calendar, Sheets, WhatsApp, and your existing tools get wired up.' },
      { label: 'WEEK 6', title: 'Deploy + tune', body: 'Goes live against your real inbox. We watch the first outputs closely and tune tone and pricing rules until you are confident.' }
    ],
    compareTitle: 'Custom build vs SaaS CRM',
    compareHeaders: {
      baseline: 'Spreadsheet + Docs',
      middle: 'HubSpot / Pipedrive',
      custom: 'Custom AI Agent'
    },
    compareRows: [
      { label: 'Cost (Year 1)', baseline: 'Free + lost revenue', middle: 'EUR2K - EUR13K subscription', custom: 'EUR4K - EUR12K all-in' },
      { label: 'Quote drafting', baseline: 'Manual', middle: 'Templated, manual edit', custom: 'Auto, in your voice' },
      { label: 'Pricing logic', baseline: 'In someone\'s head', middle: 'Limited', custom: 'Yours, encoded' },
      { label: 'Inbound channels', baseline: 'Manual triage', middle: 'Email + form', custom: 'Email, WhatsApp, IG, forms' },
      { label: 'Follow-up', baseline: 'Sporadic', middle: 'Reminders only', custom: 'Auto, tone-calibrated' },
      { label: 'Time to first quote', baseline: 'Hours to a day', middle: '15 - 30 minutes', custom: 'Under 10 minutes' }
    ],
    whenWorks: [
      'You send more than 20 quotes per month',
      'Pricing involves real logic like variants, region rules, or discounts',
      'You lose measurable revenue to slow or missed quotes',
      'Multiple people touch the quoting workflow',
      'Leads come in across more than one channel'
    ],
    whenNot: [
      'You send 5 quotes a month or fewer',
      'Pricing is fully standard with no variation',
      'Sales is purely phone-based with no inbound channels',
      'You do not have a usable source of truth for pricing yet'
    ],
    faqs: [
      { question: 'What does a custom AI CRM and quoting agent cost?', answer: 'A typical small business build lands between EUR3,500 and EUR10,000 as a fixed-price engagement. Ongoing AI and hosting costs after launch are usually EUR75 to EUR275 per month depending on volume.' },
      { question: 'How long does the build take?', answer: 'Most CRM and quoting agents are deployed in 4 to 6 weeks. More complex pipelines with multi-product pricing, multi-currency logic, or deeper integrations can extend to 8 weeks.' },
      { question: 'How is this different from HubSpot, Pipedrive, or Zoho?', answer: 'Off-the-shelf CRMs track pipeline well but still leave quoting logic manual. A custom AI agent is built around your exact products, pricing rules, tone of voice, and sales process.' },
      { question: 'Where does the agent get pricing and inventory from?', answer: 'From whatever source of truth you already use: a Google Sheet, Airtable, an existing ERP, or a custom database. We do not force a stack migration to make the system work.' },
      { question: 'Can the agent send quotes without human review?', answer: 'It can, but we recommend a review loop for the first 50 to 100 quotes. After that you can choose fully automated sending, a one-click approval step, or unattended sending below a certain deal size.' }
    ],
    relatedGuides: [
      { label: 'Deep dive', title: 'How an AI Agent Creates a Custom CRM and Quoting System', body: 'The full walkthrough: capabilities, real example, build process, and failure modes.', href: '/blog/ai-agent-custom-crm-quoting-system-small-business/' },
      { label: 'Pricing', title: 'How Much Does an AI Agent Cost?', body: 'Honest pricing ranges for small business AI builds in 2026.', href: '/blog/how-much-does-an-ai-agent-cost/' },
      { label: 'Decision', title: 'Custom AI vs Off-the-Shelf AI', body: 'When custom is the right call and when SaaS is enough.', href: '/blog/custom-ai-agents-vs-off-the-shelf-ai-which-one-does-your-business-need/' }
    ],
    ctaTitle: 'Ready to scope your build?',
    ctaBody: 'Book a free 30-minute consultation. We will give you an honest read on whether a custom CRM and quoting agent makes sense for your business, and a fixed-price proposal within 48 hours if it does.',
    theme: {
      primary: '#10b981',
      secondary: '#f59e0b',
      primarySoft: 'rgba(16,185,129,0.10)',
      primaryBorder: 'rgba(16,185,129,0.24)',
      secondarySoft: 'rgba(245,158,11,0.10)',
      secondaryBorder: 'rgba(245,158,11,0.24)'
    }
  },
  {
    slug: 'ai-agent-automate-invoicing-payment-reminders-small-business',
    name: 'AI Invoicing Agent',
    summary: 'Issue invoices, chase unpaid balances, reconcile payments. Get back a full day every month.',
    seoTitle: 'AI Invoicing Agent for Small Business',
    description: 'Custom AI invoicing agent for small business. Issue invoices from real billable triggers, chase unpaid balances automatically, and reconcile payments into one clean dashboard.',
    keywords: 'ai agent automate invoicing small business, ai agent payment reminders, ai invoicing automation small business, ai invoicing agent, automated invoicing ai small business, ai accounts receivable automation small business, invoice reminder ai',
    image: '/blog/ai-agent-custom-crm-quoting-system-small-business.png',
    imageAlt: 'Naurra.ai AI invoicing agent page preview',
    heroLabel: 'Revenue operations solution',
    heroTitleTop: 'AI Invoicing',
    heroTitleBottom: 'Payment Reminder Agent',
    heroDescription: 'A custom AI invoicing agent that detects billable work, drafts branded invoices, sends them to the right contact, follows up on overdue balances, and reconciles payments into one clean dashboard. Built around your real billing rules, not generic bookkeeping software.',
    priceRange: '€2.5K - €7K fixed',
    timeline: '3 - 5 weeks',
    runningCost: '€60 - €225/mo running',
    lowPrice: '2500',
    highPrice: '7000',
    cardBadge: 'New',
    proofLabel: 'What changes first',
    proofMetric: '~1 full day back every month',
    proofBody: 'Owners stop burning Fridays on invoice admin. Closed work triggers draft invoices automatically, recurring clients bill themselves on schedule, and overdue balances chase themselves with the tone you approve.',
    proofSource: 'Services businesses',
    proofContext: 'Recurring and milestone billing',
    proofHref: '/case-studies/full-stack-ecommerce-ai-operations-platform/',
    proofLinkLabel: 'See the operations automation case study',
    problemTitle: 'Where invoicing quietly leaks time and money',
    problemParagraphs: [
      'A job finishes, someone opens a Word or Google Docs template, looks up the right amount, finds the billing contact, exports a PDF, and sends it. A week later nobody knows who has paid and who has not. Another week later follow-up still has not happened.',
      'That workflow feels normal because it happens in tiny slices, but it quietly burns 5 to 15 hours a week and creates real revenue leakage through late invoices, missed reminders, duplicate sends, and messy reconciliation.',
      'A custom AI invoicing agent closes that loop end to end. It turns completed work into sent invoices, monitors what is still unpaid, and gives you one view of true outstanding balance every morning.'
    ],
    capabilitiesTitle: 'What the invoicing agent actually does',
    capabilities: [
      { title: 'Detects billable events', body: 'Watches for a project marked complete, a recurring retainer date, a closed CRM deal, or a manual approval trigger from your inbox.' },
      { title: 'Drafts the invoice correctly', body: 'Builds the invoice with your numbering, tax rules, branding, line items, payment terms, and payment link.' },
      { title: 'Finds the right billing contact', body: 'Uses your records to send to accounts payable or the right client contact, not whichever email happens to be easiest.' },
      { title: 'Sends reminders on schedule', body: 'Gentle at 7 days, firmer at 14, formal at 30, always in a tone calibrated to the relationship.' },
      { title: 'Reconciles incoming payments', body: 'Matches bank deposits or Stripe payouts against open invoices and marks them paid automatically.' },
      { title: 'Reports what is still outstanding', body: 'Shows unpaid balance, days-to-pay, and who is chronically slow, without another spreadsheet layer.' }
    ],
    stepsTitle: 'How the build works',
    steps: [
      { label: 'WEEK 1', title: 'Map your billing logic', body: 'We document billable triggers, numbering rules, taxes, follow-up cadence, and edge cases. Output: fixed-price scope.' },
      { label: 'WEEKS 2 - 3', title: 'Invoice generation', body: 'Drafting, sending, and reminder logic go into a working prototype connected to your existing tools.' },
      { label: 'WEEK 4', title: 'Reconciliation + dashboard', body: 'Bank or Stripe matching, payment-state updates, and an owner dashboard get wired up.' },
      { label: 'WEEK 5', title: 'Deploy + tune', body: 'We ship against your real billing cycle and tune reminder tone and exception handling until it feels safe.' }
    ],
    compareTitle: 'Custom build vs invoicing SaaS',
    compareHeaders: {
      baseline: 'Manual + Docs',
      middle: 'Xero / QuickBooks',
      custom: 'Custom AI Agent'
    },
    compareRows: [
      { label: 'Cost (Year 1)', baseline: 'Free + lost time', middle: 'EUR400 - EUR2.4K subscription', custom: 'EUR3K - EUR8K all-in' },
      { label: 'Invoice generation', baseline: 'Manual', middle: 'Template driven', custom: 'Triggered automatically' },
      { label: 'Reminder tone', baseline: 'Whoever remembers', middle: 'Generic sequences', custom: 'Your cadence, your voice' },
      { label: 'Reconciliation', baseline: 'Manual bank checks', middle: 'Partial', custom: 'Matched nightly' },
      { label: 'Client-specific terms', baseline: 'In someone\'s head', middle: 'Awkward workarounds', custom: 'Encoded directly' },
      { label: 'Owner oversight', baseline: 'Scattered', middle: 'Tool specific', custom: 'One clean dashboard' }
    ],
    whenWorks: [
      'You send more than 15 invoices per month',
      'Billing includes milestones, retainers, tax rules, or client-specific terms',
      'Late invoicing or missed follow-up hurts cash flow',
      'More than one person touches billing today'
    ],
    whenNot: [
      'You send fewer than 5 invoices a month',
      'Your billing is fully standard and already clean in one tool',
      'You do not have a stable source of truth for billable work'
    ],
    faqs: [
      { question: 'What does a custom AI invoicing agent cost?', answer: 'Most small business invoicing builds land between EUR2,500 and EUR7,000 depending on workflow complexity, number of integrations, and how much reconciliation logic is involved.' },
      { question: 'Can it work with Stripe, QuickBooks, Xero, or Google Sheets?', answer: 'Yes. We can plug the agent into Stripe, Xero, QuickBooks, Google Sheets, Airtable, project trackers, or a custom database, depending on where billing data already lives.' },
      { question: 'Can I approve invoices before they go out?', answer: 'Absolutely. Many teams start with a review queue so the owner approves the first 30 to 50 invoices before letting the system run more autonomously.' },
      { question: 'Will reminder emails sound too robotic?', answer: 'Not if the system is built correctly. Reminder tone is part of the project. We start gentle, calibrate by client type, and tune the voice against real examples.' },
      { question: 'Does it reconcile payments automatically?', answer: 'Yes, if the payment source is available. The agent can match Stripe payouts or bank deposits against open invoices and update invoice status automatically.' }
    ],
    relatedGuides: [
      { label: 'Deep dive', title: 'How an AI Agent Automates Invoicing and Payment Reminders', body: 'Real example, build process, and where the ROI comes from.', href: '/blog/ai-agent-automate-invoicing-payment-reminders-small-business/' },
      { label: 'Pricing', title: 'How Much Does an AI Agent Cost?', body: 'Broader pricing context across custom AI workflows.', href: '/blog/how-much-does-an-ai-agent-cost/' },
      { label: 'Decision', title: 'Custom AI vs Off-the-Shelf AI', body: 'When a custom finance workflow beats SaaS and when it does not.', href: '/blog/custom-ai-agents-vs-off-the-shelf-ai-which-one-does-your-business-need/' }
    ],
    ctaTitle: 'Want your invoicing to stop depending on memory?',
    ctaBody: 'Book a free consultation and we will tell you honestly whether invoicing is one of the highest-ROI workflows to automate first, and what a fixed-price build would look like.',
    theme: {
      primary: '#f59e0b',
      secondary: '#fb923c',
      primarySoft: 'rgba(245,158,11,0.10)',
      primaryBorder: 'rgba(245,158,11,0.24)',
      secondarySoft: 'rgba(251,146,60,0.10)',
      secondaryBorder: 'rgba(251,146,60,0.24)'
    }
  },
  {
    slug: 'ai-agent-capture-qualify-leads-instagram-whatsapp-email-small-business',
    name: 'AI Lead Capture Agent',
    summary: 'Listen to Instagram, WhatsApp, email, and forms. Qualify leads, reply in your tone, route to sales.',
    seoTitle: 'AI Lead Capture Agent for Small Business',
    description: 'Custom AI lead capture agent for small business. Capture and qualify leads from Instagram, WhatsApp, email, and forms, then route them into one unified pipeline.',
    keywords: 'ai agent capture leads instagram whatsapp email small business, ai lead capture small business, ai lead qualification agent, instagram dm ai agent, whatsapp lead capture ai, multi channel lead capture ai',
    image: '/blog/ai-agent-custom-crm-quoting-system-small-business.png',
    imageAlt: 'Naurra.ai lead capture agent page preview',
    heroLabel: 'Multi-channel sales solution',
    heroTitleTop: 'AI Lead Capture',
    heroTitleBottom: 'Qualification Agent',
    heroDescription: 'A custom AI lead capture agent that listens across Instagram DMs, WhatsApp, email, and forms, replies in your tone within minutes, qualifies each lead against your rules, and routes qualified opportunities into one unified sales pipeline.',
    priceRange: '€2.5K - €8.5K fixed',
    timeline: '4 - 6 weeks',
    runningCost: '€80 - €300/mo running',
    lowPrice: '2500',
    highPrice: '8500',
    cardBadge: 'New',
    proofLabel: 'What the business feels first',
    proofMetric: 'Replies in minutes, not tomorrow',
    proofBody: 'The automotive reseller pattern is the clearest version of this: no lead gets forgotten, quotes go out faster, and conversations stop fragmenting across channels.',
    proofSource: 'Automotive reseller + B2B sales teams',
    proofContext: 'Instagram, WhatsApp, email, forms',
    proofHref: '/case-studies/multi-channel-salesforce-ai-communication-suite/',
    proofLinkLabel: 'Read the multi-channel communication case study',
    problemTitle: 'The real cost of scattered inbound',
    problemParagraphs: [
      'Leads arrive on Instagram, WhatsApp, email, contact forms, and sometimes voice notes. Some are answered fast. Some go cold. Some disappear because nobody was watching that channel at the right moment.',
      'The same prospect messages on WhatsApp Monday and emails Thursday and gets treated like a new conversation each time. Nobody knows true inbound volume, true response time, or true conversion rate by channel.',
      'A custom AI lead capture agent fixes the front door of the business. It listens everywhere, answers fast, filters noise, preserves context, and hands your team only the conversations worth having.'
    ],
    capabilitiesTitle: 'What the lead capture agent actually does',
    capabilities: [
      { title: 'Listens on every inbound channel', body: 'Instagram DMs, WhatsApp, Gmail, contact forms, Telegram, and other channels you already use.' },
      { title: 'Extracts the details that matter', body: 'Product interest, budget, urgency, location, company size, or any other qualification field you care about.' },
      { title: 'Qualifies on your rules', body: 'Wrong country, wrong budget, obvious spam, or bad-fit requests can be filtered or deprioritized automatically.' },
      { title: 'Replies instantly in your tone', body: 'Leads get a real acknowledgement within minutes, even outside working hours, so they never feel ignored.' },
      { title: 'Unifies cross-channel memory', body: 'The same person moving from WhatsApp to email stays one record with full history preserved.' },
      { title: 'Routes only the right leads to sales', body: 'Qualified leads land in your CRM, inbox, or dashboard with the context a human needs to close.' }
    ],
    stepsTitle: 'How the build works',
    steps: [
      { label: 'WEEK 1', title: 'Discovery', body: 'We map every channel, qualification rule, handoff path, and tone guideline. Output: fixed-price scope.' },
      { label: 'WEEKS 2 - 3', title: 'Channel listeners + qualification', body: 'Inbound listeners, extraction logic, and qualification rules go into a working prototype.' },
      { label: 'WEEKS 4 - 5', title: 'Unified memory + routing', body: 'Cross-channel identity, CRM routing, dashboards, and escalation logic get wired up.' },
      { label: 'WEEK 6', title: 'Deploy + tune', body: 'The agent goes live against real inbound and we tune replies and qualification based on actual conversations.' }
    ],
    compareTitle: 'Custom build vs inbox aggregator',
    compareHeaders: {
      baseline: 'Manual triage',
      middle: 'Front / Missive / Crisp',
      custom: 'Custom AI Agent'
    },
    compareRows: [
      { label: 'Response speed', baseline: 'Whoever sees it first', middle: 'Faster inbox view', custom: 'Minutes, automatically' },
      { label: 'Qualification', baseline: 'Manual', middle: 'Manual', custom: 'Encoded from your rules' },
      { label: 'Cross-channel memory', baseline: 'None', middle: 'Partial', custom: 'One lead record across channels' },
      { label: 'Reply drafting', baseline: 'Manual', middle: 'Manual', custom: 'In your voice' },
      { label: 'Reporting', baseline: 'Patchy', middle: 'Channel stats', custom: 'Pipeline + response + source quality' },
      { label: 'Human focus', baseline: 'Everything', middle: 'Still everything', custom: 'Qualified leads only' }
    ],
    whenWorks: [
      'You get more than 30 inbound leads per month',
      'Leads come from 2 or more channels',
      'Slow response is costing you real opportunities',
      'Sales needs better context before stepping in'
    ],
    whenNot: [
      'You get only a handful of leads a month',
      'All inbound already comes through one clean channel',
      'Your qualification logic changes every week'
    ],
    faqs: [
      { question: 'What does a custom AI lead capture agent cost?', answer: 'Most lead capture and qualification builds land between EUR2,500 and EUR8,500 depending on channel count, CRM depth, and whether cross-channel memory is required.' },
      { question: 'Can it work with Instagram, WhatsApp, and Gmail together?', answer: 'Yes. That is the core use case. We connect the channels your business already uses and unify the context into one lead history.' },
      { question: 'Will it auto-reply to every lead?', answer: 'It can, but the safe default is a fast first reply plus qualification and routing. Full autonomous conversations can be phased in once the tone and logic are proven.' },
      { question: 'Can it push into our CRM?', answer: 'Yes. We can route into Salesforce, HubSpot, a custom CRM, Google Sheets, or a lightweight custom dashboard depending on how you already work.' },
      { question: 'How do we stop it from dropping good leads?', answer: 'We start with permissive qualification, review real results, and tighten over time. The first goal is zero missed good leads, not over-optimization on day one.' }
    ],
    relatedGuides: [
      { label: 'Deep dive', title: 'How an AI Agent Captures and Qualifies Leads', body: 'The full multi-channel workflow, real examples, and payback logic.', href: '/blog/ai-agent-capture-qualify-leads-instagram-whatsapp-email-small-business/' },
      { label: 'Pricing', title: 'How Much Does an AI Agent Cost?', body: 'Where lead-capture builds sit inside broader custom AI pricing.', href: '/blog/how-much-does-an-ai-agent-cost/' },
      { label: 'Workflow', title: 'How an AI Agent Creates a CRM + Quoting System', body: 'See what happens after a qualified lead enters the pipeline.', href: '/blog/ai-agent-custom-crm-quoting-system-small-business/' }
    ],
    ctaTitle: 'Want every inbound channel to feel like one brain?',
    ctaBody: 'Book a free consultation and we will map where your leads leak today, whether a custom lead capture layer is justified, and what a fixed-price build would look like.',
    theme: {
      primary: '#22d3ee',
      secondary: '#3b82f6',
      primarySoft: 'rgba(34,211,238,0.10)',
      primaryBorder: 'rgba(34,211,238,0.24)',
      secondarySoft: 'rgba(59,130,246,0.10)',
      secondaryBorder: 'rgba(59,130,246,0.24)'
    }
  },
  {
    slug: 'ai-agent-handle-customer-support-emails-small-business',
    name: 'AI Customer Support Agent',
    summary: 'Triage every support email, draft replies in your voice, auto-resolve the simple ones, escalate the rest.',
    seoTitle: 'AI Support Email Agent for Small Business',
    description: 'Custom AI support email agent for small business. Triage support emails, look up real order or account data, draft replies in your tone, and escalate only what truly needs a human.',
    keywords: 'ai agent customer support emails small business, ai support email agent, ai customer support automation small business, ai help desk agent, support email triage ai',
    image: '/blog/ai-agent-custom-crm-quoting-system-small-business.png',
    imageAlt: 'Naurra.ai support email agent page preview',
    heroLabel: 'Operations solution',
    heroTitleTop: 'AI Support Email',
    heroTitleBottom: 'Resolution Agent',
    heroDescription: 'A custom AI support agent that reads every incoming support email, classifies it, looks up the real data, drafts the real reply in your tone, auto-resolves the categories you allow, and escalates only the hard cases with context.',
    priceRange: '€2K - €7K fixed',
    timeline: '3 - 5 weeks',
    runningCost: '€60 - €225/mo running',
    lowPrice: '2000',
    highPrice: '7000',
    cardBadge: 'New',
    proofLabel: 'What changes operationally',
    proofMetric: 'Support replies in minutes',
    proofBody: 'For small teams, support stops being the founder\'s background task. Repetitive questions resolve themselves, complex issues arrive pre-triaged, and response time drops without adding headcount.',
    proofSource: 'Wellness e-commerce + support-heavy teams',
    proofContext: 'Email-first support flows',
    proofHref: '/case-studies/full-stack-ecommerce-ai-operations-platform/',
    proofLinkLabel: 'Read the e-commerce automation case study',
    problemTitle: 'Why support still feels heavier than it should',
    problemParagraphs: [
      'Support emails usually land in a shared inbox or, worse, the founder\'s inbox. Common questions get answered from scratch, order lookups require jumping into another tool, and edge cases sit unanswered for too long.',
      'Most teams fix this by adding a help desk UI, but the hard part never was the UI. It was the thinking, the data lookup, the drafting, and the consistency of reply quality.',
      'A custom AI support agent handles the repetitive 80 percent, escalates the sensitive 20 percent, and gives humans back the part of support that actually needs judgment.'
    ],
    capabilitiesTitle: 'What the support agent actually does',
    capabilities: [
      { title: 'Reads every support email', body: 'Monitors your support inbox continuously so no message sits unseen because a person was busy.' },
      { title: 'Classifies the issue correctly', body: 'Order status, refund, shipping, technical question, complaint, spam, partnership, or any category you define.' },
      { title: 'Looks up the real data', body: 'Pulls from Shopify, an order system, your CRM, a sheet, or a knowledge base before drafting the reply.' },
      { title: 'Drafts replies in your tone', body: 'Writes complete, context-aware responses that sound like your team, not a generic bot widget.' },
      { title: 'Auto-resolves simple categories', body: 'Order status, basic FAQ, or low-risk requests can resolve themselves once you approve the rules.' },
      { title: 'Escalates the hard cases with context', body: 'Humans receive the email, the category, the data, and a draft already 80 percent done.' }
    ],
    stepsTitle: 'How the build works',
    steps: [
      { label: 'WEEK 1', title: 'Discovery', body: 'We map support categories, tone, data sources, and escalation rules. Output: fixed-price scope.' },
      { label: 'WEEKS 2 - 3', title: 'Ingestion + drafting', body: 'Email intake, classification, data lookup, and reply drafting go into a working prototype.' },
      { label: 'WEEK 4', title: 'Auto-resolution + escalation', body: 'Low-risk categories, reviewer dashboards, and human handoff rules get wired up.' },
      { label: 'WEEK 5', title: 'Deploy + tune', body: 'We go live against your real inbox and tune tone, accuracy, and auto-resolve thresholds based on audited output.' }
    ],
    compareTitle: 'Custom build vs help desk SaaS',
    compareHeaders: {
      baseline: 'Shared inbox',
      middle: 'Zendesk / Intercom',
      custom: 'Custom AI Agent'
    },
    compareRows: [
      { label: 'Reply drafting', baseline: 'Manual', middle: 'Mostly manual', custom: 'In your tone, with real data' },
      { label: 'Issue classification', baseline: 'Manual', middle: 'Tags + macros', custom: 'Automatic' },
      { label: 'Data lookup', baseline: 'Tab switching', middle: 'Partial', custom: 'Built into the workflow' },
      { label: 'Auto-resolution', baseline: 'None', middle: 'Limited', custom: 'Per category, with controls' },
      { label: 'Escalation quality', baseline: 'Raw inbox forward', middle: 'Ticket handoff', custom: 'Context + draft included' },
      { label: 'Response time', baseline: 'Hours to days', middle: 'Better queueing', custom: 'Minutes' }
    ],
    whenWorks: [
      'You handle more than 100 support emails per month',
      'A meaningful share are repetitive or lookup-driven',
      'Response time is slower than you want today',
      'You already have order or customer data the agent can read'
    ],
    whenNot: [
      'You get only a few support emails each week',
      'Support is mostly phone based',
      'There is no usable source of truth for account or order data'
    ],
    faqs: [
      { question: 'What does a custom AI support agent cost?', answer: 'Most support email builds land between EUR2,000 and EUR7,000 depending on data complexity, inbox volume, and how much autonomous resolution you want.' },
      { question: 'Can it connect to Shopify or our order database?', answer: 'Yes. That is usually the whole point. The agent can pull live order, shipment, or account data before drafting the reply.' },
      { question: 'Will it auto-send replies on day one?', answer: 'Not by default. Most teams start with classification and drafting only, then enable auto-resolution for low-risk categories after auditing enough outputs.' },
      { question: 'How do we keep the tone on-brand?', answer: 'We tune against your actual sent emails. Tone calibration is part of the rollout, and we review outputs closely during the first live weeks.' },
      { question: 'Can humans step in easily?', answer: 'Yes. Every agent needs a clean human handoff path. Hard cases are escalated with all the context and a draft, not dumped raw into somebody else\'s queue.' }
    ],
    relatedGuides: [
      { label: 'Deep dive', title: 'How an AI Agent Handles Customer Support Emails', body: 'Real examples, build stages, and where autonomous support actually pays back.', href: '/blog/ai-agent-handle-customer-support-emails-small-business/' },
      { label: 'Pricing', title: 'How Much Does an AI Agent Cost?', body: 'Support automation pricing in the context of broader custom AI work.', href: '/blog/how-much-does-an-ai-agent-cost/' },
      { label: 'Workflow', title: 'How AI Organizes Emails, Summaries, and Replies', body: 'A practical guide to what modern email automation should feel like.', href: '/blog/how-ai-organizes-emails-summaries-bulk-replies-and-meetings/' }
    ],
    ctaTitle: 'Want support email to stop being a founder tax?',
    ctaBody: 'Book a free consultation and we will tell you whether support is the right first workflow to automate, what should stay human, and what a fixed-price build would cost.',
    theme: {
      primary: '#a78bfa',
      secondary: '#8b5cf6',
      primarySoft: 'rgba(167,139,250,0.10)',
      primaryBorder: 'rgba(167,139,250,0.24)',
      secondarySoft: 'rgba(139,92,246,0.10)',
      secondaryBorder: 'rgba(139,92,246,0.24)'
    }
  },
  {
    slug: 'ai-agent-schedule-confirm-client-appointments-small-business',
    name: 'AI Scheduling Agent',
    summary: 'Book appointments over WhatsApp and email, send confirmations, handle reschedules, reduce no-shows.',
    seoTitle: 'AI Scheduling and Confirmation Agent for Small Business',
    description: 'Custom AI scheduling agent for small business. Book appointments over WhatsApp and email, confirm automatically, handle reschedules, and reduce no-shows.',
    keywords: 'ai scheduling agent small business, ai appointment scheduler small business, ai agent confirm appointments, ai booking agent whatsapp, ai no show reduction agent, ai appointment automation',
    image: '/blog/ai-agent-custom-crm-quoting-system-small-business.png',
    imageAlt: 'Naurra.ai scheduling agent page preview',
    heroLabel: 'Service business solution',
    heroTitleTop: 'AI Scheduling',
    heroTitleBottom: 'Confirmation Agent',
    heroDescription: 'A custom AI scheduling agent that books appointments over WhatsApp, email, and messaging, confirms automatically, handles reschedules without a human, and gives you real visibility into no-shows and channel performance.',
    priceRange: '€2K - €5.5K fixed',
    timeline: '3 - 5 weeks',
    runningCost: '€60 - €190/mo running',
    lowPrice: '2000',
    highPrice: '5500',
    cardBadge: 'New',
    proofLabel: 'Why teams start here',
    proofMetric: 'Less scheduling chaos, fewer no-shows',
    proofBody: 'The same conversational AI pattern that helps travel teams respond 10x faster can be applied to clinics, salons, consultancies, and service businesses where booking still happens in message threads.',
    proofSource: 'Travel concierge + service businesses',
    proofContext: 'WhatsApp, email, DMs, calendar',
    proofHref: '/case-studies/ai-travel-concierge-whatsapp-telegram-itineraries/',
    proofLinkLabel: 'Read the travel concierge case study',
    problemTitle: 'Scheduling feels small until it steals every day',
    problemParagraphs: [
      'A client asks for a slot over WhatsApp or email, someone checks the calendar manually, offers two or three options, waits for the reply, creates the event, and hopes the reminder goes out. Then the reschedule message arrives five minutes before the slot.',
      'That workflow does not look expensive because it happens in fragments, but it quietly burns 5 to 15 hours a week and can wipe out revenue through no-shows, slow responses, and double-handling.',
      'A custom AI scheduling agent gives you a real booking layer for the channels your clients already use, without forcing everyone through a brittle link-based flow.'
    ],
    capabilitiesTitle: 'What the scheduling agent actually does',
    capabilities: [
      { title: 'Listens for booking requests', body: 'Picks up appointment requests across WhatsApp, Gmail, Instagram DMs, or website chat.' },
      { title: 'Runs the booking conversation', body: 'Asks the right questions for service type, duration, location, deposit, or any qualifier you need.' },
      { title: 'Books into the real calendar', body: 'Creates the appointment in Google Calendar, Outlook, or a custom system with the right metadata attached.' },
      { title: 'Sends confirmations and reminders', body: 'Immediate confirmation plus day-before or hour-before reminders on the channel the client actually prefers.' },
      { title: 'Handles reschedules and cancellations', body: 'Moves slots, reopens availability, and updates both sides without a human in the middle.' },
      { title: 'Tracks bookings and no-shows', body: 'Gives you real data on which channels convert best and where no-shows actually come from.' }
    ],
    stepsTitle: 'How the build works',
    steps: [
      { label: 'WEEK 1', title: 'Discovery', body: 'We map service types, buffer rules, channels, deposits, and reminder cadence. Output: fixed-price scope.' },
      { label: 'WEEKS 2 - 3', title: 'Booking engine', body: 'Conversation flow, calendar integration, and slot logic go into a working prototype.' },
      { label: 'WEEK 4', title: 'Reminders + reschedules', body: 'Confirmation rules, reminder timing, cancellation flow, and no-show tracking get wired up.' },
      { label: 'WEEK 5', title: 'Deploy + tune', body: 'The system goes live against real bookings and we tune edge cases like awkward requests, timing, and escalation.' }
    ],
    compareTitle: 'Custom build vs booking SaaS',
    compareHeaders: {
      baseline: 'Manual inbox',
      middle: 'Calendly',
      custom: 'Custom AI Agent'
    },
    compareRows: [
      { label: 'Channel fit', baseline: 'Wherever the client writes', middle: 'Link driven', custom: 'Wherever the client writes' },
      { label: 'Reschedules', baseline: 'Manual back-and-forth', middle: 'Okay for simple cases', custom: 'Handled automatically' },
      { label: 'Reminder logic', baseline: 'Ad hoc', middle: 'Basic', custom: 'Tuned to reduce no-shows' },
      { label: 'Service complexity', baseline: 'Human memory', middle: 'Best for simple services', custom: 'Built around your real rules' },
      { label: 'Tone', baseline: 'Human', middle: 'Generic UX', custom: 'Your voice' },
      { label: 'No-show reporting', baseline: 'Unknown', middle: 'Partial', custom: 'Tracked by channel and time' }
    ],
    whenWorks: [
      'You handle more than 50 appointments per month',
      'Clients prefer messaging over booking links',
      'No-shows or reschedules cost real revenue',
      'Services have enough rules that Calendly starts to creak'
    ],
    whenNot: [
      'You book only a few appointments each week',
      'Every service is radically bespoke and must stay human',
      'You are already getting good results from a simple scheduling link'
    ],
    faqs: [
      { question: 'What does a custom AI scheduling agent cost?', answer: 'Most scheduling builds land between EUR2,000 and EUR5,500 depending on service complexity, number of channels, and how much reminder or reschedule logic is involved.' },
      { question: 'Can it work with Google Calendar?', answer: 'Yes. Google Calendar is a common target, but we can also work with Outlook or other systems if needed.' },
      { question: 'Will it prevent overbooking?', answer: 'Yes, if the availability and buffer rules are mapped correctly. That is one of the most important parts of discovery and live testing.' },
      { question: 'Can it handle deposits or pre-visit questions?', answer: 'Yes. We can build those prompts and conditions into the booking flow so the conversation collects the right details before the appointment is confirmed.' },
      { question: 'What happens when a request is weird or out of scope?', answer: 'The agent escalates gracefully. Real scheduling agents need a human handoff path for unusual requests instead of hard-failing in the conversation.' }
    ],
    relatedGuides: [
      { label: 'Deep dive', title: 'How an AI Agent Schedules and Confirms Appointments', body: 'The full walkthrough for WhatsApp, email, reminders, and no-show reduction.', href: '/blog/ai-agent-schedule-confirm-client-appointments-small-business/' },
      { label: 'Meeting workflow', title: 'How to Use AI for Meeting Follow-Ups', body: 'What happens after the booking once the meeting actually takes place.', href: '/blog/how-to-use-ai-for-meeting-follow-ups-without-missing-action-items/' },
      { label: 'Pricing', title: 'How Much Does an AI Agent Cost?', body: 'Broader pricing context for service business automation builds.', href: '/blog/how-much-does-an-ai-agent-cost/' }
    ],
    ctaTitle: 'Want bookings to stop living in message threads?',
    ctaBody: 'Book a free consultation and we will tell you whether scheduling is worth custom automation for your business, which parts should stay human, and what a fixed-price build would look like.',
    theme: {
      primary: '#38bdf8',
      secondary: '#6366f1',
      primarySoft: 'rgba(56,189,248,0.10)',
      primaryBorder: 'rgba(56,189,248,0.24)',
      secondarySoft: 'rgba(99,102,241,0.10)',
      secondaryBorder: 'rgba(99,102,241,0.24)'
    }
  },
  {
    slug: 'ai-agent-generate-proposals-statements-of-work-small-business',
    name: 'AI Proposal Agent',
    summary: 'Read the brief, search past wins, draft scope and pricing in your voice, output a branded PDF.',
    seoTitle: 'AI Proposal and Statement of Work Agent for Small Business',
    description: 'Custom AI proposal and statement of work agent for small business. Read inbound briefs, search past wins, draft scope and pricing in your voice, and output branded proposals fast.',
    keywords: 'ai proposal agent small business, ai statement of work generator, ai proposal automation, ai agent generate proposals small business, ai sow generator, proposal drafting ai',
    image: '/blog/ai-agent-custom-crm-quoting-system-small-business.png',
    imageAlt: 'Naurra.ai proposal agent page preview',
    heroLabel: 'Sales acceleration solution',
    heroTitleTop: 'AI Proposal',
    heroTitleBottom: 'Statement of Work Agent',
    heroDescription: 'A custom AI proposal agent that reads inbound briefs, searches your past won work, drafts scope and pricing in your voice, inserts the right clauses, and outputs a branded proposal for human review in minutes instead of days.',
    priceRange: '€2.5K - €8.5K fixed',
    timeline: '4 - 6 weeks',
    runningCost: '€80 - €300/mo running',
    lowPrice: '2500',
    highPrice: '8500',
    cardBadge: 'New',
    proofLabel: 'What teams notice first',
    proofMetric: '95% faster proposal processing',
    proofBody: 'The HVAC-style quoting pattern is the clearest proof: once the agent can read the brief, search the right reference material, and apply pricing logic, the bottleneck collapses.' ,
    proofSource: 'HVAC quoting + document-heavy teams',
    proofContext: 'Scope, pricing, clauses, output',
    proofHref: '/case-studies/mep-quotation-intelligence-hvac-case-study/',
    proofLinkLabel: 'Read the HVAC quotation case study',
    problemTitle: 'Where proposals lose deals before you even send them',
    problemParagraphs: [
      'A qualified lead asks for a proposal, and a senior person loses two to four hours to writing it. They copy from an old version, rewrite the scope, hunt for the right clauses, fix the formatting, and send later than they wanted.',
      'The real cost is not just time. Slow proposals lose to faster competitors, pricing gets inconsistent, and the team never builds a reliable system for learning from what wins.',
      'A custom AI proposal agent turns your library of past wins and pricing logic into an execution system, so humans focus on judgment while the document assembly work happens in minutes.'
    ],
    capabilitiesTitle: 'What the proposal agent actually does',
    capabilities: [
      { title: 'Reads the inbound brief', body: 'Understands the scope, requirements, timeline, and budget signals from emails, forms, transcripts, or voice notes.' },
      { title: 'Searches your past wins', body: 'Pulls the closest proposals or SOWs from your own history so new work starts from proven material.' },
      { title: 'Drafts scope in your voice', body: 'Writes the deliverables, assumptions, exclusions, milestones, and structure the way your team already sells.' },
      { title: 'Calculates pricing from your rules', body: 'Applies base rates, modifiers, volume logic, regional adjustments, or any other rules you already use.' },
      { title: 'Inserts the right clauses', body: 'Uses your approved legal language for payment terms, IP, confidentiality, and change requests.' },
      { title: 'Outputs a branded document', body: 'Creates a clean PDF or doc for review and one-click send, without another copy-paste session.' }
    ],
    stepsTitle: 'How the build works',
    steps: [
      { label: 'WEEK 1', title: 'Discovery', body: 'We map your service catalog, pricing logic, clause library, and past proposal corpus. Output: fixed-price scope.' },
      { label: 'WEEKS 2 - 3', title: 'Scope + pricing engine', body: 'Brief ingestion, past-proposal search, scope drafting, and pricing logic go into a working prototype.' },
      { label: 'WEEKS 4 - 5', title: 'Clauses + output', body: 'Clause selection, PDF or doc rendering, branding, and review workflow get wired up.' },
      { label: 'WEEK 6', title: 'Deploy + tune', body: 'We test against real briefs and refine scope drafting, pricing consistency, and document quality until it is reliable.' }
    ],
    compareTitle: 'Custom build vs proposal SaaS',
    compareHeaders: {
      baseline: 'Old templates',
      middle: 'PandaDoc / Proposify',
      custom: 'Custom AI Agent'
    },
    compareRows: [
      { label: 'Writing effort', baseline: 'Hours every time', middle: 'Still mostly manual', custom: 'Drafted automatically' },
      { label: 'Pricing consistency', baseline: 'Writer dependent', middle: 'Template based', custom: 'Rule based' },
      { label: 'Past win reuse', baseline: 'Manual memory', middle: 'Not native', custom: 'Searches your real corpus' },
      { label: 'Clause control', baseline: 'Copy-paste risk', middle: 'Template management', custom: 'Approved language inserted automatically' },
      { label: 'Speed to send', baseline: 'Day or more', middle: 'Better workflow', custom: 'Minutes to reviewable draft' },
      { label: 'Learning loop', baseline: 'Weak', middle: 'Activity analytics', custom: 'Structured inputs and outcomes' }
    ],
    whenWorks: [
      'You send more than 10 proposals per month',
      'Proposal writing burns senior time today',
      'Slow proposals are losing you deals',
      'You have at least 30 to 50 past proposals to learn from'
    ],
    whenNot: [
      'You send only a few proposals a month',
      'Every proposal is totally bespoke with no reusable structure',
      'Pricing rules only exist in someone\'s head and nobody will document them'
    ],
    faqs: [
      { question: 'What does a custom AI proposal agent cost?', answer: 'Most proposal and SOW builds land between EUR2,500 and EUR8,500 depending on pricing complexity, clause management, and output requirements.' },
      { question: 'Can it use our past proposals as reference material?', answer: 'Yes. That is usually the most valuable part of the system. We curate your wins into a usable corpus so new proposals start from proven material.' },
      { question: 'Will it send proposals without a human review?', answer: 'Not recommended. Proposal workflows should keep a human approval step because they are commercial documents with real pricing and legal implications.' },
      { question: 'Can it handle different pricing models?', answer: 'Yes. Fixed fee, day rate, milestone based, retainers, volume modifiers, and similar logic can all be encoded if the rules are documented.' },
      { question: 'Can it output a branded PDF?', answer: 'Yes. We can generate a branded PDF or document so the output feels client-ready rather than like raw AI text.' }
    ],
    relatedGuides: [
      { label: 'Deep dive', title: 'How an AI Agent Generates Proposals and SOWs', body: 'The complete workflow from inbound brief to review-ready proposal.', href: '/blog/ai-agent-generate-proposals-statements-of-work-small-business/' },
      { label: 'Pricing', title: 'How Much Does an AI Agent Cost?', body: 'Where proposal builds sit inside the wider custom AI pricing picture.', href: '/blog/how-much-does-an-ai-agent-cost/' },
      { label: 'Workflow', title: 'How an AI Agent Creates a CRM + Quoting System', body: 'See the adjacent workflow when proposals and quotes are part of the same sales engine.', href: '/blog/ai-agent-custom-crm-quoting-system-small-business/' }
    ],
    ctaTitle: 'Want proposals to stop being a bottleneck?',
    ctaBody: 'Book a free consultation and we will tell you honestly whether proposal generation is the right workflow to automate first, what should stay human, and what a fixed-price build would look like.',
    theme: {
      primary: '#fb7185',
      secondary: '#ec4899',
      primarySoft: 'rgba(251,113,133,0.10)',
      primaryBorder: 'rgba(251,113,133,0.24)',
      secondarySoft: 'rgba(236,72,153,0.10)',
      secondaryBorder: 'rgba(236,72,153,0.24)'
    }
  }
]

export const solutionPageBySlug = new Map(solutionPages.map((solution) => [solution.slug, solution]))
