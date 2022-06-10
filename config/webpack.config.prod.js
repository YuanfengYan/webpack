/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-10 10:56:02
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-10 18:33:48
 */
var commonConfig = require('./webpack.common.js');
const merge = require('webpack-merge');
let webpackConfig = {
  // devtool: '',
  mode:"production",
  plugins:[],
}
if(process.env.NODE_ENV=='analyz'){
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = merge.merge(commonConfig,webpackConfig)