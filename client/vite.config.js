import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import 'dotenv/config.js'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    proxy: {
      '/api': process.env.VITE_URL,
    },
  },
})
