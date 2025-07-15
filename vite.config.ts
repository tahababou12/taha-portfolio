import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const isMaintenance = process.env.MAINTENANCE_MODE === '1'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow serving files from one level up to access db/exports directory
      allow: ['.', '../']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      input: isMaintenance ? '/public/maintenance.html' : '/index.html'
    }
  }
})
