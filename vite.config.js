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
  server: {
    historyApiFallback: {
      index: '/index.html'
    },
  },
  css: {
    devSourcemap: true
  }
})
