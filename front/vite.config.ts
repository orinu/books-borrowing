import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        
      },
    },
  },
  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, './src/scss'),
    },
  },
});
