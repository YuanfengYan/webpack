/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-10 10:56:02
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-14 19:31:49
 */
var commonConfig = require('./webpack.common.js');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); //js压缩
const path = require('path');

const merge = require('webpack-merge');
// const PurgeCSSPlugin = require('purgecss-webpack-plugin')//css树摇插件

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

let webpackConfig = {
  // devtool: 'source-map',
  mode:"production",
  plugins:[
    // 清空dist目录
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:[ path.resolve(__dirname, '../dist')]
      //建议写绝对路径
    }),

    // new PurgeCSSPlugin({
    //   paths: glob.sync([
    //     path.join(__dirname, '../public/index.html'),
    //       path.join(__dirname, '../**/*.vue')
    //       // path.join(__dirname, '../src/**/*.js')
    //   ]),
    // }),
  ],
  optimization: {
    moduleIds: "deterministic", //
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        // include: /\/includes/,
        parallel: 4,//并行线程数量
      }),
    ],
  },
}
if(process.env.NODE_ENV=='analyz'){
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = merge.merge(commonConfig,webpackConfig)