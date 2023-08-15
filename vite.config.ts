import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_MOCK_ENABLED = false } = env
  return {
    base: '/vite-vue-admin/',
    resolve: {
      alias: {
        // 别名配置
        '@': resolve('src/')
      },
    },
    define: {
      'process.env': {}
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/element/index.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock', // 解析根目录下的mock文件夹
        watchFiles: true,
        supportTs: true,
        localEnabled: VITE_MOCK_ENABLED as boolean,
        prodEnabled: command !== 'serve' && VITE_MOCK_ENABLED as boolean,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger: false
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]'
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        dts: 'src/components.d.ts',
      })
    ]
  }
})
