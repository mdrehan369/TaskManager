import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': process.env.BACKEND_URI,
    },
  },
  plugins: [react()],
})
