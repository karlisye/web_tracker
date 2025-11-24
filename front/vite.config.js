import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import webExtension from 'vite-plugin-web-extension'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if(mode === 'extension') {
    return {
      plugins: [
        react(), 
        tailwindcss(),
        webExtension({
          manifest: 'public/manifest.json',
        }),
      ],
      build: {
        outDir: 'dist',
      },
    }
  }
  if(mode === 'web'){
    return {
      root: 'web',
      plugins: [
        react(),
        tailwindcss(),
      ],
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:8000',
            changeOrigin: true,
            headers: {
              Accept: 'application/json',
              "Content-Type": 'application/json',
            }
          }
        }
      },
      build: {
        outDir: 'dist-web',
      },
    }
  }
})