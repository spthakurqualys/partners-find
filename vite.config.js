import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
const basePath = 'partners/find';
export default defineConfig({
  plugins: [svelte()],
  base: basePath,
  build: {
    outDir: `../../www/${basePath}`,
    assetsDir: '.',
    cssCodeSplit: false,
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]'
      }
    },
  }
});
