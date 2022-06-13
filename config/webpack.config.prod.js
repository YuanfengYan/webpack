/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-10 10:56:02
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-13 20:31:38
 */
var commonConfig = require('./webpack.common.js');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const merge = require('webpack-merge');
let webpackConfig = {
  // devtool: '',
  mode:"production",
  plugins:[],
  optimization: {
    moduleIds: "deterministic", //
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        // include: /\/includes/,
        parallel: 4,
      }),
    ],
  },
}
if(process.env.NODE_ENV=='analyz'){
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = merge.merge(commonConfig,webpackConfig)