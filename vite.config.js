import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@fortawesome/fontawesome-free/css/all.min.css'],
  },
  build: {
    rollupOptions: {
      external: ['@fortawesome/fontawesome-free'],
    },
  },
});
