import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/websitedemo/',
  build: {
    outDir: 'docs', // Build to the docs folder for GitHub pages
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
})
