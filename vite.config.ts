import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: './dist',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 热更新
  server: {
    hmr: true,
    host: '0.0.0.0',
    port: 5173,
    open: true,
    proxy: {
      '/bridge': {
        // target: 'http://192.168.1.123:9990',
        // target: 'http://192.168.1.21:9990',
        target: 'http://192.168.100.125:5173',
        changeOrigin: true,
      },
    },
  }
})
