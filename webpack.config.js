/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-07 20:33:24
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-09 11:34:23
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
              publicPath: './',  
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
