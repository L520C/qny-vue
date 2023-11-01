// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8081,
    https: false,
    open: false, // 是否自动弹出浏览器页面
    proxy: {
      '/api': {
        target: 'http://localhost:20000',
        ws: true,
        changeOrigin: true, // 表示是否跨域
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}