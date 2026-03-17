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
  base: '/react_final_project/',
  server: {
    historyApiFallback: {
      index: '/index.html'
    },
  },
  css: {
    devSourcemap: true
  }
})