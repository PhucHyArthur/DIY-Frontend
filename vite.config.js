import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// bracnh fix_imgae

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Đảm bảo alias '@' trỏ đến thư mục 'src'
    },
  },
})
