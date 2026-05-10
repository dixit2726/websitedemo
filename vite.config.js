import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // This sets the base path for GitHub Pages
  base: '/restrant/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
