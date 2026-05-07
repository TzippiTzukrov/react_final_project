import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  base: process.env.NODE_ENV === 'production' ? '/react_final_project/' : '/',
  server: {
    port: 5173,
    historyApiFallback: {
      index: '/index.html'
    },
  },
  css: {
    devSourcemap: true
  }
})