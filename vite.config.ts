import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ Ganti "username" & "repo-name" sesuai GitHub kamu
export default defineConfig({
  plugins: [react()],
  base: '/repo-name/', 
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
