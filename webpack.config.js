/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-07 20:33:24
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-08 10:52:57
 */
'use strict'

var path = require('path')
var {VueLoaderPlugin} = require('vue-loader')
var HtmlWebpackPlugin = require('html-webpack-plugin')


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
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    })
  ]
  
}
