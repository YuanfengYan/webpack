var commonConfig = require('./webpack.common.js');
const merge = require('webpack-merge');
let webpackConfig = {
  mode:'development',
  devtool: "eval-source-map",
  devServer: {
      // 提供静态文件目录地址
      // 基于express.static实现
      contentBase: path.join(__dirname, "dist"),
      // 将此项配置设置为 true 时，将会跳过 host 检查。这是不推荐的因为不检查 host 的应用容易受到 DNS 重新绑定攻击
      disableHostCheck:true,
      // 在所有响应中添加首部内容
      headers: {
        "X-Custom-Foo": "bar"
      },
      // 当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为“惰性模式”
      lazy:true,
      // 任意的 404 响应都被替代为 index.html
      // 基于node connect-history-api-fallback包实现
      historyApiFallback: true,
      // 是否一切服务都启用 gzip 压缩
      // 基于node compression包实现
      compress: true,
      // 是否隐藏bundle信息
      noInfo: true,
      // 发生错误是否覆盖在页面上
      overlay: true,
      // 是否开启热加载
      // 必须搭配webpack.HotModuleReplacementPlugin 才能完全启用 HMR。
      // 如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会被自动添加
      hot: true,
      // 热加载模式
      // true代表inline模式，false代表iframe模式
      inline: true, // 默认是true
      // 是否自动打开
      open: true,
      // 设置本地url和端口号
      host: 'localhost',
      port: 8080,
      // 代理
      // 基于node http-proxy-middleware包实现
      proxy: {
          // 匹配api前缀时，则代理到3001端口
          // 即http://localhost:8080/api/123 = http://localhost:3001/api/123
          // 注意:这里是把当前server8080代理到3001，而不是任意端口的api代理到3001
          '/api': 'http://localhost:3001',
          // 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
          // 主要解决跨域问题
          changeOrigin: true,
          // 针对代理https
          secure: false,
          // 覆写路径：http://localhost:8080/api/123 = http://localhost:3001/123
          pathRewrite: {'^/api' : ''},
          // 输出本次代理请求的日志信息
          bypass: function (req, res, proxyOptions) {
              console.log(proxyOptions.target)
          }
      }
  },
}
module.exports = merge.merge(commonConfig,webpackConfig)