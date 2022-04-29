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
  // 自定义全局快捷路由
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
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
}
