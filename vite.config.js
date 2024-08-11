import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  // 其他配置项
  server: {
    port:5173,
    proxy: {
      '/api': {
        target: 'http://localhost:80', // 后端API的地址
        changeOrigin: true,
      },
    },
  },

  base:"./",
})

