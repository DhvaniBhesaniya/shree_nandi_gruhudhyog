import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/shree_nandi_gruhudhyog/',
  server: {
    host: false,
    // staticPort: true,
    port: 5173,
  },
})
