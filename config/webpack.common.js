/*
 * @Description:
 * @Author: yanyuanfeng
 * @Date: 2022-06-10 10:56:17
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-10 18:11:46
 */
const webpack = require('webpack');
const path = require('path');
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
    stats: 'normal', //标准日志打印
    target: 'web', //默认
    // 输出配置
    output: {
        filename: '[name].js', //'index.js',
        path: path.resolve(__dirname, '../dist'), //本地磁盘目录，用于存储所有输出文件（绝对路径）。
        // publicPath: '/',//'https://staticn.ahaschool.com.cn/', //上载捆绑文件的位置。（相对于服务器根目录）例如 /assets ;或者可以配置cdn地址。
        // hotUpdateChunkFilename: 'assets/js/[id].[chunkhash:8].min.js',// 自定义热更新 chunk 的文件名。
    },
    //页面入口文件配置
    entry: './index.js',

    // 解析模块请求的选项
    // （不适用于对 loader 解析）
    resolve: {
        modules: ['node_modules'],
        alias: {
            '@': path.join(__dirname, '../src'),
        },
        extensions: ['.js', '.json'], //自动解析确定的扩展。默认值为
    },

    // 关于模块配置
    module: {
        noParse: /jquery|lodash/, //可以忽略大型的library可以提高构建性能
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg)(\?[a-z0-9]+)?$/,
                type: 'asset/resource',
                parser:{
                  dataUrlCondition:{
                    maxSize: 10 * 1024,//小10KB的资源以内联base64的形式（默认）
                  }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
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
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },

    // 插件
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

};
