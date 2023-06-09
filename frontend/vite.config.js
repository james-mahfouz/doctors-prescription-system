import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv';

config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  mode: 'development',
  define: {
    'process.env': {
      API_URL: process.env.API_URL || 'http://localhost:8000/'
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
