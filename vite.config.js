import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Resolve issues with Font Awesome imports
      '@fortawesome/fontawesome-free': require.resolve('@fortawesome/fontawesome-free')
    },
  },
  optimizeDeps: {
    include: ['@fortawesome/fontawesome-free/css/all.min.css'],
  },
  build: {
    rollupOptions: {
      external: ['@fortawesome/fontawesome-free'],
    },
  },
})
