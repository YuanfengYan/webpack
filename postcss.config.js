
module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        autoprefixer:{ grid: true },//这里单独对前缀的一些功能进行设定，grid会兼容 ms-grid。其他配置可以看官方文档
        browsers: 'last 2 versions',//对浏览器的兼容范围
      },
    ],
  ],
};