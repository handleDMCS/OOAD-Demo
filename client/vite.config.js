import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Change target port to 3000
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
