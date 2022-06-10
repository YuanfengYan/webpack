
module.exports = {
  plugins: [
    // [
    //   "postcss-sprites",
    //   {
    //     stylesheetPath: './dist',
    //     spritePath: './dist/images/'
    //   }
    // ],
    [
      "postcss-preset-env",
      {
        autoprefixer:{ grid: true },//这里单独对前缀的一些功能进行设定，grid会兼容 ms-grid。其他配置可以看官方文档
        browsers: 'last 2 versions',//对浏览器的兼容范围
      },
    ],
    [
      "postcss-pxtorem",
      {
        rootValue: 37.5,//表示根元素字体大小
        
        //  unitPrecision: 5,//允许REM单位增长到的十进制数字。
        propList:['*'],//类似对正则匹配的设置黑白名单['*','!font*']
        // selectorBlackList:['body'],//设置白名单的标签或者正则匹配到的选择器
        // minPixelValue:1,//设置要替换的最小像素值。
        // mediaQuery:true,//（布尔）允许在媒体查询中转换px。
        exclude:/node_modules/i//需要忽略的文件路径

      }
    ]
  ],
};