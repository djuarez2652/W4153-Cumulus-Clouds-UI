import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, 'src')
// const outDir = resolve(__dirname, 'd')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react',
    },
  },
})
