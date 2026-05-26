import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        journal: resolve(__dirname, 'journal.html'),
        professions: resolve(__dirname, 'professions.html')
      }
    }
  }
});
