# 🌐 Netlify Deployment Guide - Voice AI Client

## Quick Deploy to Netlify

### Method 1: Deploy via Netlify Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   cd voice-ai-client
   git init
   git add .
   git commit -m "Initial Voice AI Client"
   git push origin main
   ```

2. **Deploy on Netlify**
   - Go to [Netlify.com](https://app.netlify.com)
   - Click **Add new site** → **Import an existing project**
   - Connect to GitHub
   - Select your `voice-ai-client` repository

3. **Build Settings**
   Netlify should auto-detect Vite, but verify:

   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18 or higher

4. **Environment Variables**

   Go to **Site settings** → **Build & deploy** → **Environment variables**

   Add:
   ```
   VITE_BACKEND_URL=https://your-voice-ai-backend.railway.app
   ```

   ⚠️ **IMPORTANT:** Replace with your actual Railway backend URL!

5. **Deploy!**
   - Click **Deploy site**
   - Netlify will build and deploy automatically
   - You'll get a URL like: `https://random-name-123.netlify.app`

---

### Method 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
cd voice-ai-client
netlify init

# Set environment variable
netlify env:set VITE_BACKEND_URL https://your-voice-ai-backend.railway.app

# Deploy
netlify deploy --prod
```

---

### Method 3: Drag & Drop Deploy

1. **Build Locally**
   ```bash
   cd voice-ai-client
   npm run build
   ```

2. **Drag & Drop**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag the `dist` folder
   - Instant deployment!

   ⚠️ **Note:** Environment variables must be set via dashboard after

---

## Post-Deployment Setup

### 1. Custom Domain (Optional)

In Netlify dashboard:
- Go to **Domain settings**
- Add custom domain
- Follow DNS instructions

### 2. HTTPS (Automatic)

Netlify automatically provides HTTPS. No setup needed! 🎉

### 3. Update Backend CORS

After getting your Netlify URL, update the Voice AI Backend CORS settings:

In `voice-ai-backend/server.js`, add your Netlify URL:
```javascript
const allowedOrigins = [
  'https://your-site.netlify.app',  // Add this
  'http://localhost:5173'
]
```

Redeploy backend after this change.

---

## Environment Variables

The frontend only needs one environment variable:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Voice AI Backend URL | `https://voice-ai-backend.railway.app` |

---

## Build Optimization

### Enable Build Caching

In `netlify.toml` (create if doesn't exist):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Speed Up Builds

Add to `package.json`:
```json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

---

## Custom 404 Page (Optional)

Create `public/_redirects`:
```
/*    /index.html   200
```

This ensures SPA routing works correctly.

---

## Testing Your Deployment

### 1. Check Build Logs

In Netlify dashboard:
- Go to **Deploys**
- Click on latest deploy
- Check build logs for errors

### 2. Test the Site

Open your Netlify URL and:
- ✅ Check page loads correctly
- ✅ Click "START CALL"
- ✅ Grant microphone access
- ✅ Speak and verify connection to backend
- ✅ Check browser console for errors

### 3. Test WebSocket Connection

Open browser console:
```javascript
// Should show WebSocket connection
console.log('WebSocket connected')
```

---

## Troubleshooting

### "Failed to connect to backend"
- ✅ Check `VITE_BACKEND_URL` is set correctly
- ✅ Verify Railway backend is running
- ✅ Check backend CORS includes Netlify URL
- ✅ Rebuild frontend after changing env vars

### Microphone Not Working
- ✅ HTTPS is required for microphone access (Netlify provides this)
- ✅ Check browser permissions
- ✅ Try a different browser

### Build Fails
- ✅ Check build logs in Netlify
- ✅ Verify `npm run build` works locally
- ✅ Check Node version matches

### WebSocket Connection Drops
- ✅ Check Railway backend is running
- ✅ Verify WebSocket URL format (wss:// for HTTPS)
- ✅ Check network tab in browser DevTools

---

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` → Auto-deploy
- Preview deployments for PRs
- Rollback to any previous deploy

**Disable auto-deploy:**
- Go to **Build & deploy** → **Continuous Deployment**
- Stop builds or change branch

---

## Performance

### Lighthouse Score Targets
- ✅ Performance: 90+
- ✅ Accessibility: 90+
- ✅ Best Practices: 90+
- ✅ SEO: 90+

### Optimization Tips
- Images are already optimized (no images in this project)
- Fonts loaded via Google Fonts (preconnected)
- CSS is minified in production
- JavaScript is code-split by Vite

---

## Monitoring

### Netlify Analytics (Optional - Paid)
- Real-time visitor stats
- Page views
- Bandwidth usage

### Free Monitoring
- Check deploy logs
- Use browser DevTools
- Monitor Railway backend logs

---

## Update Deployment

### Method 1: Push to GitHub
```bash
git add .
git commit -m "Update frontend"
git push
```
→ Netlify auto-deploys

### Method 2: Manual Deploy
```bash
netlify deploy --prod
```

---

## Environment-Specific Configs

### Development
```env
VITE_BACKEND_URL=http://localhost:3001
```

### Production
```env
VITE_BACKEND_URL=https://voice-ai-backend.railway.app
```

Netlify uses production values automatically when deploying.

---

## Final Checklist

Before going live:

- [ ] Railway backend is deployed and running
- [ ] `VITE_BACKEND_URL` is set in Netlify
- [ ] Backend CORS includes Netlify URL
- [ ] Test microphone access works
- [ ] Test WebSocket connection
- [ ] Test calling the AI
- [ ] Test Google Workspace actions work
- [ ] Check mobile responsiveness
- [ ] Check browser console for errors

---

You're ready to deploy! 🚀

After deployment, you'll have:
- ✅ Beautiful holographic voice AI interface
- ✅ Connected to your Railway backend
- ✅ HTTPS + custom domain (optional)
- ✅ Auto-deployments from GitHub

Enjoy your production Voice AI! 🎤✨
