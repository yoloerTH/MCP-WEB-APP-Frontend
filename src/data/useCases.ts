export interface UseCase {
  id: string
  title: string
  description: string
  category: 'email' | 'calendar' | 'documents' | 'multi-service' | 'quick-tasks'
  icon: string
  examplePrompt: string
  tags: string[] // For smart weighting
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export const USE_CASES: UseCase[] = [
  // Email Productivity (8 scenarios)
  {
    id: 'email-1',
    title: 'Draft Professional Email',
    description: 'Compose emails with proper tone and formatting',
    category: 'email',
    icon: '✉️',
    examplePrompt: 'Draft an email to my team about the project update',
    tags: ['gmail', 'writing', 'communication', 'professional'],
    difficulty: 'beginner'
  },
  {
    id: 'email-2',
    title: 'Email Follow-up Automation',
    description: 'Send follow-up emails to unread messages',
    category: 'email',
    icon: '🔄',
    examplePrompt: 'Send follow-ups to emails I haven\'t replied to this week',
    tags: ['gmail', 'automation', 'business_owner', 'professional'],
    difficulty: 'intermediate'
  },
  {
    id: 'email-3',
    title: 'Email Summary Report',
    description: 'Get a summary of important emails from today',
    category: 'email',
    icon: '📊',
    examplePrompt: 'Summarize my emails from today',
    tags: ['gmail', 'analysis', 'productivity', 'professional'],
    difficulty: 'beginner'
  },
  {
    id: 'email-4',
    title: 'Bulk Email Organization',
    description: 'Archive, label, or delete emails matching criteria',
    category: 'email',
    icon: '📁',
    examplePrompt: 'Archive all promotional emails from last month',
    tags: ['gmail', 'organization', 'productivity'],
    difficulty: 'intermediate'
  },
  {
    id: 'email-5',
    title: 'Schedule Email Send',
    description: 'Draft an email to be sent at a specific time',
    category: 'email',
    icon: '⏰',
    examplePrompt: 'Draft email to send tomorrow at 9am about the meeting',
    tags: ['gmail', 'scheduling', 'professional'],
    difficulty: 'intermediate'
  },
  {
    id: 'email-6',
    title: 'Email to Contact Lookup',
    description: 'Find someone\'s email and send a message',
    category: 'email',
    icon: '🔍',
    examplePrompt: 'Find John\'s email and send him the report',
    tags: ['gmail', 'contacts', 'business_owner', 'professional'],
    difficulty: 'intermediate'
  },
  {
    id: 'email-7',
    title: 'Email Template Creation',
    description: 'Create reusable email templates for common messages',
    category: 'email',
    icon: '📝',
    examplePrompt: 'Create a template for weekly status updates',
    tags: ['gmail', 'templates', 'professional'],
    difficulty: 'intermediate'
  },
  {
    id: 'email-8',
    title: 'Priority Inbox Filter',
    description: 'Identify and highlight urgent emails',
    category: 'email',
    icon: '⚡',
    examplePrompt: 'Show me urgent emails from my boss',
    tags: ['gmail', 'filtering', 'productivity', 'professional'],
    difficulty: 'beginner'
  },

  // Calendar Management (8 scenarios)
  {
    id: 'calendar-1',
    title: 'Schedule Meeting',
    description: 'Create calendar events with attendees and details',
    category: 'calendar',
    icon: '📅',
    examplePrompt: 'Schedule a team meeting next Tuesday at 2pm',
    tags: ['calendar', 'scheduling', 'meetings', 'professional'],
    difficulty: 'beginner'
  },
  {
    id: 'calendar-2',
    title: 'Find Available Time Slots',
    description: 'Check calendar for open times to schedule meetings',
    category: 'calendar',
    icon: '🕒',
    examplePrompt: 'When am I free this week for a 1-hour meeting?',
    tags: ['calendar', 'scheduling', 'productivity'],
    difficulty: 'beginner'
  },
  {
    id: 'calendar-3',
    title: 'Daily Schedule Overview',
    description: 'Get a summary of your day\'s appointments',
    category: 'calendar',
    icon: '🌅',
    examplePrompt: 'What\'s on my calendar today?',
    tags: ['calendar', 'planning', 'productivity'],
    difficulty: 'beginner'
  },
  {
    id: 'calendar-4',
    title: 'Reschedule Events',
    description: 'Move meetings to different times automatically',
    category: 'calendar',
    icon: '↔️',
    examplePrompt: 'Move all my meetings from Friday to next Monday',
    tags: ['calendar', 'rescheduling', 'professional'],
    difficulty: 'intermediate'
  },
  {
    id: 'calendar-5',
    title: 'Recurring Event Setup',
    description: 'Create repeating calendar events',
    category: 'calendar',
    icon: '🔁',
    examplePrompt: 'Create a weekly standup meeting every Monday at 10am',
    tags: ['calendar', 'recurring', 'professional'],
    difficulty: 'intermediate'
  },
  {
    id: 'calendar-6',
    title: 'Block Focus Time',
    description: 'Reserve calendar blocks for deep work',
    category: 'calendar',
    icon: '🎯',
    examplePrompt: 'Block 2 hours tomorrow morning for focused work',
    tags: ['calendar', 'productivity', 'focus'],
    difficulty: 'beginner'
  },
  {
    id: 'calendar-7',
    title: 'Event Reminders',
    description: 'Set custom reminders for important events',
    category: 'calendar',
    icon: '🔔',
    examplePrompt: 'Remind me about the dentist appointment 1 day before',
    tags: ['calendar', 'reminders', 'personal'],
    difficulty: 'beginner'
  },
  {
    id: 'calendar-8',
    title: 'Meeting Conflict Resolution',
    description: 'Identify and resolve scheduling conflicts',
    category: 'calendar',
    icon: '⚠️',
    examplePrompt: 'Show me any calendar conflicts this week',
    tags: ['calendar', 'conflicts', 'professional'],
    difficulty: 'intermediate'
  },

  // Document Workflow (8 scenarios)
  {
    id: 'docs-1',
    title: 'Create New Document',
    description: 'Generate docs with outlines and content',
    category: 'documents',
    icon: '📄',
    examplePrompt: 'Create a document about project updates',
    tags: ['docs', 'writing', 'student', 'professional'],
    difficulty: 'beginner'
  },
  {
    id: 'docs-2',
    title: 'Research Paper Outline',
    description: 'Build structured academic document outlines',
    category: 'documents',
    icon: '🎓',
    examplePrompt: 'Create an outline for my research paper on AI',
    tags: ['docs', 'research', 'student', 'academic'],
    difficulty: 'intermediate'
  },
  {
    id: 'docs-3',
    title: 'Find and Share File',
    description: 'Locate documents in Drive and share with team',
    category: 'documents',
    icon: '🔗',
    examplePrompt: 'Find my presentation and share it with the team',
    tags: ['drive', 'sharing', 'collaboration', 'professional'],
    difficulty: 'beginner'
  },
  {
    id: 'docs-4',
    title: 'Spreadsheet Data Analysis',
    description: 'Analyze data in Google Sheets and summarize insights',
    category: 'documents',
    icon: '📈',
    examplePrompt: 'Analyze the sales data in my spreadsheet',
    tags: ['sheets', 'data', 'analysis', 'business_owner'],
    difficulty: 'intermediate'
  },
  {
    id: 'docs-5',
    title: 'Document Template Generation',
    description: 'Create reusable document templates',
    category: 'documents',
    icon: '📋',
    examplePrompt: 'Create a meeting notes template',
    tags: ['docs', 'templates', 'professional'],
    difficulty: 'beginner'
  },
  {
    id: 'docs-6',
    title: 'Folder Organization',
    description: 'Organize Drive files into structured folders',
    category: 'documents',
    icon: '🗂️',
    examplePrompt: 'Organize my Drive files by project',
    tags: ['drive', 'organization', 'productivity'],
    difficulty: 'intermediate'
  },
  {
    id: 'docs-7',
    title: 'Presentation Creation',
    description: 'Build slide decks with content and structure',
    category: 'documents',
    icon: '🎬',
    examplePrompt: 'Create a presentation about quarterly results',
    tags: ['slides', 'presentations', 'business_owner', 'professional'],
    difficulty: 'intermediate'
  },
  {
    id: 'docs-8',
    title: 'Document Version Comparison',
    description: 'Compare different versions of a document',
    category: 'documents',
    icon: '🔄',
    examplePrompt: 'What changed in the latest version of the contract?',
    tags: ['docs', 'versioning', 'professional'],
    difficulty: 'advanced'
  },

  // Multi-Service Orchestration (10 scenarios)
  {
    id: 'multi-1',
    title: 'Meeting Notes to Email',
    description: 'Create meeting notes in Docs and email to attendees',
    category: 'multi-service',
    icon: '🤝',
    examplePrompt: 'Create meeting notes and email them to the team',
    tags: ['docs', 'gmail', 'meetings', 'professional'],
    difficulty: 'intermediate'
  },
  {
    id: 'multi-2',
    title: 'Event with Document',
    description: 'Schedule meeting and create agenda document',
    category: 'multi-service',
    icon: '📅📄',
    examplePrompt: 'Schedule a planning meeting and create an agenda',
    tags: ['calendar', 'docs', 'meetings', 'professional'],
    difficulty: 'intermediate'
  },
  {
    id: 'multi-3',
    title: 'Email to Calendar Event',
    description: 'Convert email details into calendar appointment',
    category: 'multi-service',
    icon: '✉️📅',
    examplePrompt: 'Add the event from John\'s email to my calendar',
    tags: ['gmail', 'calendar', 'scheduling'],
    difficulty: 'intermediate'
  },
  {
    id: 'multi-4',
    title: 'Weekly Report Generation',
    description: 'Compile weekly data into document and email',
    category: 'multi-service',
    icon: '📊✉️',
    examplePrompt: 'Create weekly report from my calendar and email it to my manager',
    tags: ['calendar', 'docs', 'gmail', 'professional', 'reports'],
    difficulty: 'advanced'
  },
  {
    id: 'multi-5',
    title: 'Task List from Emails',
    description: 'Extract action items from emails into Keep notes',
    category: 'multi-service',
    icon: '✅',
    examplePrompt: 'Find action items in my emails and create a task list',
    tags: ['gmail', 'keep', 'productivity'],
    difficulty: 'intermediate'
  },
  {
    id: 'multi-6',
    title: 'Share Drive File via Email',
    description: 'Locate file in Drive and email link to recipient',
    category: 'multi-service',
    icon: '📎',
    examplePrompt: 'Find the Q4 report and email it to Sarah',
    tags: ['drive', 'gmail', 'sharing', 'professional'],
    difficulty: 'beginner'
  },
  {
    id: 'multi-7',
    title: 'Survey Creation and Distribution',
    description: 'Create Google Form and email to distribution list',
    category: 'multi-service',
    icon: '📝✉️',
    examplePrompt: 'Create a feedback form and send it to the team',
    tags: ['forms', 'gmail', 'feedback', 'professional'],
    difficulty: 'intermediate'
  },
  {
    id: 'multi-8',
    title: 'Data Export to Sheet',
    description: 'Export email or calendar data to spreadsheet',
    category: 'multi-service',
    icon: '📊',
    examplePrompt: 'Export this week\'s meeting attendees to a spreadsheet',
    tags: ['calendar', 'sheets', 'data', 'analysis'],
    difficulty: 'advanced'
  },
  {
    id: 'multi-9',
    title: 'Project Kickoff Package',
    description: 'Create folder, docs, and calendar event for new project',
    category: 'multi-service',
    icon: '🚀',
    examplePrompt: 'Set up a new project with folder, doc, and kickoff meeting',
    tags: ['drive', 'docs', 'calendar', 'professional', 'projects'],
    difficulty: 'advanced'
  },
  {
    id: 'multi-10',
    title: 'Automated Status Updates',
    description: 'Compile calendar, email, and docs into status update',
    category: 'multi-service',
    icon: '🔄',
    examplePrompt: 'Create a status update from my week\'s activities',
    tags: ['calendar', 'gmail', 'docs', 'professional', 'reports'],
    difficulty: 'advanced'
  },

  // Quick Tasks (6 scenarios)
  {
    id: 'quick-1',
    title: 'Quick Email Check',
    description: 'Check for urgent or important emails',
    category: 'quick-tasks',
    icon: '⚡',
    examplePrompt: 'Any urgent emails?',
    tags: ['gmail', 'quick', 'productivity'],
    difficulty: 'beginner'
  },
  {
    id: 'quick-2',
    title: 'Next Meeting Info',
    description: 'Get details about your next appointment',
    category: 'quick-tasks',
    icon: '⏭️',
    examplePrompt: 'What\'s my next meeting?',
    tags: ['calendar', 'quick', 'scheduling'],
    difficulty: 'beginner'
  },
  {
    id: 'quick-3',
    title: 'Quick File Search',
    description: 'Find a specific file in Drive',
    category: 'quick-tasks',
    icon: '🔎',
    examplePrompt: 'Find my resume',
    tags: ['drive', 'quick', 'search'],
    difficulty: 'beginner'
  },
  {
    id: 'quick-4',
    title: 'Add Quick Note',
    description: 'Create a quick note in Keep',
    category: 'quick-tasks',
    icon: '📝',
    examplePrompt: 'Add note: buy milk',
    tags: ['keep', 'quick', 'notes'],
    difficulty: 'beginner'
  },
  {
    id: 'quick-5',
    title: 'Cancel Meeting',
    description: 'Remove event from calendar and notify attendees',
    category: 'quick-tasks',
    icon: '❌',
    examplePrompt: 'Cancel my 3pm meeting',
    tags: ['calendar', 'quick', 'scheduling'],
    difficulty: 'beginner'
  },
  {
    id: 'quick-6',
    title: 'Quick Reply',
    description: 'Send a brief response to an email',
    category: 'quick-tasks',
    icon: '💬',
    examplePrompt: 'Reply to Sarah\'s email saying I\'ll be there',
    tags: ['gmail', 'quick', 'communication'],
    difficulty: 'beginner'
  }
]

export const CATEGORY_INFO = {
  email: {
    name: 'Email Productivity',
    color: 'emerald',
    description: 'Manage, organize, and automate your Gmail'
  },
  calendar: {
    name: 'Calendar Management',
    color: 'gold',
    description: 'Schedule, plan, and optimize your time'
  },
  documents: {
    name: 'Document Workflow',
    color: 'blue',
    description: 'Create, organize, and share files'
  },
  'multi-service': {
    name: 'Multi-Service',
    color: 'purple',
    description: 'Orchestrate complex workflows across apps'
  },
  'quick-tasks': {
    name: 'Quick Tasks',
    color: 'amber',
    description: 'Fast actions for common needs'
  }
}
