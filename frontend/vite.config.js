import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "XXXXXREACTBOX-5173.codio.io" // Replace with your actual Box URL
    ],
    proxy: {
      '/api': {
        target: 'https://XXXXXDJANGOBOX-8000.codio.io', // Replace with your Django URL
        changeOrigin: true,
        secure: false
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js', 
  },
})