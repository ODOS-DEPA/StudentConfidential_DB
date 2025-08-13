import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'


// โหลด .env จาก root project
dotenv.config({ path: path.resolve(__dirname, '../.env') })

export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.HOST || 'localhost',
    port: Number(process.env.FRONT_PORT) || 5173,
  },
  define: {
    'import.meta.env.VITE_DOMAIN_NAME': JSON.stringify(process.env.VITE_DOMAIN_NAME),
  },
})