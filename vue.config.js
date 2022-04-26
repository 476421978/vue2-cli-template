const path = require('path');

// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
// })

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  }
}
