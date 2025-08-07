import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

// Load .env from one directory above the current file
dotenv.config({ path: path.resolve(__dirname, '../.env') })

export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.HOST || 'localhost',
    port: Number(process.env.FRONT_PORT) || 5173,
  }
})