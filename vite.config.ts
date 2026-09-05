import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    // Increase chunk size warning limit to avoid noise
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Manual chunk strategy: split vendor libs from app code
        manualChunks: (id) => {
          // GSAP into its own chunk (heavy animation library)
          if (id.includes('gsap')) {
            return 'gsap';
          }
          // React + React-DOM core
          if (id.includes('react-dom') || id.includes('react/')) {
            return 'react-vendor';
          }
          // Lucide icons
          if (id.includes('lucide')) {
            return 'lucide';
          }
          // Supabase
          if (id.includes('@supabase')) {
            return 'supabase';
          }
          // Admin panel pages grouped together
          if (id.includes('/pages/admin/')) {
            return 'admin';
          }
        },
      },
    },
    // Minify CSS aggressively
    cssMinify: true,
    // Target modern browsers (smaller output)
    target: 'es2018',
  },
});
