module.exports = {
  // 打包时去除map文件
  productionSourceMap:false,
  pages: {
    index: {
      //的入口
      entry: 'src/main.js',
    }
  },
  lintOnSave:false, //关闭语法检查
  // 配置代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        ws: true,
        changeOrigin: true,
      },
    }
  }

}