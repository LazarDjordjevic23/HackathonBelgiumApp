import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    fs: {
      cachedChecks: false,
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
      { find: 'public', replacement: resolve(__dirname, './public') }
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
