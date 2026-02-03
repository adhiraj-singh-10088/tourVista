import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@hooks': '/src/hooks',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      
    },
  },
})
