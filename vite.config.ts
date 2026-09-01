import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Sclae-Seq/',
  plugins: [react(), tailwindcss()],
  server: { port: 5174, strictPort: true },
})
