const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule("less").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("style-resources-loader")
        .loader("style-resources-loader")
        .options({
          // or an array : ["./path/to/vars.less", "./path/to/mixins.less"] 这里的路径不能使用@，否则会报错
          patterns: ["./src/styles/var.less", './src/styles/mixin.less']
        })
        .end()
    })
  },
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8000, // 端口号
    open: true, //运行后是否自动在浏览器打开
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
})
