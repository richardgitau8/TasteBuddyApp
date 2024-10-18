import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: 'https://tastebuddy-alx-project.netlify.app/', 
  plugins: [react()],
  optimizeDeps: {
    include: ['@fortawesome/fontawesome-free/css/all.min.css'],
  },
  build: {
    rollupOptions: {
      external: [
        '@fortawesome/fontawesome-free',
        'react-icons/fa',
      ],
    },
  },
});
