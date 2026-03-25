import { defineConfig, envField } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  integrations: [react()],
  output: 'static',
  site: 'https://naurra.ai',
  vite: {
    ssr: {
      noExternal: ['react-helmet-async'],
    },
    optimizeDeps: {
      include: ['react-helmet-async'],
    },
    envPrefix: ['VITE_', 'PUBLIC_'],
  },
})
