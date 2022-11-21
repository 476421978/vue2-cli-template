const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin') // BREAKING CHANGE: webpack ＜ 5 used to include polyfills for node.js core modules by default

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  lintOnSave: false, // 关闭eslint
  transpileDependencies: [
    // 兼容ie
    'vue-echarts',
    'resize-detector'
  ],
  // 自定义全局快捷路由
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  },
  configureWebpack: (config) => {
    // 在Webpack中填充Node.js核心模块。此模块仅用于Webpack 5+。
    config.plugins.push(new NodePolyfillPlugin())
    // 屏蔽node内置fs,child_process模块
    config.resolve.fallback = {
      fs: false,
      child_process: false
    }
  },
  // 指定接口跨域
  devServer: {
    // host: 'localhost',
    // port: 8080, //项目运行的端口号
    proxy: {
      '/upload': {
        target: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        pathRewrite: {
          '^/upload': '/upload'
        },
        changeOrigin: true
      }
    }
  }
})
