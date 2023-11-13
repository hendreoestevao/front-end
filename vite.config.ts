import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{find: '@', replacement: '/src'}]
  },
  build: {
    outDir: 'dist',
  },
  plugins: [
    react({
      include: "**/*.tsx",
      fastRefresh: true
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    port: 5173
  }
})
