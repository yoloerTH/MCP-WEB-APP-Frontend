# 🎤 Voice AI Client - Holographic Interface

Beautiful, futuristic voice AI interface for real-time conversations with your AI assistant that has full Google Workspace access.

![Status](https://img.shields.io/badge/status-production%20ready-success)
![Tech](https://img.shields.io/badge/tech-React%20%2B%20TypeScript-blue)
![Design](https://img.shields.io/badge/design-holographic-purple)

---

## ✨ Features

- 🎙️ **Real-time Voice Calling** - WebSocket-based voice communication
- 🌊 **Audio Visualization** - Holographic orb with frequency bars
- 💬 **Live Transcript** - Real-time conversation display
- 🎨 **Futuristic Design** - Sci-fi command center aesthetic
- 📱 **Mobile Responsive** - Works on all devices
- 🔊 **Audio Playback** - Hear AI responses in voice
- 🎯 **Status Indicators** - Visual feedback for all states
- ⚡ **Smooth Animations** - Framer Motion powered

---

## 🎨 Design Aesthetic

**Holographic Command Center**

Inspired by sci-fi interfaces (Blade Runner, Iron Man, Minority Report):
- Deep space black background (#0a0a0a)
- Electric cyan (#00d4ff) and magenta (#ff00ff) accents
- Glassmorphism and gradient effects
- Pulsing energy states
- Scan-line animations
- Retro-futuristic typography (Orbitron + Space Mono)

---

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your backend URL
VITE_BACKEND_URL=http://localhost:3001

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
```

Output in `dist/` folder ready for deployment.

---

## 🔧 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **WebSocket:** Socket.io Client
- **Audio:** Web Audio API

---

## 📡 Backend Connection

Connects to Voice AI Backend via WebSocket:

```typescript
const socket = io(BACKEND_URL)

// Events from backend
socket.on('connect', ...)
socket.on('status', ...)
socket.on('transcript', ...)
socket.on('ai-response', ...)
socket.on('audio-response', ...)

// Events to backend
socket.emit('call-start')
socket.emit('audio-stream', audioData)
socket.emit('call-end')
```

---

## 🎯 Components

### `App.tsx`
Main application component:
- Socket.io connection management
- Microphone capture and streaming
- Audio visualization loop
- Call state management

### `AudioVisualizer.tsx`
Holographic audio visualization:
- Central pulsing orb
- Frequency bars
- Scan-line effects
- Different colors for user vs AI

### `Transcript.tsx`
Live conversation display:
- User messages (cyan)
- AI messages (magenta)
- System messages (gray)
- Timestamps
- Auto-scroll

### `CallControls.tsx`
Call control buttons:
- Start Call
- End Call
- Mute/Unmute
- Holographic button styles

### `StatusIndicator.tsx`
Visual status display:
- Animated status dot
- Status label
- Decorative bars
- 6 states: disconnected, connecting, connected, listening, ai-speaking, processing

---

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  cyber: {
    400: '#00d4ff',  // Main cyan
    // ... other shades
  },
  magenta: {
    500: '#ff00ff',  // Main magenta
  }
}
```

### Fonts

Edit `tailwind.config.js`:

```javascript
fontFamily: {
  'display': ['Your Display Font', 'monospace'],
  'body': ['Your Body Font', 'monospace'],
}
```

Update `index.html` Google Fonts link.

### Animations

Edit animation speeds in `tailwind.config.js`:

```javascript
animation: {
  'pulse-glow': 'pulse-glow 2s ...',  // Change duration
}
```

---

## 🌐 Deployment

### Netlify (Recommended)

See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for detailed guide.

**Quick deploy:**
```bash
netlify deploy --prod
```

### Other Platforms

**Vercel:**
```bash
vercel --prod
```

**Cloudflare Pages:**
```bash
wrangler pages publish dist
```

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Voice AI Backend WebSocket URL | `https://your-backend.railway.app` |

⚠️ **Important:** Vite requires `VITE_` prefix for env vars to be accessible in the app.

---

## 🐛 Troubleshooting

### Microphone not working
- HTTPS required (Netlify provides automatically)
- Check browser permissions
- Grant microphone access when prompted

### WebSocket connection fails
- Check backend URL is correct
- Verify backend is running
- Check CORS settings on backend

### No audio playback
- Check browser audio permissions
- Verify audio is not muted
- Check Web Audio API support

### UI looks broken
- Clear browser cache
- Hard reload (Cmd/Ctrl + Shift + R)
- Check console for errors

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Required Features:**
- WebSocket
- Web Audio API
- MediaRecorder API
- getUserMedia API

---

## 🎯 Future Enhancements

Potential features to add:
- [ ] Voice activity detection (VAD)
- [ ] Noise cancellation
- [ ] Multiple voice options
- [ ] Chat mode (text-only)
- [ ] Call recording
- [ ] Conversation history
- [ ] User authentication
- [ ] Settings panel
- [ ] Dark/Light theme toggle
- [ ] Accessibility improvements

---

## 📄 License

MIT

---

## 🤝 Support

Having issues? Check:
1. [Troubleshooting](#-troubleshooting)
2. Backend logs
3. Browser console
4. Network tab in DevTools

---

## 🎉 You're All Set!

Your holographic voice AI interface is ready to deploy!

**Next steps:**
1. Deploy backend to Railway
2. Deploy frontend to Netlify
3. Update environment variables
4. Test end-to-end
5. Enjoy your futuristic AI assistant! 🚀
