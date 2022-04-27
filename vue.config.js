const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  transpileDependencies: [
    // 兼容ie
    'vue-echarts',
    'resize-detector'
  ],
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  },
  // 指定接口跨域
  devServer: {
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
}
