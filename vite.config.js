import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import { seoPlugin } from './scripts/seo-plugin.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Generates responsive AVIF/WebP/JPEG variants at build time.
    // Directives live in the import queries in src/assets/images.js.
    imagetools({
      // Never upscale past the source resolution — several shop photos are
      // small originals and generating 1920w variants of them wastes bytes.
      defaultDirectives: () => new URLSearchParams({ withoutEnlargement: 'true' }),
    }),
    seoPlugin(),
  ],
  base: '/shree_nandi_gruhudhyog/',
  server: {
    host: false,
    port: 5173,
  },
  build: {
    // Photos dominate the payload; warn only on genuinely large JS chunks.
    chunkSizeWarningLimit: 250,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'motion'
          }
          if (id.includes('react')) return 'vendor'
        },
      },
    },
  },
})
