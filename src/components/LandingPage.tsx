import { motion } from 'framer-motion'

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight-900/80 backdrop-blur-md border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-2xl">🤖</span>
            </div>
            <span className="text-xl font-bold">AI Assistant</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="px-6 py-2.5 bg-gradient-to-br from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-midnight-900 font-bold rounded-xl shadow-lg shadow-gold-500/30 transition-all duration-200"
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-emerald-300 to-gold-400 bg-clip-text text-transparent">
              Your AI-Powered
              <br />
              Google Workspace Assistant
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Control your entire Google Workspace ecosystem with voice or chat.
              Powered by cutting-edge AI and seamless MCP integration.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-xl shadow-emerald-500/30 text-lg transition-all duration-200"
              >
                🎙️ Try Voice Mode
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-br from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-midnight-900 font-bold rounded-xl shadow-xl shadow-gold-500/30 text-lg transition-all duration-200"
              >
                💬 Try Chat Mode
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '35+', label: 'AI Tools' },
              { value: '9', label: 'Google Services' },
              { value: '2', label: 'Modes' },
              { value: '24/7', label: 'Available' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-midnight-800/50 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-emerald-400 to-gold-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works - Flowchart */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="bg-gradient-to-r from-emerald-400 to-gold-400 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-lg text-gray-400">Seamless AI-powered automation in three simple steps</p>
          </motion.div>

          {/* Desktop Flowchart */}
          <div className="hidden md:flex items-center justify-between gap-6">
            {/* You (Voice/Chat) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="bg-gradient-to-br from-midnight-800 to-midnight-700 border-2 border-emerald-500 rounded-2xl p-8 text-center hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                  <span className="text-4xl">👤</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">You</h3>
                <p className="text-sm text-gray-400">Speak naturally or type your request</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-xs text-emerald-300 font-semibold">🎙️ Voice</span>
                  <span className="px-3 py-1 bg-gold-500/20 border border-gold-500/50 rounded-full text-xs text-gold-300 font-semibold">💬 Chat</span>
                </div>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="text-emerald-500 text-4xl">→</div>
              <span className="text-xs text-emerald-400 mt-2 font-semibold">Real-time</span>
            </motion.div>

            {/* AI Processing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex-1"
            >
              <div className="bg-gradient-to-br from-midnight-800 to-midnight-700 border-2 border-gold-500 rounded-2xl p-8 text-center hover:border-gold-400 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/20">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gold-500/30">
                  <span className="text-4xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">AI Brain</h3>
                <p className="text-sm text-gray-400">Advanced AI understands and processes</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="px-3 py-1 bg-gold-500/20 border border-gold-500/50 rounded-full text-xs text-gold-300 font-semibold">MCP Protocol</span>
                </div>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="text-gold-500 text-4xl">→</div>
              <span className="text-xs text-gold-400 mt-2 font-semibold">OAuth 2.0</span>
            </motion.div>

            {/* Google Workspace */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex-1"
            >
              <div className="bg-gradient-to-br from-midnight-800 to-midnight-700 border-2 border-emerald-500 rounded-2xl p-8 text-center hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <span className="text-4xl">🔗</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Google Workspace</h3>
                <p className="text-sm text-gray-400">Execute actions across all services</p>
                <div className="flex items-center justify-center gap-1 mt-4 flex-wrap">
                  <span className="text-xs">📧</span>
                  <span className="text-xs">📅</span>
                  <span className="text-xs">📁</span>
                  <span className="text-xs">📄</span>
                  <span className="text-xs">📊</span>
                  <span className="text-xs">👥</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Flowchart */}
          <div className="md:hidden space-y-6">
            {[
              { icon: '👤', title: 'You', desc: 'Speak naturally or type your request', tags: ['🎙️ Voice', '💬 Chat'], color: 'emerald' },
              { icon: '🧠', title: 'AI Brain', desc: 'Advanced AI understands and processes', tags: ['MCP Protocol'], color: 'gold' },
              { icon: '🔗', title: 'Google Workspace', desc: 'Execute actions across all services', tags: ['📧 📅 📁 📄 📊 👥'], color: 'emerald' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className={`bg-gradient-to-br from-midnight-800 to-midnight-700 border-2 border-${step.color}-500 rounded-2xl p-6 text-center`}>
                  <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{step.desc}</p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {step.tags.map((tag, tidx) => (
                      <span key={tidx} className="px-2 py-1 bg-midnight-700 rounded-full text-xs text-gray-300">{tag}</span>
                    ))}
                  </div>
                </div>
                {idx < 2 && (
                  <div className="flex justify-center my-3">
                    <div className="text-emerald-500 text-2xl">↓</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Connected <span className="bg-gradient-to-r from-emerald-400 to-gold-400 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-lg text-gray-400">Full control over your Google Workspace ecosystem</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Gmail', icon: '📧', color: 'bg-red-500', tools: 3, desc: 'Search, send, and read emails' },
              { name: 'Calendar', icon: '📅', color: 'bg-blue-500', tools: 6, desc: 'Manage events and meetings' },
              { name: 'Drive', icon: '📁', color: 'bg-yellow-500', tools: 6, desc: 'Files, folders, and permissions' },
              { name: 'Docs', icon: '📄', color: 'bg-blue-400', tools: 5, desc: 'Create and edit documents' },
              { name: 'Sheets', icon: '📊', color: 'bg-green-500', tools: 5, desc: 'Spreadsheet automation' },
              { name: 'Contacts', icon: '👥', color: 'bg-purple-500', tools: 4, desc: 'Manage your contacts' },
              { name: 'Tasks', icon: '✅', color: 'bg-indigo-500', tools: 5, desc: 'Create and track tasks' },
              { name: 'Meet', icon: '📹', color: 'bg-pink-500', tools: 5, desc: 'Schedule video meetings' },
              { name: 'Keep', icon: '📝', color: 'bg-amber-500', tools: 0, desc: 'Use Tasks instead' },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-midnight-800/50 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                    <span className="text-xs text-emerald-400 font-semibold">{service.tools} Tools</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful <span className="bg-gradient-to-r from-emerald-400 to-gold-400 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-lg text-gray-400">Everything you need to supercharge your productivity</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🎙️', title: 'Voice Control', desc: 'Natural speech recognition with real-time transcription and audio feedback' },
              { icon: '💬', title: 'Chat Interface', desc: 'Type your commands and get instant responses with full conversation history' },
              { icon: '🔒', title: 'Secure OAuth', desc: 'Industry-standard OAuth 2.0 authentication keeps your data safe and private' },
              { icon: '⚡', title: 'Real-time Processing', desc: 'Lightning-fast AI responses with WebSocket connections for instant updates' },
              { icon: '🎯', title: 'Smart Context', desc: 'AI understands your intent and executes complex multi-step workflows' },
              { icon: '🌐', title: 'Cloud-Powered', desc: 'Deployed on Railway and Netlify for 99.9% uptime and global access' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-midnight-800 to-midnight-700 border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Start using your AI assistant today. No credit card required.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-10 py-5 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-2xl shadow-emerald-500/30 text-xl transition-all duration-200"
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-500/20 py-8 px-6 bg-midnight-900">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
          <p className="mb-2">
            Built with <span className="text-emerald-400">💚</span> using React, TypeScript, and Tailwind CSS
          </p>
          <p className="text-xs">
            Powered by Google Workspace MCP • Deployed on Railway & Netlify
          </p>
        </div>
      </footer>
    </div>
  )
}
