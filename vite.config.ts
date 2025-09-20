import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ Ganti "username" & "repo-name" sesuai GitHub kamu
export default defineConfig({
  plugins: [react()],
  base: '/Veo3/', 
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
