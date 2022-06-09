/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-07 20:33:24
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-09 20:32:08
 */
'use strict'

const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const PostcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 分析包内容
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
// 自动前缀
// const autoprefixer = require('autoprefixer')

process.env.NODE_ENV = 'development';

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {

  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    compress: true,//??
    port: 8080
  },
  
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg)(\?[a-z0-9]+)?$/,
        type: 'asset/resource'
        // use:[
        //   {
        //     loader : 'url-loader',
        //     options: {
        //        // 图片大于8kb，就会被base64处理
        //         limit: 8 * 1024,
        //         esModule: false, // 关不es6模块化解析
        //         encoding: true, // 默认为true, 是否使用默认编码base64，可以["utf8","utf16le","latin1","base64","hex","ascii","binary","ucs2"]
        //         // generator: '', // 类型:{Function},默认值:() => type/subtype;encoding,base64_data,可以自定义数据编码。
        //         fallback: 'file-loader',  //指定当目标文件的大小超过限制时要使用的备用加载程序
        //         //[hash:10]取图片的hash的前10位
        //         //[ext]取文件原来扩展名
        //         name: 'images/[hash:10].[ext]'
        //     },
        //   }
        // ],
    },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test:/\.s[ac]ss$/,
        use:[
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader' ,
          'sass-loader'

        ]
      },
      {
        test:/\.css$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: '../',  
              // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
              // hmr: devMode, // 仅dev环境启用HMR功能
            },
          },
          "css-loader",
          'postcss-loader' 
        ],
        
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    // 开启 BundleAnalyzerPlugin 
    // new BundleAnalyzerPlugin(), 
  ]
  
}
