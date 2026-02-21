import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
      manifest: {
        name: 'EduLite',
        short_name: 'EduLite',
        description: 'EduLite is not just offline-first. It is literacy-first, language-first, and bandwidth-first.',
        theme_color: '#1a1a2e',
        background_color: '#16213e',
      },
    }),
  ],
})
